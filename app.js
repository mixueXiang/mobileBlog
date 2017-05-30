// 引入模块
var express = require('express');
var app = express();
var path = require('path');
var ejs = require('ejs');

var async = require('async');
var request = require('request');

var config = require('./webpack.config');

//连接mongodb数据库
var mongoose = require('mongoose');
require('express-mongoose'); 

mongoose.connect('mongodb://lx.mobileblog.xmixue.com/blogdb');
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});
var models = require('./server/models/models');
//models
var User = models.userModel;
var IndexArc = models.indexArcModel;
var Person =  models.personModel;
var Comment = models.commentModel;
var Upvote = models.voteModel;

// 对所有(/)URL或路由返回main.html 
app.get('/', function (req, res) {
    res.render('main');
});

// 设置views路径和模板
app.set('views', './client/view');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// 静态文件配置
app.use('/client/src', express.static(path.join(__dirname, 'client/src')));

//登陆
app.get('/login', function(req, res) { 
    var user_name = req.query.user_name;
    var password = req.query.password;
    var data = {
        error_code: 0,
        error_msg: '',
        result: {}
    };
    Person.findOne({user_name: user_name}, function(error, result) {
        if (error) {
            data.error_msg = error;
        } else {
            if (result) {
                if (result.password == password) {
                    data.error_code = 2;
                    data.result = result;
                    data.error_msg = '登录成功';
                } else {
                    data.error_code = 1;
                    data.error_msg = '账号密码不匹配';
                }
            } else {
                data.error_code = 0;
                data.error_msg = '用户名不存在，请注册';
            }
        }
        res.send(data);
    });
});
//注册
app.get('/register', function(req, res) { 
    var user_name = req.query.user_name;
    var password = req.query.password;
    var data = {
        error_code: 1,
        error_msg: '',
    };
    Person.findOne({user_name: user_name}, function(error, result) {
        if (error) {console.log(error);}
        if (result) {
            data.error_code = 1;
            data.error_msg = '用户名已存在，请重新输入';
        } else {
            var person = new Person({
                user_name: user_name,
                password: password,
                type: 'user'
            });
            person.save();     
            data.error_code = 0;
            data.error_msg = '注册成功'; 
        }
        res.send(data);
    });
});
app.get('/users', function(req, res) { 
    res.send(User.find());
});
app.get('/indexarc', function(req, res) { 
    res.send(IndexArc.find().sort({'timestamp':-1}));
});
app.get('/tagarc', function(req, res) { 
    var tag = req.query.tag;
    res.send(IndexArc.find({archive_type: tag}).sort({'timestamp':-1}));
});
app.get('/detail', function(req, res) { 
	var id = req.query.article_id;
    res.send(IndexArc.findOne({_id:id}));
});
//增加浏览量
app.post('/addread', function(req, res) { 
    var id = req.query.article_id;
    var count = req.query.read_count;
    res.send(IndexArc.update({_id:id}, {read_count: count}));
});
//新增文章
app.get('/addarticle', function(req, res) { 
    var arc_content = JSON.parse(req.query.arc_detail);
    var arc = new IndexArc(arc_content);
    res.send(arc.save());
});
//编辑文章
app.get('/editarticle', function(req, res) { 
    var arc_id = req.query.arc_id;
    var arc_content = JSON.parse(req.query.arc_detail);
    res.send(IndexArc.update({_id:arc_id},{
        title: arc_content.title,
        remark: arc_content.remark,
        detail: arc_content.detail,
        archive_type: arc_content.archive_type,
    })); 
});
//删除文章
app.get('/delarticle', function(req, res) { 
    var arc_id= req.query.arc_id;
    res.send(IndexArc.remove({_id: arc_id}));
});
//获取评论
app.get('/getcomment', function(req, res) { 
    var article_id = req.query.article_id;
    res.send(Comment.find({arc_id: article_id}).sort({'timestamp':-1}));
});
//发表评论
app.get('/postcomment', function(req, res) { 
    var article_id = req.query.article_id;
    var commentor = req.query.commentor;
    var commentInfo = req.query.comment;
    var timestamp = req.query.timestamp;
    var comment = new Comment({
        arc_id: article_id,
        comment: commentInfo,
        commentor: commentor,
        timestamp: timestamp
    });
    comment.save(function(error, doc) {
        if (error) {console.log(error)}
        else {
            res.send(doc);
        }
    }); 
});
//点赞和取消点赞
app.get('/doupvote', function(req, res) { 
    var article_id = req.query.article_id;
    var upvotor = req.query.upvotor;
    var vote_state = req.query.vote_state;
    if (vote_state == 0) {//取消点赞
        res.send(Upvote.remove({arc_id: article_id, upvotor: upvotor}));
    } else {//点赞
        var upvote = new Upvote({
            arc_id: article_id,
            upvotor: upvotor,
            vote_state: true
        });
        upvote.save(function(error, doc) {
            if (error) {console.log(error)}
            else {
                res.send(doc);
            }
        }); 
    }
    
});
// 启动一个服务，监听从端口进入的所有连接请求

var server = app.listen(config.port, config.host, function(err){  
    if (err) {
        console.log(err);
    }
    console.log('Listening at http://' + config.host + ':' + config.port);
}); 