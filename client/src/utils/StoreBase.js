/*
 * Native调用封装
 */
define('StoreBase', function(){
    var listeners = {};
    var cache = {};

    exports.createClass = function(opts){
        var id = 'Store_' + md5();
        listeners[id] = {};
        cache[id] = {};

        var interfaces = {
            listen: function(services, context){
                services.forEach(function(service){
                    var callback = 'afterGet'+ service.replace(/^\w/, function(s0){
                        return s0.toUpperCase();
                    });
                    if(context[callback]){
                      listeners[id][service] = context[callback];
                    }
                });
            },
            dispose: function(){
                listeners[id] = {};
                cache[id] = {};
            },
            cleanCache: function(){
                cache[id] = {};
            }
        };
        var context = {
            filters: function(data){
                var filt = cloneObject(opts.filters || {});
                return Filter(filt, data)
            },
            getCache: function(key){
                return cache[id][key];
            },
            done: done,
            error: error
        };
        if(opts && opts.actions){
            for(var key in opts.actions){
                if(opts.actions.hasOwnProperty(key)){
                    interfaces[key] = bindContext(key);
                }
            }
        }

        function bindContext(key){
            return function(){
                opts.actions[key].apply(context, arguments);
            };
        }
        function done(key, data, cacheFlag){
            if(cacheFlag){
                cache[id][key] = data;
            }
            if(listeners[id][key]){
                listeners[id][key](data);
            }
        }

        function error(key, data){
            return;
            if(listeners[id][key]){
                listeners[id][key](data);
            }
        }

        function Filter(filters, data){
            var result = data;
            for(var key in filters){
                if(filters.hasOwnProperty(key)){
                    var func = filters[key];
                    var newKey = 'origin_' + key;
                    filters[newKey] = func;
                    filters[key] = bindContext(newKey);
                }
            }

            function bindContext(nkey){
                return function(){
                    var ret = filters[nkey].apply(context, [result]);
                    result = ret;
                    return filters;
                };
            }
            filters.done = function(){
                return result;
            }
            return filters;
        }
        return interfaces;
    };

    function cloneObject(obj){
        var ret = {};
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                var func = obj[key];
                if(typeof(func) == 'function'){
                    ret[key] = func;
                }
            }
        }
        return ret;
    }

    function md5() {
        return Math.round(Math.random() * 65535).toString(32) + Math.floor(Date.now() * Math.random()).toString(32);
    }
});
