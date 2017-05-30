//models.js
var schemas = require('../schemas/schema');
var mongoose = require('mongoose');

//登陆注册信息
var personModel = mongoose.model('personinfo', schemas.personSchema);

//用户个人信息
var userModel = mongoose.model('userinfo', schemas.userSchema);

//文章列表
var indexArcModel = mongoose.model('indexarc', schemas.indexArcSchema);

//评论列表
var commentModel = mongoose.model('comment', schemas.commentSchema);

//点赞列表
var voteModel = mongoose.model('vote', schemas.voteSchema);

//导出模块
exports.personModel = personModel;
exports.userModel = userModel;
exports.indexArcModel = indexArcModel;
exports.commentModel = commentModel;
exports.voteModel = voteModel;
