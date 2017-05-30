/*
 工具类
 */
define('Utils', function () {

	var hostName = "http://waimai.baidu.com";

	var Utils = {
		
		getQueryString: function (name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);
			return null;
		},
		getAjaxData: function (url, params, success, failed) {
			Utils.ajax.get(url, params, success, failed);
		},

		postAjaxData: function (url, params, postdata, success, failed) {
			Utils.ajax.post(url, params, postdata, success, failed);
		},

		jsonp: function (url, params, success, failed) {
			var head = document.getElementsByTagName('head')[0];
			var script = document.createElement('script');
			var rn = 'func_' + Utils.md5();
			var urlParam = Utils.param(params);
			if (url.indexOf('?') != 1) {
				url += '&' + urlParam + '&callback=' + rn;
			} else {
				url += '?' + urlParam + '&callback=' + rn;
			}
			window[rn] = function (result) {
				success && success(result);
				//head.removeChild(script);
				//delete window[rn];
			};
			script.src = url;
			script.onerror = function () {
				failed && failed();
			};
			head.appendChild(script);
		},

		// 获取url中所有的参数
		getParams: function (url) {
			var vars = {},
				hash, hashes, i;

			url = url || window.location.href;

			// 没有参数的情况
			if (url.indexOf('?') == -1) {
				return vars;
			}

			hashes = url.slice(url.indexOf('?') + 1).split('&');

			for (i = 0; i < hashes.length; i++) {
				if (!hashes[i] || hashes[i].indexOf('=') == -1) {
					continue;
				}
				hash = hashes[i].split('=');
				if (hash[1]) {
					vars[hash[0]] = (hash[1].indexOf("#") != -1) ? hash[1].slice(0, hash[1].indexOf("#")) : hash[1];
				}
			}
			return vars;
		},
		deleteParam: function (name, url) {
			name = typeof name === 'string' ? [name] : name;
			var newUrl = '';
			name.forEach(function (param) {
				var regEx = new RegExp('(\\?|&)' + param + '=[^&#]+(&|#)*');
				newUrl = url.replace(regEx, function (m, p0, p1) {
					if (m) {
						var header = p0;
						var footer = p1;
						if (header == '?' && footer == '&') return '?';
						else return footer || '';
					}
				});
				url = newUrl;
			});
			return newUrl;
		},
		// 获取指定name的参数
		getParam: function (name, url) {
			return this.getParams(url)[name];
		},

		getCurrentParam: function (name) {
			this.getParam(name, location.href);
		},

		//获取用户登录信息
	    getLoginInfo:function() {
	        let storage = window.localStorage || {};
	        if (storage && storage.login) {
	            let loginData = JSON.parse(storage.login);
	            return loginData;
	        }
	    },

	    //时间毫秒数格式化
	    getFormatTime: function(timestamp) {
	    	let time;
	    	/*if (timestamp.length < 13) {
	    		time = new Date(parseInt(timestamp * 1000));
	    	} */
	    	time = new Date(parseInt(timestamp));
	    	return (time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + " " 
	    	+ time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() );
	    },

		addStat: function ({src, act}) {
			NABridge.openInUrl('addStat', {
				daSrc: src,
				daAct: act
			});
		},

		md5: function (n) {
			var nc = n || 3,
				i = 0,
				v = '';
			for (; i < nc; i++) {
				v += Math.floor(Math.random() * 65535).toString(32) + this.uuid();
			}
			return v;
		},

		ajax: (function () {
			function send(url, method, params, postData, success, failed, responseType) {
				var xhr = null;
				if (window.XMLHttpRequest) {
					xhr = new XMLHttpRequest();
				} else if (window.ActiveXObject) {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}
				if (xhr != null) {
					var fullUrl = url,
						urlParam = Utils.param(params);
					if (urlParam) {
						fullUrl = url + '?' + urlParam;
					}
					xhr.onreadystatechange = function () {
						if (xhr.readyState == 4) {
							if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
								let data = xhr.responseText;

								if (responseType == 'json') {
									var json = {};

									try {
										json = JSON.parse(data);
									} catch (e) {
										console.error('JSON decode error', url)
									}
									success && success(json);
								} else {
									success && success(data);
								}
							} else {
								let data = xhr.responseText;
								failed && failed(data);
							}
						}
					};
					xhr.open(method, fullUrl, true);
					xhr.setRequestHeader("Accept", "*/*");
					xhr.setRequestHeader("X-Requested-With", 'XMLHttpRequest');
					var body;
					if (postData) {
						var bodies = [];
						for (var name in postData) {
							bodies.push(name + '=' + encodeURIComponent(postData[name]));
						}
						body = bodies.join('&');
						if (body.length) {
							xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
						}
					}
					xhr.send(body);
				}
			}

			return {
				get: function (url, params, success, failed) {
					send(url, 'GET', params, null, success, failed, 'json');
				},
				post: function (url, params, postData, success, failed) {
					 send(url, 'POST', params, postData, success, failed, 'json');
				}
			};
		})(),

		param: function (obj) {
			var temp = [];
			for (var key in obj) {
				temp.push(key + '=' + encodeURIComponent(obj[key]));
			}
			return temp.join('&');
		},
		checkWebP: function () {
			try {
				window.pzSupportWebp = (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0);
			} catch (err) {
				window.pzSupportWebp = false;
			}
		},
		checkNewImg: function (src, imgsize) {
			if (src) {
				var imgParams = "@w_750,q_80";
				imgParams = (imgsize == 960) ? "@w_960" : imgParams;
				if (src.indexOf("https://img.waimai.baidu.com") != -1) {
					var newImg = src + imgParams;
					return newImg;
				} else {
					src = encodeURIComponent(src);
					var originImg = "http://webmap1.map.bdimg.com/maps/services/thumbnails?width=750&height=528&align=center,center&quality=80&src=" + src;
					return originImg;
				}
			} else {
				return "";
			}

		},
        
		checkActiveElement: function () {
			if (document.activeElement.nodeName == 'INPUT') {
				document.activeElement.blur();
				return;
			}
			if (!arguments[0].target) {
				arguments[0] && arguments[0](arguments[1]);
			}
		},
		getHref: function (node) {
			var href = node.getAttribute('data-href');
			if (href) {
				return href;
			} else {
				if (node.tagName.toLowerCase() == 'body') {
					return '';
				} else {
					node = node.parentNode;
					return this.getHref(node);
				}
			}
		},

		isWeixin: function () {
			return (/MicroMessenger/i).test(window.navigator.userAgent);
		},

		isIOS: function () {
			var ua = navigator.userAgent.toLowerCase();
			return ua.indexOf('iphone') != -1 || ua.indexOf('ipad') != -1 || ua.indexOf('ipod') != -1;
		},

		extend: function () {
			var arr = arguments,
				result = {},
				i;
			if (!arr.length) return {};
			for (i = arr.length - 1; i >= 0; i--) {
				if (_isObject(arr[i])) {
					_extend(arr[i], result);
				}
			}
			arr[0] = result;
			return result;
			function _isObject(o) {
				return Object.prototype.toString.call(o) === '[object Object]'
			}

			function _extend(destination, source) {
				var property;
				for (property in destination) {
					if (destination.hasOwnProperty(property)) {
						// 若destination[property]和sourc[property]都是对象，则递归
						if (_isObject(destination[property]) && _isObject(source[property])) {
							self(destination[property], source[property]);
						};
						// 若sourc[property]已存在，则跳过
						if (source.hasOwnProperty(property)) {
							continue;
						} else {
							source[property] = destination[property];
						}
					}
				}
			}
		}
	};

	function Deferred() {
		var thenFuncs = null;
		var result = null;
		return {
			then: function (func) {
				thenFuncs = func;
				result && thenFuncs.apply(null, result);
			},
			resolve: function () {
				result = arguments;
				thenFuncs && thenFuncs.apply(null, result);
			}
		}
	}

	Utils.Deferred = Deferred;

	function when() {
		var defer = new Utils.Deferred();
		var args = Array.prototype.slice.call(arguments, 0);
		var results = [], n = 0;
		if (args.length > 0) {
			args.forEach(function (item, i) {
				item.then(function (data) {
					n++;
					results[i] = data;
					if (n == args.length) {
						defer.resolve.apply(null, results);
					}
				});
			});
		}
		return defer;
	}

	Utils.when = when;

	return Utils;
});
