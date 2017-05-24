var schemas = require('../schemas/indexArcSchema');
var mongoose = require('mongoose');

var indexArcModel = mongoose.model('indexarc', schemas.indexArcSchema);
var indexArc = new indexArcModel({ 
	article_id: '1',
	timestamp: new Date(),
	title: '使用xx.net科学上网',
	remark: '昨天开始我用chrome浏览器访问百度的时候，估计是浏览器抽风，提示错误隐私错误设置，具体如下图',
	read_count: 16,
	detail: '具体的原因没有仔细去分析，使用其他浏览器可以访问没问题，和这个情况相同的还有很喜欢的v2ex。我自己猜测问题多数应该是谷歌浏览器的问题，所以如果重装浏览器应该可以解决，在v2上也有人这样回答。或者应该就是证书和浏览器之间的问题。具体的没有仔细去探究',
	comment_list: [
		{	
			commentator: 'huang',
			comment: '太棒啦',
			timestamp: Date.now()
		}
	],
	upvote_count: 10,
	archive_type: '技术',
});
indexArc.save(function(err, doc){
  if(err)console.log(err);
  else console.log(doc.title + ' saved');
}); 

exports.indexArcModel = indexArcModel;