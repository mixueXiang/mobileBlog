//Model
var schemas = require('../schemas/userSchema');
var mongoose = require('mongoose');

var userModel = mongoose.model('userinfo', schemas.userSchema);
var user = new userModel({ 
	manager_id: 2222,
	login_name: 'mixue Xiang',
	password: '88888888',
	user_name: 'xmx',
    avatar_url: "https://avatars1.githubusercontent.com/u/12773242?v=3",
	text_logo: 'The blog of xmx',
	blog_motto: '今天能做的事，不要拖到明天去做',
	bottom_text: "Hello ,I'm xmx.This is my blog on github." ,
	location: 'ChongQing China',
	email: 'xiangmixue95@126.com',
	github_link: '',
}); 
user.save(function(err, doc){
  if(err)console.log(err);
  else console.log(doc.user_name + ' saved');
}); 

exports.userModel = userModel;
