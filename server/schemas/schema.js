//schemas.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var now = Date.now();

// 登陆注册表
var personSchema = new Schema({ 
    user_name : String, 
    password: String,
    type: String
}, {
	collection: 'personinfo',
    versionKey: false
});

// 用户个人信息表
var userSchema = new Schema({ 
    user_id : String, 
    user_name : String, 
    avatar_url : String,
    text_logo: String,
    blog_motto: String,
    bottom_text: String,
    location: String,
    email: String
}, {
	collection: 'userinfo',
    versionKey: false
});

//文章信息列表表
var indexArcSchema = new Schema({
	article_id: String,
	timestamp:{
		type: String,
		default: Date.now()
	},
	title: String,
	remark: String,
	read_count: {
		type: Number,
		default: 0
	}, 
	detail: String,
	comment_list: Array,
	upvote_count: {
		type: Number,
		default: 0
	},
	archive_type:String,
}, {
	collection: 'indexarc',
	versionKey: false
});

//评论列表表
var commentSchema = new Schema({
	arc_id: {
		type: ObjectId,
		ref: 'indexarc'
	},
	comment: String,
	commentor: String,
	avator: {
		type: String,
		default: "https://avatars1.githubusercontent.com/u/12773242?v=3"
	},
	timestamp: {
		type: String,
		default: Date.now()
	}
}, {
	collection: 'comment',
	versionKey: false
});

//点赞列表表
var voteSchema = new Schema({
	arc_id: {
		type: ObjectId,
		ref: 'indexarc'
	},
	upvotor: String,
	timestamp: {
		type: String,
		default: Date.now()
	}
}, {
	collection: 'vote',
	versionKey: false
});

// export them 
exports.personSchema = personSchema;
exports.userSchema = userSchema;
exports.indexArcSchema = indexArcSchema;
exports.commentSchema = commentSchema;
exports.voteSchema = voteSchema;