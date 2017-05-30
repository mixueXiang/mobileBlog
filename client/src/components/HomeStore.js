//HomeStore.js 获取数据的来源

define('HomeStore', function() {

	var StoreBase = require('../utils/StoreBase.js');
    var Utils = require('../utils/Utils.js');

    var hostName = 'http://lx.mobileblog.xmixue.com:8008';
    var LOGIN_PATH = hostName + '/login';
    var REGISTER_PATH = hostName + '/register';
    var USER_INFO = hostName + '/users';
    var INDEX_ARC_LIST = hostName + '/indexarc';
    var ARC_BYTAG_LIST = hostName + '/tagarc';
    var ARC_DETAIL = hostName + '/detail';
    var ADD_READING = hostName + '/addread';
    var ADD_ARTICLE = hostName + '/addarticle';
    var EDIT_ARTICLE = hostName + '/editarticle';
    var DEL_ARTICLE = hostName + '/delarticle';
    var GET_COMMENT = hostName + '/getcomment';
    var POST_COMMENT = hostName + '/postcomment';
    var DO_UPVOTE = hostName + '/doupvote';

    var HomeStore = StoreBase.createClass({
    	actions: {
            //登陆
            doLogin : function(params) {
                var me = this;
                Utils.getAjaxData(LOGIN_PATH, params, function (data) {
                    var data = data;
                    me.done('doLogin', data, true);
                }, function (data) {
                    me.error('doLogin',data);
                });
            },

            //注册
            doRegister: function(params) {
                var me = this;
                Utils.getAjaxData(REGISTER_PATH, params, function (data) {
                    var data = data;
                    me.done('doRegister', data, true);
                }, function (data) {
                    me.error('doRegister',data);
                });
            },

            //获取用户信息
    		getUserInfoData: function() {
    			var me = this;
    			Utils.getAjaxData(USER_INFO, {}, function (data) {
    			    var data = data[0];
    			    me.done('userInfo', data, true);
    			}, function (data) {
    			    me.error('userInfo',data);
    			});
    		},
            //获取文章列表
    		getIndexArcData: function() {
    			var me = this;
    			Utils.getAjaxData(INDEX_ARC_LIST, {}, function (data) {
    			    var data = data;
    			    me.done('indexArc', data, true);
    			}, function (data) {
    			    me.error('indexArc',data);
    			    console.log('errordata',data);
    			});
    		},
            getArcByTag: function(params) {
                var me = this;
                Utils.getAjaxData(ARC_BYTAG_LIST,params, function (data) {
                    var data = data;
                    me.done('tagArc', data, true);
                }, function (data) {
                    me.error('tagArc',data);
                    console.log('errordata',data);
                });
            },
            //获取评论列表
            getCommentData: function(params) {
                var me = this;
                Utils.getAjaxData(GET_COMMENT,params, function (data) {
                    var data = data;
                    me.done('commentList', data, true);
                }, function (data) {
                    me.error('commentList',data);
                    console.log('errordata',data);
                });
            },
            //获取文章详情
            getArcDetail: function(params) {
                var me = this;
                Utils.getAjaxData(ARC_DETAIL, params, function (data) {
                    var data = data;
                    me.done('arcDetail', data, true);
                }, function (data) {
                    me.error('arcDetail',data);
                });
            },
            //增加浏览量
            setAddReading: function(params) {
                var me = this;
                Utils.postAjaxData(ADD_READING, params, {}, function (data) {
                    var data = data;
                    me.done('addReading', data, true);
                }, function (data) {
                    me.error('addReading',data);
                });
            },

            //新增文章
            addArticle: function(params) {
                var me = this;
                Utils.getAjaxData(ADD_ARTICLE, params, function (data) {
                    var data = data;
                    me.done('addArticle', data, true);
                }, function (data) {
                    me.error('addArticle',data);
                });
            },

            //编辑文章
            editArticle: function(params) {
                var me = this;
                Utils.getAjaxData(EDIT_ARTICLE, params, function (data) {
                    var data = data;
                    me.done('editArticle', data, true);
                }, function (data) {
                    me.error('editArticle',data);
                });
            },

            //删除文章   
           delArticle: function(params) {
                var me = this;
                Utils.getAjaxData(DEL_ARTICLE, params, function (data) {
                    var data = data;
                    me.done('delArticle', data, true);
                }, function (data) {
                    me.error('delArticle',data);
                });
            },

            //发表评论
            postComment: function(params) {
                var me = this;
                Utils.getAjaxData(POST_COMMENT, params, function (data) {
                    var data = data;
                    me.done('postComment', data, true);
                }, function (data) {
                    me.error('postComment',data);
                });
            },

            //点赞和取消点赞
            doUpVote: function(params) {
                var me = this;
                Utils.getAjaxData(DO_UPVOTE, params, function (data) {
                    var data = data;
                    me.done('upvote', data, true);
                }, function (data) {
                    me.error('upvote',data);
                });
            }
    	},
    	filters: {
    		pushToArr: function(data) {
  				
    		},
    		valid: function(data) {

    		}
    	},

    });
	return HomeStore;
});