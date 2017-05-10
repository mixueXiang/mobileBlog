//HomeStore.js 获取数据的来源

define('HomeStore', function() {

	var StoreBase = require('../utils/StoreBase.js');
    var Utils = require('../utils/Utils.js');

    var hostName = 'http://lx.mobileblog.xmixue.com:8008';
    var USER_INFO = hostName + '/users';
    var INDEX_ARC_LIST = hostName + '/indexarc';
    var ARC_DETAIL = hostName + '/detail';
    var ADD_READING = hostName + '/addread';

    var HomeStore = StoreBase.createClass({
    	actions: {
    		getUserInfoData: function() {
    			var me = this;
    			Utils.getAjaxData(USER_INFO, {}, function (data) {
    			    var data = data[0];
    			    me.done('userInfo', data, true);
    			}, function (data) {
    			    me.error('userInfo',data);
    			});
    		},
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
            getArcDetail: function(params) {
                var me = this;
                Utils.getAjaxData(ARC_DETAIL, params, function (data) {
                    var data = data;
                    me.done('arcDetail', data, true);
                }, function (data) {
                    me.error('arcDetail',data);
                });
            },
            setAddReading: function(params) {
                var me = this;
                Utils.postAjaxData(ADD_READING, params, {}, function (data) {
                    var data = data;
                    me.done('addReading', data, true);
                }, function (data) {
                    me.error('addReading',data);
                });
            },
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