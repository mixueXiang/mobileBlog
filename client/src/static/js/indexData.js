//DataBase.json 模拟数据库

//首页个人信息数据
export let indexUserData = {
	error_num: 0,
	error_msg: '',
	result: {
		user_id: '1',
		login_name: 'mixue Xiang',
		user_name: 'xmx',
	    avatar_url: "https://avatars1.githubusercontent.com/u/12773242?v=3",
		text_logo: 'The blog of xmx',
		blog_motto: '今天能做的事，不要拖到明天去做',
		bottom_text: "Hello ,I'm xmx.This is my blog on github." ,
		location: 'ChongQing China',
		email: 'xiangmixue95@126.com',
	}
};

//首页及归档页文章数据
export let indexArcData = {
	error_no: 0,
	error_msg: '',
	result: 
	[{
		article_id: '1',
		timestamp: '20160525',
		title: '谈谈jQuery和js里有关元素位置和宽高的方法',
		remark: '总结一下jQuery、原生js设置和获取位置、宽高的方法。又修改了一些内容，为什么记忆力下滑-_-…',
		read_count: 22,
		detail: '最近在学习如何实现客户端存储，这篇文章将主要分析H5的web storage以及它与传统的cookie之间的区别。1、cookie只适合存储少量文本数据，而web存储可存储大量数据',
		comment_list: [
			{
				commentator: 'huang',
				comment: '太棒啦'
			}
		],
		upvote_count: 10,
	},
	{
		article_id: '2',
		timestamp: '20162212',
		title: 'aaa谈谈jQuery和js里有关元素位置和宽高的方法',
		remark: 'aaaa总结一下jQuery、原生js设置和获取位置、宽高的方法。又修改了一些内容，为什么记忆力下滑-_-…',
		read_count: 22,
		detail: 'aaaa最近在学习如何实现客户端存储，这篇文章将主要分析H5的web storage以及它与传统的cookie之间的区别。1、cookie只适合存储少量文本数据，而web存储可存储大量数据',
		comment_list: [
			{
				commentator: 'huang',
				comment: '太棒啦'
			}
		],
		upvote_count: 10,
	},
	{
		article_id: '3',
		timestamp: '20160525',
		title: 'bbbb谈谈jQuery和js里有关元素位置和宽高的方法',
		remark: 'bbbb总结一下jQuery、原生js设置和获取位置、宽高的方法。又修改了一些内容，为什么记忆力下滑-_-…',
		read_count: 22,
		detail: 'bbbb最近在学习如何实现客户端存储，这篇文章将主要分析H5的web storage以及它与传统的cookie之间的区别。1、cookie只适合存储少量文本数据，而web存储可存储大量数据',
		comment_list: [
			{
				commentator: 'huang',
				comment: '太棒啦'
			}
		],
		upvote_count: 10,
	},
	]	
};
