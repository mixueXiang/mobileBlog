//HomeStore.js 获取数据的来源

define('HomeStore', function() {

	var StoreBase = require('../utils/StoreBase.js');
    var Utils = require('../utils/Utils.js');

    var hostName = 'http://lx.mobileblog.xmixue.com:8008';
    var USER_INFO = hostName + '/users';
    var INDEX_ARC_LIST = hostName + '/indexarc';
    var ARC_DETAIL = hostName + '/detail';
    var ADD_READING = hostName + '/addread';
    var ADD_ARTICLE = hostName + '/addarticle';
    var EDIT_ARTICLE = hostName + '/editarticle';
    var DEL_ARTICLE = hostName + '/delarticle';

    var HomeStore = StoreBase.createClass({
    	actions: {
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