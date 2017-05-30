var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var indexArcSchema = new Schema({
	article_id: String,
	timestamp: Date,
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
exports.indexArcSchema = indexArcSchema;