var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var indexArcSchema = new Schema({
	article_id: String,
	timestamp: Date,
	title: String,
	remark: String,
	read_count: Number, 
	detail: String,
	comment_list: Array,
	upvote_count: Number,
	archive_type:String,
}, {
	collection: 'indexarc',
	versionKey: false
});
exports.indexArcSchema = indexArcSchema;