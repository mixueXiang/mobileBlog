var schemas = require('../schemas/indexArcSchema');
var mongoose = require('mongoose');

var indexArcModel = mongoose.model('indexarc', schemas.indexArcSchema);
var indexArc = new indexArcModel({ 
	article_id: '1',
	timestamp: new Date(),
	title: 'aaa谈谈jQuery和js里有关元素位置和宽高的方法',
	remark: 'aaaa总结一下jQuery、原生js设置和获取位置、宽高的方法。又修改了一些内容，为什么记忆力下滑-_-…',
	read_count: 16,
	detail: 'detail最本数据，而web存储可存储大量数据detail最本数据，而web存储可存储大量数据detail最本数据，而web存储可存储大量数据',
	comment_list: [
		{	
			commentator: 'huang',
			comment: '太棒啦',
			timestamp: Date.now()
		}
	],
	upvote_count: 10,
	archive_type: ['前端','技术 '],
});
indexArc.save(function(err, doc){
  if(err)console.log(err);
  else console.log(doc.title + ' saved');
}); 

exports.indexArcModel = indexArcModel;