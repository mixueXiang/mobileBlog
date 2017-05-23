var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define User schema 
var userSchema = new Schema({ 
    user_id : String, 
    login_name : String, 
    password: String,
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

// export them 
exports.userSchema = userSchema;