(function() {
    var root = this;
    var previousUnderscore = root._;
    var breaker = {};
    var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
    var push = ArrayProto.push, slice = ArrayProto.slice, concat = ArrayProto.concat, toString = ObjProto.toString, hasOwnProperty = ObjProto.hasOwnProperty;
    var nativeForEach = ArrayProto.forEach, nativeMap = ArrayProto.map, nativeReduce = ArrayProto.reduce, nativeReduceRight = ArrayProto.reduceRight, nativeFilter = ArrayProto.filter, nativeEvery = ArrayProto.every, nativeSome = ArrayProto.some, nativeIndexOf = ArrayProto.indexOf, nativeLastIndexOf = ArrayProto.lastIndexOf, nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = FuncProto.bind;
    var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };
    if ("undefined" != typeof exports) {
        "undefined" != typeof module && module.exports && (exports = module.exports = _);
        exports._ = _;
    } else root._ = _;
    _.VERSION = "1.4.4";
    var each = _.each = _.forEach = function(obj, iterator, context) {
        if (null == obj) return;
        if (nativeForEach && obj.forEach === nativeForEach) obj.forEach(iterator, context); else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; l > i; i++) if (iterator.call(context, obj[i], i, obj) === breaker) return;
        } else for (var key in obj) if (_.has(obj, key) && iterator.call(context, obj[key], key, obj) === breaker) return;
    };
    _.map = _.collect = function(obj, iterator, context) {
        var results = [];
        if (null == obj) return results;
        if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
        each(obj, function(value, index, list) {
            results[results.length] = iterator.call(context, value, index, list);
        });
        return results;
    };
    var reduceError = "Reduce of empty array with no initial value";
    _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        null == obj && (obj = []);
        if (nativeReduce && obj.reduce === nativeReduce) {
            context && (iterator = _.bind(iterator, context));
            return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
        }
        each(obj, function(value, index, list) {
            if (initial) memo = iterator.call(context, memo, value, index, list); else {
                memo = value;
                initial = true;
            }
        });
        if (!initial) throw new TypeError(reduceError);
        return memo;
    };
    _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        null == obj && (obj = []);
        if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
            context && (iterator = _.bind(iterator, context));
            return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
        }
        var length = obj.length;
        if (length !== +length) {
            var keys = _.keys(obj);
            length = keys.length;
        }
        each(obj, function(value, index, list) {
            index = keys ? keys[--length] : --length;
            if (initial) memo = iterator.call(context, memo, obj[index], index, list); else {
                memo = obj[index];
                initial = true;
            }
        });
        if (!initial) throw new TypeError(reduceError);
        return memo;
    };
    _.find = _.detect = function(obj, iterator, context) {
        var result;
        any(obj, function(value, index, list) {
            if (iterator.call(context, value, index, list)) {
                result = value;
                return true;
            }
        });
        return result;
    };
    _.filter = _.select = function(obj, iterator, context) {
        var results = [];
        if (null == obj) return results;
        if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
        each(obj, function(value, index, list) {
            iterator.call(context, value, index, list) && (results[results.length] = value);
        });
        return results;
    };
    _.reject = function(obj, iterator, context) {
        return _.filter(obj, function(value, index, list) {
            return !iterator.call(context, value, index, list);
        }, context);
    };
    _.every = _.all = function(obj, iterator, context) {
        iterator || (iterator = _.identity);
        var result = true;
        if (null == obj) return result;
        if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
        each(obj, function(value, index, list) {
            if (!(result = result && iterator.call(context, value, index, list))) return breaker;
        });
        return !!result;
    };
    var any = _.some = _.any = function(obj, iterator, context) {
        iterator || (iterator = _.identity);
        var result = false;
        if (null == obj) return result;
        if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
        each(obj, function(value, index, list) {
            if (result || (result = iterator.call(context, value, index, list))) return breaker;
        });
        return !!result;
    };
    _.contains = _.include = function(obj, target) {
        if (null == obj) return false;
        if (nativeIndexOf && obj.indexOf === nativeIndexOf) return -1 != obj.indexOf(target);
        return any(obj, function(value) {
            return value === target;
        });
    };
    _.invoke = function(obj, method) {
        var args = slice.call(arguments, 2);
        var isFunc = _.isFunction(method);
        return _.map(obj, function(value) {
            return (isFunc ? method : value[method]).apply(value, args);
        });
    };
    _.pluck = function(obj, key) {
        return _.map(obj, function(value) {
            return value[key];
        });
    };
    _.where = function(obj, attrs, first) {
        if (_.isEmpty(attrs)) return first ? null : [];
        return _[first ? "find" : "filter"](obj, function(value) {
            for (var key in attrs) if (attrs[key] !== value[key]) return false;
            return true;
        });
    };
    _.findWhere = function(obj, attrs) {
        return _.where(obj, attrs, true);
    };
    _.max = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && 65535 > obj.length) return Math.max.apply(Math, obj);
        if (!iterator && _.isEmpty(obj)) return -1 / 0;
        var result = {
            computed: -1 / 0,
            value: -1 / 0
        };
        each(obj, function(value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            computed >= result.computed && (result = {
                value: value,
                computed: computed
            });
        });
        return result.value;
    };
    _.min = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && 65535 > obj.length) return Math.min.apply(Math, obj);
        if (!iterator && _.isEmpty(obj)) return 1 / 0;
        var result = {
            computed: 1 / 0,
            value: 1 / 0
        };
        each(obj, function(value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            result.computed > computed && (result = {
                value: value,
                computed: computed
            });
        });
        return result.value;
    };
    _.shuffle = function(obj) {
        var rand;
        var index = 0;
        var shuffled = [];
        each(obj, function(value) {
            rand = _.random(index++);
            shuffled[index - 1] = shuffled[rand];
            shuffled[rand] = value;
        });
        return shuffled;
    };
    var lookupIterator = function(value) {
        return _.isFunction(value) ? value : function(obj) {
            return obj[value];
        };
    };
    _.sortBy = function(obj, value, context) {
        var iterator = lookupIterator(value);
        return _.pluck(_.map(obj, function(value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iterator.call(context, value, index, list)
            };
        }).sort(function(left, right) {
            var a = left.criteria;
            var b = right.criteria;
            if (a !== b) {
                if (a > b || void 0 === a) return 1;
                if (b > a || void 0 === b) return -1;
            }
            return left.index < right.index ? -1 : 1;
        }), "value");
    };
    var group = function(obj, value, context, behavior) {
        var result = {};
        var iterator = lookupIterator(value || _.identity);
        each(obj, function(value, index) {
            var key = iterator.call(context, value, index, obj);
            behavior(result, key, value);
        });
        return result;
    };
    _.groupBy = function(obj, value, context) {
        return group(obj, value, context, function(result, key, value) {
            (_.has(result, key) ? result[key] : result[key] = []).push(value);
        });
    };
    _.countBy = function(obj, value, context) {
        return group(obj, value, context, function(result, key) {
            _.has(result, key) || (result[key] = 0);
            result[key]++;
        });
    };
    _.sortedIndex = function(array, obj, iterator, context) {
        iterator = null == iterator ? _.identity : lookupIterator(iterator);
        var value = iterator.call(context, obj);
        var low = 0, high = array.length;
        while (high > low) {
            var mid = low + high >>> 1;
            value > iterator.call(context, array[mid]) ? low = mid + 1 : high = mid;
        }
        return low;
    };
    _.toArray = function(obj) {
        if (!obj) return [];
        if (_.isArray(obj)) return slice.call(obj);
        if (obj.length === +obj.length) return _.map(obj, _.identity);
        return _.values(obj);
    };
    _.size = function(obj) {
        if (null == obj) return 0;
        return obj.length === +obj.length ? obj.length : _.keys(obj).length;
    };
    _.first = _.head = _.take = function(array, n, guard) {
        if (null == array) return void 0;
        return null == n || guard ? array[0] : slice.call(array, 0, n);
    };
    _.initial = function(array, n, guard) {
        return slice.call(array, 0, array.length - (null == n || guard ? 1 : n));
    };
    _.last = function(array, n, guard) {
        if (null == array) return void 0;
        return null == n || guard ? array[array.length - 1] : slice.call(array, Math.max(array.length - n, 0));
    };
    _.rest = _.tail = _.drop = function(array, n, guard) {
        return slice.call(array, null == n || guard ? 1 : n);
    };
    _.compact = function(array) {
        return _.filter(array, _.identity);
    };
    var flatten = function(input, shallow, output) {
        each(input, function(value) {
            _.isArray(value) ? shallow ? push.apply(output, value) : flatten(value, shallow, output) : output.push(value);
        });
        return output;
    };
    _.flatten = function(array, shallow) {
        return flatten(array, shallow, []);
    };
    _.without = function(array) {
        return _.difference(array, slice.call(arguments, 1));
    };
    _.uniq = _.unique = function(array, isSorted, iterator, context) {
        if (_.isFunction(isSorted)) {
            context = iterator;
            iterator = isSorted;
            isSorted = false;
        }
        var initial = iterator ? _.map(array, iterator, context) : array;
        var results = [];
        var seen = [];
        each(initial, function(value, index) {
            if (isSorted ? !index || seen[seen.length - 1] !== value : !_.contains(seen, value)) {
                seen.push(value);
                results.push(array[index]);
            }
        });
        return results;
    };
    _.union = function() {
        return _.uniq(concat.apply(ArrayProto, arguments));
    };
    _.intersection = function(array) {
        var rest = slice.call(arguments, 1);
        return _.filter(_.uniq(array), function(item) {
            return _.every(rest, function(other) {
                return _.indexOf(other, item) >= 0;
            });
        });
    };
    _.difference = function(array) {
        var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
        return _.filter(array, function(value) {
            return !_.contains(rest, value);
        });
    };
    _.zip = function() {
        var args = slice.call(arguments);
        var length = _.max(_.pluck(args, "length"));
        var results = new Array(length);
        for (var i = 0; length > i; i++) results[i] = _.pluck(args, "" + i);
        return results;
    };
    _.object = function(list, values) {
        if (null == list) return {};
        var result = {};
        for (var i = 0, l = list.length; l > i; i++) values ? result[list[i]] = values[i] : result[list[i][0]] = list[i][1];
        return result;
    };
    _.indexOf = function(array, item, isSorted) {
        if (null == array) return -1;
        var i = 0, l = array.length;
        if (isSorted) {
            if ("number" != typeof isSorted) {
                i = _.sortedIndex(array, item);
                return array[i] === item ? i : -1;
            }
            i = 0 > isSorted ? Math.max(0, l + isSorted) : isSorted;
        }
        if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
        for (;l > i; i++) if (array[i] === item) return i;
        return -1;
    };
    _.lastIndexOf = function(array, item, from) {
        if (null == array) return -1;
        var hasIndex = null != from;
        if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
        var i = hasIndex ? from : array.length;
        while (i--) if (array[i] === item) return i;
        return -1;
    };
    _.range = function(start, stop, step) {
        if (1 >= arguments.length) {
            stop = start || 0;
            start = 0;
        }
        step = arguments[2] || 1;
        var len = Math.max(Math.ceil((stop - start) / step), 0);
        var idx = 0;
        var range = new Array(len);
        while (len > idx) {
            range[idx++] = start;
            start += step;
        }
        return range;
    };
    _.bind = function(func, context) {
        if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
        var args = slice.call(arguments, 2);
        return function() {
            return func.apply(context, args.concat(slice.call(arguments)));
        };
    };
    _.partial = function(func) {
        var args = slice.call(arguments, 1);
        return function() {
            return func.apply(this, args.concat(slice.call(arguments)));
        };
    };
    _.bindAll = function(obj) {
        var funcs = slice.call(arguments, 1);
        0 === funcs.length && (funcs = _.functions(obj));
        each(funcs, function(f) {
            obj[f] = _.bind(obj[f], obj);
        });
        return obj;
    };
    _.memoize = function(func, hasher) {
        var memo = {};
        hasher || (hasher = _.identity);
        return function() {
            var key = hasher.apply(this, arguments);
            return _.has(memo, key) ? memo[key] : memo[key] = func.apply(this, arguments);
        };
    };
    _.delay = function(func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function() {
            return func.apply(null, args);
        }, wait);
    };
    _.defer = function(func) {
        return _.delay.apply(_, [ func, 1 ].concat(slice.call(arguments, 1)));
    };
    _.throttle = function(func, wait) {
        var context, args, timeout, result;
        var previous = 0;
        var later = function() {
            previous = new Date();
            timeout = null;
            result = func.apply(context, args);
        };
        return function() {
            var now = new Date();
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (0 >= remaining) {
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
            } else timeout || (timeout = setTimeout(later, remaining));
            return result;
        };
    };
    _.debounce = function(func, wait, immediate) {
        var timeout, result;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                immediate || (result = func.apply(context, args));
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            callNow && (result = func.apply(context, args));
            return result;
        };
    };
    _.once = function(func) {
        var memo, ran = false;
        return function() {
            if (ran) return memo;
            ran = true;
            memo = func.apply(this, arguments);
            func = null;
            return memo;
        };
    };
    _.wrap = function(func, wrapper) {
        return function() {
            var args = [ func ];
            push.apply(args, arguments);
            return wrapper.apply(this, args);
        };
    };
    _.compose = function() {
        var funcs = arguments;
        return function() {
            var args = arguments;
            for (var i = funcs.length - 1; i >= 0; i--) args = [ funcs[i].apply(this, args) ];
            return args[0];
        };
    };
    _.after = function(times, func) {
        if (0 >= times) return func();
        return function() {
            if (1 > --times) return func.apply(this, arguments);
        };
    };
    _.keys = nativeKeys || function(obj) {
        if (obj !== Object(obj)) throw new TypeError("Invalid object");
        var keys = [];
        for (var key in obj) _.has(obj, key) && (keys[keys.length] = key);
        return keys;
    };
    _.values = function(obj) {
        var values = [];
        for (var key in obj) _.has(obj, key) && values.push(obj[key]);
        return values;
    };
    _.pairs = function(obj) {
        var pairs = [];
        for (var key in obj) _.has(obj, key) && pairs.push([ key, obj[key] ]);
        return pairs;
    };
    _.invert = function(obj) {
        var result = {};
        for (var key in obj) _.has(obj, key) && (result[obj[key]] = key);
        return result;
    };
    _.functions = _.methods = function(obj) {
        var names = [];
        for (var key in obj) _.isFunction(obj[key]) && names.push(key);
        return names.sort();
    };
    _.extend = function(obj) {
        each(slice.call(arguments, 1), function(source) {
            if (source) for (var prop in source) obj[prop] = source[prop];
        });
        return obj;
    };
    _.pick = function(obj) {
        var copy = {};
        var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        each(keys, function(key) {
            key in obj && (copy[key] = obj[key]);
        });
        return copy;
    };
    _.omit = function(obj) {
        var copy = {};
        var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        for (var key in obj) _.contains(keys, key) || (copy[key] = obj[key]);
        return copy;
    };
    _.defaults = function(obj) {
        each(slice.call(arguments, 1), function(source) {
            if (source) for (var prop in source) null == obj[prop] && (obj[prop] = source[prop]);
        });
        return obj;
    };
    _.clone = function(obj) {
        if (!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };
    _.tap = function(obj, interceptor) {
        interceptor(obj);
        return obj;
    };
    var eq = function(a, b, aStack, bStack) {
        if (a === b) return 0 !== a || 1 / a == 1 / b;
        if (null == a || null == b) return a === b;
        a instanceof _ && (a = a._wrapped);
        b instanceof _ && (b = b._wrapped);
        var className = toString.call(a);
        if (className != toString.call(b)) return false;
        switch (className) {
          case "[object String]":
            return a == String(b);

          case "[object Number]":
            return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;

          case "[object Date]":
          case "[object Boolean]":
            return +a == +b;

          case "[object RegExp]":
            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
        }
        if ("object" != typeof a || "object" != typeof b) return false;
        var length = aStack.length;
        while (length--) if (aStack[length] == a) return bStack[length] == b;
        aStack.push(a);
        bStack.push(b);
        var size = 0, result = true;
        if ("[object Array]" == className) {
            size = a.length;
            result = size == b.length;
            if (result) while (size--) if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        } else {
            var aCtor = a.constructor, bCtor = b.constructor;
            if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor)) return false;
            for (var key in a) if (_.has(a, key)) {
                size++;
                if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
            }
            if (result) {
                for (key in b) if (_.has(b, key) && !size--) break;
                result = !size;
            }
        }
        aStack.pop();
        bStack.pop();
        return result;
    };
    _.isEqual = function(a, b) {
        return eq(a, b, [], []);
    };
    _.isEmpty = function(obj) {
        if (null == obj) return true;
        if (_.isArray(obj) || _.isString(obj)) return 0 === obj.length;
        for (var key in obj) if (_.has(obj, key)) return false;
        return true;
    };
    _.isElement = function(obj) {
        return !!(obj && 1 === obj.nodeType);
    };
    _.isArray = nativeIsArray || function(obj) {
        return "[object Array]" == toString.call(obj);
    };
    _.isObject = function(obj) {
        return obj === Object(obj);
    };
    each([ "Arguments", "Function", "String", "Number", "Date", "RegExp" ], function(name) {
        _["is" + name] = function(obj) {
            return toString.call(obj) == "[object " + name + "]";
        };
    });
    _.isArguments(arguments) || (_.isArguments = function(obj) {
        return !!(obj && _.has(obj, "callee"));
    });
    _.isFunction = function(obj) {
        return "function" == typeof obj;
    };
    _.isFinite = function(obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj));
    };
    _.isNaN = function(obj) {
        return _.isNumber(obj) && obj != +obj;
    };
    _.isBoolean = function(obj) {
        return true === obj || false === obj || "[object Boolean]" == toString.call(obj);
    };
    _.isNull = function(obj) {
        return null === obj;
    };
    _.isUndefined = function(obj) {
        return void 0 === obj;
    };
    _.has = function(obj, key) {
        return hasOwnProperty.call(obj, key);
    };
    _.noConflict = function() {
        root._ = previousUnderscore;
        return this;
    };
    _.identity = function(value) {
        return value;
    };
    _.times = function(n, iterator, context) {
        var accum = Array(n);
        for (var i = 0; n > i; i++) accum[i] = iterator.call(context, i);
        return accum;
    };
    _.random = function(min, max) {
        if (null == max) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };
    var entityMap = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    entityMap.unescape = _.invert(entityMap.escape);
    var entityRegexes = {
        escape: new RegExp("[" + _.keys(entityMap.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + _.keys(entityMap.unescape).join("|") + ")", "g")
    };
    _.each([ "escape", "unescape" ], function(method) {
        _[method] = function(string) {
            if (null == string) return "";
            return ("" + string).replace(entityRegexes[method], function(match) {
                return entityMap[method][match];
            });
        };
    });
    _.result = function(object, property) {
        if (null == object) return null;
        var value = object[property];
        return _.isFunction(value) ? value.call(object) : value;
    };
    _.mixin = function(obj) {
        each(_.functions(obj), function(name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function() {
                var args = [ this._wrapped ];
                push.apply(args, arguments);
                return result.call(this, func.apply(_, args));
            };
        });
    };
    var idCounter = 0;
    _.uniqueId = function(prefix) {
        var id = ++idCounter + "";
        return prefix ? prefix + id : id;
    };
    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var noMatch = /(.)^/;
    var escapes = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "	": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    };
    var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    _.template = function(text, data, settings) {
        var render;
        settings = _.defaults({}, settings, _.templateSettings);
        var matcher = new RegExp([ (settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source ].join("|") + "|$", "g");
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset).replace(escaper, function(match) {
                return "\\" + escapes[match];
            });
            escape && (source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'");
            interpolate && (source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'");
            evaluate && (source += "';\n" + evaluate + "\n__p+='");
            index = offset + match.length;
            return match;
        });
        source += "';\n";
        settings.variable || (source = "with(obj||{}){\n" + source + "}\n");
        source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
        try {
            render = new Function(settings.variable || "obj", "_", source);
        } catch (e) {
            e.source = source;
            throw e;
        }
        if (data) return render(data, _);
        var template = function(data) {
            return render.call(this, data, _);
        };
        template.source = "function(" + (settings.variable || "obj") + "){\n" + source + "}";
        return template;
    };
    _.chain = function(obj) {
        return _(obj).chain();
    };
    var result = function(obj) {
        return this._chain ? _(obj).chain() : obj;
    };
    _.mixin(_);
    each([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            var obj = this._wrapped;
            method.apply(obj, arguments);
            "shift" != name && "splice" != name || 0 !== obj.length || delete obj[0];
            return result.call(this, obj);
        };
    });
    each([ "concat", "join", "slice" ], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            return result.call(this, method.apply(this._wrapped, arguments));
        };
    });
    _.extend(_.prototype, {
        chain: function() {
            this._chain = true;
            return this;
        },
        value: function() {
            return this._wrapped;
        }
    });
}).call(this);