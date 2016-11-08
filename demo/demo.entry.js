/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Vue = __webpack_require__(1)

	var app = new Vue({
	  el: "#app",
	  components: { demo: __webpack_require__(2) },
	  data: function() {
	    return {
	    };
	  }
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * Vue.js v1.0.24
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  (global.Vue = factory());
	}(this, function () { 'use strict';

	  function set(obj, key, val) {
	    if (hasOwn(obj, key)) {
	      obj[key] = val;
	      return;
	    }
	    if (obj._isVue) {
	      set(obj._data, key, val);
	      return;
	    }
	    var ob = obj.__ob__;
	    if (!ob) {
	      obj[key] = val;
	      return;
	    }
	    ob.convert(key, val);
	    ob.dep.notify();
	    if (ob.vms) {
	      var i = ob.vms.length;
	      while (i--) {
	        var vm = ob.vms[i];
	        vm._proxy(key);
	        vm._digest();
	      }
	    }
	    return val;
	  }

	  /**
	   * Delete a property and trigger change if necessary.
	   *
	   * @param {Object} obj
	   * @param {String} key
	   */

	  function del(obj, key) {
	    if (!hasOwn(obj, key)) {
	      return;
	    }
	    delete obj[key];
	    var ob = obj.__ob__;
	    if (!ob) {
	      if (obj._isVue) {
	        delete obj._data[key];
	        obj._digest();
	      }
	      return;
	    }
	    ob.dep.notify();
	    if (ob.vms) {
	      var i = ob.vms.length;
	      while (i--) {
	        var vm = ob.vms[i];
	        vm._unproxy(key);
	        vm._digest();
	      }
	    }
	  }

	  var hasOwnProperty = Object.prototype.hasOwnProperty;
	  /**
	   * Check whether the object has the property.
	   *
	   * @param {Object} obj
	   * @param {String} key
	   * @return {Boolean}
	   */

	  function hasOwn(obj, key) {
	    return hasOwnProperty.call(obj, key);
	  }

	  /**
	   * Check if an expression is a literal value.
	   *
	   * @param {String} exp
	   * @return {Boolean}
	   */

	  var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;

	  function isLiteral(exp) {
	    return literalValueRE.test(exp);
	  }

	  /**
	   * Check if a string starts with $ or _
	   *
	   * @param {String} str
	   * @return {Boolean}
	   */

	  function isReserved(str) {
	    var c = (str + '').charCodeAt(0);
	    return c === 0x24 || c === 0x5F;
	  }

	  /**
	   * Guard text output, make sure undefined outputs
	   * empty string
	   *
	   * @param {*} value
	   * @return {String}
	   */

	  function _toString(value) {
	    return value == null ? '' : value.toString();
	  }

	  /**
	   * Check and convert possible numeric strings to numbers
	   * before setting back to data
	   *
	   * @param {*} value
	   * @return {*|Number}
	   */

	  function toNumber(value) {
	    if (typeof value !== 'string') {
	      return value;
	    } else {
	      var parsed = Number(value);
	      return isNaN(parsed) ? value : parsed;
	    }
	  }

	  /**
	   * Convert string boolean literals into real booleans.
	   *
	   * @param {*} value
	   * @return {*|Boolean}
	   */

	  function toBoolean(value) {
	    return value === 'true' ? true : value === 'false' ? false : value;
	  }

	  /**
	   * Strip quotes from a string
	   *
	   * @param {String} str
	   * @return {String | false}
	   */

	  function stripQuotes(str) {
	    var a = str.charCodeAt(0);
	    var b = str.charCodeAt(str.length - 1);
	    return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	  }

	  /**
	   * Camelize a hyphen-delmited string.
	   *
	   * @param {String} str
	   * @return {String}
	   */

	  var camelizeRE = /-(\w)/g;

	  function camelize(str) {
	    return str.replace(camelizeRE, toUpper);
	  }

	  function toUpper(_, c) {
	    return c ? c.toUpperCase() : '';
	  }

	  /**
	   * Hyphenate a camelCase string.
	   *
	   * @param {String} str
	   * @return {String}
	   */

	  var hyphenateRE = /([a-z\d])([A-Z])/g;

	  function hyphenate(str) {
	    return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	  }

	  /**
	   * Converts hyphen/underscore/slash delimitered names into
	   * camelized classNames.
	   *
	   * e.g. my-component => MyComponent
	   *      some_else    => SomeElse
	   *      some/comp    => SomeComp
	   *
	   * @param {String} str
	   * @return {String}
	   */

	  var classifyRE = /(?:^|[-_\/])(\w)/g;

	  function classify(str) {
	    return str.replace(classifyRE, toUpper);
	  }

	  /**
	   * Simple bind, faster than native
	   *
	   * @param {Function} fn
	   * @param {Object} ctx
	   * @return {Function}
	   */

	  function bind(fn, ctx) {
	    return function (a) {
	      var l = arguments.length;
	      return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	    };
	  }

	  /**
	   * Convert an Array-like object to a real Array.
	   *
	   * @param {Array-like} list
	   * @param {Number} [start] - start index
	   * @return {Array}
	   */

	  function toArray(list, start) {
	    start = start || 0;
	    var i = list.length - start;
	    var ret = new Array(i);
	    while (i--) {
	      ret[i] = list[i + start];
	    }
	    return ret;
	  }

	  /**
	   * Mix properties into target object.
	   *
	   * @param {Object} to
	   * @param {Object} from
	   */

	  function extend(to, from) {
	    var keys = Object.keys(from);
	    var i = keys.length;
	    while (i--) {
	      to[keys[i]] = from[keys[i]];
	    }
	    return to;
	  }

	  /**
	   * Quick object check - this is primarily used to tell
	   * Objects from primitive values when we know the value
	   * is a JSON-compliant type.
	   *
	   * @param {*} obj
	   * @return {Boolean}
	   */

	  function isObject(obj) {
	    return obj !== null && typeof obj === 'object';
	  }

	  /**
	   * Strict object type check. Only returns true
	   * for plain JavaScript objects.
	   *
	   * @param {*} obj
	   * @return {Boolean}
	   */

	  var toString = Object.prototype.toString;
	  var OBJECT_STRING = '[object Object]';

	  function isPlainObject(obj) {
	    return toString.call(obj) === OBJECT_STRING;
	  }

	  /**
	   * Array type check.
	   *
	   * @param {*} obj
	   * @return {Boolean}
	   */

	  var isArray = Array.isArray;

	  /**
	   * Define a property.
	   *
	   * @param {Object} obj
	   * @param {String} key
	   * @param {*} val
	   * @param {Boolean} [enumerable]
	   */

	  function def(obj, key, val, enumerable) {
	    Object.defineProperty(obj, key, {
	      value: val,
	      enumerable: !!enumerable,
	      writable: true,
	      configurable: true
	    });
	  }

	  /**
	   * Debounce a function so it only gets called after the
	   * input stops arriving after the given wait period.
	   *
	   * @param {Function} func
	   * @param {Number} wait
	   * @return {Function} - the debounced function
	   */

	  function _debounce(func, wait) {
	    var timeout, args, context, timestamp, result;
	    var later = function later() {
	      var last = Date.now() - timestamp;
	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      }
	    };
	    return function () {
	      context = this;
	      args = arguments;
	      timestamp = Date.now();
	      if (!timeout) {
	        timeout = setTimeout(later, wait);
	      }
	      return result;
	    };
	  }

	  /**
	   * Manual indexOf because it's slightly faster than
	   * native.
	   *
	   * @param {Array} arr
	   * @param {*} obj
	   */

	  function indexOf(arr, obj) {
	    var i = arr.length;
	    while (i--) {
	      if (arr[i] === obj) return i;
	    }
	    return -1;
	  }

	  /**
	   * Make a cancellable version of an async callback.
	   *
	   * @param {Function} fn
	   * @return {Function}
	   */

	  function cancellable(fn) {
	    var cb = function cb() {
	      if (!cb.cancelled) {
	        return fn.apply(this, arguments);
	      }
	    };
	    cb.cancel = function () {
	      cb.cancelled = true;
	    };
	    return cb;
	  }

	  /**
	   * Check if two values are loosely equal - that is,
	   * if they are plain objects, do they have the same shape?
	   *
	   * @param {*} a
	   * @param {*} b
	   * @return {Boolean}
	   */

	  function looseEqual(a, b) {
	    /* eslint-disable eqeqeq */
	    return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	    /* eslint-enable eqeqeq */
	  }

	  var hasProto = ('__proto__' in {});

	  // Browser environment sniffing
	  var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

	  // detect devtools
	  var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	  // UA sniffing for working around browser-specific quirks
	  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	  var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	  var isAndroid = UA && UA.indexOf('android') > 0;
	  var isIos = UA && /(iphone|ipad|ipod|ios)/i.test(UA);
	  var isWechat = UA && UA.indexOf('micromessenger') > 0;

	  var transitionProp = undefined;
	  var transitionEndEvent = undefined;
	  var animationProp = undefined;
	  var animationEndEvent = undefined;

	  // Transition property/event sniffing
	  if (inBrowser && !isIE9) {
	    var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	    var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	    transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	    transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	    animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	    animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	  }

	  /**
	   * Defer a task to execute it asynchronously. Ideally this
	   * should be executed as a microtask, so we leverage
	   * MutationObserver if it's available, and fallback to
	   * setTimeout(0).
	   *
	   * @param {Function} cb
	   * @param {Object} ctx
	   */

	  var nextTick = (function () {
	    var callbacks = [];
	    var pending = false;
	    var timerFunc;
	    function nextTickHandler() {
	      pending = false;
	      var copies = callbacks.slice(0);
	      callbacks = [];
	      for (var i = 0; i < copies.length; i++) {
	        copies[i]();
	      }
	    }

	    /* istanbul ignore if */
	    if (typeof MutationObserver !== 'undefined' && !(isWechat && isIos)) {
	      var counter = 1;
	      var observer = new MutationObserver(nextTickHandler);
	      var textNode = document.createTextNode(counter);
	      observer.observe(textNode, {
	        characterData: true
	      });
	      timerFunc = function () {
	        counter = (counter + 1) % 2;
	        textNode.data = counter;
	      };
	    } else {
	      // webpack attempts to inject a shim for setImmediate
	      // if it is used as a global, so we have to work around that to
	      // avoid bundling unnecessary code.
	      var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
	      timerFunc = context.setImmediate || setTimeout;
	    }
	    return function (cb, ctx) {
	      var func = ctx ? function () {
	        cb.call(ctx);
	      } : cb;
	      callbacks.push(func);
	      if (pending) return;
	      pending = true;
	      timerFunc(nextTickHandler, 0);
	    };
	  })();

	  var _Set = undefined;
	  /* istanbul ignore if */
	  if (typeof Set !== 'undefined' && Set.toString().match(/native code/)) {
	    // use native Set when available.
	    _Set = Set;
	  } else {
	    // a non-standard Set polyfill that only works with primitive keys.
	    _Set = function () {
	      this.set = Object.create(null);
	    };
	    _Set.prototype.has = function (key) {
	      return this.set[key] !== undefined;
	    };
	    _Set.prototype.add = function (key) {
	      this.set[key] = 1;
	    };
	    _Set.prototype.clear = function () {
	      this.set = Object.create(null);
	    };
	  }

	  function Cache(limit) {
	    this.size = 0;
	    this.limit = limit;
	    this.head = this.tail = undefined;
	    this._keymap = Object.create(null);
	  }

	  var p = Cache.prototype;

	  /**
	   * Put <value> into the cache associated with <key>.
	   * Returns the entry which was removed to make room for
	   * the new entry. Otherwise undefined is returned.
	   * (i.e. if there was enough room already).
	   *
	   * @param {String} key
	   * @param {*} value
	   * @return {Entry|undefined}
	   */

	  p.put = function (key, value) {
	    var removed;
	    if (this.size === this.limit) {
	      removed = this.shift();
	    }

	    var entry = this.get(key, true);
	    if (!entry) {
	      entry = {
	        key: key
	      };
	      this._keymap[key] = entry;
	      if (this.tail) {
	        this.tail.newer = entry;
	        entry.older = this.tail;
	      } else {
	        this.head = entry;
	      }
	      this.tail = entry;
	      this.size++;
	    }
	    entry.value = value;

	    return removed;
	  };

	  /**
	   * Purge the least recently used (oldest) entry from the
	   * cache. Returns the removed entry or undefined if the
	   * cache was empty.
	   */

	  p.shift = function () {
	    var entry = this.head;
	    if (entry) {
	      this.head = this.head.newer;
	      this.head.older = undefined;
	      entry.newer = entry.older = undefined;
	      this._keymap[entry.key] = undefined;
	      this.size--;
	    }
	    return entry;
	  };

	  /**
	   * Get and register recent use of <key>. Returns the value
	   * associated with <key> or undefined if not in cache.
	   *
	   * @param {String} key
	   * @param {Boolean} returnEntry
	   * @return {Entry|*}
	   */

	  p.get = function (key, returnEntry) {
	    var entry = this._keymap[key];
	    if (entry === undefined) return;
	    if (entry === this.tail) {
	      return returnEntry ? entry : entry.value;
	    }
	    // HEAD--------------TAIL
	    //   <.older   .newer>
	    //  <--- add direction --
	    //   A  B  C  <D>  E
	    if (entry.newer) {
	      if (entry === this.head) {
	        this.head = entry.newer;
	      }
	      entry.newer.older = entry.older; // C <-- E.
	    }
	    if (entry.older) {
	      entry.older.newer = entry.newer; // C. --> E
	    }
	    entry.newer = undefined; // D --x
	    entry.older = this.tail; // D. --> E
	    if (this.tail) {
	      this.tail.newer = entry; // E. <-- D
	    }
	    this.tail = entry;
	    return returnEntry ? entry : entry.value;
	  };

	  var cache$1 = new Cache(1000);
	  var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
	  var reservedArgRE = /^in$|^-?\d+/;

	  /**
	   * Parser state
	   */

	  var str;
	  var dir;
	  var c;
	  var prev;
	  var i;
	  var l;
	  var lastFilterIndex;
	  var inSingle;
	  var inDouble;
	  var curly;
	  var square;
	  var paren;
	  /**
	   * Push a filter to the current directive object
	   */

	  function pushFilter() {
	    var exp = str.slice(lastFilterIndex, i).trim();
	    var filter;
	    if (exp) {
	      filter = {};
	      var tokens = exp.match(filterTokenRE);
	      filter.name = tokens[0];
	      if (tokens.length > 1) {
	        filter.args = tokens.slice(1).map(processFilterArg);
	      }
	    }
	    if (filter) {
	      (dir.filters = dir.filters || []).push(filter);
	    }
	    lastFilterIndex = i + 1;
	  }

	  /**
	   * Check if an argument is dynamic and strip quotes.
	   *
	   * @param {String} arg
	   * @return {Object}
	   */

	  function processFilterArg(arg) {
	    if (reservedArgRE.test(arg)) {
	      return {
	        value: toNumber(arg),
	        dynamic: false
	      };
	    } else {
	      var stripped = stripQuotes(arg);
	      var dynamic = stripped === arg;
	      return {
	        value: dynamic ? arg : stripped,
	        dynamic: dynamic
	      };
	    }
	  }

	  /**
	   * Parse a directive value and extract the expression
	   * and its filters into a descriptor.
	   *
	   * Example:
	   *
	   * "a + 1 | uppercase" will yield:
	   * {
	   *   expression: 'a + 1',
	   *   filters: [
	   *     { name: 'uppercase', args: null }
	   *   ]
	   * }
	   *
	   * @param {String} s
	   * @return {Object}
	   */

	  function parseDirective(s) {
	    var hit = cache$1.get(s);
	    if (hit) {
	      return hit;
	    }

	    // reset parser state
	    str = s;
	    inSingle = inDouble = false;
	    curly = square = paren = 0;
	    lastFilterIndex = 0;
	    dir = {};

	    for (i = 0, l = str.length; i < l; i++) {
	      prev = c;
	      c = str.charCodeAt(i);
	      if (inSingle) {
	        // check single quote
	        if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle;
	      } else if (inDouble) {
	        // check double quote
	        if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble;
	      } else if (c === 0x7C && // pipe
	      str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
	        if (dir.expression == null) {
	          // first filter, end of expression
	          lastFilterIndex = i + 1;
	          dir.expression = str.slice(0, i).trim();
	        } else {
	          // already has filter
	          pushFilter();
	        }
	      } else {
	        switch (c) {
	          case 0x22:
	            inDouble = true;break; // "
	          case 0x27:
	            inSingle = true;break; // '
	          case 0x28:
	            paren++;break; // (
	          case 0x29:
	            paren--;break; // )
	          case 0x5B:
	            square++;break; // [
	          case 0x5D:
	            square--;break; // ]
	          case 0x7B:
	            curly++;break; // {
	          case 0x7D:
	            curly--;break; // }
	        }
	      }
	    }

	    if (dir.expression == null) {
	      dir.expression = str.slice(0, i).trim();
	    } else if (lastFilterIndex !== 0) {
	      pushFilter();
	    }

	    cache$1.put(s, dir);
	    return dir;
	  }

	var directive = Object.freeze({
	    parseDirective: parseDirective
	  });

	  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	  var cache = undefined;
	  var tagRE = undefined;
	  var htmlRE = undefined;
	  /**
	   * Escape a string so it can be used in a RegExp
	   * constructor.
	   *
	   * @param {String} str
	   */

	  function escapeRegex(str) {
	    return str.replace(regexEscapeRE, '\\$&');
	  }

	  function compileRegex() {
	    var open = escapeRegex(config.delimiters[0]);
	    var close = escapeRegex(config.delimiters[1]);
	    var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	    var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	    tagRE = new RegExp(unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '|' + open + '((?:.|\\n)+?)' + close, 'g');
	    htmlRE = new RegExp('^' + unsafeOpen + '.*' + unsafeClose + '$');
	    // reset cache
	    cache = new Cache(1000);
	  }

	  /**
	   * Parse a template text string into an array of tokens.
	   *
	   * @param {String} text
	   * @return {Array<Object> | null}
	   *               - {String} type
	   *               - {String} value
	   *               - {Boolean} [html]
	   *               - {Boolean} [oneTime]
	   */

	  function parseText(text) {
	    if (!cache) {
	      compileRegex();
	    }
	    var hit = cache.get(text);
	    if (hit) {
	      return hit;
	    }
	    if (!tagRE.test(text)) {
	      return null;
	    }
	    var tokens = [];
	    var lastIndex = tagRE.lastIndex = 0;
	    var match, index, html, value, first, oneTime;
	    /* eslint-disable no-cond-assign */
	    while (match = tagRE.exec(text)) {
	      /* eslint-enable no-cond-assign */
	      index = match.index;
	      // push text token
	      if (index > lastIndex) {
	        tokens.push({
	          value: text.slice(lastIndex, index)
	        });
	      }
	      // tag token
	      html = htmlRE.test(match[0]);
	      value = html ? match[1] : match[2];
	      first = value.charCodeAt(0);
	      oneTime = first === 42; // *
	      value = oneTime ? value.slice(1) : value;
	      tokens.push({
	        tag: true,
	        value: value.trim(),
	        html: html,
	        oneTime: oneTime
	      });
	      lastIndex = index + match[0].length;
	    }
	    if (lastIndex < text.length) {
	      tokens.push({
	        value: text.slice(lastIndex)
	      });
	    }
	    cache.put(text, tokens);
	    return tokens;
	  }

	  /**
	   * Format a list of tokens into an expression.
	   * e.g. tokens parsed from 'a {{b}} c' can be serialized
	   * into one single expression as '"a " + b + " c"'.
	   *
	   * @param {Array} tokens
	   * @param {Vue} [vm]
	   * @return {String}
	   */

	  function tokensToExp(tokens, vm) {
	    if (tokens.length > 1) {
	      return tokens.map(function (token) {
	        return formatToken(token, vm);
	      }).join('+');
	    } else {
	      return formatToken(tokens[0], vm, true);
	    }
	  }

	  /**
	   * Format a single token.
	   *
	   * @param {Object} token
	   * @param {Vue} [vm]
	   * @param {Boolean} [single]
	   * @return {String}
	   */

	  function formatToken(token, vm, single) {
	    return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
	  }

	  /**
	   * For an attribute with multiple interpolation tags,
	   * e.g. attr="some-{{thing | filter}}", in order to combine
	   * the whole thing into a single watchable expression, we
	   * have to inline those filters. This function does exactly
	   * that. This is a bit hacky but it avoids heavy changes
	   * to directive parser and watcher mechanism.
	   *
	   * @param {String} exp
	   * @param {Boolean} single
	   * @return {String}
	   */

	  var filterRE = /[^|]\|[^|]/;
	  function inlineFilters(exp, single) {
	    if (!filterRE.test(exp)) {
	      return single ? exp : '(' + exp + ')';
	    } else {
	      var dir = parseDirective(exp);
	      if (!dir.filters) {
	        return '(' + exp + ')';
	      } else {
	        return 'this._applyFilters(' + dir.expression + // value
	        ',null,' + // oldValue (null for read)
	        JSON.stringify(dir.filters) + // filter descriptors
	        ',false)'; // write?
	      }
	    }
	  }

	var text = Object.freeze({
	    compileRegex: compileRegex,
	    parseText: parseText,
	    tokensToExp: tokensToExp
	  });

	  var delimiters = ['{{', '}}'];
	  var unsafeDelimiters = ['{{{', '}}}'];

	  var config = Object.defineProperties({

	    /**
	     * Whether to print debug messages.
	     * Also enables stack trace for warnings.
	     *
	     * @type {Boolean}
	     */

	    debug: false,

	    /**
	     * Whether to suppress warnings.
	     *
	     * @type {Boolean}
	     */

	    silent: false,

	    /**
	     * Whether to use async rendering.
	     */

	    async: true,

	    /**
	     * Whether to warn against errors caught when evaluating
	     * expressions.
	     */

	    warnExpressionErrors: true,

	    /**
	     * Whether to allow devtools inspection.
	     * Disabled by default in production builds.
	     */

	    devtools: 'development' !== 'production',

	    /**
	     * Internal flag to indicate the delimiters have been
	     * changed.
	     *
	     * @type {Boolean}
	     */

	    _delimitersChanged: true,

	    /**
	     * List of asset types that a component can own.
	     *
	     * @type {Array}
	     */

	    _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],

	    /**
	     * prop binding modes
	     */

	    _propBindingModes: {
	      ONE_WAY: 0,
	      TWO_WAY: 1,
	      ONE_TIME: 2
	    },

	    /**
	     * Max circular updates allowed in a batcher flush cycle.
	     */

	    _maxUpdateCount: 100

	  }, {
	    delimiters: { /**
	                   * Interpolation delimiters. Changing these would trigger
	                   * the text parser to re-compile the regular expressions.
	                   *
	                   * @type {Array<String>}
	                   */

	      get: function get() {
	        return delimiters;
	      },
	      set: function set(val) {
	        delimiters = val;
	        compileRegex();
	      },
	      configurable: true,
	      enumerable: true
	    },
	    unsafeDelimiters: {
	      get: function get() {
	        return unsafeDelimiters;
	      },
	      set: function set(val) {
	        unsafeDelimiters = val;
	        compileRegex();
	      },
	      configurable: true,
	      enumerable: true
	    }
	  });

	  var warn = undefined;
	  var formatComponentName = undefined;

	  if (true) {
	    (function () {
	      var hasConsole = typeof console !== 'undefined';

	      warn = function (msg, vm) {
	        if (hasConsole && !config.silent) {
	          console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''));
	        }
	      };

	      formatComponentName = function (vm) {
	        var name = vm._isVue ? vm.$options.name : vm.name;
	        return name ? ' (found in component: <' + hyphenate(name) + '>)' : '';
	      };
	    })();
	  }

	  /**
	   * Append with transition.
	   *
	   * @param {Element} el
	   * @param {Element} target
	   * @param {Vue} vm
	   * @param {Function} [cb]
	   */

	  function appendWithTransition(el, target, vm, cb) {
	    applyTransition(el, 1, function () {
	      target.appendChild(el);
	    }, vm, cb);
	  }

	  /**
	   * InsertBefore with transition.
	   *
	   * @param {Element} el
	   * @param {Element} target
	   * @param {Vue} vm
	   * @param {Function} [cb]
	   */

	  function beforeWithTransition(el, target, vm, cb) {
	    applyTransition(el, 1, function () {
	      before(el, target);
	    }, vm, cb);
	  }

	  /**
	   * Remove with transition.
	   *
	   * @param {Element} el
	   * @param {Vue} vm
	   * @param {Function} [cb]
	   */

	  function removeWithTransition(el, vm, cb) {
	    applyTransition(el, -1, function () {
	      remove(el);
	    }, vm, cb);
	  }

	  /**
	   * Apply transitions with an operation callback.
	   *
	   * @param {Element} el
	   * @param {Number} direction
	   *                  1: enter
	   *                 -1: leave
	   * @param {Function} op - the actual DOM operation
	   * @param {Vue} vm
	   * @param {Function} [cb]
	   */

	  function applyTransition(el, direction, op, vm, cb) {
	    var transition = el.__v_trans;
	    if (!transition ||
	    // skip if there are no js hooks and CSS transition is
	    // not supported
	    !transition.hooks && !transitionEndEvent ||
	    // skip transitions for initial compile
	    !vm._isCompiled ||
	    // if the vm is being manipulated by a parent directive
	    // during the parent's compilation phase, skip the
	    // animation.
	    vm.$parent && !vm.$parent._isCompiled) {
	      op();
	      if (cb) cb();
	      return;
	    }
	    var action = direction > 0 ? 'enter' : 'leave';
	    transition[action](op, cb);
	  }

	var transition = Object.freeze({
	    appendWithTransition: appendWithTransition,
	    beforeWithTransition: beforeWithTransition,
	    removeWithTransition: removeWithTransition,
	    applyTransition: applyTransition
	  });

	  /**
	   * Query an element selector if it's not an element already.
	   *
	   * @param {String|Element} el
	   * @return {Element}
	   */

	  function query(el) {
	    if (typeof el === 'string') {
	      var selector = el;
	      el = document.querySelector(el);
	      if (!el) {
	        'development' !== 'production' && warn('Cannot find element: ' + selector);
	      }
	    }
	    return el;
	  }

	  /**
	   * Check if a node is in the document.
	   * Note: document.documentElement.contains should work here
	   * but always returns false for comment nodes in phantomjs,
	   * making unit tests difficult. This is fixed by doing the
	   * contains() check on the node's parentNode instead of
	   * the node itself.
	   *
	   * @param {Node} node
	   * @return {Boolean}
	   */

	  function inDoc(node) {
	    if (!node) return false;
	    var doc = node.ownerDocument.documentElement;
	    var parent = node.parentNode;
	    return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	  }

	  /**
	   * Get and remove an attribute from a node.
	   *
	   * @param {Node} node
	   * @param {String} _attr
	   */

	  function getAttr(node, _attr) {
	    var val = node.getAttribute(_attr);
	    if (val !== null) {
	      node.removeAttribute(_attr);
	    }
	    return val;
	  }

	  /**
	   * Get an attribute with colon or v-bind: prefix.
	   *
	   * @param {Node} node
	   * @param {String} name
	   * @return {String|null}
	   */

	  function getBindAttr(node, name) {
	    var val = getAttr(node, ':' + name);
	    if (val === null) {
	      val = getAttr(node, 'v-bind:' + name);
	    }
	    return val;
	  }

	  /**
	   * Check the presence of a bind attribute.
	   *
	   * @param {Node} node
	   * @param {String} name
	   * @return {Boolean}
	   */

	  function hasBindAttr(node, name) {
	    return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
	  }

	  /**
	   * Insert el before target
	   *
	   * @param {Element} el
	   * @param {Element} target
	   */

	  function before(el, target) {
	    target.parentNode.insertBefore(el, target);
	  }

	  /**
	   * Insert el after target
	   *
	   * @param {Element} el
	   * @param {Element} target
	   */

	  function after(el, target) {
	    if (target.nextSibling) {
	      before(el, target.nextSibling);
	    } else {
	      target.parentNode.appendChild(el);
	    }
	  }

	  /**
	   * Remove el from DOM
	   *
	   * @param {Element} el
	   */

	  function remove(el) {
	    el.parentNode.removeChild(el);
	  }

	  /**
	   * Prepend el to target
	   *
	   * @param {Element} el
	   * @param {Element} target
	   */

	  function prepend(el, target) {
	    if (target.firstChild) {
	      before(el, target.firstChild);
	    } else {
	      target.appendChild(el);
	    }
	  }

	  /**
	   * Replace target with el
	   *
	   * @param {Element} target
	   * @param {Element} el
	   */

	  function replace(target, el) {
	    var parent = target.parentNode;
	    if (parent) {
	      parent.replaceChild(el, target);
	    }
	  }

	  /**
	   * Add event listener shorthand.
	   *
	   * @param {Element} el
	   * @param {String} event
	   * @param {Function} cb
	   * @param {Boolean} [useCapture]
	   */

	  function on(el, event, cb, useCapture) {
	    el.addEventListener(event, cb, useCapture);
	  }

	  /**
	   * Remove event listener shorthand.
	   *
	   * @param {Element} el
	   * @param {String} event
	   * @param {Function} cb
	   */

	  function off(el, event, cb) {
	    el.removeEventListener(event, cb);
	  }

	  /**
	   * For IE9 compat: when both class and :class are present
	   * getAttribute('class') returns wrong value...
	   *
	   * @param {Element} el
	   * @return {String}
	   */

	  function getClass(el) {
	    var classname = el.className;
	    if (typeof classname === 'object') {
	      classname = classname.baseVal || '';
	    }
	    return classname;
	  }

	  /**
	   * In IE9, setAttribute('class') will result in empty class
	   * if the element also has the :class attribute; However in
	   * PhantomJS, setting `className` does not work on SVG elements...
	   * So we have to do a conditional check here.
	   *
	   * @param {Element} el
	   * @param {String} cls
	   */

	  function setClass(el, cls) {
	    /* istanbul ignore if */
	    if (isIE9 && !/svg$/.test(el.namespaceURI)) {
	      el.className = cls;
	    } else {
	      el.setAttribute('class', cls);
	    }
	  }

	  /**
	   * Add class with compatibility for IE & SVG
	   *
	   * @param {Element} el
	   * @param {String} cls
	   */

	  function addClass(el, cls) {
	    if (el.classList) {
	      el.classList.add(cls);
	    } else {
	      var cur = ' ' + getClass(el) + ' ';
	      if (cur.indexOf(' ' + cls + ' ') < 0) {
	        setClass(el, (cur + cls).trim());
	      }
	    }
	  }

	  /**
	   * Remove class with compatibility for IE & SVG
	   *
	   * @param {Element} el
	   * @param {String} cls
	   */

	  function removeClass(el, cls) {
	    if (el.classList) {
	      el.classList.remove(cls);
	    } else {
	      var cur = ' ' + getClass(el) + ' ';
	      var tar = ' ' + cls + ' ';
	      while (cur.indexOf(tar) >= 0) {
	        cur = cur.replace(tar, ' ');
	      }
	      setClass(el, cur.trim());
	    }
	    if (!el.className) {
	      el.removeAttribute('class');
	    }
	  }

	  /**
	   * Extract raw content inside an element into a temporary
	   * container div
	   *
	   * @param {Element} el
	   * @param {Boolean} asFragment
	   * @return {Element|DocumentFragment}
	   */

	  function extractContent(el, asFragment) {
	    var child;
	    var rawContent;
	    /* istanbul ignore if */
	    if (isTemplate(el) && isFragment(el.content)) {
	      el = el.content;
	    }
	    if (el.hasChildNodes()) {
	      trimNode(el);
	      rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	      /* eslint-disable no-cond-assign */
	      while (child = el.firstChild) {
	        /* eslint-enable no-cond-assign */
	        rawContent.appendChild(child);
	      }
	    }
	    return rawContent;
	  }

	  /**
	   * Trim possible empty head/tail text and comment
	   * nodes inside a parent.
	   *
	   * @param {Node} node
	   */

	  function trimNode(node) {
	    var child;
	    /* eslint-disable no-sequences */
	    while ((child = node.firstChild, isTrimmable(child))) {
	      node.removeChild(child);
	    }
	    while ((child = node.lastChild, isTrimmable(child))) {
	      node.removeChild(child);
	    }
	    /* eslint-enable no-sequences */
	  }

	  function isTrimmable(node) {
	    return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
	  }

	  /**
	   * Check if an element is a template tag.
	   * Note if the template appears inside an SVG its tagName
	   * will be in lowercase.
	   *
	   * @param {Element} el
	   */

	  function isTemplate(el) {
	    return el.tagName && el.tagName.toLowerCase() === 'template';
	  }

	  /**
	   * Create an "anchor" for performing dom insertion/removals.
	   * This is used in a number of scenarios:
	   * - fragment instance
	   * - v-html
	   * - v-if
	   * - v-for
	   * - component
	   *
	   * @param {String} content
	   * @param {Boolean} persist - IE trashes empty textNodes on
	   *                            cloneNode(true), so in certain
	   *                            cases the anchor needs to be
	   *                            non-empty to be persisted in
	   *                            templates.
	   * @return {Comment|Text}
	   */

	  function createAnchor(content, persist) {
	    var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	    anchor.__v_anchor = true;
	    return anchor;
	  }

	  /**
	   * Find a component ref attribute that starts with $.
	   *
	   * @param {Element} node
	   * @return {String|undefined}
	   */

	  var refRE = /^v-ref:/;

	  function findRef(node) {
	    if (node.hasAttributes()) {
	      var attrs = node.attributes;
	      for (var i = 0, l = attrs.length; i < l; i++) {
	        var name = attrs[i].name;
	        if (refRE.test(name)) {
	          return camelize(name.replace(refRE, ''));
	        }
	      }
	    }
	  }

	  /**
	   * Map a function to a range of nodes .
	   *
	   * @param {Node} node
	   * @param {Node} end
	   * @param {Function} op
	   */

	  function mapNodeRange(node, end, op) {
	    var next;
	    while (node !== end) {
	      next = node.nextSibling;
	      op(node);
	      node = next;
	    }
	    op(end);
	  }

	  /**
	   * Remove a range of nodes with transition, store
	   * the nodes in a fragment with correct ordering,
	   * and call callback when done.
	   *
	   * @param {Node} start
	   * @param {Node} end
	   * @param {Vue} vm
	   * @param {DocumentFragment} frag
	   * @param {Function} cb
	   */

	  function removeNodeRange(start, end, vm, frag, cb) {
	    var done = false;
	    var removed = 0;
	    var nodes = [];
	    mapNodeRange(start, end, function (node) {
	      if (node === end) done = true;
	      nodes.push(node);
	      removeWithTransition(node, vm, onRemoved);
	    });
	    function onRemoved() {
	      removed++;
	      if (done && removed >= nodes.length) {
	        for (var i = 0; i < nodes.length; i++) {
	          frag.appendChild(nodes[i]);
	        }
	        cb && cb();
	      }
	    }
	  }

	  /**
	   * Check if a node is a DocumentFragment.
	   *
	   * @param {Node} node
	   * @return {Boolean}
	   */

	  function isFragment(node) {
	    return node && node.nodeType === 11;
	  }

	  /**
	   * Get outerHTML of elements, taking care
	   * of SVG elements in IE as well.
	   *
	   * @param {Element} el
	   * @return {String}
	   */

	  function getOuterHTML(el) {
	    if (el.outerHTML) {
	      return el.outerHTML;
	    } else {
	      var container = document.createElement('div');
	      container.appendChild(el.cloneNode(true));
	      return container.innerHTML;
	    }
	  }

	  var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i;
	  var reservedTagRE = /^(slot|partial|component)$/i;

	  var isUnknownElement = undefined;
	  if (true) {
	    isUnknownElement = function (el, tag) {
	      if (tag.indexOf('-') > -1) {
	        // http://stackoverflow.com/a/28210364/1070244
	        return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
	      } else {
	        return (/HTMLUnknownElement/.test(el.toString()) &&
	          // Chrome returns unknown for several HTML5 elements.
	          // https://code.google.com/p/chromium/issues/detail?id=540526
	          !/^(data|time|rtc|rb)$/.test(tag)
	        );
	      }
	    };
	  }

	  /**
	   * Check if an element is a component, if yes return its
	   * component id.
	   *
	   * @param {Element} el
	   * @param {Object} options
	   * @return {Object|undefined}
	   */

	  function checkComponentAttr(el, options) {
	    var tag = el.tagName.toLowerCase();
	    var hasAttrs = el.hasAttributes();
	    if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
	      if (resolveAsset(options, 'components', tag)) {
	        return { id: tag };
	      } else {
	        var is = hasAttrs && getIsBinding(el, options);
	        if (is) {
	          return is;
	        } else if (true) {
	          var expectedTag = options._componentNameMap && options._componentNameMap[tag];
	          if (expectedTag) {
	            warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
	          } else if (isUnknownElement(el, tag)) {
	            warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
	          }
	        }
	      }
	    } else if (hasAttrs) {
	      return getIsBinding(el, options);
	    }
	  }

	  /**
	   * Get "is" binding from an element.
	   *
	   * @param {Element} el
	   * @param {Object} options
	   * @return {Object|undefined}
	   */

	  function getIsBinding(el, options) {
	    // dynamic syntax
	    var exp = el.getAttribute('is');
	    if (exp != null) {
	      if (resolveAsset(options, 'components', exp)) {
	        el.removeAttribute('is');
	        return { id: exp };
	      }
	    } else {
	      exp = getBindAttr(el, 'is');
	      if (exp != null) {
	        return { id: exp, dynamic: true };
	      }
	    }
	  }

	  /**
	   * Option overwriting strategies are functions that handle
	   * how to merge a parent option value and a child option
	   * value into the final value.
	   *
	   * All strategy functions follow the same signature:
	   *
	   * @param {*} parentVal
	   * @param {*} childVal
	   * @param {Vue} [vm]
	   */

	  var strats = config.optionMergeStrategies = Object.create(null);

	  /**
	   * Helper that recursively merges two data objects together.
	   */

	  function mergeData(to, from) {
	    var key, toVal, fromVal;
	    for (key in from) {
	      toVal = to[key];
	      fromVal = from[key];
	      if (!hasOwn(to, key)) {
	        set(to, key, fromVal);
	      } else if (isObject(toVal) && isObject(fromVal)) {
	        mergeData(toVal, fromVal);
	      }
	    }
	    return to;
	  }

	  /**
	   * Data
	   */

	  strats.data = function (parentVal, childVal, vm) {
	    if (!vm) {
	      // in a Vue.extend merge, both should be functions
	      if (!childVal) {
	        return parentVal;
	      }
	      if (typeof childVal !== 'function') {
	        'development' !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	        return parentVal;
	      }
	      if (!parentVal) {
	        return childVal;
	      }
	      // when parentVal & childVal are both present,
	      // we need to return a function that returns the
	      // merged result of both functions... no need to
	      // check if parentVal is a function here because
	      // it has to be a function to pass previous merges.
	      return function mergedDataFn() {
	        return mergeData(childVal.call(this), parentVal.call(this));
	      };
	    } else if (parentVal || childVal) {
	      return function mergedInstanceDataFn() {
	        // instance merge
	        var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	        var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	        if (instanceData) {
	          return mergeData(instanceData, defaultData);
	        } else {
	          return defaultData;
	        }
	      };
	    }
	  };

	  /**
	   * El
	   */

	  strats.el = function (parentVal, childVal, vm) {
	    if (!vm && childVal && typeof childVal !== 'function') {
	      'development' !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	      return;
	    }
	    var ret = childVal || parentVal;
	    // invoke the element factory if this is instance merge
	    return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	  };

	  /**
	   * Hooks and param attributes are merged as arrays.
	   */

	  strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
	    return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	  };

	  /**
	   * Assets
	   *
	   * When a vm is present (instance creation), we need to do
	   * a three-way merge between constructor options, instance
	   * options and parent options.
	   */

	  function mergeAssets(parentVal, childVal) {
	    var res = Object.create(parentVal || null);
	    return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	  }

	  config._assetTypes.forEach(function (type) {
	    strats[type + 's'] = mergeAssets;
	  });

	  /**
	   * Events & Watchers.
	   *
	   * Events & watchers hashes should not overwrite one
	   * another, so we merge them as arrays.
	   */

	  strats.watch = strats.events = function (parentVal, childVal) {
	    if (!childVal) return parentVal;
	    if (!parentVal) return childVal;
	    var ret = {};
	    extend(ret, parentVal);
	    for (var key in childVal) {
	      var parent = ret[key];
	      var child = childVal[key];
	      if (parent && !isArray(parent)) {
	        parent = [parent];
	      }
	      ret[key] = parent ? parent.concat(child) : [child];
	    }
	    return ret;
	  };

	  /**
	   * Other object hashes.
	   */

	  strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	    if (!childVal) return parentVal;
	    if (!parentVal) return childVal;
	    var ret = Object.create(null);
	    extend(ret, parentVal);
	    extend(ret, childVal);
	    return ret;
	  };

	  /**
	   * Default strategy.
	   */

	  var defaultStrat = function defaultStrat(parentVal, childVal) {
	    return childVal === undefined ? parentVal : childVal;
	  };

	  /**
	   * Make sure component options get converted to actual
	   * constructors.
	   *
	   * @param {Object} options
	   */

	  function guardComponents(options) {
	    if (options.components) {
	      var components = options.components = guardArrayAssets(options.components);
	      var ids = Object.keys(components);
	      var def;
	      if (true) {
	        var map = options._componentNameMap = {};
	      }
	      for (var i = 0, l = ids.length; i < l; i++) {
	        var key = ids[i];
	        if (commonTagRE.test(key) || reservedTagRE.test(key)) {
	          'development' !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	          continue;
	        }
	        // record a all lowercase <-> kebab-case mapping for
	        // possible custom element case error warning
	        if (true) {
	          map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
	        }
	        def = components[key];
	        if (isPlainObject(def)) {
	          components[key] = Vue.extend(def);
	        }
	      }
	    }
	  }

	  /**
	   * Ensure all props option syntax are normalized into the
	   * Object-based format.
	   *
	   * @param {Object} options
	   */

	  function guardProps(options) {
	    var props = options.props;
	    var i, val;
	    if (isArray(props)) {
	      options.props = {};
	      i = props.length;
	      while (i--) {
	        val = props[i];
	        if (typeof val === 'string') {
	          options.props[val] = null;
	        } else if (val.name) {
	          options.props[val.name] = val;
	        }
	      }
	    } else if (isPlainObject(props)) {
	      var keys = Object.keys(props);
	      i = keys.length;
	      while (i--) {
	        val = props[keys[i]];
	        if (typeof val === 'function') {
	          props[keys[i]] = { type: val };
	        }
	      }
	    }
	  }

	  /**
	   * Guard an Array-format assets option and converted it
	   * into the key-value Object format.
	   *
	   * @param {Object|Array} assets
	   * @return {Object}
	   */

	  function guardArrayAssets(assets) {
	    if (isArray(assets)) {
	      var res = {};
	      var i = assets.length;
	      var asset;
	      while (i--) {
	        asset = assets[i];
	        var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	        if (!id) {
	          'development' !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	        } else {
	          res[id] = asset;
	        }
	      }
	      return res;
	    }
	    return assets;
	  }

	  /**
	   * Merge two option objects into a new one.
	   * Core utility used in both instantiation and inheritance.
	   *
	   * @param {Object} parent
	   * @param {Object} child
	   * @param {Vue} [vm] - if vm is present, indicates this is
	   *                     an instantiation merge.
	   */

	  function mergeOptions(parent, child, vm) {
	    guardComponents(child);
	    guardProps(child);
	    if (true) {
	      if (child.propsData && !vm) {
	        warn('propsData can only be used as an instantiation option.');
	      }
	    }
	    var options = {};
	    var key;
	    if (child['extends']) {
	      parent = typeof child['extends'] === 'function' ? mergeOptions(parent, child['extends'].options, vm) : mergeOptions(parent, child['extends'], vm);
	    }
	    if (child.mixins) {
	      for (var i = 0, l = child.mixins.length; i < l; i++) {
	        parent = mergeOptions(parent, child.mixins[i], vm);
	      }
	    }
	    for (key in parent) {
	      mergeField(key);
	    }
	    for (key in child) {
	      if (!hasOwn(parent, key)) {
	        mergeField(key);
	      }
	    }
	    function mergeField(key) {
	      var strat = strats[key] || defaultStrat;
	      options[key] = strat(parent[key], child[key], vm, key);
	    }
	    return options;
	  }

	  /**
	   * Resolve an asset.
	   * This function is used because child instances need access
	   * to assets defined in its ancestor chain.
	   *
	   * @param {Object} options
	   * @param {String} type
	   * @param {String} id
	   * @param {Boolean} warnMissing
	   * @return {Object|Function}
	   */

	  function resolveAsset(options, type, id, warnMissing) {
	    /* istanbul ignore if */
	    if (typeof id !== 'string') {
	      return;
	    }
	    var assets = options[type];
	    var camelizedId;
	    var res = assets[id] ||
	    // camelCase ID
	    assets[camelizedId = camelize(id)] ||
	    // Pascal Case ID
	    assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	    if ('development' !== 'production' && warnMissing && !res) {
	      warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
	    }
	    return res;
	  }

	  var uid$1 = 0;

	  /**
	   * A dep is an observable that can have multiple
	   * directives subscribing to it.
	   *
	   * @constructor
	   */
	  function Dep() {
	    this.id = uid$1++;
	    this.subs = [];
	  }

	  // the current target watcher being evaluated.
	  // this is globally unique because there could be only one
	  // watcher being evaluated at any time.
	  Dep.target = null;

	  /**
	   * Add a directive subscriber.
	   *
	   * @param {Directive} sub
	   */

	  Dep.prototype.addSub = function (sub) {
	    this.subs.push(sub);
	  };

	  /**
	   * Remove a directive subscriber.
	   *
	   * @param {Directive} sub
	   */

	  Dep.prototype.removeSub = function (sub) {
	    this.subs.$remove(sub);
	  };

	  /**
	   * Add self as a dependency to the target watcher.
	   */

	  Dep.prototype.depend = function () {
	    Dep.target.addDep(this);
	  };

	  /**
	   * Notify all subscribers of a new value.
	   */

	  Dep.prototype.notify = function () {
	    // stablize the subscriber list first
	    var subs = toArray(this.subs);
	    for (var i = 0, l = subs.length; i < l; i++) {
	      subs[i].update();
	    }
	  };

	  var arrayProto = Array.prototype;
	  var arrayMethods = Object.create(arrayProto)

	  /**
	   * Intercept mutating methods and emit events
	   */

	  ;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	    // cache original method
	    var original = arrayProto[method];
	    def(arrayMethods, method, function mutator() {
	      // avoid leaking arguments:
	      // http://jsperf.com/closure-with-arguments
	      var i = arguments.length;
	      var args = new Array(i);
	      while (i--) {
	        args[i] = arguments[i];
	      }
	      var result = original.apply(this, args);
	      var ob = this.__ob__;
	      var inserted;
	      switch (method) {
	        case 'push':
	          inserted = args;
	          break;
	        case 'unshift':
	          inserted = args;
	          break;
	        case 'splice':
	          inserted = args.slice(2);
	          break;
	      }
	      if (inserted) ob.observeArray(inserted);
	      // notify change
	      ob.dep.notify();
	      return result;
	    });
	  });

	  /**
	   * Swap the element at the given index with a new value
	   * and emits corresponding event.
	   *
	   * @param {Number} index
	   * @param {*} val
	   * @return {*} - replaced element
	   */

	  def(arrayProto, '$set', function $set(index, val) {
	    if (index >= this.length) {
	      this.length = Number(index) + 1;
	    }
	    return this.splice(index, 1, val)[0];
	  });

	  /**
	   * Convenience method to remove the element at given index or target element reference.
	   *
	   * @param {*} item
	   */

	  def(arrayProto, '$remove', function $remove(item) {
	    /* istanbul ignore if */
	    if (!this.length) return;
	    var index = indexOf(this, item);
	    if (index > -1) {
	      return this.splice(index, 1);
	    }
	  });

	  var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	  /**
	   * By default, when a reactive property is set, the new value is
	   * also converted to become reactive. However in certain cases, e.g.
	   * v-for scope alias and props, we don't want to force conversion
	   * because the value may be a nested value under a frozen data structure.
	   *
	   * So whenever we want to set a reactive property without forcing
	   * conversion on the new value, we wrap that call inside this function.
	   */

	  var shouldConvert = true;

	  function withoutConversion(fn) {
	    shouldConvert = false;
	    fn();
	    shouldConvert = true;
	  }

	  /**
	   * Observer class that are attached to each observed
	   * object. Once attached, the observer converts target
	   * object's property keys into getter/setters that
	   * collect dependencies and dispatches updates.
	   *
	   * @param {Array|Object} value
	   * @constructor
	   */

	  function Observer(value) {
	    this.value = value;
	    this.dep = new Dep();
	    def(value, '__ob__', this);
	    if (isArray(value)) {
	      var augment = hasProto ? protoAugment : copyAugment;
	      augment(value, arrayMethods, arrayKeys);
	      this.observeArray(value);
	    } else {
	      this.walk(value);
	    }
	  }

	  // Instance methods

	  /**
	   * Walk through each property and convert them into
	   * getter/setters. This method should only be called when
	   * value type is Object.
	   *
	   * @param {Object} obj
	   */

	  Observer.prototype.walk = function (obj) {
	    var keys = Object.keys(obj);
	    for (var i = 0, l = keys.length; i < l; i++) {
	      this.convert(keys[i], obj[keys[i]]);
	    }
	  };

	  /**
	   * Observe a list of Array items.
	   *
	   * @param {Array} items
	   */

	  Observer.prototype.observeArray = function (items) {
	    for (var i = 0, l = items.length; i < l; i++) {
	      observe(items[i]);
	    }
	  };

	  /**
	   * Convert a property into getter/setter so we can emit
	   * the events when the property is accessed/changed.
	   *
	   * @param {String} key
	   * @param {*} val
	   */

	  Observer.prototype.convert = function (key, val) {
	    defineReactive(this.value, key, val);
	  };

	  /**
	   * Add an owner vm, so that when $set/$delete mutations
	   * happen we can notify owner vms to proxy the keys and
	   * digest the watchers. This is only called when the object
	   * is observed as an instance's root $data.
	   *
	   * @param {Vue} vm
	   */

	  Observer.prototype.addVm = function (vm) {
	    (this.vms || (this.vms = [])).push(vm);
	  };

	  /**
	   * Remove an owner vm. This is called when the object is
	   * swapped out as an instance's $data object.
	   *
	   * @param {Vue} vm
	   */

	  Observer.prototype.removeVm = function (vm) {
	    this.vms.$remove(vm);
	  };

	  // helpers

	  /**
	   * Augment an target Object or Array by intercepting
	   * the prototype chain using __proto__
	   *
	   * @param {Object|Array} target
	   * @param {Object} src
	   */

	  function protoAugment(target, src) {
	    /* eslint-disable no-proto */
	    target.__proto__ = src;
	    /* eslint-enable no-proto */
	  }

	  /**
	   * Augment an target Object or Array by defining
	   * hidden properties.
	   *
	   * @param {Object|Array} target
	   * @param {Object} proto
	   */

	  function copyAugment(target, src, keys) {
	    for (var i = 0, l = keys.length; i < l; i++) {
	      var key = keys[i];
	      def(target, key, src[key]);
	    }
	  }

	  /**
	   * Attempt to create an observer instance for a value,
	   * returns the new observer if successfully observed,
	   * or the existing observer if the value already has one.
	   *
	   * @param {*} value
	   * @param {Vue} [vm]
	   * @return {Observer|undefined}
	   * @static
	   */

	  function observe(value, vm) {
	    if (!value || typeof value !== 'object') {
	      return;
	    }
	    var ob;
	    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	      ob = value.__ob__;
	    } else if (shouldConvert && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	      ob = new Observer(value);
	    }
	    if (ob && vm) {
	      ob.addVm(vm);
	    }
	    return ob;
	  }

	  /**
	   * Define a reactive property on an Object.
	   *
	   * @param {Object} obj
	   * @param {String} key
	   * @param {*} val
	   */

	  function defineReactive(obj, key, val) {
	    var dep = new Dep();

	    var property = Object.getOwnPropertyDescriptor(obj, key);
	    if (property && property.configurable === false) {
	      return;
	    }

	    // cater for pre-defined getter/setters
	    var getter = property && property.get;
	    var setter = property && property.set;

	    var childOb = observe(val);
	    Object.defineProperty(obj, key, {
	      enumerable: true,
	      configurable: true,
	      get: function reactiveGetter() {
	        var value = getter ? getter.call(obj) : val;
	        if (Dep.target) {
	          dep.depend();
	          if (childOb) {
	            childOb.dep.depend();
	          }
	          if (isArray(value)) {
	            for (var e, i = 0, l = value.length; i < l; i++) {
	              e = value[i];
	              e && e.__ob__ && e.__ob__.dep.depend();
	            }
	          }
	        }
	        return value;
	      },
	      set: function reactiveSetter(newVal) {
	        var value = getter ? getter.call(obj) : val;
	        if (newVal === value) {
	          return;
	        }
	        if (setter) {
	          setter.call(obj, newVal);
	        } else {
	          val = newVal;
	        }
	        childOb = observe(newVal);
	        dep.notify();
	      }
	    });
	  }



	  var util = Object.freeze({
	  	defineReactive: defineReactive,
	  	set: set,
	  	del: del,
	  	hasOwn: hasOwn,
	  	isLiteral: isLiteral,
	  	isReserved: isReserved,
	  	_toString: _toString,
	  	toNumber: toNumber,
	  	toBoolean: toBoolean,
	  	stripQuotes: stripQuotes,
	  	camelize: camelize,
	  	hyphenate: hyphenate,
	  	classify: classify,
	  	bind: bind,
	  	toArray: toArray,
	  	extend: extend,
	  	isObject: isObject,
	  	isPlainObject: isPlainObject,
	  	def: def,
	  	debounce: _debounce,
	  	indexOf: indexOf,
	  	cancellable: cancellable,
	  	looseEqual: looseEqual,
	  	isArray: isArray,
	  	hasProto: hasProto,
	  	inBrowser: inBrowser,
	  	devtools: devtools,
	  	isIE9: isIE9,
	  	isAndroid: isAndroid,
	  	isIos: isIos,
	  	isWechat: isWechat,
	  	get transitionProp () { return transitionProp; },
	  	get transitionEndEvent () { return transitionEndEvent; },
	  	get animationProp () { return animationProp; },
	  	get animationEndEvent () { return animationEndEvent; },
	  	nextTick: nextTick,
	  	get _Set () { return _Set; },
	  	query: query,
	  	inDoc: inDoc,
	  	getAttr: getAttr,
	  	getBindAttr: getBindAttr,
	  	hasBindAttr: hasBindAttr,
	  	before: before,
	  	after: after,
	  	remove: remove,
	  	prepend: prepend,
	  	replace: replace,
	  	on: on,
	  	off: off,
	  	setClass: setClass,
	  	addClass: addClass,
	  	removeClass: removeClass,
	  	extractContent: extractContent,
	  	trimNode: trimNode,
	  	isTemplate: isTemplate,
	  	createAnchor: createAnchor,
	  	findRef: findRef,
	  	mapNodeRange: mapNodeRange,
	  	removeNodeRange: removeNodeRange,
	  	isFragment: isFragment,
	  	getOuterHTML: getOuterHTML,
	  	mergeOptions: mergeOptions,
	  	resolveAsset: resolveAsset,
	  	checkComponentAttr: checkComponentAttr,
	  	commonTagRE: commonTagRE,
	  	reservedTagRE: reservedTagRE,
	  	get warn () { return warn; }
	  });

	  var uid = 0;

	  function initMixin (Vue) {
	    /**
	     * The main init sequence. This is called for every
	     * instance, including ones that are created from extended
	     * constructors.
	     *
	     * @param {Object} options - this options object should be
	     *                           the result of merging class
	     *                           options and the options passed
	     *                           in to the constructor.
	     */

	    Vue.prototype._init = function (options) {
	      options = options || {};

	      this.$el = null;
	      this.$parent = options.parent;
	      this.$root = this.$parent ? this.$parent.$root : this;
	      this.$children = [];
	      this.$refs = {}; // child vm references
	      this.$els = {}; // element references
	      this._watchers = []; // all watchers as an array
	      this._directives = []; // all directives

	      // a uid
	      this._uid = uid++;

	      // a flag to avoid this being observed
	      this._isVue = true;

	      // events bookkeeping
	      this._events = {}; // registered callbacks
	      this._eventsCount = {}; // for $broadcast optimization

	      // fragment instance properties
	      this._isFragment = false;
	      this._fragment = // @type {DocumentFragment}
	      this._fragmentStart = // @type {Text|Comment}
	      this._fragmentEnd = null; // @type {Text|Comment}

	      // lifecycle state
	      this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
	      this._unlinkFn = null;

	      // context:
	      // if this is a transcluded component, context
	      // will be the common parent vm of this instance
	      // and its host.
	      this._context = options._context || this.$parent;

	      // scope:
	      // if this is inside an inline v-for, the scope
	      // will be the intermediate scope created for this
	      // repeat fragment. this is used for linking props
	      // and container directives.
	      this._scope = options._scope;

	      // fragment:
	      // if this instance is compiled inside a Fragment, it
	      // needs to reigster itself as a child of that fragment
	      // for attach/detach to work properly.
	      this._frag = options._frag;
	      if (this._frag) {
	        this._frag.children.push(this);
	      }

	      // push self into parent / transclusion host
	      if (this.$parent) {
	        this.$parent.$children.push(this);
	      }

	      // merge options.
	      options = this.$options = mergeOptions(this.constructor.options, options, this);

	      // set ref
	      this._updateRef();

	      // initialize data as empty object.
	      // it will be filled up in _initData().
	      this._data = {};

	      // call init hook
	      this._callHook('init');

	      // initialize data observation and scope inheritance.
	      this._initState();

	      // setup event system and option events.
	      this._initEvents();

	      // call created hook
	      this._callHook('created');

	      // if `el` option is passed, start compilation.
	      if (options.el) {
	        this.$mount(options.el);
	      }
	    };
	  }

	  var pathCache = new Cache(1000);

	  // actions
	  var APPEND = 0;
	  var PUSH = 1;
	  var INC_SUB_PATH_DEPTH = 2;
	  var PUSH_SUB_PATH = 3;

	  // states
	  var BEFORE_PATH = 0;
	  var IN_PATH = 1;
	  var BEFORE_IDENT = 2;
	  var IN_IDENT = 3;
	  var IN_SUB_PATH = 4;
	  var IN_SINGLE_QUOTE = 5;
	  var IN_DOUBLE_QUOTE = 6;
	  var AFTER_PATH = 7;
	  var ERROR = 8;

	  var pathStateMachine = [];

	  pathStateMachine[BEFORE_PATH] = {
	    'ws': [BEFORE_PATH],
	    'ident': [IN_IDENT, APPEND],
	    '[': [IN_SUB_PATH],
	    'eof': [AFTER_PATH]
	  };

	  pathStateMachine[IN_PATH] = {
	    'ws': [IN_PATH],
	    '.': [BEFORE_IDENT],
	    '[': [IN_SUB_PATH],
	    'eof': [AFTER_PATH]
	  };

	  pathStateMachine[BEFORE_IDENT] = {
	    'ws': [BEFORE_IDENT],
	    'ident': [IN_IDENT, APPEND]
	  };

	  pathStateMachine[IN_IDENT] = {
	    'ident': [IN_IDENT, APPEND],
	    '0': [IN_IDENT, APPEND],
	    'number': [IN_IDENT, APPEND],
	    'ws': [IN_PATH, PUSH],
	    '.': [BEFORE_IDENT, PUSH],
	    '[': [IN_SUB_PATH, PUSH],
	    'eof': [AFTER_PATH, PUSH]
	  };

	  pathStateMachine[IN_SUB_PATH] = {
	    "'": [IN_SINGLE_QUOTE, APPEND],
	    '"': [IN_DOUBLE_QUOTE, APPEND],
	    '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	    ']': [IN_PATH, PUSH_SUB_PATH],
	    'eof': ERROR,
	    'else': [IN_SUB_PATH, APPEND]
	  };

	  pathStateMachine[IN_SINGLE_QUOTE] = {
	    "'": [IN_SUB_PATH, APPEND],
	    'eof': ERROR,
	    'else': [IN_SINGLE_QUOTE, APPEND]
	  };

	  pathStateMachine[IN_DOUBLE_QUOTE] = {
	    '"': [IN_SUB_PATH, APPEND],
	    'eof': ERROR,
	    'else': [IN_DOUBLE_QUOTE, APPEND]
	  };

	  /**
	   * Determine the type of a character in a keypath.
	   *
	   * @param {Char} ch
	   * @return {String} type
	   */

	  function getPathCharType(ch) {
	    if (ch === undefined) {
	      return 'eof';
	    }

	    var code = ch.charCodeAt(0);

	    switch (code) {
	      case 0x5B: // [
	      case 0x5D: // ]
	      case 0x2E: // .
	      case 0x22: // "
	      case 0x27: // '
	      case 0x30:
	        // 0
	        return ch;

	      case 0x5F: // _
	      case 0x24:
	        // $
	        return 'ident';

	      case 0x20: // Space
	      case 0x09: // Tab
	      case 0x0A: // Newline
	      case 0x0D: // Return
	      case 0xA0: // No-break space
	      case 0xFEFF: // Byte Order Mark
	      case 0x2028: // Line Separator
	      case 0x2029:
	        // Paragraph Separator
	        return 'ws';
	    }

	    // a-z, A-Z
	    if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	      return 'ident';
	    }

	    // 1-9
	    if (code >= 0x31 && code <= 0x39) {
	      return 'number';
	    }

	    return 'else';
	  }

	  /**
	   * Format a subPath, return its plain form if it is
	   * a literal string or number. Otherwise prepend the
	   * dynamic indicator (*).
	   *
	   * @param {String} path
	   * @return {String}
	   */

	  function formatSubPath(path) {
	    var trimmed = path.trim();
	    // invalid leading 0
	    if (path.charAt(0) === '0' && isNaN(path)) {
	      return false;
	    }
	    return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	  }

	  /**
	   * Parse a string path into an array of segments
	   *
	   * @param {String} path
	   * @return {Array|undefined}
	   */

	  function parse(path) {
	    var keys = [];
	    var index = -1;
	    var mode = BEFORE_PATH;
	    var subPathDepth = 0;
	    var c, newChar, key, type, transition, action, typeMap;

	    var actions = [];

	    actions[PUSH] = function () {
	      if (key !== undefined) {
	        keys.push(key);
	        key = undefined;
	      }
	    };

	    actions[APPEND] = function () {
	      if (key === undefined) {
	        key = newChar;
	      } else {
	        key += newChar;
	      }
	    };

	    actions[INC_SUB_PATH_DEPTH] = function () {
	      actions[APPEND]();
	      subPathDepth++;
	    };

	    actions[PUSH_SUB_PATH] = function () {
	      if (subPathDepth > 0) {
	        subPathDepth--;
	        mode = IN_SUB_PATH;
	        actions[APPEND]();
	      } else {
	        subPathDepth = 0;
	        key = formatSubPath(key);
	        if (key === false) {
	          return false;
	        } else {
	          actions[PUSH]();
	        }
	      }
	    };

	    function maybeUnescapeQuote() {
	      var nextChar = path[index + 1];
	      if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	        index++;
	        newChar = '\\' + nextChar;
	        actions[APPEND]();
	        return true;
	      }
	    }

	    while (mode != null) {
	      index++;
	      c = path[index];

	      if (c === '\\' && maybeUnescapeQuote()) {
	        continue;
	      }

	      type = getPathCharType(c);
	      typeMap = pathStateMachine[mode];
	      transition = typeMap[type] || typeMap['else'] || ERROR;

	      if (transition === ERROR) {
	        return; // parse error
	      }

	      mode = transition[0];
	      action = actions[transition[1]];
	      if (action) {
	        newChar = transition[2];
	        newChar = newChar === undefined ? c : newChar;
	        if (action() === false) {
	          return;
	        }
	      }

	      if (mode === AFTER_PATH) {
	        keys.raw = path;
	        return keys;
	      }
	    }
	  }

	  /**
	   * External parse that check for a cache hit first
	   *
	   * @param {String} path
	   * @return {Array|undefined}
	   */

	  function parsePath(path) {
	    var hit = pathCache.get(path);
	    if (!hit) {
	      hit = parse(path);
	      if (hit) {
	        pathCache.put(path, hit);
	      }
	    }
	    return hit;
	  }

	  /**
	   * Get from an object from a path string
	   *
	   * @param {Object} obj
	   * @param {String} path
	   */

	  function getPath(obj, path) {
	    return parseExpression(path).get(obj);
	  }

	  /**
	   * Warn against setting non-existent root path on a vm.
	   */

	  var warnNonExistent;
	  if (true) {
	    warnNonExistent = function (path, vm) {
	      warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.', vm);
	    };
	  }

	  /**
	   * Set on an object from a path
	   *
	   * @param {Object} obj
	   * @param {String | Array} path
	   * @param {*} val
	   */

	  function setPath(obj, path, val) {
	    var original = obj;
	    if (typeof path === 'string') {
	      path = parse(path);
	    }
	    if (!path || !isObject(obj)) {
	      return false;
	    }
	    var last, key;
	    for (var i = 0, l = path.length; i < l; i++) {
	      last = obj;
	      key = path[i];
	      if (key.charAt(0) === '*') {
	        key = parseExpression(key.slice(1)).get.call(original, original);
	      }
	      if (i < l - 1) {
	        obj = obj[key];
	        if (!isObject(obj)) {
	          obj = {};
	          if ('development' !== 'production' && last._isVue) {
	            warnNonExistent(path, last);
	          }
	          set(last, key, obj);
	        }
	      } else {
	        if (isArray(obj)) {
	          obj.$set(key, val);
	        } else if (key in obj) {
	          obj[key] = val;
	        } else {
	          if ('development' !== 'production' && obj._isVue) {
	            warnNonExistent(path, obj);
	          }
	          set(obj, key, val);
	        }
	      }
	    }
	    return true;
	  }

	var path = Object.freeze({
	    parsePath: parsePath,
	    getPath: getPath,
	    setPath: setPath
	  });

	  var expressionCache = new Cache(1000);

	  var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	  var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');

	  // keywords that don't make sense inside expressions
	  var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'protected,static,interface,private,public';
	  var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');

	  var wsRE = /\s/g;
	  var newlineRE = /\n/g;
	  var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
	  var restoreRE = /"(\d+)"/g;
	  var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	  var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
	  var booleanLiteralRE = /^(?:true|false)$/;

	  /**
	   * Save / Rewrite / Restore
	   *
	   * When rewriting paths found in an expression, it is
	   * possible for the same letter sequences to be found in
	   * strings and Object literal property keys. Therefore we
	   * remove and store these parts in a temporary array, and
	   * restore them after the path rewrite.
	   */

	  var saved = [];

	  /**
	   * Save replacer
	   *
	   * The save regex can match two possible cases:
	   * 1. An opening object literal
	   * 2. A string
	   * If matched as a plain string, we need to escape its
	   * newlines, since the string needs to be preserved when
	   * generating the function body.
	   *
	   * @param {String} str
	   * @param {String} isString - str if matched as a string
	   * @return {String} - placeholder with index
	   */

	  function save(str, isString) {
	    var i = saved.length;
	    saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	    return '"' + i + '"';
	  }

	  /**
	   * Path rewrite replacer
	   *
	   * @param {String} raw
	   * @return {String}
	   */

	  function rewrite(raw) {
	    var c = raw.charAt(0);
	    var path = raw.slice(1);
	    if (allowedKeywordsRE.test(path)) {
	      return raw;
	    } else {
	      path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	      return c + 'scope.' + path;
	    }
	  }

	  /**
	   * Restore replacer
	   *
	   * @param {String} str
	   * @param {String} i - matched save index
	   * @return {String}
	   */

	  function restore(str, i) {
	    return saved[i];
	  }

	  /**
	   * Rewrite an expression, prefixing all path accessors with
	   * `scope.` and generate getter/setter functions.
	   *
	   * @param {String} exp
	   * @return {Function}
	   */

	  function compileGetter(exp) {
	    if (improperKeywordsRE.test(exp)) {
	      'development' !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	    }
	    // reset state
	    saved.length = 0;
	    // save strings and object literal keys
	    var body = exp.replace(saveRE, save).replace(wsRE, '');
	    // rewrite all paths
	    // pad 1 space here becaue the regex matches 1 extra char
	    body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
	    return makeGetterFn(body);
	  }

	  /**
	   * Build a getter function. Requires eval.
	   *
	   * We isolate the try/catch so it doesn't affect the
	   * optimization of the parse function when it is not called.
	   *
	   * @param {String} body
	   * @return {Function|undefined}
	   */

	  function makeGetterFn(body) {
	    try {
	      /* eslint-disable no-new-func */
	      return new Function('scope', 'return ' + body + ';');
	      /* eslint-enable no-new-func */
	    } catch (e) {
	      'development' !== 'production' && warn('Invalid expression. ' + 'Generated function body: ' + body);
	    }
	  }

	  /**
	   * Compile a setter function for the expression.
	   *
	   * @param {String} exp
	   * @return {Function|undefined}
	   */

	  function compileSetter(exp) {
	    var path = parsePath(exp);
	    if (path) {
	      return function (scope, val) {
	        setPath(scope, path, val);
	      };
	    } else {
	      'development' !== 'production' && warn('Invalid setter expression: ' + exp);
	    }
	  }

	  /**
	   * Parse an expression into re-written getter/setters.
	   *
	   * @param {String} exp
	   * @param {Boolean} needSet
	   * @return {Function}
	   */

	  function parseExpression(exp, needSet) {
	    exp = exp.trim();
	    // try cache
	    var hit = expressionCache.get(exp);
	    if (hit) {
	      if (needSet && !hit.set) {
	        hit.set = compileSetter(hit.exp);
	      }
	      return hit;
	    }
	    var res = { exp: exp };
	    res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	    // optimized super simple getter
	    ? makeGetterFn('scope.' + exp)
	    // dynamic getter
	    : compileGetter(exp);
	    if (needSet) {
	      res.set = compileSetter(exp);
	    }
	    expressionCache.put(exp, res);
	    return res;
	  }

	  /**
	   * Check if an expression is a simple path.
	   *
	   * @param {String} exp
	   * @return {Boolean}
	   */

	  function isSimplePath(exp) {
	    return pathTestRE.test(exp) &&
	    // don't treat true/false as paths
	    !booleanLiteralRE.test(exp) &&
	    // Math constants e.g. Math.PI, Math.E etc.
	    exp.slice(0, 5) !== 'Math.';
	  }

	var expression = Object.freeze({
	    parseExpression: parseExpression,
	    isSimplePath: isSimplePath
	  });

	  // we have two separate queues: one for directive updates
	  // and one for user watcher registered via $watch().
	  // we want to guarantee directive updates to be called
	  // before user watchers so that when user watchers are
	  // triggered, the DOM would have already been in updated
	  // state.

	  var queue = [];
	  var userQueue = [];
	  var has = {};
	  var circular = {};
	  var waiting = false;

	  /**
	   * Reset the batcher's state.
	   */

	  function resetBatcherState() {
	    queue.length = 0;
	    userQueue.length = 0;
	    has = {};
	    circular = {};
	    waiting = false;
	  }

	  /**
	   * Flush both queues and run the watchers.
	   */

	  function flushBatcherQueue() {
	    var _again = true;

	    _function: while (_again) {
	      _again = false;

	      runBatcherQueue(queue);
	      runBatcherQueue(userQueue);
	      // user watchers triggered more watchers,
	      // keep flushing until it depletes
	      if (queue.length) {
	        _again = true;
	        continue _function;
	      }
	      // dev tool hook
	      /* istanbul ignore if */
	      if (devtools && config.devtools) {
	        devtools.emit('flush');
	      }
	      resetBatcherState();
	    }
	  }

	  /**
	   * Run the watchers in a single queue.
	   *
	   * @param {Array} queue
	   */

	  function runBatcherQueue(queue) {
	    // do not cache length because more watchers might be pushed
	    // as we run existing watchers
	    for (var i = 0; i < queue.length; i++) {
	      var watcher = queue[i];
	      var id = watcher.id;
	      has[id] = null;
	      watcher.run();
	      // in dev build, check and stop circular updates.
	      if ('development' !== 'production' && has[id] != null) {
	        circular[id] = (circular[id] || 0) + 1;
	        if (circular[id] > config._maxUpdateCount) {
	          warn('You may have an infinite update loop for watcher ' + 'with expression "' + watcher.expression + '"', watcher.vm);
	          break;
	        }
	      }
	    }
	    queue.length = 0;
	  }

	  /**
	   * Push a watcher into the watcher queue.
	   * Jobs with duplicate IDs will be skipped unless it's
	   * pushed when the queue is being flushed.
	   *
	   * @param {Watcher} watcher
	   *   properties:
	   *   - {Number} id
	   *   - {Function} run
	   */

	  function pushWatcher(watcher) {
	    var id = watcher.id;
	    if (has[id] == null) {
	      // push watcher into appropriate queue
	      var q = watcher.user ? userQueue : queue;
	      has[id] = q.length;
	      q.push(watcher);
	      // queue the flush
	      if (!waiting) {
	        waiting = true;
	        nextTick(flushBatcherQueue);
	      }
	    }
	  }

	  var uid$2 = 0;

	  /**
	   * A watcher parses an expression, collects dependencies,
	   * and fires callback when the expression value changes.
	   * This is used for both the $watch() api and directives.
	   *
	   * @param {Vue} vm
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} options
	   *                 - {Array} filters
	   *                 - {Boolean} twoWay
	   *                 - {Boolean} deep
	   *                 - {Boolean} user
	   *                 - {Boolean} sync
	   *                 - {Boolean} lazy
	   *                 - {Function} [preProcess]
	   *                 - {Function} [postProcess]
	   * @constructor
	   */
	  function Watcher(vm, expOrFn, cb, options) {
	    // mix in options
	    if (options) {
	      extend(this, options);
	    }
	    var isFn = typeof expOrFn === 'function';
	    this.vm = vm;
	    vm._watchers.push(this);
	    this.expression = expOrFn;
	    this.cb = cb;
	    this.id = ++uid$2; // uid for batching
	    this.active = true;
	    this.dirty = this.lazy; // for lazy watchers
	    this.deps = [];
	    this.newDeps = [];
	    this.depIds = new _Set();
	    this.newDepIds = new _Set();
	    this.prevError = null; // for async error stacks
	    // parse expression for getter/setter
	    if (isFn) {
	      this.getter = expOrFn;
	      this.setter = undefined;
	    } else {
	      var res = parseExpression(expOrFn, this.twoWay);
	      this.getter = res.get;
	      this.setter = res.set;
	    }
	    this.value = this.lazy ? undefined : this.get();
	    // state for avoiding false triggers for deep and Array
	    // watchers during vm._digest()
	    this.queued = this.shallow = false;
	  }

	  /**
	   * Evaluate the getter, and re-collect dependencies.
	   */

	  Watcher.prototype.get = function () {
	    this.beforeGet();
	    var scope = this.scope || this.vm;
	    var value;
	    try {
	      value = this.getter.call(scope, scope);
	    } catch (e) {
	      if ('development' !== 'production' && config.warnExpressionErrors) {
	        warn('Error when evaluating expression ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	      }
	    }
	    // "touch" every property so they are all tracked as
	    // dependencies for deep watching
	    if (this.deep) {
	      traverse(value);
	    }
	    if (this.preProcess) {
	      value = this.preProcess(value);
	    }
	    if (this.filters) {
	      value = scope._applyFilters(value, null, this.filters, false);
	    }
	    if (this.postProcess) {
	      value = this.postProcess(value);
	    }
	    this.afterGet();
	    return value;
	  };

	  /**
	   * Set the corresponding value with the setter.
	   *
	   * @param {*} value
	   */

	  Watcher.prototype.set = function (value) {
	    var scope = this.scope || this.vm;
	    if (this.filters) {
	      value = scope._applyFilters(value, this.value, this.filters, true);
	    }
	    try {
	      this.setter.call(scope, scope, value);
	    } catch (e) {
	      if ('development' !== 'production' && config.warnExpressionErrors) {
	        warn('Error when evaluating setter ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	      }
	    }
	    // two-way sync for v-for alias
	    var forContext = scope.$forContext;
	    if (forContext && forContext.alias === this.expression) {
	      if (forContext.filters) {
	        'development' !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.', this.vm);
	        return;
	      }
	      forContext._withLock(function () {
	        if (scope.$key) {
	          // original is an object
	          forContext.rawValue[scope.$key] = value;
	        } else {
	          forContext.rawValue.$set(scope.$index, value);
	        }
	      });
	    }
	  };

	  /**
	   * Prepare for dependency collection.
	   */

	  Watcher.prototype.beforeGet = function () {
	    Dep.target = this;
	  };

	  /**
	   * Add a dependency to this directive.
	   *
	   * @param {Dep} dep
	   */

	  Watcher.prototype.addDep = function (dep) {
	    var id = dep.id;
	    if (!this.newDepIds.has(id)) {
	      this.newDepIds.add(id);
	      this.newDeps.push(dep);
	      if (!this.depIds.has(id)) {
	        dep.addSub(this);
	      }
	    }
	  };

	  /**
	   * Clean up for dependency collection.
	   */

	  Watcher.prototype.afterGet = function () {
	    Dep.target = null;
	    var i = this.deps.length;
	    while (i--) {
	      var dep = this.deps[i];
	      if (!this.newDepIds.has(dep.id)) {
	        dep.removeSub(this);
	      }
	    }
	    var tmp = this.depIds;
	    this.depIds = this.newDepIds;
	    this.newDepIds = tmp;
	    this.newDepIds.clear();
	    tmp = this.deps;
	    this.deps = this.newDeps;
	    this.newDeps = tmp;
	    this.newDeps.length = 0;
	  };

	  /**
	   * Subscriber interface.
	   * Will be called when a dependency changes.
	   *
	   * @param {Boolean} shallow
	   */

	  Watcher.prototype.update = function (shallow) {
	    if (this.lazy) {
	      this.dirty = true;
	    } else if (this.sync || !config.async) {
	      this.run();
	    } else {
	      // if queued, only overwrite shallow with non-shallow,
	      // but not the other way around.
	      this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	      this.queued = true;
	      // record before-push error stack in debug mode
	      /* istanbul ignore if */
	      if ('development' !== 'production' && config.debug) {
	        this.prevError = new Error('[vue] async stack trace');
	      }
	      pushWatcher(this);
	    }
	  };

	  /**
	   * Batcher job interface.
	   * Will be called by the batcher.
	   */

	  Watcher.prototype.run = function () {
	    if (this.active) {
	      var value = this.get();
	      if (value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated; but only do so if this is a
	      // non-shallow update (caused by a vm digest).
	      (isObject(value) || this.deep) && !this.shallow) {
	        // set new value
	        var oldValue = this.value;
	        this.value = value;
	        // in debug + async mode, when a watcher callbacks
	        // throws, we also throw the saved before-push error
	        // so the full cross-tick stack trace is available.
	        var prevError = this.prevError;
	        /* istanbul ignore if */
	        if ('development' !== 'production' && config.debug && prevError) {
	          this.prevError = null;
	          try {
	            this.cb.call(this.vm, value, oldValue);
	          } catch (e) {
	            nextTick(function () {
	              throw prevError;
	            }, 0);
	            throw e;
	          }
	        } else {
	          this.cb.call(this.vm, value, oldValue);
	        }
	      }
	      this.queued = this.shallow = false;
	    }
	  };

	  /**
	   * Evaluate the value of the watcher.
	   * This only gets called for lazy watchers.
	   */

	  Watcher.prototype.evaluate = function () {
	    // avoid overwriting another watcher that is being
	    // collected.
	    var current = Dep.target;
	    this.value = this.get();
	    this.dirty = false;
	    Dep.target = current;
	  };

	  /**
	   * Depend on all deps collected by this watcher.
	   */

	  Watcher.prototype.depend = function () {
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].depend();
	    }
	  };

	  /**
	   * Remove self from all dependencies' subcriber list.
	   */

	  Watcher.prototype.teardown = function () {
	    if (this.active) {
	      // remove self from vm's watcher list
	      // this is a somewhat expensive operation so we skip it
	      // if the vm is being destroyed or is performing a v-for
	      // re-render (the watcher list is then filtered by v-for).
	      if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	        this.vm._watchers.$remove(this);
	      }
	      var i = this.deps.length;
	      while (i--) {
	        this.deps[i].removeSub(this);
	      }
	      this.active = false;
	      this.vm = this.cb = this.value = null;
	    }
	  };

	  /**
	   * Recrusively traverse an object to evoke all converted
	   * getters, so that every nested property inside the object
	   * is collected as a "deep" dependency.
	   *
	   * @param {*} val
	   */

	  var seenObjects = new _Set();
	  function traverse(val, seen) {
	    var i = undefined,
	        keys = undefined;
	    if (!seen) {
	      seen = seenObjects;
	      seen.clear();
	    }
	    var isA = isArray(val);
	    var isO = isObject(val);
	    if (isA || isO) {
	      if (val.__ob__) {
	        var depId = val.__ob__.dep.id;
	        if (seen.has(depId)) {
	          return;
	        } else {
	          seen.add(depId);
	        }
	      }
	      if (isA) {
	        i = val.length;
	        while (i--) traverse(val[i], seen);
	      } else if (isO) {
	        keys = Object.keys(val);
	        i = keys.length;
	        while (i--) traverse(val[keys[i]], seen);
	      }
	    }
	  }

	  var text$1 = {

	    bind: function bind() {
	      this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	    },

	    update: function update(value) {
	      this.el[this.attr] = _toString(value);
	    }
	  };

	  var templateCache = new Cache(1000);
	  var idSelectorCache = new Cache(1000);

	  var map = {
	    efault: [0, '', ''],
	    legend: [1, '<fieldset>', '</fieldset>'],
	    tr: [2, '<table><tbody>', '</tbody></table>'],
	    col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	  };

	  map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	  map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

	  map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

	  map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];

	  /**
	   * Check if a node is a supported template node with a
	   * DocumentFragment content.
	   *
	   * @param {Node} node
	   * @return {Boolean}
	   */

	  function isRealTemplate(node) {
	    return isTemplate(node) && isFragment(node.content);
	  }

	  var tagRE$1 = /<([\w:-]+)/;
	  var entityRE = /&#?\w+?;/;

	  /**
	   * Convert a string template to a DocumentFragment.
	   * Determines correct wrapping by tag types. Wrapping
	   * strategy found in jQuery & component/domify.
	   *
	   * @param {String} templateString
	   * @param {Boolean} raw
	   * @return {DocumentFragment}
	   */

	  function stringToFragment(templateString, raw) {
	    // try a cache hit first
	    var cacheKey = raw ? templateString : templateString.trim();
	    var hit = templateCache.get(cacheKey);
	    if (hit) {
	      return hit;
	    }

	    var frag = document.createDocumentFragment();
	    var tagMatch = templateString.match(tagRE$1);
	    var entityMatch = entityRE.test(templateString);

	    if (!tagMatch && !entityMatch) {
	      // text only, return a single text node.
	      frag.appendChild(document.createTextNode(templateString));
	    } else {
	      var tag = tagMatch && tagMatch[1];
	      var wrap = map[tag] || map.efault;
	      var depth = wrap[0];
	      var prefix = wrap[1];
	      var suffix = wrap[2];
	      var node = document.createElement('div');

	      node.innerHTML = prefix + templateString + suffix;
	      while (depth--) {
	        node = node.lastChild;
	      }

	      var child;
	      /* eslint-disable no-cond-assign */
	      while (child = node.firstChild) {
	        /* eslint-enable no-cond-assign */
	        frag.appendChild(child);
	      }
	    }
	    if (!raw) {
	      trimNode(frag);
	    }
	    templateCache.put(cacheKey, frag);
	    return frag;
	  }

	  /**
	   * Convert a template node to a DocumentFragment.
	   *
	   * @param {Node} node
	   * @return {DocumentFragment}
	   */

	  function nodeToFragment(node) {
	    // if its a template tag and the browser supports it,
	    // its content is already a document fragment. However, iOS Safari has
	    // bug when using directly cloned template content with touch
	    // events and can cause crashes when the nodes are removed from DOM, so we
	    // have to treat template elements as string templates. (#2805)
	    /* istanbul ignore if */
	    if (isRealTemplate(node)) {
	      return stringToFragment(node.innerHTML);
	    }
	    // script template
	    if (node.tagName === 'SCRIPT') {
	      return stringToFragment(node.textContent);
	    }
	    // normal node, clone it to avoid mutating the original
	    var clonedNode = cloneNode(node);
	    var frag = document.createDocumentFragment();
	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = clonedNode.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	    trimNode(frag);
	    return frag;
	  }

	  // Test for the presence of the Safari template cloning bug
	  // https://bugs.webkit.org/showug.cgi?id=137755
	  var hasBrokenTemplate = (function () {
	    /* istanbul ignore else */
	    if (inBrowser) {
	      var a = document.createElement('div');
	      a.innerHTML = '<template>1</template>';
	      return !a.cloneNode(true).firstChild.innerHTML;
	    } else {
	      return false;
	    }
	  })();

	  // Test for IE10/11 textarea placeholder clone bug
	  var hasTextareaCloneBug = (function () {
	    /* istanbul ignore else */
	    if (inBrowser) {
	      var t = document.createElement('textarea');
	      t.placeholder = 't';
	      return t.cloneNode(true).value === 't';
	    } else {
	      return false;
	    }
	  })();

	  /**
	   * 1. Deal with Safari cloning nested <template> bug by
	   *    manually cloning all template instances.
	   * 2. Deal with IE10/11 textarea placeholder bug by setting
	   *    the correct value after cloning.
	   *
	   * @param {Element|DocumentFragment} node
	   * @return {Element|DocumentFragment}
	   */

	  function cloneNode(node) {
	    /* istanbul ignore if */
	    if (!node.querySelectorAll) {
	      return node.cloneNode();
	    }
	    var res = node.cloneNode(true);
	    var i, original, cloned;
	    /* istanbul ignore if */
	    if (hasBrokenTemplate) {
	      var tempClone = res;
	      if (isRealTemplate(node)) {
	        node = node.content;
	        tempClone = res.content;
	      }
	      original = node.querySelectorAll('template');
	      if (original.length) {
	        cloned = tempClone.querySelectorAll('template');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	        }
	      }
	    }
	    /* istanbul ignore if */
	    if (hasTextareaCloneBug) {
	      if (node.tagName === 'TEXTAREA') {
	        res.value = node.value;
	      } else {
	        original = node.querySelectorAll('textarea');
	        if (original.length) {
	          cloned = res.querySelectorAll('textarea');
	          i = cloned.length;
	          while (i--) {
	            cloned[i].value = original[i].value;
	          }
	        }
	      }
	    }
	    return res;
	  }

	  /**
	   * Process the template option and normalizes it into a
	   * a DocumentFragment that can be used as a partial or a
	   * instance template.
	   *
	   * @param {*} template
	   *        Possible values include:
	   *        - DocumentFragment object
	   *        - Node object of type Template
	   *        - id selector: '#some-template-id'
	   *        - template string: '<div><span>{{msg}}</span></div>'
	   * @param {Boolean} shouldClone
	   * @param {Boolean} raw
	   *        inline HTML interpolation. Do not check for id
	   *        selector and keep whitespace in the string.
	   * @return {DocumentFragment|undefined}
	   */

	  function parseTemplate(template, shouldClone, raw) {
	    var node, frag;

	    // if the template is already a document fragment,
	    // do nothing
	    if (isFragment(template)) {
	      trimNode(template);
	      return shouldClone ? cloneNode(template) : template;
	    }

	    if (typeof template === 'string') {
	      // id selector
	      if (!raw && template.charAt(0) === '#') {
	        // id selector can be cached too
	        frag = idSelectorCache.get(template);
	        if (!frag) {
	          node = document.getElementById(template.slice(1));
	          if (node) {
	            frag = nodeToFragment(node);
	            // save selector to cache
	            idSelectorCache.put(template, frag);
	          }
	        }
	      } else {
	        // normal string template
	        frag = stringToFragment(template, raw);
	      }
	    } else if (template.nodeType) {
	      // a direct node
	      frag = nodeToFragment(template);
	    }

	    return frag && shouldClone ? cloneNode(frag) : frag;
	  }

	var template = Object.freeze({
	    cloneNode: cloneNode,
	    parseTemplate: parseTemplate
	  });

	  var html = {

	    bind: function bind() {
	      // a comment node means this is a binding for
	      // {{{ inline unescaped html }}}
	      if (this.el.nodeType === 8) {
	        // hold nodes
	        this.nodes = [];
	        // replace the placeholder with proper anchor
	        this.anchor = createAnchor('v-html');
	        replace(this.el, this.anchor);
	      }
	    },

	    update: function update(value) {
	      value = _toString(value);
	      if (this.nodes) {
	        this.swap(value);
	      } else {
	        this.el.innerHTML = value;
	      }
	    },

	    swap: function swap(value) {
	      // remove old nodes
	      var i = this.nodes.length;
	      while (i--) {
	        remove(this.nodes[i]);
	      }
	      // convert new value to a fragment
	      // do not attempt to retrieve from id selector
	      var frag = parseTemplate(value, true, true);
	      // save a reference to these nodes so we can remove later
	      this.nodes = toArray(frag.childNodes);
	      before(frag, this.anchor);
	    }
	  };

	  /**
	   * Abstraction for a partially-compiled fragment.
	   * Can optionally compile content with a child scope.
	   *
	   * @param {Function} linker
	   * @param {Vue} vm
	   * @param {DocumentFragment} frag
	   * @param {Vue} [host]
	   * @param {Object} [scope]
	   * @param {Fragment} [parentFrag]
	   */
	  function Fragment(linker, vm, frag, host, scope, parentFrag) {
	    this.children = [];
	    this.childFrags = [];
	    this.vm = vm;
	    this.scope = scope;
	    this.inserted = false;
	    this.parentFrag = parentFrag;
	    if (parentFrag) {
	      parentFrag.childFrags.push(this);
	    }
	    this.unlink = linker(vm, frag, host, scope, this);
	    var single = this.single = frag.childNodes.length === 1 &&
	    // do not go single mode if the only node is an anchor
	    !frag.childNodes[0].__v_anchor;
	    if (single) {
	      this.node = frag.childNodes[0];
	      this.before = singleBefore;
	      this.remove = singleRemove;
	    } else {
	      this.node = createAnchor('fragment-start');
	      this.end = createAnchor('fragment-end');
	      this.frag = frag;
	      prepend(this.node, frag);
	      frag.appendChild(this.end);
	      this.before = multiBefore;
	      this.remove = multiRemove;
	    }
	    this.node.__v_frag = this;
	  }

	  /**
	   * Call attach/detach for all components contained within
	   * this fragment. Also do so recursively for all child
	   * fragments.
	   *
	   * @param {Function} hook
	   */

	  Fragment.prototype.callHook = function (hook) {
	    var i, l;
	    for (i = 0, l = this.childFrags.length; i < l; i++) {
	      this.childFrags[i].callHook(hook);
	    }
	    for (i = 0, l = this.children.length; i < l; i++) {
	      hook(this.children[i]);
	    }
	  };

	  /**
	   * Insert fragment before target, single node version
	   *
	   * @param {Node} target
	   * @param {Boolean} withTransition
	   */

	  function singleBefore(target, withTransition) {
	    this.inserted = true;
	    var method = withTransition !== false ? beforeWithTransition : before;
	    method(this.node, target, this.vm);
	    if (inDoc(this.node)) {
	      this.callHook(attach);
	    }
	  }

	  /**
	   * Remove fragment, single node version
	   */

	  function singleRemove() {
	    this.inserted = false;
	    var shouldCallRemove = inDoc(this.node);
	    var self = this;
	    this.beforeRemove();
	    removeWithTransition(this.node, this.vm, function () {
	      if (shouldCallRemove) {
	        self.callHook(detach);
	      }
	      self.destroy();
	    });
	  }

	  /**
	   * Insert fragment before target, multi-nodes version
	   *
	   * @param {Node} target
	   * @param {Boolean} withTransition
	   */

	  function multiBefore(target, withTransition) {
	    this.inserted = true;
	    var vm = this.vm;
	    var method = withTransition !== false ? beforeWithTransition : before;
	    mapNodeRange(this.node, this.end, function (node) {
	      method(node, target, vm);
	    });
	    if (inDoc(this.node)) {
	      this.callHook(attach);
	    }
	  }

	  /**
	   * Remove fragment, multi-nodes version
	   */

	  function multiRemove() {
	    this.inserted = false;
	    var self = this;
	    var shouldCallRemove = inDoc(this.node);
	    this.beforeRemove();
	    removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	      if (shouldCallRemove) {
	        self.callHook(detach);
	      }
	      self.destroy();
	    });
	  }

	  /**
	   * Prepare the fragment for removal.
	   */

	  Fragment.prototype.beforeRemove = function () {
	    var i, l;
	    for (i = 0, l = this.childFrags.length; i < l; i++) {
	      // call the same method recursively on child
	      // fragments, depth-first
	      this.childFrags[i].beforeRemove(false);
	    }
	    for (i = 0, l = this.children.length; i < l; i++) {
	      // Call destroy for all contained instances,
	      // with remove:false and defer:true.
	      // Defer is necessary because we need to
	      // keep the children to call detach hooks
	      // on them.
	      this.children[i].$destroy(false, true);
	    }
	    var dirs = this.unlink.dirs;
	    for (i = 0, l = dirs.length; i < l; i++) {
	      // disable the watchers on all the directives
	      // so that the rendered content stays the same
	      // during removal.
	      dirs[i]._watcher && dirs[i]._watcher.teardown();
	    }
	  };

	  /**
	   * Destroy the fragment.
	   */

	  Fragment.prototype.destroy = function () {
	    if (this.parentFrag) {
	      this.parentFrag.childFrags.$remove(this);
	    }
	    this.node.__v_frag = null;
	    this.unlink();
	  };

	  /**
	   * Call attach hook for a Vue instance.
	   *
	   * @param {Vue} child
	   */

	  function attach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }

	  /**
	   * Call detach hook for a Vue instance.
	   *
	   * @param {Vue} child
	   */

	  function detach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }

	  var linkerCache = new Cache(5000);

	  /**
	   * A factory that can be used to create instances of a
	   * fragment. Caches the compiled linker if possible.
	   *
	   * @param {Vue} vm
	   * @param {Element|String} el
	   */
	  function FragmentFactory(vm, el) {
	    this.vm = vm;
	    var template;
	    var isString = typeof el === 'string';
	    if (isString || isTemplate(el) && !el.hasAttribute('v-if')) {
	      template = parseTemplate(el, true);
	    } else {
	      template = document.createDocumentFragment();
	      template.appendChild(el);
	    }
	    this.template = template;
	    // linker can be cached, but only for components
	    var linker;
	    var cid = vm.constructor.cid;
	    if (cid > 0) {
	      var cacheId = cid + (isString ? el : getOuterHTML(el));
	      linker = linkerCache.get(cacheId);
	      if (!linker) {
	        linker = compile(template, vm.$options, true);
	        linkerCache.put(cacheId, linker);
	      }
	    } else {
	      linker = compile(template, vm.$options, true);
	    }
	    this.linker = linker;
	  }

	  /**
	   * Create a fragment instance with given host and scope.
	   *
	   * @param {Vue} host
	   * @param {Object} scope
	   * @param {Fragment} parentFrag
	   */

	  FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	    var frag = cloneNode(this.template);
	    return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	  };

	  var ON = 700;
	  var MODEL = 800;
	  var BIND = 850;
	  var TRANSITION = 1100;
	  var EL = 1500;
	  var COMPONENT = 1500;
	  var PARTIAL = 1750;
	  var IF = 2100;
	  var FOR = 2200;
	  var SLOT = 2300;

	  var uid$3 = 0;

	  var vFor = {

	    priority: FOR,
	    terminal: true,

	    params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],

	    bind: function bind() {
	      // support "item in/of items" syntax
	      var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
	      if (inMatch) {
	        var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	        if (itMatch) {
	          this.iterator = itMatch[1].trim();
	          this.alias = itMatch[2].trim();
	        } else {
	          this.alias = inMatch[1].trim();
	        }
	        this.expression = inMatch[2];
	      }

	      if (!this.alias) {
	        'development' !== 'production' && warn('Invalid v-for expression "' + this.descriptor.raw + '": ' + 'alias is required.', this.vm);
	        return;
	      }

	      // uid as a cache identifier
	      this.id = '__v-for__' + ++uid$3;

	      // check if this is an option list,
	      // so that we know if we need to update the <select>'s
	      // v-model when the option list has changed.
	      // because v-model has a lower priority than v-for,
	      // the v-model is not bound here yet, so we have to
	      // retrive it in the actual updateModel() function.
	      var tag = this.el.tagName;
	      this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';

	      // setup anchor nodes
	      this.start = createAnchor('v-for-start');
	      this.end = createAnchor('v-for-end');
	      replace(this.el, this.end);
	      before(this.start, this.end);

	      // cache
	      this.cache = Object.create(null);

	      // fragment factory
	      this.factory = new FragmentFactory(this.vm, this.el);
	    },

	    update: function update(data) {
	      this.diff(data);
	      this.updateRef();
	      this.updateModel();
	    },

	    /**
	     * Diff, based on new data and old data, determine the
	     * minimum amount of DOM manipulations needed to make the
	     * DOM reflect the new data Array.
	     *
	     * The algorithm diffs the new data Array by storing a
	     * hidden reference to an owner vm instance on previously
	     * seen data. This allows us to achieve O(n) which is
	     * better than a levenshtein distance based algorithm,
	     * which is O(m * n).
	     *
	     * @param {Array} data
	     */

	    diff: function diff(data) {
	      // check if the Array was converted from an Object
	      var item = data[0];
	      var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');

	      var trackByKey = this.params.trackBy;
	      var oldFrags = this.frags;
	      var frags = this.frags = new Array(data.length);
	      var alias = this.alias;
	      var iterator = this.iterator;
	      var start = this.start;
	      var end = this.end;
	      var inDocument = inDoc(start);
	      var init = !oldFrags;
	      var i, l, frag, key, value, primitive;

	      // First pass, go through the new Array and fill up
	      // the new frags array. If a piece of data has a cached
	      // instance for it, we reuse it. Otherwise build a new
	      // instance.
	      for (i = 0, l = data.length; i < l; i++) {
	        item = data[i];
	        key = convertedFromObject ? item.$key : null;
	        value = convertedFromObject ? item.$value : item;
	        primitive = !isObject(value);
	        frag = !init && this.getCachedFrag(value, i, key);
	        if (frag) {
	          // reusable fragment
	          frag.reused = true;
	          // update $index
	          frag.scope.$index = i;
	          // update $key
	          if (key) {
	            frag.scope.$key = key;
	          }
	          // update iterator
	          if (iterator) {
	            frag.scope[iterator] = key !== null ? key : i;
	          }
	          // update data for track-by, object repeat &
	          // primitive values.
	          if (trackByKey || convertedFromObject || primitive) {
	            withoutConversion(function () {
	              frag.scope[alias] = value;
	            });
	          }
	        } else {
	          // new isntance
	          frag = this.create(value, alias, i, key);
	          frag.fresh = !init;
	        }
	        frags[i] = frag;
	        if (init) {
	          frag.before(end);
	        }
	      }

	      // we're done for the initial render.
	      if (init) {
	        return;
	      }

	      // Second pass, go through the old fragments and
	      // destroy those who are not reused (and remove them
	      // from cache)
	      var removalIndex = 0;
	      var totalRemoved = oldFrags.length - frags.length;
	      // when removing a large number of fragments, watcher removal
	      // turns out to be a perf bottleneck, so we batch the watcher
	      // removals into a single filter call!
	      this.vm._vForRemoving = true;
	      for (i = 0, l = oldFrags.length; i < l; i++) {
	        frag = oldFrags[i];
	        if (!frag.reused) {
	          this.deleteCachedFrag(frag);
	          this.remove(frag, removalIndex++, totalRemoved, inDocument);
	        }
	      }
	      this.vm._vForRemoving = false;
	      if (removalIndex) {
	        this.vm._watchers = this.vm._watchers.filter(function (w) {
	          return w.active;
	        });
	      }

	      // Final pass, move/insert new fragments into the
	      // right place.
	      var targetPrev, prevEl, currentPrev;
	      var insertionIndex = 0;
	      for (i = 0, l = frags.length; i < l; i++) {
	        frag = frags[i];
	        // this is the frag that we should be after
	        targetPrev = frags[i - 1];
	        prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	        if (frag.reused && !frag.staggerCb) {
	          currentPrev = findPrevFrag(frag, start, this.id);
	          if (currentPrev !== targetPrev && (!currentPrev ||
	          // optimization for moving a single item.
	          // thanks to suggestions by @livoras in #1807
	          findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	            this.move(frag, prevEl);
	          }
	        } else {
	          // new instance, or still in stagger.
	          // insert with updated stagger index.
	          this.insert(frag, insertionIndex++, prevEl, inDocument);
	        }
	        frag.reused = frag.fresh = false;
	      }
	    },

	    /**
	     * Create a new fragment instance.
	     *
	     * @param {*} value
	     * @param {String} alias
	     * @param {Number} index
	     * @param {String} [key]
	     * @return {Fragment}
	     */

	    create: function create(value, alias, index, key) {
	      var host = this._host;
	      // create iteration scope
	      var parentScope = this._scope || this.vm;
	      var scope = Object.create(parentScope);
	      // ref holder for the scope
	      scope.$refs = Object.create(parentScope.$refs);
	      scope.$els = Object.create(parentScope.$els);
	      // make sure point $parent to parent scope
	      scope.$parent = parentScope;
	      // for two-way binding on alias
	      scope.$forContext = this;
	      // define scope properties
	      // important: define the scope alias without forced conversion
	      // so that frozen data structures remain non-reactive.
	      withoutConversion(function () {
	        defineReactive(scope, alias, value);
	      });
	      defineReactive(scope, '$index', index);
	      if (key) {
	        defineReactive(scope, '$key', key);
	      } else if (scope.$key) {
	        // avoid accidental fallback
	        def(scope, '$key', null);
	      }
	      if (this.iterator) {
	        defineReactive(scope, this.iterator, key !== null ? key : index);
	      }
	      var frag = this.factory.create(host, scope, this._frag);
	      frag.forId = this.id;
	      this.cacheFrag(value, frag, index, key);
	      return frag;
	    },

	    /**
	     * Update the v-ref on owner vm.
	     */

	    updateRef: function updateRef() {
	      var ref = this.descriptor.ref;
	      if (!ref) return;
	      var hash = (this._scope || this.vm).$refs;
	      var refs;
	      if (!this.fromObject) {
	        refs = this.frags.map(findVmFromFrag);
	      } else {
	        refs = {};
	        this.frags.forEach(function (frag) {
	          refs[frag.scope.$key] = findVmFromFrag(frag);
	        });
	      }
	      hash[ref] = refs;
	    },

	    /**
	     * For option lists, update the containing v-model on
	     * parent <select>.
	     */

	    updateModel: function updateModel() {
	      if (this.isOption) {
	        var parent = this.start.parentNode;
	        var model = parent && parent.__v_model;
	        if (model) {
	          model.forceUpdate();
	        }
	      }
	    },

	    /**
	     * Insert a fragment. Handles staggering.
	     *
	     * @param {Fragment} frag
	     * @param {Number} index
	     * @param {Node} prevEl
	     * @param {Boolean} inDocument
	     */

	    insert: function insert(frag, index, prevEl, inDocument) {
	      if (frag.staggerCb) {
	        frag.staggerCb.cancel();
	        frag.staggerCb = null;
	      }
	      var staggerAmount = this.getStagger(frag, index, null, 'enter');
	      if (inDocument && staggerAmount) {
	        // create an anchor and insert it synchronously,
	        // so that we can resolve the correct order without
	        // worrying about some elements not inserted yet
	        var anchor = frag.staggerAnchor;
	        if (!anchor) {
	          anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	          anchor.__v_frag = frag;
	        }
	        after(anchor, prevEl);
	        var op = frag.staggerCb = cancellable(function () {
	          frag.staggerCb = null;
	          frag.before(anchor);
	          remove(anchor);
	        });
	        setTimeout(op, staggerAmount);
	      } else {
	        var target = prevEl.nextSibling;
	        /* istanbul ignore if */
	        if (!target) {
	          // reset end anchor position in case the position was messed up
	          // by an external drag-n-drop library.
	          after(this.end, prevEl);
	          target = this.end;
	        }
	        frag.before(target);
	      }
	    },

	    /**
	     * Remove a fragment. Handles staggering.
	     *
	     * @param {Fragment} frag
	     * @param {Number} index
	     * @param {Number} total
	     * @param {Boolean} inDocument
	     */

	    remove: function remove(frag, index, total, inDocument) {
	      if (frag.staggerCb) {
	        frag.staggerCb.cancel();
	        frag.staggerCb = null;
	        // it's not possible for the same frag to be removed
	        // twice, so if we have a pending stagger callback,
	        // it means this frag is queued for enter but removed
	        // before its transition started. Since it is already
	        // destroyed, we can just leave it in detached state.
	        return;
	      }
	      var staggerAmount = this.getStagger(frag, index, total, 'leave');
	      if (inDocument && staggerAmount) {
	        var op = frag.staggerCb = cancellable(function () {
	          frag.staggerCb = null;
	          frag.remove();
	        });
	        setTimeout(op, staggerAmount);
	      } else {
	        frag.remove();
	      }
	    },

	    /**
	     * Move a fragment to a new position.
	     * Force no transition.
	     *
	     * @param {Fragment} frag
	     * @param {Node} prevEl
	     */

	    move: function move(frag, prevEl) {
	      // fix a common issue with Sortable:
	      // if prevEl doesn't have nextSibling, this means it's
	      // been dragged after the end anchor. Just re-position
	      // the end anchor to the end of the container.
	      /* istanbul ignore if */
	      if (!prevEl.nextSibling) {
	        this.end.parentNode.appendChild(this.end);
	      }
	      frag.before(prevEl.nextSibling, false);
	    },

	    /**
	     * Cache a fragment using track-by or the object key.
	     *
	     * @param {*} value
	     * @param {Fragment} frag
	     * @param {Number} index
	     * @param {String} [key]
	     */

	    cacheFrag: function cacheFrag(value, frag, index, key) {
	      var trackByKey = this.params.trackBy;
	      var cache = this.cache;
	      var primitive = !isObject(value);
	      var id;
	      if (key || trackByKey || primitive) {
	        id = getTrackByKey(index, key, value, trackByKey);
	        if (!cache[id]) {
	          cache[id] = frag;
	        } else if (trackByKey !== '$index') {
	          'development' !== 'production' && this.warnDuplicate(value);
	        }
	      } else {
	        id = this.id;
	        if (hasOwn(value, id)) {
	          if (value[id] === null) {
	            value[id] = frag;
	          } else {
	            'development' !== 'production' && this.warnDuplicate(value);
	          }
	        } else if (Object.isExtensible(value)) {
	          def(value, id, frag);
	        } else if (true) {
	          warn('Frozen v-for objects cannot be automatically tracked, make sure to ' + 'provide a track-by key.');
	        }
	      }
	      frag.raw = value;
	    },

	    /**
	     * Get a cached fragment from the value/index/key
	     *
	     * @param {*} value
	     * @param {Number} index
	     * @param {String} key
	     * @return {Fragment}
	     */

	    getCachedFrag: function getCachedFrag(value, index, key) {
	      var trackByKey = this.params.trackBy;
	      var primitive = !isObject(value);
	      var frag;
	      if (key || trackByKey || primitive) {
	        var id = getTrackByKey(index, key, value, trackByKey);
	        frag = this.cache[id];
	      } else {
	        frag = value[this.id];
	      }
	      if (frag && (frag.reused || frag.fresh)) {
	        'development' !== 'production' && this.warnDuplicate(value);
	      }
	      return frag;
	    },

	    /**
	     * Delete a fragment from cache.
	     *
	     * @param {Fragment} frag
	     */

	    deleteCachedFrag: function deleteCachedFrag(frag) {
	      var value = frag.raw;
	      var trackByKey = this.params.trackBy;
	      var scope = frag.scope;
	      var index = scope.$index;
	      // fix #948: avoid accidentally fall through to
	      // a parent repeater which happens to have $key.
	      var key = hasOwn(scope, '$key') && scope.$key;
	      var primitive = !isObject(value);
	      if (trackByKey || key || primitive) {
	        var id = getTrackByKey(index, key, value, trackByKey);
	        this.cache[id] = null;
	      } else {
	        value[this.id] = null;
	        frag.raw = null;
	      }
	    },

	    /**
	     * Get the stagger amount for an insertion/removal.
	     *
	     * @param {Fragment} frag
	     * @param {Number} index
	     * @param {Number} total
	     * @param {String} type
	     */

	    getStagger: function getStagger(frag, index, total, type) {
	      type = type + 'Stagger';
	      var trans = frag.node.__v_trans;
	      var hooks = trans && trans.hooks;
	      var hook = hooks && (hooks[type] || hooks.stagger);
	      return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	    },

	    /**
	     * Pre-process the value before piping it through the
	     * filters. This is passed to and called by the watcher.
	     */

	    _preProcess: function _preProcess(value) {
	      // regardless of type, store the un-filtered raw value.
	      this.rawValue = value;
	      return value;
	    },

	    /**
	     * Post-process the value after it has been piped through
	     * the filters. This is passed to and called by the watcher.
	     *
	     * It is necessary for this to be called during the
	     * wathcer's dependency collection phase because we want
	     * the v-for to update when the source Object is mutated.
	     */

	    _postProcess: function _postProcess(value) {
	      if (isArray(value)) {
	        return value;
	      } else if (isPlainObject(value)) {
	        // convert plain object to array.
	        var keys = Object.keys(value);
	        var i = keys.length;
	        var res = new Array(i);
	        var key;
	        while (i--) {
	          key = keys[i];
	          res[i] = {
	            $key: key,
	            $value: value[key]
	          };
	        }
	        return res;
	      } else {
	        if (typeof value === 'number' && !isNaN(value)) {
	          value = range(value);
	        }
	        return value || [];
	      }
	    },

	    unbind: function unbind() {
	      if (this.descriptor.ref) {
	        (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	      }
	      if (this.frags) {
	        var i = this.frags.length;
	        var frag;
	        while (i--) {
	          frag = this.frags[i];
	          this.deleteCachedFrag(frag);
	          frag.destroy();
	        }
	      }
	    }
	  };

	  /**
	   * Helper to find the previous element that is a fragment
	   * anchor. This is necessary because a destroyed frag's
	   * element could still be lingering in the DOM before its
	   * leaving transition finishes, but its inserted flag
	   * should have been set to false so we can skip them.
	   *
	   * If this is a block repeat, we want to make sure we only
	   * return frag that is bound to this v-for. (see #929)
	   *
	   * @param {Fragment} frag
	   * @param {Comment|Text} anchor
	   * @param {String} id
	   * @return {Fragment}
	   */

	  function findPrevFrag(frag, anchor, id) {
	    var el = frag.node.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__v_frag;
	    while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	      el = el.previousSibling;
	      /* istanbul ignore if */
	      if (!el) return;
	      frag = el.__v_frag;
	    }
	    return frag;
	  }

	  /**
	   * Find a vm from a fragment.
	   *
	   * @param {Fragment} frag
	   * @return {Vue|undefined}
	   */

	  function findVmFromFrag(frag) {
	    var node = frag.node;
	    // handle multi-node frag
	    if (frag.end) {
	      while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	        node = node.nextSibling;
	      }
	    }
	    return node.__vue__;
	  }

	  /**
	   * Create a range array from given number.
	   *
	   * @param {Number} n
	   * @return {Array}
	   */

	  function range(n) {
	    var i = -1;
	    var ret = new Array(Math.floor(n));
	    while (++i < n) {
	      ret[i] = i;
	    }
	    return ret;
	  }

	  /**
	   * Get the track by key for an item.
	   *
	   * @param {Number} index
	   * @param {String} key
	   * @param {*} value
	   * @param {String} [trackByKey]
	   */

	  function getTrackByKey(index, key, value, trackByKey) {
	    return trackByKey ? trackByKey === '$index' ? index : trackByKey.charAt(0).match(/\w/) ? getPath(value, trackByKey) : value[trackByKey] : key || value;
	  }

	  if (true) {
	    vFor.warnDuplicate = function (value) {
	      warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.', this.vm);
	    };
	  }

	  var vIf = {

	    priority: IF,
	    terminal: true,

	    bind: function bind() {
	      var el = this.el;
	      if (!el.__vue__) {
	        // check else block
	        var next = el.nextElementSibling;
	        if (next && getAttr(next, 'v-else') !== null) {
	          remove(next);
	          this.elseEl = next;
	        }
	        // check main block
	        this.anchor = createAnchor('v-if');
	        replace(el, this.anchor);
	      } else {
	        'development' !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.', this.vm);
	        this.invalid = true;
	      }
	    },

	    update: function update(value) {
	      if (this.invalid) return;
	      if (value) {
	        if (!this.frag) {
	          this.insert();
	        }
	      } else {
	        this.remove();
	      }
	    },

	    insert: function insert() {
	      if (this.elseFrag) {
	        this.elseFrag.remove();
	        this.elseFrag = null;
	      }
	      // lazy init factory
	      if (!this.factory) {
	        this.factory = new FragmentFactory(this.vm, this.el);
	      }
	      this.frag = this.factory.create(this._host, this._scope, this._frag);
	      this.frag.before(this.anchor);
	    },

	    remove: function remove() {
	      if (this.frag) {
	        this.frag.remove();
	        this.frag = null;
	      }
	      if (this.elseEl && !this.elseFrag) {
	        if (!this.elseFactory) {
	          this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
	        }
	        this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	        this.elseFrag.before(this.anchor);
	      }
	    },

	    unbind: function unbind() {
	      if (this.frag) {
	        this.frag.destroy();
	      }
	      if (this.elseFrag) {
	        this.elseFrag.destroy();
	      }
	    }
	  };

	  var show = {

	    bind: function bind() {
	      // check else block
	      var next = this.el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        this.elseEl = next;
	      }
	    },

	    update: function update(value) {
	      this.apply(this.el, value);
	      if (this.elseEl) {
	        this.apply(this.elseEl, !value);
	      }
	    },

	    apply: function apply(el, value) {
	      if (inDoc(el)) {
	        applyTransition(el, value ? 1 : -1, toggle, this.vm);
	      } else {
	        toggle();
	      }
	      function toggle() {
	        el.style.display = value ? '' : 'none';
	      }
	    }
	  };

	  var text$2 = {

	    bind: function bind() {
	      var self = this;
	      var el = this.el;
	      var isRange = el.type === 'range';
	      var lazy = this.params.lazy;
	      var number = this.params.number;
	      var debounce = this.params.debounce;

	      // handle composition events.
	      //   http://blog.evanyou.me/2014/01/03/composition-event/
	      // skip this for Android because it handles composition
	      // events quite differently. Android doesn't trigger
	      // composition events for language input methods e.g.
	      // Chinese, but instead triggers them for spelling
	      // suggestions... (see Discussion/#162)
	      var composing = false;
	      if (!isAndroid && !isRange) {
	        this.on('compositionstart', function () {
	          composing = true;
	        });
	        this.on('compositionend', function () {
	          composing = false;
	          // in IE11 the "compositionend" event fires AFTER
	          // the "input" event, so the input handler is blocked
	          // at the end... have to call it here.
	          //
	          // #1327: in lazy mode this is unecessary.
	          if (!lazy) {
	            self.listener();
	          }
	        });
	      }

	      // prevent messing with the input when user is typing,
	      // and force update on blur.
	      this.focused = false;
	      if (!isRange && !lazy) {
	        this.on('focus', function () {
	          self.focused = true;
	        });
	        this.on('blur', function () {
	          self.focused = false;
	          // do not sync value after fragment removal (#2017)
	          if (!self._frag || self._frag.inserted) {
	            self.rawListener();
	          }
	        });
	      }

	      // Now attach the main listener
	      this.listener = this.rawListener = function () {
	        if (composing || !self._bound) {
	          return;
	        }
	        var val = number || isRange ? toNumber(el.value) : el.value;
	        self.set(val);
	        // force update on next tick to avoid lock & same value
	        // also only update when user is not typing
	        nextTick(function () {
	          if (self._bound && !self.focused) {
	            self.update(self._watcher.value);
	          }
	        });
	      };

	      // apply debounce
	      if (debounce) {
	        this.listener = _debounce(this.listener, debounce);
	      }

	      // Support jQuery events, since jQuery.trigger() doesn't
	      // trigger native events in some cases and some plugins
	      // rely on $.trigger()
	      //
	      // We want to make sure if a listener is attached using
	      // jQuery, it is also removed with jQuery, that's why
	      // we do the check for each directive instance and
	      // store that check result on itself. This also allows
	      // easier test coverage control by unsetting the global
	      // jQuery variable in tests.
	      this.hasjQuery = typeof jQuery === 'function';
	      if (this.hasjQuery) {
	        var method = jQuery.fn.on ? 'on' : 'bind';
	        jQuery(el)[method]('change', this.rawListener);
	        if (!lazy) {
	          jQuery(el)[method]('input', this.listener);
	        }
	      } else {
	        this.on('change', this.rawListener);
	        if (!lazy) {
	          this.on('input', this.listener);
	        }
	      }

	      // IE9 doesn't fire input event on backspace/del/cut
	      if (!lazy && isIE9) {
	        this.on('cut', function () {
	          nextTick(self.listener);
	        });
	        this.on('keyup', function (e) {
	          if (e.keyCode === 46 || e.keyCode === 8) {
	            self.listener();
	          }
	        });
	      }

	      // set initial value if present
	      if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	        this.afterBind = this.listener;
	      }
	    },

	    update: function update(value) {
	      this.el.value = _toString(value);
	    },

	    unbind: function unbind() {
	      var el = this.el;
	      if (this.hasjQuery) {
	        var method = jQuery.fn.off ? 'off' : 'unbind';
	        jQuery(el)[method]('change', this.listener);
	        jQuery(el)[method]('input', this.listener);
	      }
	    }
	  };

	  var radio = {

	    bind: function bind() {
	      var self = this;
	      var el = this.el;

	      this.getValue = function () {
	        // value overwrite via v-bind:value
	        if (el.hasOwnProperty('_value')) {
	          return el._value;
	        }
	        var val = el.value;
	        if (self.params.number) {
	          val = toNumber(val);
	        }
	        return val;
	      };

	      this.listener = function () {
	        self.set(self.getValue());
	      };
	      this.on('change', this.listener);

	      if (el.hasAttribute('checked')) {
	        this.afterBind = this.listener;
	      }
	    },

	    update: function update(value) {
	      this.el.checked = looseEqual(value, this.getValue());
	    }
	  };

	  var select = {

	    bind: function bind() {
	      var self = this;
	      var el = this.el;

	      // method to force update DOM using latest value.
	      this.forceUpdate = function () {
	        if (self._watcher) {
	          self.update(self._watcher.get());
	        }
	      };

	      // check if this is a multiple select
	      var multiple = this.multiple = el.hasAttribute('multiple');

	      // attach listener
	      this.listener = function () {
	        var value = getValue(el, multiple);
	        value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	        self.set(value);
	      };
	      this.on('change', this.listener);

	      // if has initial value, set afterBind
	      var initValue = getValue(el, multiple, true);
	      if (multiple && initValue.length || !multiple && initValue !== null) {
	        this.afterBind = this.listener;
	      }

	      // All major browsers except Firefox resets
	      // selectedIndex with value -1 to 0 when the element
	      // is appended to a new parent, therefore we have to
	      // force a DOM update whenever that happens...
	      this.vm.$on('hook:attached', this.forceUpdate);
	    },

	    update: function update(value) {
	      var el = this.el;
	      el.selectedIndex = -1;
	      var multi = this.multiple && isArray(value);
	      var options = el.options;
	      var i = options.length;
	      var op, val;
	      while (i--) {
	        op = options[i];
	        val = op.hasOwnProperty('_value') ? op._value : op.value;
	        /* eslint-disable eqeqeq */
	        op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	        /* eslint-enable eqeqeq */
	      }
	    },

	    unbind: function unbind() {
	      /* istanbul ignore next */
	      this.vm.$off('hook:attached', this.forceUpdate);
	    }
	  };

	  /**
	   * Get select value
	   *
	   * @param {SelectElement} el
	   * @param {Boolean} multi
	   * @param {Boolean} init
	   * @return {Array|*}
	   */

	  function getValue(el, multi, init) {
	    var res = multi ? [] : null;
	    var op, val, selected;
	    for (var i = 0, l = el.options.length; i < l; i++) {
	      op = el.options[i];
	      selected = init ? op.hasAttribute('selected') : op.selected;
	      if (selected) {
	        val = op.hasOwnProperty('_value') ? op._value : op.value;
	        if (multi) {
	          res.push(val);
	        } else {
	          return val;
	        }
	      }
	    }
	    return res;
	  }

	  /**
	   * Native Array.indexOf uses strict equal, but in this
	   * case we need to match string/numbers with custom equal.
	   *
	   * @param {Array} arr
	   * @param {*} val
	   */

	  function indexOf$1(arr, val) {
	    var i = arr.length;
	    while (i--) {
	      if (looseEqual(arr[i], val)) {
	        return i;
	      }
	    }
	    return -1;
	  }

	  var checkbox = {

	    bind: function bind() {
	      var self = this;
	      var el = this.el;

	      this.getValue = function () {
	        return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	      };

	      function getBooleanValue() {
	        var val = el.checked;
	        if (val && el.hasOwnProperty('_trueValue')) {
	          return el._trueValue;
	        }
	        if (!val && el.hasOwnProperty('_falseValue')) {
	          return el._falseValue;
	        }
	        return val;
	      }

	      this.listener = function () {
	        var model = self._watcher.value;
	        if (isArray(model)) {
	          var val = self.getValue();
	          if (el.checked) {
	            if (indexOf(model, val) < 0) {
	              model.push(val);
	            }
	          } else {
	            model.$remove(val);
	          }
	        } else {
	          self.set(getBooleanValue());
	        }
	      };

	      this.on('change', this.listener);
	      if (el.hasAttribute('checked')) {
	        this.afterBind = this.listener;
	      }
	    },

	    update: function update(value) {
	      var el = this.el;
	      if (isArray(value)) {
	        el.checked = indexOf(value, this.getValue()) > -1;
	      } else {
	        if (el.hasOwnProperty('_trueValue')) {
	          el.checked = looseEqual(value, el._trueValue);
	        } else {
	          el.checked = !!value;
	        }
	      }
	    }
	  };

	  var handlers = {
	    text: text$2,
	    radio: radio,
	    select: select,
	    checkbox: checkbox
	  };

	  var model = {

	    priority: MODEL,
	    twoWay: true,
	    handlers: handlers,
	    params: ['lazy', 'number', 'debounce'],

	    /**
	     * Possible elements:
	     *   <select>
	     *   <textarea>
	     *   <input type="*">
	     *     - text
	     *     - checkbox
	     *     - radio
	     *     - number
	     */

	    bind: function bind() {
	      // friendly warning...
	      this.checkFilters();
	      if (this.hasRead && !this.hasWrite) {
	        'development' !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model="' + this.descriptor.raw + '". ' + 'You might want to use a two-way filter to ensure correct behavior.', this.vm);
	      }
	      var el = this.el;
	      var tag = el.tagName;
	      var handler;
	      if (tag === 'INPUT') {
	        handler = handlers[el.type] || handlers.text;
	      } else if (tag === 'SELECT') {
	        handler = handlers.select;
	      } else if (tag === 'TEXTAREA') {
	        handler = handlers.text;
	      } else {
	        'development' !== 'production' && warn('v-model does not support element type: ' + tag, this.vm);
	        return;
	      }
	      el.__v_model = this;
	      handler.bind.call(this);
	      this.update = handler.update;
	      this._unbind = handler.unbind;
	    },

	    /**
	     * Check read/write filter stats.
	     */

	    checkFilters: function checkFilters() {
	      var filters = this.filters;
	      if (!filters) return;
	      var i = filters.length;
	      while (i--) {
	        var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	        if (typeof filter === 'function' || filter.read) {
	          this.hasRead = true;
	        }
	        if (filter.write) {
	          this.hasWrite = true;
	        }
	      }
	    },

	    unbind: function unbind() {
	      this.el.__v_model = null;
	      this._unbind && this._unbind();
	    }
	  };

	  // keyCode aliases
	  var keyCodes = {
	    esc: 27,
	    tab: 9,
	    enter: 13,
	    space: 32,
	    'delete': [8, 46],
	    up: 38,
	    left: 37,
	    right: 39,
	    down: 40
	  };

	  function keyFilter(handler, keys) {
	    var codes = keys.map(function (key) {
	      var charCode = key.charCodeAt(0);
	      if (charCode > 47 && charCode < 58) {
	        return parseInt(key, 10);
	      }
	      if (key.length === 1) {
	        charCode = key.toUpperCase().charCodeAt(0);
	        if (charCode > 64 && charCode < 91) {
	          return charCode;
	        }
	      }
	      return keyCodes[key];
	    });
	    codes = [].concat.apply([], codes);
	    return function keyHandler(e) {
	      if (codes.indexOf(e.keyCode) > -1) {
	        return handler.call(this, e);
	      }
	    };
	  }

	  function stopFilter(handler) {
	    return function stopHandler(e) {
	      e.stopPropagation();
	      return handler.call(this, e);
	    };
	  }

	  function preventFilter(handler) {
	    return function preventHandler(e) {
	      e.preventDefault();
	      return handler.call(this, e);
	    };
	  }

	  function selfFilter(handler) {
	    return function selfHandler(e) {
	      if (e.target === e.currentTarget) {
	        return handler.call(this, e);
	      }
	    };
	  }

	  var on$1 = {

	    priority: ON,
	    acceptStatement: true,
	    keyCodes: keyCodes,

	    bind: function bind() {
	      // deal with iframes
	      if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	        var self = this;
	        this.iframeBind = function () {
	          on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
	        };
	        this.on('load', this.iframeBind);
	      }
	    },

	    update: function update(handler) {
	      // stub a noop for v-on with no value,
	      // e.g. @mousedown.prevent
	      if (!this.descriptor.raw) {
	        handler = function () {};
	      }

	      if (typeof handler !== 'function') {
	        'development' !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler, this.vm);
	        return;
	      }

	      // apply modifiers
	      if (this.modifiers.stop) {
	        handler = stopFilter(handler);
	      }
	      if (this.modifiers.prevent) {
	        handler = preventFilter(handler);
	      }
	      if (this.modifiers.self) {
	        handler = selfFilter(handler);
	      }
	      // key filter
	      var keys = Object.keys(this.modifiers).filter(function (key) {
	        return key !== 'stop' && key !== 'prevent' && key !== 'self' && key !== 'capture';
	      });
	      if (keys.length) {
	        handler = keyFilter(handler, keys);
	      }

	      this.reset();
	      this.handler = handler;

	      if (this.iframeBind) {
	        this.iframeBind();
	      } else {
	        on(this.el, this.arg, this.handler, this.modifiers.capture);
	      }
	    },

	    reset: function reset() {
	      var el = this.iframeBind ? this.el.contentWindow : this.el;
	      if (this.handler) {
	        off(el, this.arg, this.handler);
	      }
	    },

	    unbind: function unbind() {
	      this.reset();
	    }
	  };

	  var prefixes = ['-webkit-', '-moz-', '-ms-'];
	  var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	  var importantRE = /!important;?$/;
	  var propCache = Object.create(null);

	  var testEl = null;

	  var style = {

	    deep: true,

	    update: function update(value) {
	      if (typeof value === 'string') {
	        this.el.style.cssText = value;
	      } else if (isArray(value)) {
	        this.handleObject(value.reduce(extend, {}));
	      } else {
	        this.handleObject(value || {});
	      }
	    },

	    handleObject: function handleObject(value) {
	      // cache object styles so that only changed props
	      // are actually updated.
	      var cache = this.cache || (this.cache = {});
	      var name, val;
	      for (name in cache) {
	        if (!(name in value)) {
	          this.handleSingle(name, null);
	          delete cache[name];
	        }
	      }
	      for (name in value) {
	        val = value[name];
	        if (val !== cache[name]) {
	          cache[name] = val;
	          this.handleSingle(name, val);
	        }
	      }
	    },

	    handleSingle: function handleSingle(prop, value) {
	      prop = normalize(prop);
	      if (!prop) return; // unsupported prop
	      // cast possible numbers/booleans into strings
	      if (value != null) value += '';
	      if (value) {
	        var isImportant = importantRE.test(value) ? 'important' : '';
	        if (isImportant) {
	          /* istanbul ignore if */
	          if (true) {
	            warn('It\'s probably a bad idea to use !important with inline rules. ' + 'This feature will be deprecated in a future version of Vue.');
	          }
	          value = value.replace(importantRE, '').trim();
	          this.el.style.setProperty(prop.kebab, value, isImportant);
	        } else {
	          this.el.style[prop.camel] = value;
	        }
	      } else {
	        this.el.style[prop.camel] = '';
	      }
	    }

	  };

	  /**
	   * Normalize a CSS property name.
	   * - cache result
	   * - auto prefix
	   * - camelCase -> dash-case
	   *
	   * @param {String} prop
	   * @return {String}
	   */

	  function normalize(prop) {
	    if (propCache[prop]) {
	      return propCache[prop];
	    }
	    var res = prefix(prop);
	    propCache[prop] = propCache[res] = res;
	    return res;
	  }

	  /**
	   * Auto detect the appropriate prefix for a CSS property.
	   * https://gist.github.com/paulirish/523692
	   *
	   * @param {String} prop
	   * @return {String}
	   */

	  function prefix(prop) {
	    prop = hyphenate(prop);
	    var camel = camelize(prop);
	    var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	    if (!testEl) {
	      testEl = document.createElement('div');
	    }
	    var i = prefixes.length;
	    var prefixed;
	    if (camel !== 'filter' && camel in testEl.style) {
	      return {
	        kebab: prop,
	        camel: camel
	      };
	    }
	    while (i--) {
	      prefixed = camelPrefixes[i] + upper;
	      if (prefixed in testEl.style) {
	        return {
	          kebab: prefixes[i] + prop,
	          camel: prefixed
	        };
	      }
	    }
	  }

	  // xlink
	  var xlinkNS = 'http://www.w3.org/1999/xlink';
	  var xlinkRE = /^xlink:/;

	  // check for attributes that prohibit interpolations
	  var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
	  // these attributes should also set their corresponding properties
	  // because they only affect the initial state of the element
	  var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
	  // these attributes expect enumrated values of "true" or "false"
	  // but are not boolean attributes
	  var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;

	  // these attributes should set a hidden property for
	  // binding v-model to object values
	  var modelProps = {
	    value: '_value',
	    'true-value': '_trueValue',
	    'false-value': '_falseValue'
	  };

	  var bind$1 = {

	    priority: BIND,

	    bind: function bind() {
	      var attr = this.arg;
	      var tag = this.el.tagName;
	      // should be deep watch on object mode
	      if (!attr) {
	        this.deep = true;
	      }
	      // handle interpolation bindings
	      var descriptor = this.descriptor;
	      var tokens = descriptor.interp;
	      if (tokens) {
	        // handle interpolations with one-time tokens
	        if (descriptor.hasOneTime) {
	          this.expression = tokensToExp(tokens, this._scope || this.vm);
	        }

	        // only allow binding on native attributes
	        if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	          'development' !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.', this.vm);
	          this.el.removeAttribute(attr);
	          this.invalid = true;
	        }

	        /* istanbul ignore if */
	        if (true) {
	          var raw = attr + '="' + descriptor.raw + '": ';
	          // warn src
	          if (attr === 'src') {
	            warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.', this.vm);
	          }

	          // warn style
	          if (attr === 'style') {
	            warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.', this.vm);
	          }
	        }
	      }
	    },

	    update: function update(value) {
	      if (this.invalid) {
	        return;
	      }
	      var attr = this.arg;
	      if (this.arg) {
	        this.handleSingle(attr, value);
	      } else {
	        this.handleObject(value || {});
	      }
	    },

	    // share object handler with v-bind:class
	    handleObject: style.handleObject,

	    handleSingle: function handleSingle(attr, value) {
	      var el = this.el;
	      var interp = this.descriptor.interp;
	      if (this.modifiers.camel) {
	        attr = camelize(attr);
	      }
	      if (!interp && attrWithPropsRE.test(attr) && attr in el) {
	        var attrValue = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
	        ? '' : value : value;

	        if (el[attr] !== attrValue) {
	          el[attr] = attrValue;
	        }
	      }
	      // set model props
	      var modelProp = modelProps[attr];
	      if (!interp && modelProp) {
	        el[modelProp] = value;
	        // update v-model if present
	        var model = el.__v_model;
	        if (model) {
	          model.listener();
	        }
	      }
	      // do not set value attribute for textarea
	      if (attr === 'value' && el.tagName === 'TEXTAREA') {
	        el.removeAttribute(attr);
	        return;
	      }
	      // update attribute
	      if (enumeratedAttrRE.test(attr)) {
	        el.setAttribute(attr, value ? 'true' : 'false');
	      } else if (value != null && value !== false) {
	        if (attr === 'class') {
	          // handle edge case #1960:
	          // class interpolation should not overwrite Vue transition class
	          if (el.__v_trans) {
	            value += ' ' + el.__v_trans.id + '-transition';
	          }
	          setClass(el, value);
	        } else if (xlinkRE.test(attr)) {
	          el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
	        } else {
	          el.setAttribute(attr, value === true ? '' : value);
	        }
	      } else {
	        el.removeAttribute(attr);
	      }
	    }
	  };

	  var el = {

	    priority: EL,

	    bind: function bind() {
	      /* istanbul ignore if */
	      if (!this.arg) {
	        return;
	      }
	      var id = this.id = camelize(this.arg);
	      var refs = (this._scope || this.vm).$els;
	      if (hasOwn(refs, id)) {
	        refs[id] = this.el;
	      } else {
	        defineReactive(refs, id, this.el);
	      }
	    },

	    unbind: function unbind() {
	      var refs = (this._scope || this.vm).$els;
	      if (refs[this.id] === this.el) {
	        refs[this.id] = null;
	      }
	    }
	  };

	  var ref = {
	    bind: function bind() {
	      'development' !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.', this.vm);
	    }
	  };

	  var cloak = {
	    bind: function bind() {
	      var el = this.el;
	      this.vm.$once('pre-hook:compiled', function () {
	        el.removeAttribute('v-cloak');
	      });
	    }
	  };

	  // must export plain object
	  var directives = {
	    text: text$1,
	    html: html,
	    'for': vFor,
	    'if': vIf,
	    show: show,
	    model: model,
	    on: on$1,
	    bind: bind$1,
	    el: el,
	    ref: ref,
	    cloak: cloak
	  };

	  var vClass = {

	    deep: true,

	    update: function update(value) {
	      if (!value) {
	        this.cleanup();
	      } else if (typeof value === 'string') {
	        this.setClass(value.trim().split(/\s+/));
	      } else {
	        this.setClass(normalize$1(value));
	      }
	    },

	    setClass: function setClass(value) {
	      this.cleanup(value);
	      for (var i = 0, l = value.length; i < l; i++) {
	        var val = value[i];
	        if (val) {
	          apply(this.el, val, addClass);
	        }
	      }
	      this.prevKeys = value;
	    },

	    cleanup: function cleanup(value) {
	      var prevKeys = this.prevKeys;
	      if (!prevKeys) return;
	      var i = prevKeys.length;
	      while (i--) {
	        var key = prevKeys[i];
	        if (!value || value.indexOf(key) < 0) {
	          apply(this.el, key, removeClass);
	        }
	      }
	    }
	  };

	  /**
	   * Normalize objects and arrays (potentially containing objects)
	   * into array of strings.
	   *
	   * @param {Object|Array<String|Object>} value
	   * @return {Array<String>}
	   */

	  function normalize$1(value) {
	    var res = [];
	    if (isArray(value)) {
	      for (var i = 0, l = value.length; i < l; i++) {
	        var _key = value[i];
	        if (_key) {
	          if (typeof _key === 'string') {
	            res.push(_key);
	          } else {
	            for (var k in _key) {
	              if (_key[k]) res.push(k);
	            }
	          }
	        }
	      }
	    } else if (isObject(value)) {
	      for (var key in value) {
	        if (value[key]) res.push(key);
	      }
	    }
	    return res;
	  }

	  /**
	   * Add or remove a class/classes on an element
	   *
	   * @param {Element} el
	   * @param {String} key The class name. This may or may not
	   *                     contain a space character, in such a
	   *                     case we'll deal with multiple class
	   *                     names at once.
	   * @param {Function} fn
	   */

	  function apply(el, key, fn) {
	    key = key.trim();
	    if (key.indexOf(' ') === -1) {
	      fn(el, key);
	      return;
	    }
	    // The key contains one or more space characters.
	    // Since a class name doesn't accept such characters, we
	    // treat it as multiple classes.
	    var keys = key.split(/\s+/);
	    for (var i = 0, l = keys.length; i < l; i++) {
	      fn(el, keys[i]);
	    }
	  }

	  var component = {

	    priority: COMPONENT,

	    params: ['keep-alive', 'transition-mode', 'inline-template'],

	    /**
	     * Setup. Two possible usages:
	     *
	     * - static:
	     *   <comp> or <div v-component="comp">
	     *
	     * - dynamic:
	     *   <component :is="view">
	     */

	    bind: function bind() {
	      if (!this.el.__vue__) {
	        // keep-alive cache
	        this.keepAlive = this.params.keepAlive;
	        if (this.keepAlive) {
	          this.cache = {};
	        }
	        // check inline-template
	        if (this.params.inlineTemplate) {
	          // extract inline template as a DocumentFragment
	          this.inlineTemplate = extractContent(this.el, true);
	        }
	        // component resolution related state
	        this.pendingComponentCb = this.Component = null;
	        // transition related state
	        this.pendingRemovals = 0;
	        this.pendingRemovalCb = null;
	        // create a ref anchor
	        this.anchor = createAnchor('v-component');
	        replace(this.el, this.anchor);
	        // remove is attribute.
	        // this is removed during compilation, but because compilation is
	        // cached, when the component is used elsewhere this attribute
	        // will remain at link time.
	        this.el.removeAttribute('is');
	        this.el.removeAttribute(':is');
	        // remove ref, same as above
	        if (this.descriptor.ref) {
	          this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	        }
	        // if static, build right now.
	        if (this.literal) {
	          this.setComponent(this.expression);
	        }
	      } else {
	        'development' !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	      }
	    },

	    /**
	     * Public update, called by the watcher in the dynamic
	     * literal scenario, e.g. <component :is="view">
	     */

	    update: function update(value) {
	      if (!this.literal) {
	        this.setComponent(value);
	      }
	    },

	    /**
	     * Switch dynamic components. May resolve the component
	     * asynchronously, and perform transition based on
	     * specified transition mode. Accepts a few additional
	     * arguments specifically for vue-router.
	     *
	     * The callback is called when the full transition is
	     * finished.
	     *
	     * @param {String} value
	     * @param {Function} [cb]
	     */

	    setComponent: function setComponent(value, cb) {
	      this.invalidatePending();
	      if (!value) {
	        // just remove current
	        this.unbuild(true);
	        this.remove(this.childVM, cb);
	        this.childVM = null;
	      } else {
	        var self = this;
	        this.resolveComponent(value, function () {
	          self.mountComponent(cb);
	        });
	      }
	    },

	    /**
	     * Resolve the component constructor to use when creating
	     * the child vm.
	     *
	     * @param {String|Function} value
	     * @param {Function} cb
	     */

	    resolveComponent: function resolveComponent(value, cb) {
	      var self = this;
	      this.pendingComponentCb = cancellable(function (Component) {
	        self.ComponentName = Component.options.name || (typeof value === 'string' ? value : null);
	        self.Component = Component;
	        cb();
	      });
	      this.vm._resolveComponent(value, this.pendingComponentCb);
	    },

	    /**
	     * Create a new instance using the current constructor and
	     * replace the existing instance. This method doesn't care
	     * whether the new component and the old one are actually
	     * the same.
	     *
	     * @param {Function} [cb]
	     */

	    mountComponent: function mountComponent(cb) {
	      // actual mount
	      this.unbuild(true);
	      var self = this;
	      var activateHooks = this.Component.options.activate;
	      var cached = this.getCached();
	      var newComponent = this.build();
	      if (activateHooks && !cached) {
	        this.waitingFor = newComponent;
	        callActivateHooks(activateHooks, newComponent, function () {
	          if (self.waitingFor !== newComponent) {
	            return;
	          }
	          self.waitingFor = null;
	          self.transition(newComponent, cb);
	        });
	      } else {
	        // update ref for kept-alive component
	        if (cached) {
	          newComponent._updateRef();
	        }
	        this.transition(newComponent, cb);
	      }
	    },

	    /**
	     * When the component changes or unbinds before an async
	     * constructor is resolved, we need to invalidate its
	     * pending callback.
	     */

	    invalidatePending: function invalidatePending() {
	      if (this.pendingComponentCb) {
	        this.pendingComponentCb.cancel();
	        this.pendingComponentCb = null;
	      }
	    },

	    /**
	     * Instantiate/insert a new child vm.
	     * If keep alive and has cached instance, insert that
	     * instance; otherwise build a new one and cache it.
	     *
	     * @param {Object} [extraOptions]
	     * @return {Vue} - the created instance
	     */

	    build: function build(extraOptions) {
	      var cached = this.getCached();
	      if (cached) {
	        return cached;
	      }
	      if (this.Component) {
	        // default options
	        var options = {
	          name: this.ComponentName,
	          el: cloneNode(this.el),
	          template: this.inlineTemplate,
	          // make sure to add the child with correct parent
	          // if this is a transcluded component, its parent
	          // should be the transclusion host.
	          parent: this._host || this.vm,
	          // if no inline-template, then the compiled
	          // linker can be cached for better performance.
	          _linkerCachable: !this.inlineTemplate,
	          _ref: this.descriptor.ref,
	          _asComponent: true,
	          _isRouterView: this._isRouterView,
	          // if this is a transcluded component, context
	          // will be the common parent vm of this instance
	          // and its host.
	          _context: this.vm,
	          // if this is inside an inline v-for, the scope
	          // will be the intermediate scope created for this
	          // repeat fragment. this is used for linking props
	          // and container directives.
	          _scope: this._scope,
	          // pass in the owner fragment of this component.
	          // this is necessary so that the fragment can keep
	          // track of its contained components in order to
	          // call attach/detach hooks for them.
	          _frag: this._frag
	        };
	        // extra options
	        // in 1.0.0 this is used by vue-router only
	        /* istanbul ignore if */
	        if (extraOptions) {
	          extend(options, extraOptions);
	        }
	        var child = new this.Component(options);
	        if (this.keepAlive) {
	          this.cache[this.Component.cid] = child;
	        }
	        /* istanbul ignore if */
	        if ('development' !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	          warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template, child);
	        }
	        return child;
	      }
	    },

	    /**
	     * Try to get a cached instance of the current component.
	     *
	     * @return {Vue|undefined}
	     */

	    getCached: function getCached() {
	      return this.keepAlive && this.cache[this.Component.cid];
	    },

	    /**
	     * Teardown the current child, but defers cleanup so
	     * that we can separate the destroy and removal steps.
	     *
	     * @param {Boolean} defer
	     */

	    unbuild: function unbuild(defer) {
	      if (this.waitingFor) {
	        if (!this.keepAlive) {
	          this.waitingFor.$destroy();
	        }
	        this.waitingFor = null;
	      }
	      var child = this.childVM;
	      if (!child || this.keepAlive) {
	        if (child) {
	          // remove ref
	          child._inactive = true;
	          child._updateRef(true);
	        }
	        return;
	      }
	      // the sole purpose of `deferCleanup` is so that we can
	      // "deactivate" the vm right now and perform DOM removal
	      // later.
	      child.$destroy(false, defer);
	    },

	    /**
	     * Remove current destroyed child and manually do
	     * the cleanup after removal.
	     *
	     * @param {Function} cb
	     */

	    remove: function remove(child, cb) {
	      var keepAlive = this.keepAlive;
	      if (child) {
	        // we may have a component switch when a previous
	        // component is still being transitioned out.
	        // we want to trigger only one lastest insertion cb
	        // when the existing transition finishes. (#1119)
	        this.pendingRemovals++;
	        this.pendingRemovalCb = cb;
	        var self = this;
	        child.$remove(function () {
	          self.pendingRemovals--;
	          if (!keepAlive) child._cleanup();
	          if (!self.pendingRemovals && self.pendingRemovalCb) {
	            self.pendingRemovalCb();
	            self.pendingRemovalCb = null;
	          }
	        });
	      } else if (cb) {
	        cb();
	      }
	    },

	    /**
	     * Actually swap the components, depending on the
	     * transition mode. Defaults to simultaneous.
	     *
	     * @param {Vue} target
	     * @param {Function} [cb]
	     */

	    transition: function transition(target, cb) {
	      var self = this;
	      var current = this.childVM;
	      // for devtool inspection
	      if (current) current._inactive = true;
	      target._inactive = false;
	      this.childVM = target;
	      switch (self.params.transitionMode) {
	        case 'in-out':
	          target.$before(self.anchor, function () {
	            self.remove(current, cb);
	          });
	          break;
	        case 'out-in':
	          self.remove(current, function () {
	            target.$before(self.anchor, cb);
	          });
	          break;
	        default:
	          self.remove(current);
	          target.$before(self.anchor, cb);
	      }
	    },

	    /**
	     * Unbind.
	     */

	    unbind: function unbind() {
	      this.invalidatePending();
	      // Do not defer cleanup when unbinding
	      this.unbuild();
	      // destroy all keep-alive cached instances
	      if (this.cache) {
	        for (var key in this.cache) {
	          this.cache[key].$destroy();
	        }
	        this.cache = null;
	      }
	    }
	  };

	  /**
	   * Call activate hooks in order (asynchronous)
	   *
	   * @param {Array} hooks
	   * @param {Vue} vm
	   * @param {Function} cb
	   */

	  function callActivateHooks(hooks, vm, cb) {
	    var total = hooks.length;
	    var called = 0;
	    hooks[0].call(vm, next);
	    function next() {
	      if (++called >= total) {
	        cb();
	      } else {
	        hooks[called].call(vm, next);
	      }
	    }
	  }

	  var propBindingModes = config._propBindingModes;
	  var empty = {};

	  // regexes
	  var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
	  var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;

	  /**
	   * Compile props on a root element and return
	   * a props link function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Array} propOptions
	   * @param {Vue} vm
	   * @return {Function} propsLinkFn
	   */

	  function compileProps(el, propOptions, vm) {
	    var props = [];
	    var names = Object.keys(propOptions);
	    var i = names.length;
	    var options, name, attr, value, path, parsed, prop;
	    while (i--) {
	      name = names[i];
	      options = propOptions[name] || empty;

	      if ('development' !== 'production' && name === '$data') {
	        warn('Do not use $data as prop.', vm);
	        continue;
	      }

	      // props could contain dashes, which will be
	      // interpreted as minus calculations by the parser
	      // so we need to camelize the path here
	      path = camelize(name);
	      if (!identRE$1.test(path)) {
	        'development' !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.', vm);
	        continue;
	      }

	      prop = {
	        name: name,
	        path: path,
	        options: options,
	        mode: propBindingModes.ONE_WAY,
	        raw: null
	      };

	      attr = hyphenate(name);
	      // first check dynamic version
	      if ((value = getBindAttr(el, attr)) === null) {
	        if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	          prop.mode = propBindingModes.TWO_WAY;
	        } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	          prop.mode = propBindingModes.ONE_TIME;
	        }
	      }
	      if (value !== null) {
	        // has dynamic binding!
	        prop.raw = value;
	        parsed = parseDirective(value);
	        value = parsed.expression;
	        prop.filters = parsed.filters;
	        // check binding type
	        if (isLiteral(value) && !parsed.filters) {
	          // for expressions containing literal numbers and
	          // booleans, there's no need to setup a prop binding,
	          // so we can optimize them as a one-time set.
	          prop.optimizedLiteral = true;
	        } else {
	          prop.dynamic = true;
	          // check non-settable path for two-way bindings
	          if ('development' !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	            prop.mode = propBindingModes.ONE_WAY;
	            warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value, vm);
	          }
	        }
	        prop.parentPath = value;

	        // warn required two-way
	        if ('development' !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	          warn('Prop "' + name + '" expects a two-way binding type.', vm);
	        }
	      } else if ((value = getAttr(el, attr)) !== null) {
	        // has literal binding!
	        prop.raw = value;
	      } else if (true) {
	        // check possible camelCase prop usage
	        var lowerCaseName = path.toLowerCase();
	        value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
	        if (value) {
	          warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.', vm);
	        } else if (options.required) {
	          // warn missing required
	          warn('Missing required prop: ' + name, vm);
	        }
	      }
	      // push prop
	      props.push(prop);
	    }
	    return makePropsLinkFn(props);
	  }

	  /**
	   * Build a function that applies props to a vm.
	   *
	   * @param {Array} props
	   * @return {Function} propsLinkFn
	   */

	  function makePropsLinkFn(props) {
	    return function propsLinkFn(vm, scope) {
	      // store resolved props info
	      vm._props = {};
	      var inlineProps = vm.$options.propsData;
	      var i = props.length;
	      var prop, path, options, value, raw;
	      while (i--) {
	        prop = props[i];
	        raw = prop.raw;
	        path = prop.path;
	        options = prop.options;
	        vm._props[path] = prop;
	        if (inlineProps && hasOwn(inlineProps, path)) {
	          initProp(vm, prop, inlineProps[path]);
	        }if (raw === null) {
	          // initialize absent prop
	          initProp(vm, prop, undefined);
	        } else if (prop.dynamic) {
	          // dynamic prop
	          if (prop.mode === propBindingModes.ONE_TIME) {
	            // one time binding
	            value = (scope || vm._context || vm).$get(prop.parentPath);
	            initProp(vm, prop, value);
	          } else {
	            if (vm._context) {
	              // dynamic binding
	              vm._bindDir({
	                name: 'prop',
	                def: propDef,
	                prop: prop
	              }, null, null, scope); // el, host, scope
	            } else {
	                // root instance
	                initProp(vm, prop, vm.$get(prop.parentPath));
	              }
	          }
	        } else if (prop.optimizedLiteral) {
	          // optimized literal, cast it and just set once
	          var stripped = stripQuotes(raw);
	          value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	          initProp(vm, prop, value);
	        } else {
	          // string literal, but we need to cater for
	          // Boolean props with no value, or with same
	          // literal value (e.g. disabled="disabled")
	          // see https://github.com/vuejs/vue-loader/issues/182
	          value = options.type === Boolean && (raw === '' || raw === hyphenate(prop.name)) ? true : raw;
	          initProp(vm, prop, value);
	        }
	      }
	    };
	  }

	  /**
	   * Process a prop with a rawValue, applying necessary coersions,
	   * default values & assertions and call the given callback with
	   * processed value.
	   *
	   * @param {Vue} vm
	   * @param {Object} prop
	   * @param {*} rawValue
	   * @param {Function} fn
	   */

	  function processPropValue(vm, prop, rawValue, fn) {
	    var isSimple = prop.dynamic && isSimplePath(prop.parentPath);
	    var value = rawValue;
	    if (value === undefined) {
	      value = getPropDefaultValue(vm, prop);
	    }
	    value = coerceProp(prop, value);
	    var coerced = value !== rawValue;
	    if (!assertProp(prop, value, vm)) {
	      value = undefined;
	    }
	    if (isSimple && !coerced) {
	      withoutConversion(function () {
	        fn(value);
	      });
	    } else {
	      fn(value);
	    }
	  }

	  /**
	   * Set a prop's initial value on a vm and its data object.
	   *
	   * @param {Vue} vm
	   * @param {Object} prop
	   * @param {*} value
	   */

	  function initProp(vm, prop, value) {
	    processPropValue(vm, prop, value, function (value) {
	      defineReactive(vm, prop.path, value);
	    });
	  }

	  /**
	   * Update a prop's value on a vm.
	   *
	   * @param {Vue} vm
	   * @param {Object} prop
	   * @param {*} value
	   */

	  function updateProp(vm, prop, value) {
	    processPropValue(vm, prop, value, function (value) {
	      vm[prop.path] = value;
	    });
	  }

	  /**
	   * Get the default value of a prop.
	   *
	   * @param {Vue} vm
	   * @param {Object} prop
	   * @return {*}
	   */

	  function getPropDefaultValue(vm, prop) {
	    // no default, return undefined
	    var options = prop.options;
	    if (!hasOwn(options, 'default')) {
	      // absent boolean value defaults to false
	      return options.type === Boolean ? false : undefined;
	    }
	    var def = options['default'];
	    // warn against non-factory defaults for Object & Array
	    if (isObject(def)) {
	      'development' !== 'production' && warn('Invalid default value for prop "' + prop.name + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
	    }
	    // call factory function for non-Function types
	    return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	  }

	  /**
	   * Assert whether a prop is valid.
	   *
	   * @param {Object} prop
	   * @param {*} value
	   * @param {Vue} vm
	   */

	  function assertProp(prop, value, vm) {
	    if (!prop.options.required && ( // non-required
	    prop.raw === null || // abscent
	    value == null) // null or undefined
	    ) {
	        return true;
	      }
	    var options = prop.options;
	    var type = options.type;
	    var valid = !type;
	    var expectedTypes = [];
	    if (type) {
	      if (!isArray(type)) {
	        type = [type];
	      }
	      for (var i = 0; i < type.length && !valid; i++) {
	        var assertedType = assertType(value, type[i]);
	        expectedTypes.push(assertedType.expectedType);
	        valid = assertedType.valid;
	      }
	    }
	    if (!valid) {
	      if (true) {
	        warn('Invalid prop: type check failed for prop "' + prop.name + '".' + ' Expected ' + expectedTypes.map(formatType).join(', ') + ', got ' + formatValue(value) + '.', vm);
	      }
	      return false;
	    }
	    var validator = options.validator;
	    if (validator) {
	      if (!validator(value)) {
	        'development' !== 'production' && warn('Invalid prop: custom validator check failed for prop "' + prop.name + '".', vm);
	        return false;
	      }
	    }
	    return true;
	  }

	  /**
	   * Force parsing value with coerce option.
	   *
	   * @param {*} value
	   * @param {Object} options
	   * @return {*}
	   */

	  function coerceProp(prop, value) {
	    var coerce = prop.options.coerce;
	    if (!coerce) {
	      return value;
	    }
	    // coerce is a function
	    return coerce(value);
	  }

	  /**
	   * Assert the type of a value
	   *
	   * @param {*} value
	   * @param {Function} type
	   * @return {Object}
	   */

	  function assertType(value, type) {
	    var valid;
	    var expectedType;
	    if (type === String) {
	      expectedType = 'string';
	      valid = typeof value === expectedType;
	    } else if (type === Number) {
	      expectedType = 'number';
	      valid = typeof value === expectedType;
	    } else if (type === Boolean) {
	      expectedType = 'boolean';
	      valid = typeof value === expectedType;
	    } else if (type === Function) {
	      expectedType = 'function';
	      valid = typeof value === expectedType;
	    } else if (type === Object) {
	      expectedType = 'object';
	      valid = isPlainObject(value);
	    } else if (type === Array) {
	      expectedType = 'array';
	      valid = isArray(value);
	    } else {
	      valid = value instanceof type;
	    }
	    return {
	      valid: valid,
	      expectedType: expectedType
	    };
	  }

	  /**
	   * Format type for output
	   *
	   * @param {String} type
	   * @return {String}
	   */

	  function formatType(type) {
	    return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'custom type';
	  }

	  /**
	   * Format value
	   *
	   * @param {*} value
	   * @return {String}
	   */

	  function formatValue(val) {
	    return Object.prototype.toString.call(val).slice(8, -1);
	  }

	  var bindingModes = config._propBindingModes;

	  var propDef = {

	    bind: function bind() {
	      var child = this.vm;
	      var parent = child._context;
	      // passed in from compiler directly
	      var prop = this.descriptor.prop;
	      var childKey = prop.path;
	      var parentKey = prop.parentPath;
	      var twoWay = prop.mode === bindingModes.TWO_WAY;

	      var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	        updateProp(child, prop, val);
	      }, {
	        twoWay: twoWay,
	        filters: prop.filters,
	        // important: props need to be observed on the
	        // v-for scope if present
	        scope: this._scope
	      });

	      // set the child initial value.
	      initProp(child, prop, parentWatcher.value);

	      // setup two-way binding
	      if (twoWay) {
	        // important: defer the child watcher creation until
	        // the created hook (after data observation)
	        var self = this;
	        child.$once('pre-hook:created', function () {
	          self.childWatcher = new Watcher(child, childKey, function (val) {
	            parentWatcher.set(val);
	          }, {
	            // ensure sync upward before parent sync down.
	            // this is necessary in cases e.g. the child
	            // mutates a prop array, then replaces it. (#1683)
	            sync: true
	          });
	        });
	      }
	    },

	    unbind: function unbind() {
	      this.parentWatcher.teardown();
	      if (this.childWatcher) {
	        this.childWatcher.teardown();
	      }
	    }
	  };

	  var queue$1 = [];
	  var queued = false;

	  /**
	   * Push a job into the queue.
	   *
	   * @param {Function} job
	   */

	  function pushJob(job) {
	    queue$1.push(job);
	    if (!queued) {
	      queued = true;
	      nextTick(flush);
	    }
	  }

	  /**
	   * Flush the queue, and do one forced reflow before
	   * triggering transitions.
	   */

	  function flush() {
	    // Force layout
	    var f = document.documentElement.offsetHeight;
	    for (var i = 0; i < queue$1.length; i++) {
	      queue$1[i]();
	    }
	    queue$1 = [];
	    queued = false;
	    // dummy return, so js linters don't complain about
	    // unused variable f
	    return f;
	  }

	  var TYPE_TRANSITION = 'transition';
	  var TYPE_ANIMATION = 'animation';
	  var transDurationProp = transitionProp + 'Duration';
	  var animDurationProp = animationProp + 'Duration';

	  /**
	   * If a just-entered element is applied the
	   * leave class while its enter transition hasn't started yet,
	   * and the transitioned property has the same value for both
	   * enter/leave, then the leave transition will be skipped and
	   * the transitionend event never fires. This function ensures
	   * its callback to be called after a transition has started
	   * by waiting for double raf.
	   *
	   * It falls back to setTimeout on devices that support CSS
	   * transitions but not raf (e.g. Android 4.2 browser) - since
	   * these environments are usually slow, we are giving it a
	   * relatively large timeout.
	   */

	  var raf = inBrowser && window.requestAnimationFrame;
	  var waitForTransitionStart = raf
	  /* istanbul ignore next */
	  ? function (fn) {
	    raf(function () {
	      raf(fn);
	    });
	  } : function (fn) {
	    setTimeout(fn, 50);
	  };

	  /**
	   * A Transition object that encapsulates the state and logic
	   * of the transition.
	   *
	   * @param {Element} el
	   * @param {String} id
	   * @param {Object} hooks
	   * @param {Vue} vm
	   */
	  function Transition(el, id, hooks, vm) {
	    this.id = id;
	    this.el = el;
	    this.enterClass = hooks && hooks.enterClass || id + '-enter';
	    this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
	    this.hooks = hooks;
	    this.vm = vm;
	    // async state
	    this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	    this.justEntered = false;
	    this.entered = this.left = false;
	    this.typeCache = {};
	    // check css transition type
	    this.type = hooks && hooks.type;
	    /* istanbul ignore if */
	    if (true) {
	      if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
	        warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type, vm);
	      }
	    }
	    // bind
	    var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	      self[m] = bind(self[m], self);
	    });
	  }

	  var p$1 = Transition.prototype;

	  /**
	   * Start an entering transition.
	   *
	   * 1. enter transition triggered
	   * 2. call beforeEnter hook
	   * 3. add enter class
	   * 4. insert/show element
	   * 5. call enter hook (with possible explicit js callback)
	   * 6. reflow
	   * 7. based on transition type:
	   *    - transition:
	   *        remove class now, wait for transitionend,
	   *        then done if there's no explicit js callback.
	   *    - animation:
	   *        wait for animationend, remove class,
	   *        then done if there's no explicit js callback.
	   *    - no css transition:
	   *        done now if there's no explicit js callback.
	   * 8. wait for either done or js callback, then call
	   *    afterEnter hook.
	   *
	   * @param {Function} op - insert/show the element
	   * @param {Function} [cb]
	   */

	  p$1.enter = function (op, cb) {
	    this.cancelPending();
	    this.callHook('beforeEnter');
	    this.cb = cb;
	    addClass(this.el, this.enterClass);
	    op();
	    this.entered = false;
	    this.callHookWithCb('enter');
	    if (this.entered) {
	      return; // user called done synchronously.
	    }
	    this.cancel = this.hooks && this.hooks.enterCancelled;
	    pushJob(this.enterNextTick);
	  };

	  /**
	   * The "nextTick" phase of an entering transition, which is
	   * to be pushed into a queue and executed after a reflow so
	   * that removing the class can trigger a CSS transition.
	   */

	  p$1.enterNextTick = function () {
	    var _this = this;

	    // prevent transition skipping
	    this.justEntered = true;
	    waitForTransitionStart(function () {
	      _this.justEntered = false;
	    });
	    var enterDone = this.enterDone;
	    var type = this.getCssTransitionType(this.enterClass);
	    if (!this.pendingJsCb) {
	      if (type === TYPE_TRANSITION) {
	        // trigger transition by removing enter class now
	        removeClass(this.el, this.enterClass);
	        this.setupCssCb(transitionEndEvent, enterDone);
	      } else if (type === TYPE_ANIMATION) {
	        this.setupCssCb(animationEndEvent, enterDone);
	      } else {
	        enterDone();
	      }
	    } else if (type === TYPE_TRANSITION) {
	      removeClass(this.el, this.enterClass);
	    }
	  };

	  /**
	   * The "cleanup" phase of an entering transition.
	   */

	  p$1.enterDone = function () {
	    this.entered = true;
	    this.cancel = this.pendingJsCb = null;
	    removeClass(this.el, this.enterClass);
	    this.callHook('afterEnter');
	    if (this.cb) this.cb();
	  };

	  /**
	   * Start a leaving transition.
	   *
	   * 1. leave transition triggered.
	   * 2. call beforeLeave hook
	   * 3. add leave class (trigger css transition)
	   * 4. call leave hook (with possible explicit js callback)
	   * 5. reflow if no explicit js callback is provided
	   * 6. based on transition type:
	   *    - transition or animation:
	   *        wait for end event, remove class, then done if
	   *        there's no explicit js callback.
	   *    - no css transition:
	   *        done if there's no explicit js callback.
	   * 7. wait for either done or js callback, then call
	   *    afterLeave hook.
	   *
	   * @param {Function} op - remove/hide the element
	   * @param {Function} [cb]
	   */

	  p$1.leave = function (op, cb) {
	    this.cancelPending();
	    this.callHook('beforeLeave');
	    this.op = op;
	    this.cb = cb;
	    addClass(this.el, this.leaveClass);
	    this.left = false;
	    this.callHookWithCb('leave');
	    if (this.left) {
	      return; // user called done synchronously.
	    }
	    this.cancel = this.hooks && this.hooks.leaveCancelled;
	    // only need to handle leaveDone if
	    // 1. the transition is already done (synchronously called
	    //    by the user, which causes this.op set to null)
	    // 2. there's no explicit js callback
	    if (this.op && !this.pendingJsCb) {
	      // if a CSS transition leaves immediately after enter,
	      // the transitionend event never fires. therefore we
	      // detect such cases and end the leave immediately.
	      if (this.justEntered) {
	        this.leaveDone();
	      } else {
	        pushJob(this.leaveNextTick);
	      }
	    }
	  };

	  /**
	   * The "nextTick" phase of a leaving transition.
	   */

	  p$1.leaveNextTick = function () {
	    var type = this.getCssTransitionType(this.leaveClass);
	    if (type) {
	      var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	      this.setupCssCb(event, this.leaveDone);
	    } else {
	      this.leaveDone();
	    }
	  };

	  /**
	   * The "cleanup" phase of a leaving transition.
	   */

	  p$1.leaveDone = function () {
	    this.left = true;
	    this.cancel = this.pendingJsCb = null;
	    this.op();
	    removeClass(this.el, this.leaveClass);
	    this.callHook('afterLeave');
	    if (this.cb) this.cb();
	    this.op = null;
	  };

	  /**
	   * Cancel any pending callbacks from a previously running
	   * but not finished transition.
	   */

	  p$1.cancelPending = function () {
	    this.op = this.cb = null;
	    var hasPending = false;
	    if (this.pendingCssCb) {
	      hasPending = true;
	      off(this.el, this.pendingCssEvent, this.pendingCssCb);
	      this.pendingCssEvent = this.pendingCssCb = null;
	    }
	    if (this.pendingJsCb) {
	      hasPending = true;
	      this.pendingJsCb.cancel();
	      this.pendingJsCb = null;
	    }
	    if (hasPending) {
	      removeClass(this.el, this.enterClass);
	      removeClass(this.el, this.leaveClass);
	    }
	    if (this.cancel) {
	      this.cancel.call(this.vm, this.el);
	      this.cancel = null;
	    }
	  };

	  /**
	   * Call a user-provided synchronous hook function.
	   *
	   * @param {String} type
	   */

	  p$1.callHook = function (type) {
	    if (this.hooks && this.hooks[type]) {
	      this.hooks[type].call(this.vm, this.el);
	    }
	  };

	  /**
	   * Call a user-provided, potentially-async hook function.
	   * We check for the length of arguments to see if the hook
	   * expects a `done` callback. If true, the transition's end
	   * will be determined by when the user calls that callback;
	   * otherwise, the end is determined by the CSS transition or
	   * animation.
	   *
	   * @param {String} type
	   */

	  p$1.callHookWithCb = function (type) {
	    var hook = this.hooks && this.hooks[type];
	    if (hook) {
	      if (hook.length > 1) {
	        this.pendingJsCb = cancellable(this[type + 'Done']);
	      }
	      hook.call(this.vm, this.el, this.pendingJsCb);
	    }
	  };

	  /**
	   * Get an element's transition type based on the
	   * calculated styles.
	   *
	   * @param {String} className
	   * @return {Number}
	   */

	  p$1.getCssTransitionType = function (className) {
	    /* istanbul ignore if */
	    if (!transitionEndEvent ||
	    // skip CSS transitions if page is not visible -
	    // this solves the issue of transitionend events not
	    // firing until the page is visible again.
	    // pageVisibility API is supported in IE10+, same as
	    // CSS transitions.
	    document.hidden ||
	    // explicit js-only transition
	    this.hooks && this.hooks.css === false ||
	    // element is hidden
	    isHidden(this.el)) {
	      return;
	    }
	    var type = this.type || this.typeCache[className];
	    if (type) return type;
	    var inlineStyles = this.el.style;
	    var computedStyles = window.getComputedStyle(this.el);
	    var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	    if (transDuration && transDuration !== '0s') {
	      type = TYPE_TRANSITION;
	    } else {
	      var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	      if (animDuration && animDuration !== '0s') {
	        type = TYPE_ANIMATION;
	      }
	    }
	    if (type) {
	      this.typeCache[className] = type;
	    }
	    return type;
	  };

	  /**
	   * Setup a CSS transitionend/animationend callback.
	   *
	   * @param {String} event
	   * @param {Function} cb
	   */

	  p$1.setupCssCb = function (event, cb) {
	    this.pendingCssEvent = event;
	    var self = this;
	    var el = this.el;
	    var onEnd = this.pendingCssCb = function (e) {
	      if (e.target === el) {
	        off(el, event, onEnd);
	        self.pendingCssEvent = self.pendingCssCb = null;
	        if (!self.pendingJsCb && cb) {
	          cb();
	        }
	      }
	    };
	    on(el, event, onEnd);
	  };

	  /**
	   * Check if an element is hidden - in that case we can just
	   * skip the transition alltogether.
	   *
	   * @param {Element} el
	   * @return {Boolean}
	   */

	  function isHidden(el) {
	    if (/svg$/.test(el.namespaceURI)) {
	      // SVG elements do not have offset(Width|Height)
	      // so we need to check the client rect
	      var rect = el.getBoundingClientRect();
	      return !(rect.width || rect.height);
	    } else {
	      return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	    }
	  }

	  var transition$1 = {

	    priority: TRANSITION,

	    update: function update(id, oldId) {
	      var el = this.el;
	      // resolve on owner vm
	      var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	      id = id || 'v';
	      el.__v_trans = new Transition(el, id, hooks, this.vm);
	      if (oldId) {
	        removeClass(el, oldId + '-transition');
	      }
	      addClass(el, id + '-transition');
	    }
	  };

	  var internalDirectives = {
	    style: style,
	    'class': vClass,
	    component: component,
	    prop: propDef,
	    transition: transition$1
	  };

	  // special binding prefixes
	  var bindRE = /^v-bind:|^:/;
	  var onRE = /^v-on:|^@/;
	  var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
	  var modifierRE = /\.[^\.]+/g;
	  var transitionRE = /^(v-bind:|:)?transition$/;

	  // default directive priority
	  var DEFAULT_PRIORITY = 1000;
	  var DEFAULT_TERMINAL_PRIORITY = 2000;

	  /**
	   * Compile a template and return a reusable composite link
	   * function, which recursively contains more link functions
	   * inside. This top level compile function would normally
	   * be called on instance root nodes, but can also be used
	   * for partial compilation if the partial argument is true.
	   *
	   * The returned composite link function, when called, will
	   * return an unlink function that tearsdown all directives
	   * created during the linking phase.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Object} options
	   * @param {Boolean} partial
	   * @return {Function}
	   */

	  function compile(el, options, partial) {
	    // link function for the node itself.
	    var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	    // link function for the childNodes
	    var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && !isScript(el) && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;

	    /**
	     * A composite linker function to be called on a already
	     * compiled piece of DOM, which instantiates all directive
	     * instances.
	     *
	     * @param {Vue} vm
	     * @param {Element|DocumentFragment} el
	     * @param {Vue} [host] - host vm of transcluded content
	     * @param {Object} [scope] - v-for scope
	     * @param {Fragment} [frag] - link context fragment
	     * @return {Function|undefined}
	     */

	    return function compositeLinkFn(vm, el, host, scope, frag) {
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(el.childNodes);
	      // link
	      var dirs = linkAndCapture(function compositeLinkCapturer() {
	        if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	        if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	      }, vm);
	      return makeUnlinkFn(vm, dirs);
	    };
	  }

	  /**
	   * Apply a linker to a vm/element pair and capture the
	   * directives created during the process.
	   *
	   * @param {Function} linker
	   * @param {Vue} vm
	   */

	  function linkAndCapture(linker, vm) {
	    /* istanbul ignore if */
	    if (false) {}
	    var originalDirCount = vm._directives.length;
	    linker();
	    var dirs = vm._directives.slice(originalDirCount);
	    dirs.sort(directiveComparator);
	    for (var i = 0, l = dirs.length; i < l; i++) {
	      dirs[i]._bind();
	    }
	    return dirs;
	  }

	  /**
	   * Directive priority sort comparator
	   *
	   * @param {Object} a
	   * @param {Object} b
	   */

	  function directiveComparator(a, b) {
	    a = a.descriptor.def.priority || DEFAULT_PRIORITY;
	    b = b.descriptor.def.priority || DEFAULT_PRIORITY;
	    return a > b ? -1 : a === b ? 0 : 1;
	  }

	  /**
	   * Linker functions return an unlink function that
	   * tearsdown all directives instances generated during
	   * the process.
	   *
	   * We create unlink functions with only the necessary
	   * information to avoid retaining additional closures.
	   *
	   * @param {Vue} vm
	   * @param {Array} dirs
	   * @param {Vue} [context]
	   * @param {Array} [contextDirs]
	   * @return {Function}
	   */

	  function makeUnlinkFn(vm, dirs, context, contextDirs) {
	    function unlink(destroying) {
	      teardownDirs(vm, dirs, destroying);
	      if (context && contextDirs) {
	        teardownDirs(context, contextDirs);
	      }
	    }
	    // expose linked directives
	    unlink.dirs = dirs;
	    return unlink;
	  }

	  /**
	   * Teardown partial linked directives.
	   *
	   * @param {Vue} vm
	   * @param {Array} dirs
	   * @param {Boolean} destroying
	   */

	  function teardownDirs(vm, dirs, destroying) {
	    var i = dirs.length;
	    while (i--) {
	      dirs[i]._teardown();
	      if ('development' !== 'production' && !destroying) {
	        vm._directives.$remove(dirs[i]);
	      }
	    }
	  }

	  /**
	   * Compile link props on an instance.
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   * @param {Object} props
	   * @param {Object} [scope]
	   * @return {Function}
	   */

	  function compileAndLinkProps(vm, el, props, scope) {
	    var propsLinkFn = compileProps(el, props, vm);
	    var propDirs = linkAndCapture(function () {
	      propsLinkFn(vm, scope);
	    }, vm);
	    return makeUnlinkFn(vm, propDirs);
	  }

	  /**
	   * Compile the root element of an instance.
	   *
	   * 1. attrs on context container (context scope)
	   * 2. attrs on the component template root node, if
	   *    replace:true (child scope)
	   *
	   * If this is a fragment instance, we only need to compile 1.
	   *
	   * @param {Element} el
	   * @param {Object} options
	   * @param {Object} contextOptions
	   * @return {Function}
	   */

	  function compileRoot(el, options, contextOptions) {
	    var containerAttrs = options._containerAttrs;
	    var replacerAttrs = options._replacerAttrs;
	    var contextLinkFn, replacerLinkFn;

	    // only need to compile other attributes for
	    // non-fragment instances
	    if (el.nodeType !== 11) {
	      // for components, container and replacer need to be
	      // compiled separately and linked in different scopes.
	      if (options._asComponent) {
	        // 2. container attributes
	        if (containerAttrs && contextOptions) {
	          contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	        }
	        if (replacerAttrs) {
	          // 3. replacer attributes
	          replacerLinkFn = compileDirectives(replacerAttrs, options);
	        }
	      } else {
	        // non-component, just compile as a normal element.
	        replacerLinkFn = compileDirectives(el.attributes, options);
	      }
	    } else if ('development' !== 'production' && containerAttrs) {
	      // warn container directives for fragment instances
	      var names = containerAttrs.filter(function (attr) {
	        // allow vue-loader/vueify scoped css attributes
	        return attr.name.indexOf('_v-') < 0 &&
	        // allow event listeners
	        !onRE.test(attr.name) &&
	        // allow slots
	        attr.name !== 'slot';
	      }).map(function (attr) {
	        return '"' + attr.name + '"';
	      });
	      if (names.length) {
	        var plural = names.length > 1;
	        warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment-Instance');
	      }
	    }

	    options._containerAttrs = options._replacerAttrs = null;
	    return function rootLinkFn(vm, el, scope) {
	      // link context scope dirs
	      var context = vm._context;
	      var contextDirs;
	      if (context && contextLinkFn) {
	        contextDirs = linkAndCapture(function () {
	          contextLinkFn(context, el, null, scope);
	        }, context);
	      }

	      // link self
	      var selfDirs = linkAndCapture(function () {
	        if (replacerLinkFn) replacerLinkFn(vm, el);
	      }, vm);

	      // return the unlink function that tearsdown context
	      // container directives.
	      return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	    };
	  }

	  /**
	   * Compile a node and return a nodeLinkFn based on the
	   * node type.
	   *
	   * @param {Node} node
	   * @param {Object} options
	   * @return {Function|null}
	   */

	  function compileNode(node, options) {
	    var type = node.nodeType;
	    if (type === 1 && !isScript(node)) {
	      return compileElement(node, options);
	    } else if (type === 3 && node.data.trim()) {
	      return compileTextNode(node, options);
	    } else {
	      return null;
	    }
	  }

	  /**
	   * Compile an element and return a nodeLinkFn.
	   *
	   * @param {Element} el
	   * @param {Object} options
	   * @return {Function|null}
	   */

	  function compileElement(el, options) {
	    // preprocess textareas.
	    // textarea treats its text content as the initial value.
	    // just bind it as an attr directive for value.
	    if (el.tagName === 'TEXTAREA') {
	      var tokens = parseText(el.value);
	      if (tokens) {
	        el.setAttribute(':value', tokensToExp(tokens));
	        el.value = '';
	      }
	    }
	    var linkFn;
	    var hasAttrs = el.hasAttributes();
	    var attrs = hasAttrs && toArray(el.attributes);
	    // check terminal directives (for & if)
	    if (hasAttrs) {
	      linkFn = checkTerminalDirectives(el, attrs, options);
	    }
	    // check element directives
	    if (!linkFn) {
	      linkFn = checkElementDirectives(el, options);
	    }
	    // check component
	    if (!linkFn) {
	      linkFn = checkComponent(el, options);
	    }
	    // normal directives
	    if (!linkFn && hasAttrs) {
	      linkFn = compileDirectives(attrs, options);
	    }
	    return linkFn;
	  }

	  /**
	   * Compile a textNode and return a nodeLinkFn.
	   *
	   * @param {TextNode} node
	   * @param {Object} options
	   * @return {Function|null} textNodeLinkFn
	   */

	  function compileTextNode(node, options) {
	    // skip marked text nodes
	    if (node._skip) {
	      return removeText;
	    }

	    var tokens = parseText(node.wholeText);
	    if (!tokens) {
	      return null;
	    }

	    // mark adjacent text nodes as skipped,
	    // because we are using node.wholeText to compile
	    // all adjacent text nodes together. This fixes
	    // issues in IE where sometimes it splits up a single
	    // text node into multiple ones.
	    var next = node.nextSibling;
	    while (next && next.nodeType === 3) {
	      next._skip = true;
	      next = next.nextSibling;
	    }

	    var frag = document.createDocumentFragment();
	    var el, token;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	      frag.appendChild(el);
	    }
	    return makeTextNodeLinkFn(tokens, frag, options);
	  }

	  /**
	   * Linker for an skipped text node.
	   *
	   * @param {Vue} vm
	   * @param {Text} node
	   */

	  function removeText(vm, node) {
	    remove(node);
	  }

	  /**
	   * Process a single text token.
	   *
	   * @param {Object} token
	   * @param {Object} options
	   * @return {Node}
	   */

	  function processTextToken(token, options) {
	    var el;
	    if (token.oneTime) {
	      el = document.createTextNode(token.value);
	    } else {
	      if (token.html) {
	        el = document.createComment('v-html');
	        setTokenType('html');
	      } else {
	        // IE will clean up empty textNodes during
	        // frag.cloneNode(true), so we have to give it
	        // something here...
	        el = document.createTextNode(' ');
	        setTokenType('text');
	      }
	    }
	    function setTokenType(type) {
	      if (token.descriptor) return;
	      var parsed = parseDirective(token.value);
	      token.descriptor = {
	        name: type,
	        def: directives[type],
	        expression: parsed.expression,
	        filters: parsed.filters
	      };
	    }
	    return el;
	  }

	  /**
	   * Build a function that processes a textNode.
	   *
	   * @param {Array<Object>} tokens
	   * @param {DocumentFragment} frag
	   */

	  function makeTextNodeLinkFn(tokens, frag) {
	    return function textNodeLinkFn(vm, el, host, scope) {
	      var fragClone = frag.cloneNode(true);
	      var childNodes = toArray(fragClone.childNodes);
	      var token, value, node;
	      for (var i = 0, l = tokens.length; i < l; i++) {
	        token = tokens[i];
	        value = token.value;
	        if (token.tag) {
	          node = childNodes[i];
	          if (token.oneTime) {
	            value = (scope || vm).$eval(value);
	            if (token.html) {
	              replace(node, parseTemplate(value, true));
	            } else {
	              node.data = value;
	            }
	          } else {
	            vm._bindDir(token.descriptor, node, host, scope);
	          }
	        }
	      }
	      replace(el, fragClone);
	    };
	  }

	  /**
	   * Compile a node list and return a childLinkFn.
	   *
	   * @param {NodeList} nodeList
	   * @param {Object} options
	   * @return {Function|undefined}
	   */

	  function compileNodeList(nodeList, options) {
	    var linkFns = [];
	    var nodeLinkFn, childLinkFn, node;
	    for (var i = 0, l = nodeList.length; i < l; i++) {
	      node = nodeList[i];
	      nodeLinkFn = compileNode(node, options);
	      childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	      linkFns.push(nodeLinkFn, childLinkFn);
	    }
	    return linkFns.length ? makeChildLinkFn(linkFns) : null;
	  }

	  /**
	   * Make a child link function for a node's childNodes.
	   *
	   * @param {Array<Function>} linkFns
	   * @return {Function} childLinkFn
	   */

	  function makeChildLinkFn(linkFns) {
	    return function childLinkFn(vm, nodes, host, scope, frag) {
	      var node, nodeLinkFn, childrenLinkFn;
	      for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	        node = nodes[n];
	        nodeLinkFn = linkFns[i++];
	        childrenLinkFn = linkFns[i++];
	        // cache childNodes before linking parent, fix #657
	        var childNodes = toArray(node.childNodes);
	        if (nodeLinkFn) {
	          nodeLinkFn(vm, node, host, scope, frag);
	        }
	        if (childrenLinkFn) {
	          childrenLinkFn(vm, childNodes, host, scope, frag);
	        }
	      }
	    };
	  }

	  /**
	   * Check for element directives (custom elements that should
	   * be resovled as terminal directives).
	   *
	   * @param {Element} el
	   * @param {Object} options
	   */

	  function checkElementDirectives(el, options) {
	    var tag = el.tagName.toLowerCase();
	    if (commonTagRE.test(tag)) {
	      return;
	    }
	    var def = resolveAsset(options, 'elementDirectives', tag);
	    if (def) {
	      return makeTerminalNodeLinkFn(el, tag, '', options, def);
	    }
	  }

	  /**
	   * Check if an element is a component. If yes, return
	   * a component link function.
	   *
	   * @param {Element} el
	   * @param {Object} options
	   * @return {Function|undefined}
	   */

	  function checkComponent(el, options) {
	    var component = checkComponentAttr(el, options);
	    if (component) {
	      var ref = findRef(el);
	      var descriptor = {
	        name: 'component',
	        ref: ref,
	        expression: component.id,
	        def: internalDirectives.component,
	        modifiers: {
	          literal: !component.dynamic
	        }
	      };
	      var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	        if (ref) {
	          defineReactive((scope || vm).$refs, ref, null);
	        }
	        vm._bindDir(descriptor, el, host, scope, frag);
	      };
	      componentLinkFn.terminal = true;
	      return componentLinkFn;
	    }
	  }

	  /**
	   * Check an element for terminal directives in fixed order.
	   * If it finds one, return a terminal link function.
	   *
	   * @param {Element} el
	   * @param {Array} attrs
	   * @param {Object} options
	   * @return {Function} terminalLinkFn
	   */

	  function checkTerminalDirectives(el, attrs, options) {
	    // skip v-pre
	    if (getAttr(el, 'v-pre') !== null) {
	      return skip;
	    }
	    // skip v-else block, but only if following v-if
	    if (el.hasAttribute('v-else')) {
	      var prev = el.previousElementSibling;
	      if (prev && prev.hasAttribute('v-if')) {
	        return skip;
	      }
	    }

	    var attr, name, value, modifiers, matched, dirName, rawName, arg, def, termDef;
	    for (var i = 0, j = attrs.length; i < j; i++) {
	      attr = attrs[i];
	      name = attr.name.replace(modifierRE, '');
	      if (matched = name.match(dirAttrRE)) {
	        def = resolveAsset(options, 'directives', matched[1]);
	        if (def && def.terminal) {
	          if (!termDef || (def.priority || DEFAULT_TERMINAL_PRIORITY) > termDef.priority) {
	            termDef = def;
	            rawName = attr.name;
	            modifiers = parseModifiers(attr.name);
	            value = attr.value;
	            dirName = matched[1];
	            arg = matched[2];
	          }
	        }
	      }
	    }

	    if (termDef) {
	      return makeTerminalNodeLinkFn(el, dirName, value, options, termDef, rawName, arg, modifiers);
	    }
	  }

	  function skip() {}
	  skip.terminal = true;

	  /**
	   * Build a node link function for a terminal directive.
	   * A terminal link function terminates the current
	   * compilation recursion and handles compilation of the
	   * subtree in the directive.
	   *
	   * @param {Element} el
	   * @param {String} dirName
	   * @param {String} value
	   * @param {Object} options
	   * @param {Object} def
	   * @param {String} [rawName]
	   * @param {String} [arg]
	   * @param {Object} [modifiers]
	   * @return {Function} terminalLinkFn
	   */

	  function makeTerminalNodeLinkFn(el, dirName, value, options, def, rawName, arg, modifiers) {
	    var parsed = parseDirective(value);
	    var descriptor = {
	      name: dirName,
	      arg: arg,
	      expression: parsed.expression,
	      filters: parsed.filters,
	      raw: value,
	      attr: rawName,
	      modifiers: modifiers,
	      def: def
	    };
	    // check ref for v-for and router-view
	    if (dirName === 'for' || dirName === 'router-view') {
	      descriptor.ref = findRef(el);
	    }
	    var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	      if (descriptor.ref) {
	        defineReactive((scope || vm).$refs, descriptor.ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    fn.terminal = true;
	    return fn;
	  }

	  /**
	   * Compile the directives on an element and return a linker.
	   *
	   * @param {Array|NamedNodeMap} attrs
	   * @param {Object} options
	   * @return {Function}
	   */

	  function compileDirectives(attrs, options) {
	    var i = attrs.length;
	    var dirs = [];
	    var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
	    while (i--) {
	      attr = attrs[i];
	      name = rawName = attr.name;
	      value = rawValue = attr.value;
	      tokens = parseText(value);
	      // reset arg
	      arg = null;
	      // check modifiers
	      modifiers = parseModifiers(name);
	      name = name.replace(modifierRE, '');

	      // attribute interpolations
	      if (tokens) {
	        value = tokensToExp(tokens);
	        arg = name;
	        pushDir('bind', directives.bind, tokens);
	        // warn against mixing mustaches with v-bind
	        if (true) {
	          if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	            return attr.name === ':class' || attr.name === 'v-bind:class';
	          })) {
	            warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.', options);
	          }
	        }
	      } else

	        // special attribute: transition
	        if (transitionRE.test(name)) {
	          modifiers.literal = !bindRE.test(name);
	          pushDir('transition', internalDirectives.transition);
	        } else

	          // event handlers
	          if (onRE.test(name)) {
	            arg = name.replace(onRE, '');
	            pushDir('on', directives.on);
	          } else

	            // attribute bindings
	            if (bindRE.test(name)) {
	              dirName = name.replace(bindRE, '');
	              if (dirName === 'style' || dirName === 'class') {
	                pushDir(dirName, internalDirectives[dirName]);
	              } else {
	                arg = dirName;
	                pushDir('bind', directives.bind);
	              }
	            } else

	              // normal directives
	              if (matched = name.match(dirAttrRE)) {
	                dirName = matched[1];
	                arg = matched[2];

	                // skip v-else (when used with v-show)
	                if (dirName === 'else') {
	                  continue;
	                }

	                dirDef = resolveAsset(options, 'directives', dirName, true);
	                if (dirDef) {
	                  pushDir(dirName, dirDef);
	                }
	              }
	    }

	    /**
	     * Push a directive.
	     *
	     * @param {String} dirName
	     * @param {Object|Function} def
	     * @param {Array} [interpTokens]
	     */

	    function pushDir(dirName, def, interpTokens) {
	      var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
	      var parsed = !hasOneTimeToken && parseDirective(value);
	      dirs.push({
	        name: dirName,
	        attr: rawName,
	        raw: rawValue,
	        def: def,
	        arg: arg,
	        modifiers: modifiers,
	        // conversion from interpolation strings with one-time token
	        // to expression is differed until directive bind time so that we
	        // have access to the actual vm context for one-time bindings.
	        expression: parsed && parsed.expression,
	        filters: parsed && parsed.filters,
	        interp: interpTokens,
	        hasOneTime: hasOneTimeToken
	      });
	    }

	    if (dirs.length) {
	      return makeNodeLinkFn(dirs);
	    }
	  }

	  /**
	   * Parse modifiers from directive attribute name.
	   *
	   * @param {String} name
	   * @return {Object}
	   */

	  function parseModifiers(name) {
	    var res = Object.create(null);
	    var match = name.match(modifierRE);
	    if (match) {
	      var i = match.length;
	      while (i--) {
	        res[match[i].slice(1)] = true;
	      }
	    }
	    return res;
	  }

	  /**
	   * Build a link function for all directives on a single node.
	   *
	   * @param {Array} directives
	   * @return {Function} directivesLinkFn
	   */

	  function makeNodeLinkFn(directives) {
	    return function nodeLinkFn(vm, el, host, scope, frag) {
	      // reverse apply because it's sorted low to high
	      var i = directives.length;
	      while (i--) {
	        vm._bindDir(directives[i], el, host, scope, frag);
	      }
	    };
	  }

	  /**
	   * Check if an interpolation string contains one-time tokens.
	   *
	   * @param {Array} tokens
	   * @return {Boolean}
	   */

	  function hasOneTime(tokens) {
	    var i = tokens.length;
	    while (i--) {
	      if (tokens[i].oneTime) return true;
	    }
	  }

	  function isScript(el) {
	    return el.tagName === 'SCRIPT' && (!el.hasAttribute('type') || el.getAttribute('type') === 'text/javascript');
	  }

	  var specialCharRE = /[^\w\-:\.]/;

	  /**
	   * Process an element or a DocumentFragment based on a
	   * instance option object. This allows us to transclude
	   * a template node/fragment before the instance is created,
	   * so the processed fragment can then be cloned and reused
	   * in v-for.
	   *
	   * @param {Element} el
	   * @param {Object} options
	   * @return {Element|DocumentFragment}
	   */

	  function transclude(el, options) {
	    // extract container attributes to pass them down
	    // to compiler, because they need to be compiled in
	    // parent scope. we are mutating the options object here
	    // assuming the same object will be used for compile
	    // right after this.
	    if (options) {
	      options._containerAttrs = extractAttrs(el);
	    }
	    // for template tags, what we want is its content as
	    // a documentFragment (for fragment instances)
	    if (isTemplate(el)) {
	      el = parseTemplate(el);
	    }
	    if (options) {
	      if (options._asComponent && !options.template) {
	        options.template = '<slot></slot>';
	      }
	      if (options.template) {
	        options._content = extractContent(el);
	        el = transcludeTemplate(el, options);
	      }
	    }
	    if (isFragment(el)) {
	      // anchors for fragment instance
	      // passing in `persist: true` to avoid them being
	      // discarded by IE during template cloning
	      prepend(createAnchor('v-start', true), el);
	      el.appendChild(createAnchor('v-end', true));
	    }
	    return el;
	  }

	  /**
	   * Process the template option.
	   * If the replace option is true this will swap the $el.
	   *
	   * @param {Element} el
	   * @param {Object} options
	   * @return {Element|DocumentFragment}
	   */

	  function transcludeTemplate(el, options) {
	    var template = options.template;
	    var frag = parseTemplate(template, true);
	    if (frag) {
	      var replacer = frag.firstChild;
	      var tag = replacer.tagName && replacer.tagName.toLowerCase();
	      if (options.replace) {
	        /* istanbul ignore if */
	        if (el === document.body) {
	          'development' !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	        }
	        // there are many cases where the instance must
	        // become a fragment instance: basically anything that
	        // can create more than 1 root nodes.
	        if (
	        // multi-children template
	        frag.childNodes.length > 1 ||
	        // non-element template
	        replacer.nodeType !== 1 ||
	        // single nested component
	        tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
	        // element directive
	        resolveAsset(options, 'elementDirectives', tag) ||
	        // for block
	        replacer.hasAttribute('v-for') ||
	        // if block
	        replacer.hasAttribute('v-if')) {
	          return frag;
	        } else {
	          options._replacerAttrs = extractAttrs(replacer);
	          mergeAttrs(el, replacer);
	          return replacer;
	        }
	      } else {
	        el.appendChild(frag);
	        return el;
	      }
	    } else {
	      'development' !== 'production' && warn('Invalid template option: ' + template);
	    }
	  }

	  /**
	   * Helper to extract a component container's attributes
	   * into a plain object array.
	   *
	   * @param {Element} el
	   * @return {Array}
	   */

	  function extractAttrs(el) {
	    if (el.nodeType === 1 && el.hasAttributes()) {
	      return toArray(el.attributes);
	    }
	  }

	  /**
	   * Merge the attributes of two elements, and make sure
	   * the class names are merged properly.
	   *
	   * @param {Element} from
	   * @param {Element} to
	   */

	  function mergeAttrs(from, to) {
	    var attrs = from.attributes;
	    var i = attrs.length;
	    var name, value;
	    while (i--) {
	      name = attrs[i].name;
	      value = attrs[i].value;
	      if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	        to.setAttribute(name, value);
	      } else if (name === 'class' && !parseText(value) && (value = value.trim())) {
	        value.split(/\s+/).forEach(function (cls) {
	          addClass(to, cls);
	        });
	      }
	    }
	  }

	  /**
	   * Scan and determine slot content distribution.
	   * We do this during transclusion instead at compile time so that
	   * the distribution is decoupled from the compilation order of
	   * the slots.
	   *
	   * @param {Element|DocumentFragment} template
	   * @param {Element} content
	   * @param {Vue} vm
	   */

	  function resolveSlots(vm, content) {
	    if (!content) {
	      return;
	    }
	    var contents = vm._slotContents = Object.create(null);
	    var el, name;
	    for (var i = 0, l = content.children.length; i < l; i++) {
	      el = content.children[i];
	      /* eslint-disable no-cond-assign */
	      if (name = el.getAttribute('slot')) {
	        (contents[name] || (contents[name] = [])).push(el);
	      }
	      /* eslint-enable no-cond-assign */
	      if ('development' !== 'production' && getBindAttr(el, 'slot')) {
	        warn('The "slot" attribute must be static.', vm.$parent);
	      }
	    }
	    for (name in contents) {
	      contents[name] = extractFragment(contents[name], content);
	    }
	    if (content.hasChildNodes()) {
	      var nodes = content.childNodes;
	      if (nodes.length === 1 && nodes[0].nodeType === 3 && !nodes[0].data.trim()) {
	        return;
	      }
	      contents['default'] = extractFragment(content.childNodes, content);
	    }
	  }

	  /**
	   * Extract qualified content nodes from a node list.
	   *
	   * @param {NodeList} nodes
	   * @return {DocumentFragment}
	   */

	  function extractFragment(nodes, parent) {
	    var frag = document.createDocumentFragment();
	    nodes = toArray(nodes);
	    for (var i = 0, l = nodes.length; i < l; i++) {
	      var node = nodes[i];
	      if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	        parent.removeChild(node);
	        node = parseTemplate(node, true);
	      }
	      frag.appendChild(node);
	    }
	    return frag;
	  }



	  var compiler = Object.freeze({
	  	compile: compile,
	  	compileAndLinkProps: compileAndLinkProps,
	  	compileRoot: compileRoot,
	  	transclude: transclude,
	  	resolveSlots: resolveSlots
	  });

	  function stateMixin (Vue) {
	    /**
	     * Accessor for `$data` property, since setting $data
	     * requires observing the new object and updating
	     * proxied properties.
	     */

	    Object.defineProperty(Vue.prototype, '$data', {
	      get: function get() {
	        return this._data;
	      },
	      set: function set(newData) {
	        if (newData !== this._data) {
	          this._setData(newData);
	        }
	      }
	    });

	    /**
	     * Setup the scope of an instance, which contains:
	     * - observed data
	     * - computed properties
	     * - user methods
	     * - meta properties
	     */

	    Vue.prototype._initState = function () {
	      this._initProps();
	      this._initMeta();
	      this._initMethods();
	      this._initData();
	      this._initComputed();
	    };

	    /**
	     * Initialize props.
	     */

	    Vue.prototype._initProps = function () {
	      var options = this.$options;
	      var el = options.el;
	      var props = options.props;
	      if (props && !el) {
	        'development' !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.', this);
	      }
	      // make sure to convert string selectors into element now
	      el = options.el = query(el);
	      this._propsUnlinkFn = el && el.nodeType === 1 && props
	      // props must be linked in proper scope if inside v-for
	      ? compileAndLinkProps(this, el, props, this._scope) : null;
	    };

	    /**
	     * Initialize the data.
	     */

	    Vue.prototype._initData = function () {
	      var dataFn = this.$options.data;
	      var data = this._data = dataFn ? dataFn() : {};
	      if (!isPlainObject(data)) {
	        data = {};
	        'development' !== 'production' && warn('data functions should return an object.', this);
	      }
	      var props = this._props;
	      // proxy data on instance
	      var keys = Object.keys(data);
	      var i, key;
	      i = keys.length;
	      while (i--) {
	        key = keys[i];
	        // there are two scenarios where we can proxy a data key:
	        // 1. it's not already defined as a prop
	        // 2. it's provided via a instantiation option AND there are no
	        //    template prop present
	        if (!props || !hasOwn(props, key)) {
	          this._proxy(key);
	        } else if (true) {
	          warn('Data field "' + key + '" is already defined ' + 'as a prop. To provide default value for a prop, use the "default" ' + 'prop option; if you want to pass prop values to an instantiation ' + 'call, use the "propsData" option.', this);
	        }
	      }
	      // observe data
	      observe(data, this);
	    };

	    /**
	     * Swap the instance's $data. Called in $data's setter.
	     *
	     * @param {Object} newData
	     */

	    Vue.prototype._setData = function (newData) {
	      newData = newData || {};
	      var oldData = this._data;
	      this._data = newData;
	      var keys, key, i;
	      // unproxy keys not present in new data
	      keys = Object.keys(oldData);
	      i = keys.length;
	      while (i--) {
	        key = keys[i];
	        if (!(key in newData)) {
	          this._unproxy(key);
	        }
	      }
	      // proxy keys not already proxied,
	      // and trigger change for changed values
	      keys = Object.keys(newData);
	      i = keys.length;
	      while (i--) {
	        key = keys[i];
	        if (!hasOwn(this, key)) {
	          // new property
	          this._proxy(key);
	        }
	      }
	      oldData.__ob__.removeVm(this);
	      observe(newData, this);
	      this._digest();
	    };

	    /**
	     * Proxy a property, so that
	     * vm.prop === vm._data.prop
	     *
	     * @param {String} key
	     */

	    Vue.prototype._proxy = function (key) {
	      if (!isReserved(key)) {
	        // need to store ref to self here
	        // because these getter/setters might
	        // be called by child scopes via
	        // prototype inheritance.
	        var self = this;
	        Object.defineProperty(self, key, {
	          configurable: true,
	          enumerable: true,
	          get: function proxyGetter() {
	            return self._data[key];
	          },
	          set: function proxySetter(val) {
	            self._data[key] = val;
	          }
	        });
	      }
	    };

	    /**
	     * Unproxy a property.
	     *
	     * @param {String} key
	     */

	    Vue.prototype._unproxy = function (key) {
	      if (!isReserved(key)) {
	        delete this[key];
	      }
	    };

	    /**
	     * Force update on every watcher in scope.
	     */

	    Vue.prototype._digest = function () {
	      for (var i = 0, l = this._watchers.length; i < l; i++) {
	        this._watchers[i].update(true); // shallow updates
	      }
	    };

	    /**
	     * Setup computed properties. They are essentially
	     * special getter/setters
	     */

	    function noop() {}
	    Vue.prototype._initComputed = function () {
	      var computed = this.$options.computed;
	      if (computed) {
	        for (var key in computed) {
	          var userDef = computed[key];
	          var def = {
	            enumerable: true,
	            configurable: true
	          };
	          if (typeof userDef === 'function') {
	            def.get = makeComputedGetter(userDef, this);
	            def.set = noop;
	          } else {
	            def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
	            def.set = userDef.set ? bind(userDef.set, this) : noop;
	          }
	          Object.defineProperty(this, key, def);
	        }
	      }
	    };

	    function makeComputedGetter(getter, owner) {
	      var watcher = new Watcher(owner, getter, null, {
	        lazy: true
	      });
	      return function computedGetter() {
	        if (watcher.dirty) {
	          watcher.evaluate();
	        }
	        if (Dep.target) {
	          watcher.depend();
	        }
	        return watcher.value;
	      };
	    }

	    /**
	     * Setup instance methods. Methods must be bound to the
	     * instance since they might be passed down as a prop to
	     * child components.
	     */

	    Vue.prototype._initMethods = function () {
	      var methods = this.$options.methods;
	      if (methods) {
	        for (var key in methods) {
	          this[key] = bind(methods[key], this);
	        }
	      }
	    };

	    /**
	     * Initialize meta information like $index, $key & $value.
	     */

	    Vue.prototype._initMeta = function () {
	      var metas = this.$options._meta;
	      if (metas) {
	        for (var key in metas) {
	          defineReactive(this, key, metas[key]);
	        }
	      }
	    };
	  }

	  var eventRE = /^v-on:|^@/;

	  function eventsMixin (Vue) {
	    /**
	     * Setup the instance's option events & watchers.
	     * If the value is a string, we pull it from the
	     * instance's methods by name.
	     */

	    Vue.prototype._initEvents = function () {
	      var options = this.$options;
	      if (options._asComponent) {
	        registerComponentEvents(this, options.el);
	      }
	      registerCallbacks(this, '$on', options.events);
	      registerCallbacks(this, '$watch', options.watch);
	    };

	    /**
	     * Register v-on events on a child component
	     *
	     * @param {Vue} vm
	     * @param {Element} el
	     */

	    function registerComponentEvents(vm, el) {
	      var attrs = el.attributes;
	      var name, value, handler;
	      for (var i = 0, l = attrs.length; i < l; i++) {
	        name = attrs[i].name;
	        if (eventRE.test(name)) {
	          name = name.replace(eventRE, '');
	          // force the expression into a statement so that
	          // it always dynamically resolves the method to call (#2670)
	          // kinda ugly hack, but does the job.
	          value = attrs[i].value;
	          if (isSimplePath(value)) {
	            value += '.apply(this, $arguments)';
	          }
	          handler = (vm._scope || vm._context).$eval(value, true);
	          handler._fromParent = true;
	          vm.$on(name.replace(eventRE), handler);
	        }
	      }
	    }

	    /**
	     * Register callbacks for option events and watchers.
	     *
	     * @param {Vue} vm
	     * @param {String} action
	     * @param {Object} hash
	     */

	    function registerCallbacks(vm, action, hash) {
	      if (!hash) return;
	      var handlers, key, i, j;
	      for (key in hash) {
	        handlers = hash[key];
	        if (isArray(handlers)) {
	          for (i = 0, j = handlers.length; i < j; i++) {
	            register(vm, action, key, handlers[i]);
	          }
	        } else {
	          register(vm, action, key, handlers);
	        }
	      }
	    }

	    /**
	     * Helper to register an event/watch callback.
	     *
	     * @param {Vue} vm
	     * @param {String} action
	     * @param {String} key
	     * @param {Function|String|Object} handler
	     * @param {Object} [options]
	     */

	    function register(vm, action, key, handler, options) {
	      var type = typeof handler;
	      if (type === 'function') {
	        vm[action](key, handler, options);
	      } else if (type === 'string') {
	        var methods = vm.$options.methods;
	        var method = methods && methods[handler];
	        if (method) {
	          vm[action](key, method, options);
	        } else {
	          'development' !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".', vm);
	        }
	      } else if (handler && type === 'object') {
	        register(vm, action, key, handler.handler, handler);
	      }
	    }

	    /**
	     * Setup recursive attached/detached calls
	     */

	    Vue.prototype._initDOMHooks = function () {
	      this.$on('hook:attached', onAttached);
	      this.$on('hook:detached', onDetached);
	    };

	    /**
	     * Callback to recursively call attached hook on children
	     */

	    function onAttached() {
	      if (!this._isAttached) {
	        this._isAttached = true;
	        this.$children.forEach(callAttach);
	      }
	    }

	    /**
	     * Iterator to call attached hook
	     *
	     * @param {Vue} child
	     */

	    function callAttach(child) {
	      if (!child._isAttached && inDoc(child.$el)) {
	        child._callHook('attached');
	      }
	    }

	    /**
	     * Callback to recursively call detached hook on children
	     */

	    function onDetached() {
	      if (this._isAttached) {
	        this._isAttached = false;
	        this.$children.forEach(callDetach);
	      }
	    }

	    /**
	     * Iterator to call detached hook
	     *
	     * @param {Vue} child
	     */

	    function callDetach(child) {
	      if (child._isAttached && !inDoc(child.$el)) {
	        child._callHook('detached');
	      }
	    }

	    /**
	     * Trigger all handlers for a hook
	     *
	     * @param {String} hook
	     */

	    Vue.prototype._callHook = function (hook) {
	      this.$emit('pre-hook:' + hook);
	      var handlers = this.$options[hook];
	      if (handlers) {
	        for (var i = 0, j = handlers.length; i < j; i++) {
	          handlers[i].call(this);
	        }
	      }
	      this.$emit('hook:' + hook);
	    };
	  }

	  function noop() {}

	  /**
	   * A directive links a DOM element with a piece of data,
	   * which is the result of evaluating an expression.
	   * It registers a watcher with the expression and calls
	   * the DOM update function when a change is triggered.
	   *
	   * @param {Object} descriptor
	   *                 - {String} name
	   *                 - {Object} def
	   *                 - {String} expression
	   *                 - {Array<Object>} [filters]
	   *                 - {Object} [modifiers]
	   *                 - {Boolean} literal
	   *                 - {String} attr
	   *                 - {String} arg
	   *                 - {String} raw
	   *                 - {String} [ref]
	   *                 - {Array<Object>} [interp]
	   *                 - {Boolean} [hasOneTime]
	   * @param {Vue} vm
	   * @param {Node} el
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   * @constructor
	   */
	  function Directive(descriptor, vm, el, host, scope, frag) {
	    this.vm = vm;
	    this.el = el;
	    // copy descriptor properties
	    this.descriptor = descriptor;
	    this.name = descriptor.name;
	    this.expression = descriptor.expression;
	    this.arg = descriptor.arg;
	    this.modifiers = descriptor.modifiers;
	    this.filters = descriptor.filters;
	    this.literal = this.modifiers && this.modifiers.literal;
	    // private
	    this._locked = false;
	    this._bound = false;
	    this._listeners = null;
	    // link context
	    this._host = host;
	    this._scope = scope;
	    this._frag = frag;
	    // store directives on node in dev mode
	    if ('development' !== 'production' && this.el) {
	      this.el._vue_directives = this.el._vue_directives || [];
	      this.el._vue_directives.push(this);
	    }
	  }

	  /**
	   * Initialize the directive, mixin definition properties,
	   * setup the watcher, call definition bind() and update()
	   * if present.
	   */

	  Directive.prototype._bind = function () {
	    var name = this.name;
	    var descriptor = this.descriptor;

	    // remove attribute
	    if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	      var attr = descriptor.attr || 'v-' + name;
	      this.el.removeAttribute(attr);
	    }

	    // copy def properties
	    var def = descriptor.def;
	    if (typeof def === 'function') {
	      this.update = def;
	    } else {
	      extend(this, def);
	    }

	    // setup directive params
	    this._setupParams();

	    // initial bind
	    if (this.bind) {
	      this.bind();
	    }
	    this._bound = true;

	    if (this.literal) {
	      this.update && this.update(descriptor.raw);
	    } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	      // wrapped updater for context
	      var dir = this;
	      if (this.update) {
	        this._update = function (val, oldVal) {
	          if (!dir._locked) {
	            dir.update(val, oldVal);
	          }
	        };
	      } else {
	        this._update = noop;
	      }
	      var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
	      var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
	      var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	      {
	        filters: this.filters,
	        twoWay: this.twoWay,
	        deep: this.deep,
	        preProcess: preProcess,
	        postProcess: postProcess,
	        scope: this._scope
	      });
	      // v-model with inital inline value need to sync back to
	      // model instead of update to DOM on init. They would
	      // set the afterBind hook to indicate that.
	      if (this.afterBind) {
	        this.afterBind();
	      } else if (this.update) {
	        this.update(watcher.value);
	      }
	    }
	  };

	  /**
	   * Setup all param attributes, e.g. track-by,
	   * transition-mode, etc...
	   */

	  Directive.prototype._setupParams = function () {
	    if (!this.params) {
	      return;
	    }
	    var params = this.params;
	    // swap the params array with a fresh object.
	    this.params = Object.create(null);
	    var i = params.length;
	    var key, val, mappedKey;
	    while (i--) {
	      key = hyphenate(params[i]);
	      mappedKey = camelize(key);
	      val = getBindAttr(this.el, key);
	      if (val != null) {
	        // dynamic
	        this._setupParamWatcher(mappedKey, val);
	      } else {
	        // static
	        val = getAttr(this.el, key);
	        if (val != null) {
	          this.params[mappedKey] = val === '' ? true : val;
	        }
	      }
	    }
	  };

	  /**
	   * Setup a watcher for a dynamic param.
	   *
	   * @param {String} key
	   * @param {String} expression
	   */

	  Directive.prototype._setupParamWatcher = function (key, expression) {
	    var self = this;
	    var called = false;
	    var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	      self.params[key] = val;
	      // since we are in immediate mode,
	      // only call the param change callbacks if this is not the first update.
	      if (called) {
	        var cb = self.paramWatchers && self.paramWatchers[key];
	        if (cb) {
	          cb.call(self, val, oldVal);
	        }
	      } else {
	        called = true;
	      }
	    }, {
	      immediate: true,
	      user: false
	    });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	  };

	  /**
	   * Check if the directive is a function caller
	   * and if the expression is a callable one. If both true,
	   * we wrap up the expression and use it as the event
	   * handler.
	   *
	   * e.g. on-click="a++"
	   *
	   * @return {Boolean}
	   */

	  Directive.prototype._checkStatement = function () {
	    var expression = this.expression;
	    if (expression && this.acceptStatement && !isSimplePath(expression)) {
	      var fn = parseExpression(expression).get;
	      var scope = this._scope || this.vm;
	      var handler = function handler(e) {
	        scope.$event = e;
	        fn.call(scope, scope);
	        scope.$event = null;
	      };
	      if (this.filters) {
	        handler = scope._applyFilters(handler, null, this.filters);
	      }
	      this.update(handler);
	      return true;
	    }
	  };

	  /**
	   * Set the corresponding value with the setter.
	   * This should only be used in two-way directives
	   * e.g. v-model.
	   *
	   * @param {*} value
	   * @public
	   */

	  Directive.prototype.set = function (value) {
	    /* istanbul ignore else */
	    if (this.twoWay) {
	      this._withLock(function () {
	        this._watcher.set(value);
	      });
	    } else if (true) {
	      warn('Directive.set() can only be used inside twoWay' + 'directives.');
	    }
	  };

	  /**
	   * Execute a function while preventing that function from
	   * triggering updates on this directive instance.
	   *
	   * @param {Function} fn
	   */

	  Directive.prototype._withLock = function (fn) {
	    var self = this;
	    self._locked = true;
	    fn.call(self);
	    nextTick(function () {
	      self._locked = false;
	    });
	  };

	  /**
	   * Convenience method that attaches a DOM event listener
	   * to the directive element and autometically tears it down
	   * during unbind.
	   *
	   * @param {String} event
	   * @param {Function} handler
	   * @param {Boolean} [useCapture]
	   */

	  Directive.prototype.on = function (event, handler, useCapture) {
	    on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
	  };

	  /**
	   * Teardown the watcher and call unbind.
	   */

	  Directive.prototype._teardown = function () {
	    if (this._bound) {
	      this._bound = false;
	      if (this.unbind) {
	        this.unbind();
	      }
	      if (this._watcher) {
	        this._watcher.teardown();
	      }
	      var listeners = this._listeners;
	      var i;
	      if (listeners) {
	        i = listeners.length;
	        while (i--) {
	          off(this.el, listeners[i][0], listeners[i][1]);
	        }
	      }
	      var unwatchFns = this._paramUnwatchFns;
	      if (unwatchFns) {
	        i = unwatchFns.length;
	        while (i--) {
	          unwatchFns[i]();
	        }
	      }
	      if ('development' !== 'production' && this.el) {
	        this.el._vue_directives.$remove(this);
	      }
	      this.vm = this.el = this._watcher = this._listeners = null;
	    }
	  };

	  function lifecycleMixin (Vue) {
	    /**
	     * Update v-ref for component.
	     *
	     * @param {Boolean} remove
	     */

	    Vue.prototype._updateRef = function (remove) {
	      var ref = this.$options._ref;
	      if (ref) {
	        var refs = (this._scope || this._context).$refs;
	        if (remove) {
	          if (refs[ref] === this) {
	            refs[ref] = null;
	          }
	        } else {
	          refs[ref] = this;
	        }
	      }
	    };

	    /**
	     * Transclude, compile and link element.
	     *
	     * If a pre-compiled linker is available, that means the
	     * passed in element will be pre-transcluded and compiled
	     * as well - all we need to do is to call the linker.
	     *
	     * Otherwise we need to call transclude/compile/link here.
	     *
	     * @param {Element} el
	     */

	    Vue.prototype._compile = function (el) {
	      var options = this.$options;

	      // transclude and init element
	      // transclude can potentially replace original
	      // so we need to keep reference; this step also injects
	      // the template and caches the original attributes
	      // on the container node and replacer node.
	      var original = el;
	      el = transclude(el, options);
	      this._initElement(el);

	      // handle v-pre on root node (#2026)
	      if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
	        return;
	      }

	      // root is always compiled per-instance, because
	      // container attrs and props can be different every time.
	      var contextOptions = this._context && this._context.$options;
	      var rootLinker = compileRoot(el, options, contextOptions);

	      // resolve slot distribution
	      resolveSlots(this, options._content);

	      // compile and link the rest
	      var contentLinkFn;
	      var ctor = this.constructor;
	      // component compilation can be cached
	      // as long as it's not using inline-template
	      if (options._linkerCachable) {
	        contentLinkFn = ctor.linker;
	        if (!contentLinkFn) {
	          contentLinkFn = ctor.linker = compile(el, options);
	        }
	      }

	      // link phase
	      // make sure to link root with prop scope!
	      var rootUnlinkFn = rootLinker(this, el, this._scope);
	      var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);

	      // register composite unlink function
	      // to be called during instance destruction
	      this._unlinkFn = function () {
	        rootUnlinkFn();
	        // passing destroying: true to avoid searching and
	        // splicing the directives
	        contentUnlinkFn(true);
	      };

	      // finally replace original
	      if (options.replace) {
	        replace(original, el);
	      }

	      this._isCompiled = true;
	      this._callHook('compiled');
	    };

	    /**
	     * Initialize instance element. Called in the public
	     * $mount() method.
	     *
	     * @param {Element} el
	     */

	    Vue.prototype._initElement = function (el) {
	      if (isFragment(el)) {
	        this._isFragment = true;
	        this.$el = this._fragmentStart = el.firstChild;
	        this._fragmentEnd = el.lastChild;
	        // set persisted text anchors to empty
	        if (this._fragmentStart.nodeType === 3) {
	          this._fragmentStart.data = this._fragmentEnd.data = '';
	        }
	        this._fragment = el;
	      } else {
	        this.$el = el;
	      }
	      this.$el.__vue__ = this;
	      this._callHook('beforeCompile');
	    };

	    /**
	     * Create and bind a directive to an element.
	     *
	     * @param {Object} descriptor - parsed directive descriptor
	     * @param {Node} node   - target node
	     * @param {Vue} [host] - transclusion host component
	     * @param {Object} [scope] - v-for scope
	     * @param {Fragment} [frag] - owner fragment
	     */

	    Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	      this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	    };

	    /**
	     * Teardown an instance, unobserves the data, unbind all the
	     * directives, turn off all the event listeners, etc.
	     *
	     * @param {Boolean} remove - whether to remove the DOM node.
	     * @param {Boolean} deferCleanup - if true, defer cleanup to
	     *                                 be called later
	     */

	    Vue.prototype._destroy = function (remove, deferCleanup) {
	      if (this._isBeingDestroyed) {
	        if (!deferCleanup) {
	          this._cleanup();
	        }
	        return;
	      }

	      var destroyReady;
	      var pendingRemoval;

	      var self = this;
	      // Cleanup should be called either synchronously or asynchronoysly as
	      // callback of this.$remove(), or if remove and deferCleanup are false.
	      // In any case it should be called after all other removing, unbinding and
	      // turning of is done
	      var cleanupIfPossible = function cleanupIfPossible() {
	        if (destroyReady && !pendingRemoval && !deferCleanup) {
	          self._cleanup();
	        }
	      };

	      // remove DOM element
	      if (remove && this.$el) {
	        pendingRemoval = true;
	        this.$remove(function () {
	          pendingRemoval = false;
	          cleanupIfPossible();
	        });
	      }

	      this._callHook('beforeDestroy');
	      this._isBeingDestroyed = true;
	      var i;
	      // remove self from parent. only necessary
	      // if parent is not being destroyed as well.
	      var parent = this.$parent;
	      if (parent && !parent._isBeingDestroyed) {
	        parent.$children.$remove(this);
	        // unregister ref (remove: true)
	        this._updateRef(true);
	      }
	      // destroy all children.
	      i = this.$children.length;
	      while (i--) {
	        this.$children[i].$destroy();
	      }
	      // teardown props
	      if (this._propsUnlinkFn) {
	        this._propsUnlinkFn();
	      }
	      // teardown all directives. this also tearsdown all
	      // directive-owned watchers.
	      if (this._unlinkFn) {
	        this._unlinkFn();
	      }
	      i = this._watchers.length;
	      while (i--) {
	        this._watchers[i].teardown();
	      }
	      // remove reference to self on $el
	      if (this.$el) {
	        this.$el.__vue__ = null;
	      }

	      destroyReady = true;
	      cleanupIfPossible();
	    };

	    /**
	     * Clean up to ensure garbage collection.
	     * This is called after the leave transition if there
	     * is any.
	     */

	    Vue.prototype._cleanup = function () {
	      if (this._isDestroyed) {
	        return;
	      }
	      // remove self from owner fragment
	      // do it in cleanup so that we can call $destroy with
	      // defer right when a fragment is about to be removed.
	      if (this._frag) {
	        this._frag.children.$remove(this);
	      }
	      // remove reference from data ob
	      // frozen object may not have observer.
	      if (this._data && this._data.__ob__) {
	        this._data.__ob__.removeVm(this);
	      }
	      // Clean up references to private properties and other
	      // instances. preserve reference to _data so that proxy
	      // accessors still work. The only potential side effect
	      // here is that mutating the instance after it's destroyed
	      // may affect the state of other components that are still
	      // observing the same object, but that seems to be a
	      // reasonable responsibility for the user rather than
	      // always throwing an error on them.
	      this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	      // call the last hook...
	      this._isDestroyed = true;
	      this._callHook('destroyed');
	      // turn off all instance listeners.
	      this.$off();
	    };
	  }

	  function miscMixin (Vue) {
	    /**
	     * Apply a list of filter (descriptors) to a value.
	     * Using plain for loops here because this will be called in
	     * the getter of any watcher with filters so it is very
	     * performance sensitive.
	     *
	     * @param {*} value
	     * @param {*} [oldValue]
	     * @param {Array} filters
	     * @param {Boolean} write
	     * @return {*}
	     */

	    Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	      var filter, fn, args, arg, offset, i, l, j, k;
	      for (i = 0, l = filters.length; i < l; i++) {
	        filter = filters[write ? l - i - 1 : i];
	        fn = resolveAsset(this.$options, 'filters', filter.name, true);
	        if (!fn) continue;
	        fn = write ? fn.write : fn.read || fn;
	        if (typeof fn !== 'function') continue;
	        args = write ? [value, oldValue] : [value];
	        offset = write ? 2 : 1;
	        if (filter.args) {
	          for (j = 0, k = filter.args.length; j < k; j++) {
	            arg = filter.args[j];
	            args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	          }
	        }
	        value = fn.apply(this, args);
	      }
	      return value;
	    };

	    /**
	     * Resolve a component, depending on whether the component
	     * is defined normally or using an async factory function.
	     * Resolves synchronously if already resolved, otherwise
	     * resolves asynchronously and caches the resolved
	     * constructor on the factory.
	     *
	     * @param {String|Function} value
	     * @param {Function} cb
	     */

	    Vue.prototype._resolveComponent = function (value, cb) {
	      var factory;
	      if (typeof value === 'function') {
	        factory = value;
	      } else {
	        factory = resolveAsset(this.$options, 'components', value, true);
	      }
	      /* istanbul ignore if */
	      if (!factory) {
	        return;
	      }
	      // async component factory
	      if (!factory.options) {
	        if (factory.resolved) {
	          // cached
	          cb(factory.resolved);
	        } else if (factory.requested) {
	          // pool callbacks
	          factory.pendingCallbacks.push(cb);
	        } else {
	          factory.requested = true;
	          var cbs = factory.pendingCallbacks = [cb];
	          factory.call(this, function resolve(res) {
	            if (isPlainObject(res)) {
	              res = Vue.extend(res);
	            }
	            // cache resolved
	            factory.resolved = res;
	            // invoke callbacks
	            for (var i = 0, l = cbs.length; i < l; i++) {
	              cbs[i](res);
	            }
	          }, function reject(reason) {
	            'development' !== 'production' && warn('Failed to resolve async component' + (typeof value === 'string' ? ': ' + value : '') + '. ' + (reason ? '\nReason: ' + reason : ''));
	          });
	        }
	      } else {
	        // normal component
	        cb(factory);
	      }
	    };
	  }

	  var filterRE$1 = /[^|]\|[^|]/;

	  function dataAPI (Vue) {
	    /**
	     * Get the value from an expression on this vm.
	     *
	     * @param {String} exp
	     * @param {Boolean} [asStatement]
	     * @return {*}
	     */

	    Vue.prototype.$get = function (exp, asStatement) {
	      var res = parseExpression(exp);
	      if (res) {
	        if (asStatement) {
	          var self = this;
	          return function statementHandler() {
	            self.$arguments = toArray(arguments);
	            var result = res.get.call(self, self);
	            self.$arguments = null;
	            return result;
	          };
	        } else {
	          try {
	            return res.get.call(this, this);
	          } catch (e) {}
	        }
	      }
	    };

	    /**
	     * Set the value from an expression on this vm.
	     * The expression must be a valid left-hand
	     * expression in an assignment.
	     *
	     * @param {String} exp
	     * @param {*} val
	     */

	    Vue.prototype.$set = function (exp, val) {
	      var res = parseExpression(exp, true);
	      if (res && res.set) {
	        res.set.call(this, this, val);
	      }
	    };

	    /**
	     * Delete a property on the VM
	     *
	     * @param {String} key
	     */

	    Vue.prototype.$delete = function (key) {
	      del(this._data, key);
	    };

	    /**
	     * Watch an expression, trigger callback when its
	     * value changes.
	     *
	     * @param {String|Function} expOrFn
	     * @param {Function} cb
	     * @param {Object} [options]
	     *                 - {Boolean} deep
	     *                 - {Boolean} immediate
	     * @return {Function} - unwatchFn
	     */

	    Vue.prototype.$watch = function (expOrFn, cb, options) {
	      var vm = this;
	      var parsed;
	      if (typeof expOrFn === 'string') {
	        parsed = parseDirective(expOrFn);
	        expOrFn = parsed.expression;
	      }
	      var watcher = new Watcher(vm, expOrFn, cb, {
	        deep: options && options.deep,
	        sync: options && options.sync,
	        filters: parsed && parsed.filters,
	        user: !options || options.user !== false
	      });
	      if (options && options.immediate) {
	        cb.call(vm, watcher.value);
	      }
	      return function unwatchFn() {
	        watcher.teardown();
	      };
	    };

	    /**
	     * Evaluate a text directive, including filters.
	     *
	     * @param {String} text
	     * @param {Boolean} [asStatement]
	     * @return {String}
	     */

	    Vue.prototype.$eval = function (text, asStatement) {
	      // check for filters.
	      if (filterRE$1.test(text)) {
	        var dir = parseDirective(text);
	        // the filter regex check might give false positive
	        // for pipes inside strings, so it's possible that
	        // we don't get any filters here
	        var val = this.$get(dir.expression, asStatement);
	        return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	      } else {
	        // no filter
	        return this.$get(text, asStatement);
	      }
	    };

	    /**
	     * Interpolate a piece of template text.
	     *
	     * @param {String} text
	     * @return {String}
	     */

	    Vue.prototype.$interpolate = function (text) {
	      var tokens = parseText(text);
	      var vm = this;
	      if (tokens) {
	        if (tokens.length === 1) {
	          return vm.$eval(tokens[0].value) + '';
	        } else {
	          return tokens.map(function (token) {
	            return token.tag ? vm.$eval(token.value) : token.value;
	          }).join('');
	        }
	      } else {
	        return text;
	      }
	    };

	    /**
	     * Log instance data as a plain JS object
	     * so that it is easier to inspect in console.
	     * This method assumes console is available.
	     *
	     * @param {String} [path]
	     */

	    Vue.prototype.$log = function (path) {
	      var data = path ? getPath(this._data, path) : this._data;
	      if (data) {
	        data = clean(data);
	      }
	      // include computed fields
	      if (!path) {
	        var key;
	        for (key in this.$options.computed) {
	          data[key] = clean(this[key]);
	        }
	        if (this._props) {
	          for (key in this._props) {
	            data[key] = clean(this[key]);
	          }
	        }
	      }
	      console.log(data);
	    };

	    /**
	     * "clean" a getter/setter converted object into a plain
	     * object copy.
	     *
	     * @param {Object} - obj
	     * @return {Object}
	     */

	    function clean(obj) {
	      return JSON.parse(JSON.stringify(obj));
	    }
	  }

	  function domAPI (Vue) {
	    /**
	     * Convenience on-instance nextTick. The callback is
	     * auto-bound to the instance, and this avoids component
	     * modules having to rely on the global Vue.
	     *
	     * @param {Function} fn
	     */

	    Vue.prototype.$nextTick = function (fn) {
	      nextTick(fn, this);
	    };

	    /**
	     * Append instance to target
	     *
	     * @param {Node} target
	     * @param {Function} [cb]
	     * @param {Boolean} [withTransition] - defaults to true
	     */

	    Vue.prototype.$appendTo = function (target, cb, withTransition) {
	      return insert(this, target, cb, withTransition, append, appendWithTransition);
	    };

	    /**
	     * Prepend instance to target
	     *
	     * @param {Node} target
	     * @param {Function} [cb]
	     * @param {Boolean} [withTransition] - defaults to true
	     */

	    Vue.prototype.$prependTo = function (target, cb, withTransition) {
	      target = query(target);
	      if (target.hasChildNodes()) {
	        this.$before(target.firstChild, cb, withTransition);
	      } else {
	        this.$appendTo(target, cb, withTransition);
	      }
	      return this;
	    };

	    /**
	     * Insert instance before target
	     *
	     * @param {Node} target
	     * @param {Function} [cb]
	     * @param {Boolean} [withTransition] - defaults to true
	     */

	    Vue.prototype.$before = function (target, cb, withTransition) {
	      return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	    };

	    /**
	     * Insert instance after target
	     *
	     * @param {Node} target
	     * @param {Function} [cb]
	     * @param {Boolean} [withTransition] - defaults to true
	     */

	    Vue.prototype.$after = function (target, cb, withTransition) {
	      target = query(target);
	      if (target.nextSibling) {
	        this.$before(target.nextSibling, cb, withTransition);
	      } else {
	        this.$appendTo(target.parentNode, cb, withTransition);
	      }
	      return this;
	    };

	    /**
	     * Remove instance from DOM
	     *
	     * @param {Function} [cb]
	     * @param {Boolean} [withTransition] - defaults to true
	     */

	    Vue.prototype.$remove = function (cb, withTransition) {
	      if (!this.$el.parentNode) {
	        return cb && cb();
	      }
	      var inDocument = this._isAttached && inDoc(this.$el);
	      // if we are not in document, no need to check
	      // for transitions
	      if (!inDocument) withTransition = false;
	      var self = this;
	      var realCb = function realCb() {
	        if (inDocument) self._callHook('detached');
	        if (cb) cb();
	      };
	      if (this._isFragment) {
	        removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	      } else {
	        var op = withTransition === false ? removeWithCb : removeWithTransition;
	        op(this.$el, this, realCb);
	      }
	      return this;
	    };

	    /**
	     * Shared DOM insertion function.
	     *
	     * @param {Vue} vm
	     * @param {Element} target
	     * @param {Function} [cb]
	     * @param {Boolean} [withTransition]
	     * @param {Function} op1 - op for non-transition insert
	     * @param {Function} op2 - op for transition insert
	     * @return vm
	     */

	    function insert(vm, target, cb, withTransition, op1, op2) {
	      target = query(target);
	      var targetIsDetached = !inDoc(target);
	      var op = withTransition === false || targetIsDetached ? op1 : op2;
	      var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	      if (vm._isFragment) {
	        mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	          op(node, target, vm);
	        });
	        cb && cb();
	      } else {
	        op(vm.$el, target, vm, cb);
	      }
	      if (shouldCallHook) {
	        vm._callHook('attached');
	      }
	      return vm;
	    }

	    /**
	     * Check for selectors
	     *
	     * @param {String|Element} el
	     */

	    function query(el) {
	      return typeof el === 'string' ? document.querySelector(el) : el;
	    }

	    /**
	     * Append operation that takes a callback.
	     *
	     * @param {Node} el
	     * @param {Node} target
	     * @param {Vue} vm - unused
	     * @param {Function} [cb]
	     */

	    function append(el, target, vm, cb) {
	      target.appendChild(el);
	      if (cb) cb();
	    }

	    /**
	     * InsertBefore operation that takes a callback.
	     *
	     * @param {Node} el
	     * @param {Node} target
	     * @param {Vue} vm - unused
	     * @param {Function} [cb]
	     */

	    function beforeWithCb(el, target, vm, cb) {
	      before(el, target);
	      if (cb) cb();
	    }

	    /**
	     * Remove operation that takes a callback.
	     *
	     * @param {Node} el
	     * @param {Vue} vm - unused
	     * @param {Function} [cb]
	     */

	    function removeWithCb(el, vm, cb) {
	      remove(el);
	      if (cb) cb();
	    }
	  }

	  function eventsAPI (Vue) {
	    /**
	     * Listen on the given `event` with `fn`.
	     *
	     * @param {String} event
	     * @param {Function} fn
	     */

	    Vue.prototype.$on = function (event, fn) {
	      (this._events[event] || (this._events[event] = [])).push(fn);
	      modifyListenerCount(this, event, 1);
	      return this;
	    };

	    /**
	     * Adds an `event` listener that will be invoked a single
	     * time then automatically removed.
	     *
	     * @param {String} event
	     * @param {Function} fn
	     */

	    Vue.prototype.$once = function (event, fn) {
	      var self = this;
	      function on() {
	        self.$off(event, on);
	        fn.apply(this, arguments);
	      }
	      on.fn = fn;
	      this.$on(event, on);
	      return this;
	    };

	    /**
	     * Remove the given callback for `event` or all
	     * registered callbacks.
	     *
	     * @param {String} event
	     * @param {Function} fn
	     */

	    Vue.prototype.$off = function (event, fn) {
	      var cbs;
	      // all
	      if (!arguments.length) {
	        if (this.$parent) {
	          for (event in this._events) {
	            cbs = this._events[event];
	            if (cbs) {
	              modifyListenerCount(this, event, -cbs.length);
	            }
	          }
	        }
	        this._events = {};
	        return this;
	      }
	      // specific event
	      cbs = this._events[event];
	      if (!cbs) {
	        return this;
	      }
	      if (arguments.length === 1) {
	        modifyListenerCount(this, event, -cbs.length);
	        this._events[event] = null;
	        return this;
	      }
	      // specific handler
	      var cb;
	      var i = cbs.length;
	      while (i--) {
	        cb = cbs[i];
	        if (cb === fn || cb.fn === fn) {
	          modifyListenerCount(this, event, -1);
	          cbs.splice(i, 1);
	          break;
	        }
	      }
	      return this;
	    };

	    /**
	     * Trigger an event on self.
	     *
	     * @param {String|Object} event
	     * @return {Boolean} shouldPropagate
	     */

	    Vue.prototype.$emit = function (event) {
	      var isSource = typeof event === 'string';
	      event = isSource ? event : event.name;
	      var cbs = this._events[event];
	      var shouldPropagate = isSource || !cbs;
	      if (cbs) {
	        cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	        // this is a somewhat hacky solution to the question raised
	        // in #2102: for an inline component listener like <comp @test="doThis">,
	        // the propagation handling is somewhat broken. Therefore we
	        // need to treat these inline callbacks differently.
	        var hasParentCbs = isSource && cbs.some(function (cb) {
	          return cb._fromParent;
	        });
	        if (hasParentCbs) {
	          shouldPropagate = false;
	        }
	        var args = toArray(arguments, 1);
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          var cb = cbs[i];
	          var res = cb.apply(this, args);
	          if (res === true && (!hasParentCbs || cb._fromParent)) {
	            shouldPropagate = true;
	          }
	        }
	      }
	      return shouldPropagate;
	    };

	    /**
	     * Recursively broadcast an event to all children instances.
	     *
	     * @param {String|Object} event
	     * @param {...*} additional arguments
	     */

	    Vue.prototype.$broadcast = function (event) {
	      var isSource = typeof event === 'string';
	      event = isSource ? event : event.name;
	      // if no child has registered for this event,
	      // then there's no need to broadcast.
	      if (!this._eventsCount[event]) return;
	      var children = this.$children;
	      var args = toArray(arguments);
	      if (isSource) {
	        // use object event to indicate non-source emit
	        // on children
	        args[0] = { name: event, source: this };
	      }
	      for (var i = 0, l = children.length; i < l; i++) {
	        var child = children[i];
	        var shouldPropagate = child.$emit.apply(child, args);
	        if (shouldPropagate) {
	          child.$broadcast.apply(child, args);
	        }
	      }
	      return this;
	    };

	    /**
	     * Recursively propagate an event up the parent chain.
	     *
	     * @param {String} event
	     * @param {...*} additional arguments
	     */

	    Vue.prototype.$dispatch = function (event) {
	      var shouldPropagate = this.$emit.apply(this, arguments);
	      if (!shouldPropagate) return;
	      var parent = this.$parent;
	      var args = toArray(arguments);
	      // use object event to indicate non-source emit
	      // on parents
	      args[0] = { name: event, source: this };
	      while (parent) {
	        shouldPropagate = parent.$emit.apply(parent, args);
	        parent = shouldPropagate ? parent.$parent : null;
	      }
	      return this;
	    };

	    /**
	     * Modify the listener counts on all parents.
	     * This bookkeeping allows $broadcast to return early when
	     * no child has listened to a certain event.
	     *
	     * @param {Vue} vm
	     * @param {String} event
	     * @param {Number} count
	     */

	    var hookRE = /^hook:/;
	    function modifyListenerCount(vm, event, count) {
	      var parent = vm.$parent;
	      // hooks do not get broadcasted so no need
	      // to do bookkeeping for them
	      if (!parent || !count || hookRE.test(event)) return;
	      while (parent) {
	        parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	        parent = parent.$parent;
	      }
	    }
	  }

	  function lifecycleAPI (Vue) {
	    /**
	     * Set instance target element and kick off the compilation
	     * process. The passed in `el` can be a selector string, an
	     * existing Element, or a DocumentFragment (for block
	     * instances).
	     *
	     * @param {Element|DocumentFragment|string} el
	     * @public
	     */

	    Vue.prototype.$mount = function (el) {
	      if (this._isCompiled) {
	        'development' !== 'production' && warn('$mount() should be called only once.', this);
	        return;
	      }
	      el = query(el);
	      if (!el) {
	        el = document.createElement('div');
	      }
	      this._compile(el);
	      this._initDOMHooks();
	      if (inDoc(this.$el)) {
	        this._callHook('attached');
	        ready.call(this);
	      } else {
	        this.$once('hook:attached', ready);
	      }
	      return this;
	    };

	    /**
	     * Mark an instance as ready.
	     */

	    function ready() {
	      this._isAttached = true;
	      this._isReady = true;
	      this._callHook('ready');
	    }

	    /**
	     * Teardown the instance, simply delegate to the internal
	     * _destroy.
	     *
	     * @param {Boolean} remove
	     * @param {Boolean} deferCleanup
	     */

	    Vue.prototype.$destroy = function (remove, deferCleanup) {
	      this._destroy(remove, deferCleanup);
	    };

	    /**
	     * Partially compile a piece of DOM and return a
	     * decompile function.
	     *
	     * @param {Element|DocumentFragment} el
	     * @param {Vue} [host]
	     * @param {Object} [scope]
	     * @param {Fragment} [frag]
	     * @return {Function}
	     */

	    Vue.prototype.$compile = function (el, host, scope, frag) {
	      return compile(el, this.$options, true)(this, el, host, scope, frag);
	    };
	  }

	  /**
	   * The exposed Vue constructor.
	   *
	   * API conventions:
	   * - public API methods/properties are prefixed with `$`
	   * - internal methods/properties are prefixed with `_`
	   * - non-prefixed properties are assumed to be proxied user
	   *   data.
	   *
	   * @constructor
	   * @param {Object} [options]
	   * @public
	   */

	  function Vue(options) {
	    this._init(options);
	  }

	  // install internals
	  initMixin(Vue);
	  stateMixin(Vue);
	  eventsMixin(Vue);
	  lifecycleMixin(Vue);
	  miscMixin(Vue);

	  // install instance APIs
	  dataAPI(Vue);
	  domAPI(Vue);
	  eventsAPI(Vue);
	  lifecycleAPI(Vue);

	  var slot = {

	    priority: SLOT,
	    params: ['name'],

	    bind: function bind() {
	      // this was resolved during component transclusion
	      var name = this.params.name || 'default';
	      var content = this.vm._slotContents && this.vm._slotContents[name];
	      if (!content || !content.hasChildNodes()) {
	        this.fallback();
	      } else {
	        this.compile(content.cloneNode(true), this.vm._context, this.vm);
	      }
	    },

	    compile: function compile(content, context, host) {
	      if (content && context) {
	        if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
	          // if the inserted slot has v-if
	          // inject fallback content as the v-else
	          var elseBlock = document.createElement('template');
	          elseBlock.setAttribute('v-else', '');
	          elseBlock.innerHTML = this.el.innerHTML;
	          // the else block should be compiled in child scope
	          elseBlock._context = this.vm;
	          content.appendChild(elseBlock);
	        }
	        var scope = host ? host._scope : this._scope;
	        this.unlink = context.$compile(content, host, scope, this._frag);
	      }
	      if (content) {
	        replace(this.el, content);
	      } else {
	        remove(this.el);
	      }
	    },

	    fallback: function fallback() {
	      this.compile(extractContent(this.el, true), this.vm);
	    },

	    unbind: function unbind() {
	      if (this.unlink) {
	        this.unlink();
	      }
	    }
	  };

	  var partial = {

	    priority: PARTIAL,

	    params: ['name'],

	    // watch changes to name for dynamic partials
	    paramWatchers: {
	      name: function name(value) {
	        vIf.remove.call(this);
	        if (value) {
	          this.insert(value);
	        }
	      }
	    },

	    bind: function bind() {
	      this.anchor = createAnchor('v-partial');
	      replace(this.el, this.anchor);
	      this.insert(this.params.name);
	    },

	    insert: function insert(id) {
	      var partial = resolveAsset(this.vm.$options, 'partials', id, true);
	      if (partial) {
	        this.factory = new FragmentFactory(this.vm, partial);
	        vIf.insert.call(this);
	      }
	    },

	    unbind: function unbind() {
	      if (this.frag) {
	        this.frag.destroy();
	      }
	    }
	  };

	  var elementDirectives = {
	    slot: slot,
	    partial: partial
	  };

	  var convertArray = vFor._postProcess;

	  /**
	   * Limit filter for arrays
	   *
	   * @param {Number} n
	   * @param {Number} offset (Decimal expected)
	   */

	  function limitBy(arr, n, offset) {
	    offset = offset ? parseInt(offset, 10) : 0;
	    n = toNumber(n);
	    return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	  }

	  /**
	   * Filter filter for arrays
	   *
	   * @param {String} search
	   * @param {String} [delimiter]
	   * @param {String} ...dataKeys
	   */

	  function filterBy(arr, search, delimiter) {
	    arr = convertArray(arr);
	    if (search == null) {
	      return arr;
	    }
	    if (typeof search === 'function') {
	      return arr.filter(search);
	    }
	    // cast to lowercase string
	    search = ('' + search).toLowerCase();
	    // allow optional `in` delimiter
	    // because why not
	    var n = delimiter === 'in' ? 3 : 2;
	    // extract and flatten keys
	    var keys = Array.prototype.concat.apply([], toArray(arguments, n));
	    var res = [];
	    var item, key, val, j;
	    for (var i = 0, l = arr.length; i < l; i++) {
	      item = arr[i];
	      val = item && item.$value || item;
	      j = keys.length;
	      if (j) {
	        while (j--) {
	          key = keys[j];
	          if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
	            res.push(item);
	            break;
	          }
	        }
	      } else if (contains(item, search)) {
	        res.push(item);
	      }
	    }
	    return res;
	  }

	  /**
	   * Filter filter for arrays
	   *
	   * @param {String|Array<String>|Function} ...sortKeys
	   * @param {Number} [order]
	   */

	  function orderBy(arr) {
	    var comparator = null;
	    var sortKeys = undefined;
	    arr = convertArray(arr);

	    // determine order (last argument)
	    var args = toArray(arguments, 1);
	    var order = args[args.length - 1];
	    if (typeof order === 'number') {
	      order = order < 0 ? -1 : 1;
	      args = args.length > 1 ? args.slice(0, -1) : args;
	    } else {
	      order = 1;
	    }

	    // determine sortKeys & comparator
	    var firstArg = args[0];
	    if (!firstArg) {
	      return arr;
	    } else if (typeof firstArg === 'function') {
	      // custom comparator
	      comparator = function (a, b) {
	        return firstArg(a, b) * order;
	      };
	    } else {
	      // string keys. flatten first
	      sortKeys = Array.prototype.concat.apply([], args);
	      comparator = function (a, b, i) {
	        i = i || 0;
	        return i >= sortKeys.length - 1 ? baseCompare(a, b, i) : baseCompare(a, b, i) || comparator(a, b, i + 1);
	      };
	    }

	    function baseCompare(a, b, sortKeyIndex) {
	      var sortKey = sortKeys[sortKeyIndex];
	      if (sortKey) {
	        if (sortKey !== '$key') {
	          if (isObject(a) && '$value' in a) a = a.$value;
	          if (isObject(b) && '$value' in b) b = b.$value;
	        }
	        a = isObject(a) ? getPath(a, sortKey) : a;
	        b = isObject(b) ? getPath(b, sortKey) : b;
	      }
	      return a === b ? 0 : a > b ? order : -order;
	    }

	    // sort on a copy to avoid mutating original array
	    return arr.slice().sort(comparator);
	  }

	  /**
	   * String contain helper
	   *
	   * @param {*} val
	   * @param {String} search
	   */

	  function contains(val, search) {
	    var i;
	    if (isPlainObject(val)) {
	      var keys = Object.keys(val);
	      i = keys.length;
	      while (i--) {
	        if (contains(val[keys[i]], search)) {
	          return true;
	        }
	      }
	    } else if (isArray(val)) {
	      i = val.length;
	      while (i--) {
	        if (contains(val[i], search)) {
	          return true;
	        }
	      }
	    } else if (val != null) {
	      return val.toString().toLowerCase().indexOf(search) > -1;
	    }
	  }

	  var digitsRE = /(\d{3})(?=\d)/g;

	  // asset collections must be a plain object.
	  var filters = {

	    orderBy: orderBy,
	    filterBy: filterBy,
	    limitBy: limitBy,

	    /**
	     * Stringify value.
	     *
	     * @param {Number} indent
	     */

	    json: {
	      read: function read(value, indent) {
	        return typeof value === 'string' ? value : JSON.stringify(value, null, Number(indent) || 2);
	      },
	      write: function write(value) {
	        try {
	          return JSON.parse(value);
	        } catch (e) {
	          return value;
	        }
	      }
	    },

	    /**
	     * 'abc' => 'Abc'
	     */

	    capitalize: function capitalize(value) {
	      if (!value && value !== 0) return '';
	      value = value.toString();
	      return value.charAt(0).toUpperCase() + value.slice(1);
	    },

	    /**
	     * 'abc' => 'ABC'
	     */

	    uppercase: function uppercase(value) {
	      return value || value === 0 ? value.toString().toUpperCase() : '';
	    },

	    /**
	     * 'AbC' => 'abc'
	     */

	    lowercase: function lowercase(value) {
	      return value || value === 0 ? value.toString().toLowerCase() : '';
	    },

	    /**
	     * 12345 => $12,345.00
	     *
	     * @param {String} sign
	     * @param {Number} decimals Decimal places
	     */

	    currency: function currency(value, _currency, decimals) {
	      value = parseFloat(value);
	      if (!isFinite(value) || !value && value !== 0) return '';
	      _currency = _currency != null ? _currency : '$';
	      decimals = decimals != null ? decimals : 2;
	      var stringified = Math.abs(value).toFixed(decimals);
	      var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
	      var i = _int.length % 3;
	      var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	      var _float = decimals ? stringified.slice(-1 - decimals) : '';
	      var sign = value < 0 ? '-' : '';
	      return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	    },

	    /**
	     * 'item' => 'items'
	     *
	     * @params
	     *  an array of strings corresponding to
	     *  the single, double, triple ... forms of the word to
	     *  be pluralized. When the number to be pluralized
	     *  exceeds the length of the args, it will use the last
	     *  entry in the array.
	     *
	     *  e.g. ['single', 'double', 'triple', 'multiple']
	     */

	    pluralize: function pluralize(value) {
	      var args = toArray(arguments, 1);
	      return args.length > 1 ? args[value % 10 - 1] || args[args.length - 1] : args[0] + (value === 1 ? '' : 's');
	    },

	    /**
	     * Debounce a handler function.
	     *
	     * @param {Function} handler
	     * @param {Number} delay = 300
	     * @return {Function}
	     */

	    debounce: function debounce(handler, delay) {
	      if (!handler) return;
	      if (!delay) {
	        delay = 300;
	      }
	      return _debounce(handler, delay);
	    }
	  };

	  function installGlobalAPI (Vue) {
	    /**
	     * Vue and every constructor that extends Vue has an
	     * associated options object, which can be accessed during
	     * compilation steps as `this.constructor.options`.
	     *
	     * These can be seen as the default options of every
	     * Vue instance.
	     */

	    Vue.options = {
	      directives: directives,
	      elementDirectives: elementDirectives,
	      filters: filters,
	      transitions: {},
	      components: {},
	      partials: {},
	      replace: true
	    };

	    /**
	     * Expose useful internals
	     */

	    Vue.util = util;
	    Vue.config = config;
	    Vue.set = set;
	    Vue['delete'] = del;
	    Vue.nextTick = nextTick;

	    /**
	     * The following are exposed for advanced usage / plugins
	     */

	    Vue.compiler = compiler;
	    Vue.FragmentFactory = FragmentFactory;
	    Vue.internalDirectives = internalDirectives;
	    Vue.parsers = {
	      path: path,
	      text: text,
	      template: template,
	      directive: directive,
	      expression: expression
	    };

	    /**
	     * Each instance constructor, including Vue, has a unique
	     * cid. This enables us to create wrapped "child
	     * constructors" for prototypal inheritance and cache them.
	     */

	    Vue.cid = 0;
	    var cid = 1;

	    /**
	     * Class inheritance
	     *
	     * @param {Object} extendOptions
	     */

	    Vue.extend = function (extendOptions) {
	      extendOptions = extendOptions || {};
	      var Super = this;
	      var isFirstExtend = Super.cid === 0;
	      if (isFirstExtend && extendOptions._Ctor) {
	        return extendOptions._Ctor;
	      }
	      var name = extendOptions.name || Super.options.name;
	      if (true) {
	        if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	          warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
	          name = null;
	        }
	      }
	      var Sub = createClass(name || 'VueComponent');
	      Sub.prototype = Object.create(Super.prototype);
	      Sub.prototype.constructor = Sub;
	      Sub.cid = cid++;
	      Sub.options = mergeOptions(Super.options, extendOptions);
	      Sub['super'] = Super;
	      // allow further extension
	      Sub.extend = Super.extend;
	      // create asset registers, so extended classes
	      // can have their private assets too.
	      config._assetTypes.forEach(function (type) {
	        Sub[type] = Super[type];
	      });
	      // enable recursive self-lookup
	      if (name) {
	        Sub.options.components[name] = Sub;
	      }
	      // cache constructor
	      if (isFirstExtend) {
	        extendOptions._Ctor = Sub;
	      }
	      return Sub;
	    };

	    /**
	     * A function that returns a sub-class constructor with the
	     * given name. This gives us much nicer output when
	     * logging instances in the console.
	     *
	     * @param {String} name
	     * @return {Function}
	     */

	    function createClass(name) {
	      /* eslint-disable no-new-func */
	      return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	      /* eslint-enable no-new-func */
	    }

	    /**
	     * Plugin system
	     *
	     * @param {Object} plugin
	     */

	    Vue.use = function (plugin) {
	      /* istanbul ignore if */
	      if (plugin.installed) {
	        return;
	      }
	      // additional parameters
	      var args = toArray(arguments, 1);
	      args.unshift(this);
	      if (typeof plugin.install === 'function') {
	        plugin.install.apply(plugin, args);
	      } else {
	        plugin.apply(null, args);
	      }
	      plugin.installed = true;
	      return this;
	    };

	    /**
	     * Apply a global mixin by merging it into the default
	     * options.
	     */

	    Vue.mixin = function (mixin) {
	      Vue.options = mergeOptions(Vue.options, mixin);
	    };

	    /**
	     * Create asset registration methods with the following
	     * signature:
	     *
	     * @param {String} id
	     * @param {*} definition
	     */

	    config._assetTypes.forEach(function (type) {
	      Vue[type] = function (id, definition) {
	        if (!definition) {
	          return this.options[type + 's'][id];
	        } else {
	          /* istanbul ignore if */
	          if (true) {
	            if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
	              warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	            }
	          }
	          if (type === 'component' && isPlainObject(definition)) {
	            definition.name = id;
	            definition = Vue.extend(definition);
	          }
	          this.options[type + 's'][id] = definition;
	          return definition;
	        }
	      };
	    });

	    // expose internal transition API
	    extend(Vue.transition, transition);
	  }

	  installGlobalAPI(Vue);

	  Vue.version = '1.0.24';

	  // devtools global hook
	  /* istanbul ignore next */
	  setTimeout(function () {
	    if (config.devtools) {
	      if (devtools) {
	        devtools.emit('init', Vue);
	      } else if ('development' !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
	        console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	      }
	    }
	  }, 0);

	  return Vue;

	}));
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(3)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] demo.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(5)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-04e1af42/demo.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _rangepicker = __webpack_require__(4);

	var _rangepicker2 = _interopRequireDefault(_rangepicker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            startDate: '',
	            endDate: ''
	        };
	    },

	    components: { rangepicker: _rangepicker2.default }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.rangepicker=t():e.rangepicker=t()}(this,function(){return function(e){function t(n){if(a[n])return a[n].exports;var s=a[n]={exports:{},id:n,loaded:!1};return e[n].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var s=a(169),r=n(s);e.exports=r.default},function(e,t,a){(function(e){!function(t,a){e.exports=a()}(this,function(){"use strict";function t(){return Mn.apply(null,arguments)}function n(e){Mn=e}function s(e){return e instanceof Array||"[object Array]"===Object.prototype.toString.call(e)}function r(e){return null!=e&&"[object Object]"===Object.prototype.toString.call(e)}function i(e){var t;for(t in e)return!1;return!0}function d(e){return e instanceof Date||"[object Date]"===Object.prototype.toString.call(e)}function o(e,t){var a,n=[];for(a=0;a<e.length;++a)n.push(t(e[a],a));return n}function _(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function u(e,t){for(var a in t)_(t,a)&&(e[a]=t[a]);return _(t,"toString")&&(e.toString=t.toString),_(t,"valueOf")&&(e.valueOf=t.valueOf),e}function m(e,t,a,n){return pt(e,t,a,n,!0).utc()}function l(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null}}function c(e){return null==e._pf&&(e._pf=l()),e._pf}function h(e){if(null==e._isValid){var t=c(e),a=fn.call(t.parsedDateParts,function(e){return null!=e}),n=!isNaN(e._d.getTime())&&t.overflow<0&&!t.empty&&!t.invalidMonth&&!t.invalidWeekday&&!t.nullInput&&!t.invalidFormat&&!t.userInvalidated&&(!t.meridiem||t.meridiem&&a);if(e._strict&&(n=n&&0===t.charsLeftOver&&0===t.unusedTokens.length&&void 0===t.bigHour),null!=Object.isFrozen&&Object.isFrozen(e))return n;e._isValid=n}return e._isValid}function M(e){var t=m(NaN);return null!=e?u(c(t),e):c(t).userInvalidated=!0,t}function f(e){return void 0===e}function L(e,t){var a,n,s;if(f(t._isAMomentObject)||(e._isAMomentObject=t._isAMomentObject),f(t._i)||(e._i=t._i),f(t._f)||(e._f=t._f),f(t._l)||(e._l=t._l),f(t._strict)||(e._strict=t._strict),f(t._tzm)||(e._tzm=t._tzm),f(t._isUTC)||(e._isUTC=t._isUTC),f(t._offset)||(e._offset=t._offset),f(t._pf)||(e._pf=c(t)),f(t._locale)||(e._locale=t._locale),Ln.length>0)for(a in Ln)n=Ln[a],s=t[n],f(s)||(e[n]=s);return e}function p(e){L(this,e),this._d=new Date(null!=e._d?e._d.getTime():NaN),pn===!1&&(pn=!0,t.updateOffset(this),pn=!1)}function Y(e){return e instanceof p||null!=e&&null!=e._isAMomentObject}function y(e){return e<0?Math.ceil(e)||0:Math.floor(e)}function k(e){var t=+e,a=0;return 0!==t&&isFinite(t)&&(a=y(t)),a}function D(e,t,a){var n,s=Math.min(e.length,t.length),r=Math.abs(e.length-t.length),i=0;for(n=0;n<s;n++)(a&&e[n]!==t[n]||!a&&k(e[n])!==k(t[n]))&&i++;return i+r}function v(e){t.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+e)}function g(e,a){var n=!0;return u(function(){if(null!=t.deprecationHandler&&t.deprecationHandler(null,e),n){for(var s,r=[],i=0;i<arguments.length;i++){if(s="","object"==typeof arguments[i]){s+="\n["+i+"] ";for(var d in arguments[0])s+=d+": "+arguments[0][d]+", ";s=s.slice(0,-2)}else s=arguments[i];r.push(s)}v(e+"\nArguments: "+Array.prototype.slice.call(r).join("")+"\n"+(new Error).stack),n=!1}return a.apply(this,arguments)},a)}function w(e,a){null!=t.deprecationHandler&&t.deprecationHandler(e,a),Yn[e]||(v(a),Yn[e]=!0)}function T(e){return e instanceof Function||"[object Function]"===Object.prototype.toString.call(e)}function b(e){var t,a;for(a in e)t=e[a],T(t)?this[a]=t:this["_"+a]=t;this._config=e,this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function S(e,t){var a,n=u({},e);for(a in t)_(t,a)&&(r(e[a])&&r(t[a])?(n[a]={},u(n[a],e[a]),u(n[a],t[a])):null!=t[a]?n[a]=t[a]:delete n[a]);for(a in e)_(e,a)&&!_(t,a)&&r(e[a])&&(n[a]=u({},n[a]));return n}function H(e){null!=e&&this.set(e)}function x(e,t,a){var n=this._calendar[e]||this._calendar.sameElse;return T(n)?n.call(t,a):n}function j(e){var t=this._longDateFormat[e],a=this._longDateFormat[e.toUpperCase()];return t||!a?t:(this._longDateFormat[e]=a.replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e])}function P(){return this._invalidDate}function W(e){return this._ordinal.replace("%d",e)}function E(e,t,a,n){var s=this._relativeTime[a];return T(s)?s(e,t,a,n):s.replace(/%d/i,e)}function A(e,t){var a=this._relativeTime[e>0?"future":"past"];return T(a)?a(t):a.replace(/%s/i,t)}function F(e,t){var a=e.toLowerCase();Sn[a]=Sn[a+"s"]=Sn[t]=e}function O(e){return"string"==typeof e?Sn[e]||Sn[e.toLowerCase()]:void 0}function z(e){var t,a,n={};for(a in e)_(e,a)&&(t=O(a),t&&(n[t]=e[a]));return n}function J(e,t){Hn[e]=t}function N(e){var t=[];for(var a in e)t.push({unit:a,priority:Hn[a]});return t.sort(function(e,t){return e.priority-t.priority}),t}function R(e,a){return function(n){return null!=n?(I(this,e,n),t.updateOffset(this,a),this):C(this,e)}}function C(e,t){return e.isValid()?e._d["get"+(e._isUTC?"UTC":"")+t]():NaN}function I(e,t,a){e.isValid()&&e._d["set"+(e._isUTC?"UTC":"")+t](a)}function G(e){return e=O(e),T(this[e])?this[e]():this}function U(e,t){if("object"==typeof e){e=z(e);for(var a=N(e),n=0;n<a.length;n++)this[a[n].unit](e[a[n].unit])}else if(e=O(e),T(this[e]))return this[e](t);return this}function V(e,t,a){var n=""+Math.abs(e),s=t-n.length,r=e>=0;return(r?a?"+":"":"-")+Math.pow(10,Math.max(0,s)).toString().substr(1)+n}function $(e,t,a,n){var s=n;"string"==typeof n&&(s=function(){return this[n]()}),e&&(Wn[e]=s),t&&(Wn[t[0]]=function(){return V(s.apply(this,arguments),t[1],t[2])}),a&&(Wn[a]=function(){return this.localeData().ordinal(s.apply(this,arguments),e)})}function q(e){return e.match(/\[[\s\S]/)?e.replace(/^\[|\]$/g,""):e.replace(/\\/g,"")}function B(e){var t,a,n=e.match(xn);for(t=0,a=n.length;t<a;t++)Wn[n[t]]?n[t]=Wn[n[t]]:n[t]=q(n[t]);return function(t){var s,r="";for(s=0;s<a;s++)r+=n[s]instanceof Function?n[s].call(t,e):n[s];return r}}function K(e,t){return e.isValid()?(t=Z(t,e.localeData()),Pn[t]=Pn[t]||B(t),Pn[t](e)):e.localeData().invalidDate()}function Z(e,t){function a(e){return t.longDateFormat(e)||e}var n=5;for(jn.lastIndex=0;n>=0&&jn.test(e);)e=e.replace(jn,a),jn.lastIndex=0,n-=1;return e}function Q(e,t,a){Zn[e]=T(t)?t:function(e,n){return e&&a?a:t}}function X(e,t){return _(Zn,e)?Zn[e](t._strict,t._locale):new RegExp(ee(e))}function ee(e){return te(e.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,t,a,n,s){return t||a||n||s}))}function te(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function ae(e,t){var a,n=t;for("string"==typeof e&&(e=[e]),"number"==typeof t&&(n=function(e,a){a[t]=k(e)}),a=0;a<e.length;a++)Qn[e[a]]=n}function ne(e,t){ae(e,function(e,a,n,s){n._w=n._w||{},t(e,n._w,n,s)})}function se(e,t,a){null!=t&&_(Qn,e)&&Qn[e](t,a._a,a,e)}function re(e,t){return new Date(Date.UTC(e,t+1,0)).getUTCDate()}function ie(e,t){return e?s(this._months)?this._months[e.month()]:this._months[(this._months.isFormat||os).test(t)?"format":"standalone"][e.month()]:this._months}function de(e,t){return e?s(this._monthsShort)?this._monthsShort[e.month()]:this._monthsShort[os.test(t)?"format":"standalone"][e.month()]:this._monthsShort}function oe(e,t,a){var n,s,r,i=e.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],n=0;n<12;++n)r=m([2e3,n]),this._shortMonthsParse[n]=this.monthsShort(r,"").toLocaleLowerCase(),this._longMonthsParse[n]=this.months(r,"").toLocaleLowerCase();return a?"MMM"===t?(s=kn.call(this._shortMonthsParse,i),s!==-1?s:null):(s=kn.call(this._longMonthsParse,i),s!==-1?s:null):"MMM"===t?(s=kn.call(this._shortMonthsParse,i),s!==-1?s:(s=kn.call(this._longMonthsParse,i),s!==-1?s:null)):(s=kn.call(this._longMonthsParse,i),s!==-1?s:(s=kn.call(this._shortMonthsParse,i),s!==-1?s:null))}function _e(e,t,a){var n,s,r;if(this._monthsParseExact)return oe.call(this,e,t,a);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),n=0;n<12;n++){if(s=m([2e3,n]),a&&!this._longMonthsParse[n]&&(this._longMonthsParse[n]=new RegExp("^"+this.months(s,"").replace(".","")+"$","i"),this._shortMonthsParse[n]=new RegExp("^"+this.monthsShort(s,"").replace(".","")+"$","i")),a||this._monthsParse[n]||(r="^"+this.months(s,"")+"|^"+this.monthsShort(s,""),this._monthsParse[n]=new RegExp(r.replace(".",""),"i")),a&&"MMMM"===t&&this._longMonthsParse[n].test(e))return n;if(a&&"MMM"===t&&this._shortMonthsParse[n].test(e))return n;if(!a&&this._monthsParse[n].test(e))return n}}function ue(e,t){var a;if(!e.isValid())return e;if("string"==typeof t)if(/^\d+$/.test(t))t=k(t);else if(t=e.localeData().monthsParse(t),"number"!=typeof t)return e;return a=Math.min(e.date(),re(e.year(),t)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](t,a),e}function me(e){return null!=e?(ue(this,e),t.updateOffset(this,!0),this):C(this,"Month")}function le(){return re(this.year(),this.month())}function ce(e){return this._monthsParseExact?(_(this,"_monthsRegex")||Me.call(this),e?this._monthsShortStrictRegex:this._monthsShortRegex):(_(this,"_monthsShortRegex")||(this._monthsShortRegex=ms),this._monthsShortStrictRegex&&e?this._monthsShortStrictRegex:this._monthsShortRegex)}function he(e){return this._monthsParseExact?(_(this,"_monthsRegex")||Me.call(this),e?this._monthsStrictRegex:this._monthsRegex):(_(this,"_monthsRegex")||(this._monthsRegex=ls),this._monthsStrictRegex&&e?this._monthsStrictRegex:this._monthsRegex)}function Me(){function e(e,t){return t.length-e.length}var t,a,n=[],s=[],r=[];for(t=0;t<12;t++)a=m([2e3,t]),n.push(this.monthsShort(a,"")),s.push(this.months(a,"")),r.push(this.months(a,"")),r.push(this.monthsShort(a,""));for(n.sort(e),s.sort(e),r.sort(e),t=0;t<12;t++)n[t]=te(n[t]),s[t]=te(s[t]);for(t=0;t<24;t++)r[t]=te(r[t]);this._monthsRegex=new RegExp("^("+r.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+s.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+n.join("|")+")","i")}function fe(e){return Le(e)?366:365}function Le(e){return e%4===0&&e%100!==0||e%400===0}function pe(){return Le(this.year())}function Ye(e,t,a,n,s,r,i){var d=new Date(e,t,a,n,s,r,i);return e<100&&e>=0&&isFinite(d.getFullYear())&&d.setFullYear(e),d}function ye(e){var t=new Date(Date.UTC.apply(null,arguments));return e<100&&e>=0&&isFinite(t.getUTCFullYear())&&t.setUTCFullYear(e),t}function ke(e,t,a){var n=7+t-a,s=(7+ye(e,0,n).getUTCDay()-t)%7;return-s+n-1}function De(e,t,a,n,s){var r,i,d=(7+a-n)%7,o=ke(e,n,s),_=1+7*(t-1)+d+o;return _<=0?(r=e-1,i=fe(r)+_):_>fe(e)?(r=e+1,i=_-fe(e)):(r=e,i=_),{year:r,dayOfYear:i}}function ve(e,t,a){var n,s,r=ke(e.year(),t,a),i=Math.floor((e.dayOfYear()-r-1)/7)+1;return i<1?(s=e.year()-1,n=i+ge(s,t,a)):i>ge(e.year(),t,a)?(n=i-ge(e.year(),t,a),s=e.year()+1):(s=e.year(),n=i),{week:n,year:s}}function ge(e,t,a){var n=ke(e,t,a),s=ke(e+1,t,a);return(fe(e)-n+s)/7}function we(e){return ve(e,this._week.dow,this._week.doy).week}function Te(){return this._week.dow}function be(){return this._week.doy}function Se(e){var t=this.localeData().week(this);return null==e?t:this.add(7*(e-t),"d")}function He(e){var t=ve(this,1,4).week;return null==e?t:this.add(7*(e-t),"d")}function xe(e,t){return"string"!=typeof e?e:isNaN(e)?(e=t.weekdaysParse(e),"number"==typeof e?e:null):parseInt(e,10)}function je(e,t){return"string"==typeof e?t.weekdaysParse(e)%7||7:isNaN(e)?null:e}function Pe(e,t){return e?s(this._weekdays)?this._weekdays[e.day()]:this._weekdays[this._weekdays.isFormat.test(t)?"format":"standalone"][e.day()]:this._weekdays}function We(e){return e?this._weekdaysShort[e.day()]:this._weekdaysShort}function Ee(e){return e?this._weekdaysMin[e.day()]:this._weekdaysMin}function Ae(e,t,a){var n,s,r,i=e.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],n=0;n<7;++n)r=m([2e3,1]).day(n),this._minWeekdaysParse[n]=this.weekdaysMin(r,"").toLocaleLowerCase(),this._shortWeekdaysParse[n]=this.weekdaysShort(r,"").toLocaleLowerCase(),this._weekdaysParse[n]=this.weekdays(r,"").toLocaleLowerCase();return a?"dddd"===t?(s=kn.call(this._weekdaysParse,i),s!==-1?s:null):"ddd"===t?(s=kn.call(this._shortWeekdaysParse,i),s!==-1?s:null):(s=kn.call(this._minWeekdaysParse,i),s!==-1?s:null):"dddd"===t?(s=kn.call(this._weekdaysParse,i),s!==-1?s:(s=kn.call(this._shortWeekdaysParse,i),s!==-1?s:(s=kn.call(this._minWeekdaysParse,i),s!==-1?s:null))):"ddd"===t?(s=kn.call(this._shortWeekdaysParse,i),s!==-1?s:(s=kn.call(this._weekdaysParse,i),s!==-1?s:(s=kn.call(this._minWeekdaysParse,i),s!==-1?s:null))):(s=kn.call(this._minWeekdaysParse,i),s!==-1?s:(s=kn.call(this._weekdaysParse,i),s!==-1?s:(s=kn.call(this._shortWeekdaysParse,i),s!==-1?s:null)))}function Fe(e,t,a){var n,s,r;if(this._weekdaysParseExact)return Ae.call(this,e,t,a);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),n=0;n<7;n++){if(s=m([2e3,1]).day(n),a&&!this._fullWeekdaysParse[n]&&(this._fullWeekdaysParse[n]=new RegExp("^"+this.weekdays(s,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[n]=new RegExp("^"+this.weekdaysShort(s,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[n]=new RegExp("^"+this.weekdaysMin(s,"").replace(".",".?")+"$","i")),this._weekdaysParse[n]||(r="^"+this.weekdays(s,"")+"|^"+this.weekdaysShort(s,"")+"|^"+this.weekdaysMin(s,""),this._weekdaysParse[n]=new RegExp(r.replace(".",""),"i")),a&&"dddd"===t&&this._fullWeekdaysParse[n].test(e))return n;if(a&&"ddd"===t&&this._shortWeekdaysParse[n].test(e))return n;if(a&&"dd"===t&&this._minWeekdaysParse[n].test(e))return n;if(!a&&this._weekdaysParse[n].test(e))return n}}function Oe(e){if(!this.isValid())return null!=e?this:NaN;var t=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=e?(e=xe(e,this.localeData()),this.add(e-t,"d")):t}function ze(e){if(!this.isValid())return null!=e?this:NaN;var t=(this.day()+7-this.localeData()._week.dow)%7;return null==e?t:this.add(e-t,"d")}function Je(e){if(!this.isValid())return null!=e?this:NaN;if(null!=e){var t=je(e,this.localeData());return this.day(this.day()%7?t:t-7)}return this.day()||7}function Ne(e){return this._weekdaysParseExact?(_(this,"_weekdaysRegex")||Ie.call(this),e?this._weekdaysStrictRegex:this._weekdaysRegex):(_(this,"_weekdaysRegex")||(this._weekdaysRegex=ps),this._weekdaysStrictRegex&&e?this._weekdaysStrictRegex:this._weekdaysRegex)}function Re(e){return this._weekdaysParseExact?(_(this,"_weekdaysRegex")||Ie.call(this),e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(_(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=Ys),this._weekdaysShortStrictRegex&&e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)}function Ce(e){return this._weekdaysParseExact?(_(this,"_weekdaysRegex")||Ie.call(this),e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(_(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=ys),this._weekdaysMinStrictRegex&&e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)}function Ie(){function e(e,t){return t.length-e.length}var t,a,n,s,r,i=[],d=[],o=[],_=[];for(t=0;t<7;t++)a=m([2e3,1]).day(t),n=this.weekdaysMin(a,""),s=this.weekdaysShort(a,""),r=this.weekdays(a,""),i.push(n),d.push(s),o.push(r),_.push(n),_.push(s),_.push(r);for(i.sort(e),d.sort(e),o.sort(e),_.sort(e),t=0;t<7;t++)d[t]=te(d[t]),o[t]=te(o[t]),_[t]=te(_[t]);this._weekdaysRegex=new RegExp("^("+_.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+o.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+d.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+i.join("|")+")","i")}function Ge(){return this.hours()%12||12}function Ue(){return this.hours()||24}function Ve(e,t){$(e,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),t)})}function $e(e,t){return t._meridiemParse}function qe(e){return"p"===(e+"").toLowerCase().charAt(0)}function Be(e,t,a){return e>11?a?"pm":"PM":a?"am":"AM"}function Ke(e){return e?e.toLowerCase().replace("_","-"):e}function Ze(e){for(var t,a,n,s,r=0;r<e.length;){for(s=Ke(e[r]).split("-"),t=s.length,a=Ke(e[r+1]),a=a?a.split("-"):null;t>0;){if(n=Qe(s.slice(0,t).join("-")))return n;if(a&&a.length>=t&&D(s,a,!0)>=t-1)break;t--}r++}return null}function Qe(t){var n=null;if(!ws[t]&&"undefined"!=typeof e&&e&&e.exports)try{n=ks._abbr,a(165)("./"+t),Xe(n)}catch(e){}return ws[t]}function Xe(e,t){var a;return e&&(a=f(t)?at(e):et(e,t),a&&(ks=a)),ks._abbr}function et(e,t){if(null!==t){var a=gs;return t.abbr=e,null!=ws[e]?(w("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),a=ws[e]._config):null!=t.parentLocale&&(null!=ws[t.parentLocale]?a=ws[t.parentLocale]._config:w("parentLocaleUndefined","specified parentLocale is not defined yet. See http://momentjs.com/guides/#/warnings/parent-locale/")),ws[e]=new H(S(a,t)),Xe(e),ws[e]}return delete ws[e],null}function tt(e,t){if(null!=t){var a,n=gs;null!=ws[e]&&(n=ws[e]._config),t=S(n,t),a=new H(t),a.parentLocale=ws[e],ws[e]=a,Xe(e)}else null!=ws[e]&&(null!=ws[e].parentLocale?ws[e]=ws[e].parentLocale:null!=ws[e]&&delete ws[e]);return ws[e]}function at(e){var t;if(e&&e._locale&&e._locale._abbr&&(e=e._locale._abbr),!e)return ks;if(!s(e)){if(t=Qe(e))return t;e=[e]}return Ze(e)}function nt(){return yn(ws)}function st(e){var t,a=e._a;return a&&c(e).overflow===-2&&(t=a[es]<0||a[es]>11?es:a[ts]<1||a[ts]>re(a[Xn],a[es])?ts:a[as]<0||a[as]>24||24===a[as]&&(0!==a[ns]||0!==a[ss]||0!==a[rs])?as:a[ns]<0||a[ns]>59?ns:a[ss]<0||a[ss]>59?ss:a[rs]<0||a[rs]>999?rs:-1,c(e)._overflowDayOfYear&&(t<Xn||t>ts)&&(t=ts),c(e)._overflowWeeks&&t===-1&&(t=is),c(e)._overflowWeekday&&t===-1&&(t=ds),c(e).overflow=t),e}function rt(e){var t,a,n,s,r,i,d=e._i,o=Ts.exec(d)||bs.exec(d);if(o){for(c(e).iso=!0,t=0,a=Hs.length;t<a;t++)if(Hs[t][1].exec(o[1])){s=Hs[t][0],n=Hs[t][2]!==!1;break}if(null==s)return void(e._isValid=!1);if(o[3]){for(t=0,a=xs.length;t<a;t++)if(xs[t][1].exec(o[3])){r=(o[2]||" ")+xs[t][0];break}if(null==r)return void(e._isValid=!1)}if(!n&&null!=r)return void(e._isValid=!1);if(o[4]){if(!Ss.exec(o[4]))return void(e._isValid=!1);i="Z"}e._f=s+(r||"")+(i||""),mt(e)}else e._isValid=!1}function it(e){var a=js.exec(e._i);return null!==a?void(e._d=new Date(+a[1])):(rt(e),void(e._isValid===!1&&(delete e._isValid,t.createFromInputFallback(e))))}function dt(e,t,a){return null!=e?e:null!=t?t:a}function ot(e){var a=new Date(t.now());return e._useUTC?[a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate()]:[a.getFullYear(),a.getMonth(),a.getDate()]}function _t(e){var t,a,n,s,r=[];if(!e._d){for(n=ot(e),e._w&&null==e._a[ts]&&null==e._a[es]&&ut(e),e._dayOfYear&&(s=dt(e._a[Xn],n[Xn]),e._dayOfYear>fe(s)&&(c(e)._overflowDayOfYear=!0),a=ye(s,0,e._dayOfYear),e._a[es]=a.getUTCMonth(),e._a[ts]=a.getUTCDate()),t=0;t<3&&null==e._a[t];++t)e._a[t]=r[t]=n[t];for(;t<7;t++)e._a[t]=r[t]=null==e._a[t]?2===t?1:0:e._a[t];24===e._a[as]&&0===e._a[ns]&&0===e._a[ss]&&0===e._a[rs]&&(e._nextDay=!0,e._a[as]=0),e._d=(e._useUTC?ye:Ye).apply(null,r),null!=e._tzm&&e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),e._nextDay&&(e._a[as]=24)}}function ut(e){var t,a,n,s,r,i,d,o;t=e._w,null!=t.GG||null!=t.W||null!=t.E?(r=1,i=4,a=dt(t.GG,e._a[Xn],ve(Yt(),1,4).year),n=dt(t.W,1),s=dt(t.E,1),(s<1||s>7)&&(o=!0)):(r=e._locale._week.dow,i=e._locale._week.doy,a=dt(t.gg,e._a[Xn],ve(Yt(),r,i).year),n=dt(t.w,1),null!=t.d?(s=t.d,(s<0||s>6)&&(o=!0)):null!=t.e?(s=t.e+r,(t.e<0||t.e>6)&&(o=!0)):s=r),n<1||n>ge(a,r,i)?c(e)._overflowWeeks=!0:null!=o?c(e)._overflowWeekday=!0:(d=De(a,n,s,r,i),e._a[Xn]=d.year,e._dayOfYear=d.dayOfYear)}function mt(e){if(e._f===t.ISO_8601)return void rt(e);e._a=[],c(e).empty=!0;var a,n,s,r,i,d=""+e._i,o=d.length,_=0;for(s=Z(e._f,e._locale).match(xn)||[],a=0;a<s.length;a++)r=s[a],n=(d.match(X(r,e))||[])[0],n&&(i=d.substr(0,d.indexOf(n)),i.length>0&&c(e).unusedInput.push(i),d=d.slice(d.indexOf(n)+n.length),_+=n.length),Wn[r]?(n?c(e).empty=!1:c(e).unusedTokens.push(r),se(r,n,e)):e._strict&&!n&&c(e).unusedTokens.push(r);c(e).charsLeftOver=o-_,d.length>0&&c(e).unusedInput.push(d),e._a[as]<=12&&c(e).bigHour===!0&&e._a[as]>0&&(c(e).bigHour=void 0),c(e).parsedDateParts=e._a.slice(0),c(e).meridiem=e._meridiem,e._a[as]=lt(e._locale,e._a[as],e._meridiem),_t(e),st(e)}function lt(e,t,a){var n;return null==a?t:null!=e.meridiemHour?e.meridiemHour(t,a):null!=e.isPM?(n=e.isPM(a),n&&t<12&&(t+=12),n||12!==t||(t=0),t):t}function ct(e){var t,a,n,s,r;if(0===e._f.length)return c(e).invalidFormat=!0,void(e._d=new Date(NaN));for(s=0;s<e._f.length;s++)r=0,t=L({},e),null!=e._useUTC&&(t._useUTC=e._useUTC),t._f=e._f[s],mt(t),h(t)&&(r+=c(t).charsLeftOver,r+=10*c(t).unusedTokens.length,c(t).score=r,(null==n||r<n)&&(n=r,a=t));u(e,a||t)}function ht(e){if(!e._d){var t=z(e._i);e._a=o([t.year,t.month,t.day||t.date,t.hour,t.minute,t.second,t.millisecond],function(e){return e&&parseInt(e,10)}),_t(e)}}function Mt(e){var t=new p(st(ft(e)));return t._nextDay&&(t.add(1,"d"),t._nextDay=void 0),t}function ft(e){var t=e._i,a=e._f;return e._locale=e._locale||at(e._l),null===t||void 0===a&&""===t?M({nullInput:!0}):("string"==typeof t&&(e._i=t=e._locale.preparse(t)),Y(t)?new p(st(t)):(s(a)?ct(e):d(t)?e._d=t:a?mt(e):Lt(e),h(e)||(e._d=null),e))}function Lt(e){var a=e._i;void 0===a?e._d=new Date(t.now()):d(a)?e._d=new Date(a.valueOf()):"string"==typeof a?it(e):s(a)?(e._a=o(a.slice(0),function(e){return parseInt(e,10)}),_t(e)):"object"==typeof a?ht(e):"number"==typeof a?e._d=new Date(a):t.createFromInputFallback(e)}function pt(e,t,a,n,d){var o={};return"boolean"==typeof a&&(n=a,a=void 0),(r(e)&&i(e)||s(e)&&0===e.length)&&(e=void 0),o._isAMomentObject=!0,o._useUTC=o._isUTC=d,o._l=a,o._i=e,o._f=t,o._strict=n,Mt(o)}function Yt(e,t,a,n){return pt(e,t,a,n,!1)}function yt(e,t){var a,n;if(1===t.length&&s(t[0])&&(t=t[0]),!t.length)return Yt();for(a=t[0],n=1;n<t.length;++n)t[n].isValid()&&!t[n][e](a)||(a=t[n]);return a}function kt(){var e=[].slice.call(arguments,0);return yt("isBefore",e)}function Dt(){var e=[].slice.call(arguments,0);return yt("isAfter",e)}function vt(e){var t=z(e),a=t.year||0,n=t.quarter||0,s=t.month||0,r=t.week||0,i=t.day||0,d=t.hour||0,o=t.minute||0,_=t.second||0,u=t.millisecond||0;this._milliseconds=+u+1e3*_+6e4*o+1e3*d*60*60,this._days=+i+7*r,this._months=+s+3*n+12*a,this._data={},this._locale=at(),this._bubble()}function gt(e){return e instanceof vt}function wt(e){return e<0?Math.round(-1*e)*-1:Math.round(e)}function Tt(e,t){$(e,0,0,function(){var e=this.utcOffset(),a="+";return e<0&&(e=-e,a="-"),a+V(~~(e/60),2)+t+V(~~e%60,2)})}function bt(e,t){var a=(t||"").match(e)||[],n=a[a.length-1]||[],s=(n+"").match(As)||["-",0,0],r=+(60*s[1])+k(s[2]);return"+"===s[0]?r:-r}function St(e,a){var n,s;return a._isUTC?(n=a.clone(),s=(Y(e)||d(e)?e.valueOf():Yt(e).valueOf())-n.valueOf(),n._d.setTime(n._d.valueOf()+s),t.updateOffset(n,!1),n):Yt(e).local()}function Ht(e){return 15*-Math.round(e._d.getTimezoneOffset()/15)}function xt(e,a){var n,s=this._offset||0;return this.isValid()?null!=e?("string"==typeof e?e=bt(qn,e):Math.abs(e)<16&&(e*=60),!this._isUTC&&a&&(n=Ht(this)),this._offset=e,this._isUTC=!0,null!=n&&this.add(n,"m"),s!==e&&(!a||this._changeInProgress?Vt(this,Rt(e-s,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,t.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?s:Ht(this):null!=e?this:NaN}function jt(e,t){return null!=e?("string"!=typeof e&&(e=-e),this.utcOffset(e,t),this):-this.utcOffset()}function Pt(e){return this.utcOffset(0,e)}function Wt(e){return this._isUTC&&(this.utcOffset(0,e),this._isUTC=!1,e&&this.subtract(Ht(this),"m")),this}function Et(){if(this._tzm)this.utcOffset(this._tzm);else if("string"==typeof this._i){var e=bt($n,this._i);0===e?this.utcOffset(0,!0):this.utcOffset(bt($n,this._i))}return this}function At(e){return!!this.isValid()&&(e=e?Yt(e).utcOffset():0,(this.utcOffset()-e)%60===0)}function Ft(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Ot(){if(!f(this._isDSTShifted))return this._isDSTShifted;var e={};if(L(e,this),e=ft(e),e._a){var t=e._isUTC?m(e._a):Yt(e._a);this._isDSTShifted=this.isValid()&&D(e._a,t.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function zt(){return!!this.isValid()&&!this._isUTC}function Jt(){return!!this.isValid()&&this._isUTC}function Nt(){return!!this.isValid()&&(this._isUTC&&0===this._offset)}function Rt(e,t){var a,n,s,r=e,i=null;return gt(e)?r={ms:e._milliseconds,d:e._days,M:e._months}:"number"==typeof e?(r={},t?r[t]=e:r.milliseconds=e):(i=Fs.exec(e))?(a="-"===i[1]?-1:1,r={y:0,d:k(i[ts])*a,h:k(i[as])*a,m:k(i[ns])*a,s:k(i[ss])*a,ms:k(wt(1e3*i[rs]))*a}):(i=Os.exec(e))?(a="-"===i[1]?-1:1,r={y:Ct(i[2],a),M:Ct(i[3],a),w:Ct(i[4],a),d:Ct(i[5],a),h:Ct(i[6],a),m:Ct(i[7],a),s:Ct(i[8],a)}):null==r?r={}:"object"==typeof r&&("from"in r||"to"in r)&&(s=Gt(Yt(r.from),Yt(r.to)),r={},r.ms=s.milliseconds,r.M=s.months),n=new vt(r),gt(e)&&_(e,"_locale")&&(n._locale=e._locale),n}function Ct(e,t){var a=e&&parseFloat(e.replace(",","."));return(isNaN(a)?0:a)*t}function It(e,t){var a={milliseconds:0,months:0};return a.months=t.month()-e.month()+12*(t.year()-e.year()),e.clone().add(a.months,"M").isAfter(t)&&--a.months,a.milliseconds=+t-+e.clone().add(a.months,"M"),a}function Gt(e,t){var a;return e.isValid()&&t.isValid()?(t=St(t,e),e.isBefore(t)?a=It(e,t):(a=It(t,e),a.milliseconds=-a.milliseconds,a.months=-a.months),a):{milliseconds:0,months:0}}function Ut(e,t){return function(a,n){var s,r;return null===n||isNaN(+n)||(w(t,"moment()."+t+"(period, number) is deprecated. Please use moment()."+t+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),r=a,a=n,n=r),a="string"==typeof a?+a:a,s=Rt(a,n),Vt(this,s,e),this}}function Vt(e,a,n,s){var r=a._milliseconds,i=wt(a._days),d=wt(a._months);e.isValid()&&(s=null==s||s,r&&e._d.setTime(e._d.valueOf()+r*n),i&&I(e,"Date",C(e,"Date")+i*n),d&&ue(e,C(e,"Month")+d*n),s&&t.updateOffset(e,i||d))}function $t(e,t){var a=e.diff(t,"days",!0);return a<-6?"sameElse":a<-1?"lastWeek":a<0?"lastDay":a<1?"sameDay":a<2?"nextDay":a<7?"nextWeek":"sameElse"}function qt(e,a){var n=e||Yt(),s=St(n,this).startOf("day"),r=t.calendarFormat(this,s)||"sameElse",i=a&&(T(a[r])?a[r].call(this,n):a[r]);return this.format(i||this.localeData().calendar(r,this,Yt(n)))}function Bt(){return new p(this)}function Kt(e,t){var a=Y(e)?e:Yt(e);return!(!this.isValid()||!a.isValid())&&(t=O(f(t)?"millisecond":t),"millisecond"===t?this.valueOf()>a.valueOf():a.valueOf()<this.clone().startOf(t).valueOf())}function Zt(e,t){var a=Y(e)?e:Yt(e);return!(!this.isValid()||!a.isValid())&&(t=O(f(t)?"millisecond":t),"millisecond"===t?this.valueOf()<a.valueOf():this.clone().endOf(t).valueOf()<a.valueOf())}function Qt(e,t,a,n){return n=n||"()",("("===n[0]?this.isAfter(e,a):!this.isBefore(e,a))&&(")"===n[1]?this.isBefore(t,a):!this.isAfter(t,a))}function Xt(e,t){var a,n=Y(e)?e:Yt(e);return!(!this.isValid()||!n.isValid())&&(t=O(t||"millisecond"),"millisecond"===t?this.valueOf()===n.valueOf():(a=n.valueOf(),this.clone().startOf(t).valueOf()<=a&&a<=this.clone().endOf(t).valueOf()))}function ea(e,t){return this.isSame(e,t)||this.isAfter(e,t)}function ta(e,t){return this.isSame(e,t)||this.isBefore(e,t)}function aa(e,t,a){var n,s,r,i;return this.isValid()?(n=St(e,this),n.isValid()?(s=6e4*(n.utcOffset()-this.utcOffset()),t=O(t),"year"===t||"month"===t||"quarter"===t?(i=na(this,n),"quarter"===t?i/=3:"year"===t&&(i/=12)):(r=this-n,i="second"===t?r/1e3:"minute"===t?r/6e4:"hour"===t?r/36e5:"day"===t?(r-s)/864e5:"week"===t?(r-s)/6048e5:r),a?i:y(i)):NaN):NaN}function na(e,t){var a,n,s=12*(t.year()-e.year())+(t.month()-e.month()),r=e.clone().add(s,"months");return t-r<0?(a=e.clone().add(s-1,"months"),n=(t-r)/(r-a)):(a=e.clone().add(s+1,"months"),n=(t-r)/(a-r)),-(s+n)||0}function sa(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function ra(){var e=this.clone().utc();return 0<e.year()&&e.year()<=9999?T(Date.prototype.toISOString)?this.toDate().toISOString():K(e,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):K(e,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function ia(e){e||(e=this.isUtc()?t.defaultFormatUtc:t.defaultFormat);var a=K(this,e);return this.localeData().postformat(a)}function da(e,t){return this.isValid()&&(Y(e)&&e.isValid()||Yt(e).isValid())?Rt({to:this,from:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()}function oa(e){return this.from(Yt(),e)}function _a(e,t){return this.isValid()&&(Y(e)&&e.isValid()||Yt(e).isValid())?Rt({from:this,to:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()}function ua(e){return this.to(Yt(),e)}function ma(e){var t;return void 0===e?this._locale._abbr:(t=at(e),null!=t&&(this._locale=t),this)}function la(){return this._locale}function ca(e){switch(e=O(e)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":case"date":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===e&&this.weekday(0),"isoWeek"===e&&this.isoWeekday(1),"quarter"===e&&this.month(3*Math.floor(this.month()/3)),this}function ha(e){return e=O(e),void 0===e||"millisecond"===e?this:("date"===e&&(e="day"),this.startOf(e).add(1,"isoWeek"===e?"week":e).subtract(1,"ms"))}function Ma(){return this._d.valueOf()-6e4*(this._offset||0)}function fa(){return Math.floor(this.valueOf()/1e3)}function La(){return new Date(this.valueOf())}function pa(){var e=this;return[e.year(),e.month(),e.date(),e.hour(),e.minute(),e.second(),e.millisecond()]}function Ya(){var e=this;return{years:e.year(),months:e.month(),date:e.date(),hours:e.hours(),minutes:e.minutes(),seconds:e.seconds(),milliseconds:e.milliseconds()}}function ya(){return this.isValid()?this.toISOString():null}function ka(){return h(this)}function Da(){return u({},c(this))}function va(){return c(this).overflow}function ga(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function wa(e,t){$(0,[e,e.length],0,t)}function Ta(e){return xa.call(this,e,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function ba(e){return xa.call(this,e,this.isoWeek(),this.isoWeekday(),1,4)}function Sa(){return ge(this.year(),1,4)}function Ha(){var e=this.localeData()._week;return ge(this.year(),e.dow,e.doy)}function xa(e,t,a,n,s){var r;return null==e?ve(this,n,s).year:(r=ge(e,n,s),t>r&&(t=r),ja.call(this,e,t,a,n,s))}function ja(e,t,a,n,s){var r=De(e,t,a,n,s),i=ye(r.year,0,r.dayOfYear);return this.year(i.getUTCFullYear()),this.month(i.getUTCMonth()),this.date(i.getUTCDate()),this}function Pa(e){return null==e?Math.ceil((this.month()+1)/3):this.month(3*(e-1)+this.month()%3)}function Wa(e){var t=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==e?t:this.add(e-t,"d")}function Ea(e,t){t[rs]=k(1e3*("0."+e))}function Aa(){return this._isUTC?"UTC":""}function Fa(){return this._isUTC?"Coordinated Universal Time":""}function Oa(e){return Yt(1e3*e)}function za(){return Yt.apply(null,arguments).parseZone()}function Ja(e){return e}function Na(e,t,a,n){var s=at(),r=m().set(n,t);return s[a](r,e)}function Ra(e,t,a){if("number"==typeof e&&(t=e,e=void 0),e=e||"",null!=t)return Na(e,t,a,"month");var n,s=[];for(n=0;n<12;n++)s[n]=Na(e,n,a,"month");return s}function Ca(e,t,a,n){"boolean"==typeof e?("number"==typeof t&&(a=t,
	t=void 0),t=t||""):(t=e,a=t,e=!1,"number"==typeof t&&(a=t,t=void 0),t=t||"");var s=at(),r=e?s._week.dow:0;if(null!=a)return Na(t,(a+r)%7,n,"day");var i,d=[];for(i=0;i<7;i++)d[i]=Na(t,(i+r)%7,n,"day");return d}function Ia(e,t){return Ra(e,t,"months")}function Ga(e,t){return Ra(e,t,"monthsShort")}function Ua(e,t,a){return Ca(e,t,a,"weekdays")}function Va(e,t,a){return Ca(e,t,a,"weekdaysShort")}function $a(e,t,a){return Ca(e,t,a,"weekdaysMin")}function qa(){var e=this._data;return this._milliseconds=Bs(this._milliseconds),this._days=Bs(this._days),this._months=Bs(this._months),e.milliseconds=Bs(e.milliseconds),e.seconds=Bs(e.seconds),e.minutes=Bs(e.minutes),e.hours=Bs(e.hours),e.months=Bs(e.months),e.years=Bs(e.years),this}function Ba(e,t,a,n){var s=Rt(t,a);return e._milliseconds+=n*s._milliseconds,e._days+=n*s._days,e._months+=n*s._months,e._bubble()}function Ka(e,t){return Ba(this,e,t,1)}function Za(e,t){return Ba(this,e,t,-1)}function Qa(e){return e<0?Math.floor(e):Math.ceil(e)}function Xa(){var e,t,a,n,s,r=this._milliseconds,i=this._days,d=this._months,o=this._data;return r>=0&&i>=0&&d>=0||r<=0&&i<=0&&d<=0||(r+=864e5*Qa(tn(d)+i),i=0,d=0),o.milliseconds=r%1e3,e=y(r/1e3),o.seconds=e%60,t=y(e/60),o.minutes=t%60,a=y(t/60),o.hours=a%24,i+=y(a/24),s=y(en(i)),d+=s,i-=Qa(tn(s)),n=y(d/12),d%=12,o.days=i,o.months=d,o.years=n,this}function en(e){return 4800*e/146097}function tn(e){return 146097*e/4800}function an(e){var t,a,n=this._milliseconds;if(e=O(e),"month"===e||"year"===e)return t=this._days+n/864e5,a=this._months+en(t),"month"===e?a:a/12;switch(t=this._days+Math.round(tn(this._months)),e){case"week":return t/7+n/6048e5;case"day":return t+n/864e5;case"hour":return 24*t+n/36e5;case"minute":return 1440*t+n/6e4;case"second":return 86400*t+n/1e3;case"millisecond":return Math.floor(864e5*t)+n;default:throw new Error("Unknown unit "+e)}}function nn(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*k(this._months/12)}function sn(e){return function(){return this.as(e)}}function rn(e){return e=O(e),this[e+"s"]()}function dn(e){return function(){return this._data[e]}}function on(){return y(this.days()/7)}function _n(e,t,a,n,s){return s.relativeTime(t||1,!!a,e,n)}function un(e,t,a){var n=Rt(e).abs(),s=mr(n.as("s")),r=mr(n.as("m")),i=mr(n.as("h")),d=mr(n.as("d")),o=mr(n.as("M")),_=mr(n.as("y")),u=s<lr.s&&["s",s]||r<=1&&["m"]||r<lr.m&&["mm",r]||i<=1&&["h"]||i<lr.h&&["hh",i]||d<=1&&["d"]||d<lr.d&&["dd",d]||o<=1&&["M"]||o<lr.M&&["MM",o]||_<=1&&["y"]||["yy",_];return u[2]=t,u[3]=+e>0,u[4]=a,_n.apply(null,u)}function mn(e){return void 0===e?mr:"function"==typeof e&&(mr=e,!0)}function ln(e,t){return void 0!==lr[e]&&(void 0===t?lr[e]:(lr[e]=t,!0))}function cn(e){var t=this.localeData(),a=un(this,!e,t);return e&&(a=t.pastFuture(+this,a)),t.postformat(a)}function hn(){var e,t,a,n=cr(this._milliseconds)/1e3,s=cr(this._days),r=cr(this._months);e=y(n/60),t=y(e/60),n%=60,e%=60,a=y(r/12),r%=12;var i=a,d=r,o=s,_=t,u=e,m=n,l=this.asSeconds();return l?(l<0?"-":"")+"P"+(i?i+"Y":"")+(d?d+"M":"")+(o?o+"D":"")+(_||u||m?"T":"")+(_?_+"H":"")+(u?u+"M":"")+(m?m+"S":""):"P0D"}var Mn,fn;fn=Array.prototype.some?Array.prototype.some:function(e){for(var t=Object(this),a=t.length>>>0,n=0;n<a;n++)if(n in t&&e.call(this,t[n],n,t))return!0;return!1};var Ln=t.momentProperties=[],pn=!1,Yn={};t.suppressDeprecationWarnings=!1,t.deprecationHandler=null;var yn;yn=Object.keys?Object.keys:function(e){var t,a=[];for(t in e)_(e,t)&&a.push(t);return a};var kn,Dn={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},vn={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},gn="Invalid date",wn="%d",Tn=/\d{1,2}/,bn={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Sn={},Hn={},xn=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,jn=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Pn={},Wn={},En=/\d/,An=/\d\d/,Fn=/\d{3}/,On=/\d{4}/,zn=/[+-]?\d{6}/,Jn=/\d\d?/,Nn=/\d\d\d\d?/,Rn=/\d\d\d\d\d\d?/,Cn=/\d{1,3}/,In=/\d{1,4}/,Gn=/[+-]?\d{1,6}/,Un=/\d+/,Vn=/[+-]?\d+/,$n=/Z|[+-]\d\d:?\d\d/gi,qn=/Z|[+-]\d\d(?::?\d\d)?/gi,Bn=/[+-]?\d+(\.\d{1,3})?/,Kn=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Zn={},Qn={},Xn=0,es=1,ts=2,as=3,ns=4,ss=5,rs=6,is=7,ds=8;kn=Array.prototype.indexOf?Array.prototype.indexOf:function(e){var t;for(t=0;t<this.length;++t)if(this[t]===e)return t;return-1},$("M",["MM",2],"Mo",function(){return this.month()+1}),$("MMM",0,0,function(e){return this.localeData().monthsShort(this,e)}),$("MMMM",0,0,function(e){return this.localeData().months(this,e)}),F("month","M"),J("month",8),Q("M",Jn),Q("MM",Jn,An),Q("MMM",function(e,t){return t.monthsShortRegex(e)}),Q("MMMM",function(e,t){return t.monthsRegex(e)}),ae(["M","MM"],function(e,t){t[es]=k(e)-1}),ae(["MMM","MMMM"],function(e,t,a,n){var s=a._locale.monthsParse(e,n,a._strict);null!=s?t[es]=s:c(a).invalidMonth=e});var os=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,_s="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),us="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),ms=Kn,ls=Kn;$("Y",0,0,function(){var e=this.year();return e<=9999?""+e:"+"+e}),$(0,["YY",2],0,function(){return this.year()%100}),$(0,["YYYY",4],0,"year"),$(0,["YYYYY",5],0,"year"),$(0,["YYYYYY",6,!0],0,"year"),F("year","y"),J("year",1),Q("Y",Vn),Q("YY",Jn,An),Q("YYYY",In,On),Q("YYYYY",Gn,zn),Q("YYYYYY",Gn,zn),ae(["YYYYY","YYYYYY"],Xn),ae("YYYY",function(e,a){a[Xn]=2===e.length?t.parseTwoDigitYear(e):k(e)}),ae("YY",function(e,a){a[Xn]=t.parseTwoDigitYear(e)}),ae("Y",function(e,t){t[Xn]=parseInt(e,10)}),t.parseTwoDigitYear=function(e){return k(e)+(k(e)>68?1900:2e3)};var cs=R("FullYear",!0);$("w",["ww",2],"wo","week"),$("W",["WW",2],"Wo","isoWeek"),F("week","w"),F("isoWeek","W"),J("week",5),J("isoWeek",5),Q("w",Jn),Q("ww",Jn,An),Q("W",Jn),Q("WW",Jn,An),ne(["w","ww","W","WW"],function(e,t,a,n){t[n.substr(0,1)]=k(e)});var hs={dow:0,doy:6};$("d",0,"do","day"),$("dd",0,0,function(e){return this.localeData().weekdaysMin(this,e)}),$("ddd",0,0,function(e){return this.localeData().weekdaysShort(this,e)}),$("dddd",0,0,function(e){return this.localeData().weekdays(this,e)}),$("e",0,0,"weekday"),$("E",0,0,"isoWeekday"),F("day","d"),F("weekday","e"),F("isoWeekday","E"),J("day",11),J("weekday",11),J("isoWeekday",11),Q("d",Jn),Q("e",Jn),Q("E",Jn),Q("dd",function(e,t){return t.weekdaysMinRegex(e)}),Q("ddd",function(e,t){return t.weekdaysShortRegex(e)}),Q("dddd",function(e,t){return t.weekdaysRegex(e)}),ne(["dd","ddd","dddd"],function(e,t,a,n){var s=a._locale.weekdaysParse(e,n,a._strict);null!=s?t.d=s:c(a).invalidWeekday=e}),ne(["d","e","E"],function(e,t,a,n){t[n]=k(e)});var Ms="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),fs="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),Ls="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),ps=Kn,Ys=Kn,ys=Kn;$("H",["HH",2],0,"hour"),$("h",["hh",2],0,Ge),$("k",["kk",2],0,Ue),$("hmm",0,0,function(){return""+Ge.apply(this)+V(this.minutes(),2)}),$("hmmss",0,0,function(){return""+Ge.apply(this)+V(this.minutes(),2)+V(this.seconds(),2)}),$("Hmm",0,0,function(){return""+this.hours()+V(this.minutes(),2)}),$("Hmmss",0,0,function(){return""+this.hours()+V(this.minutes(),2)+V(this.seconds(),2)}),Ve("a",!0),Ve("A",!1),F("hour","h"),J("hour",13),Q("a",$e),Q("A",$e),Q("H",Jn),Q("h",Jn),Q("HH",Jn,An),Q("hh",Jn,An),Q("hmm",Nn),Q("hmmss",Rn),Q("Hmm",Nn),Q("Hmmss",Rn),ae(["H","HH"],as),ae(["a","A"],function(e,t,a){a._isPm=a._locale.isPM(e),a._meridiem=e}),ae(["h","hh"],function(e,t,a){t[as]=k(e),c(a).bigHour=!0}),ae("hmm",function(e,t,a){var n=e.length-2;t[as]=k(e.substr(0,n)),t[ns]=k(e.substr(n)),c(a).bigHour=!0}),ae("hmmss",function(e,t,a){var n=e.length-4,s=e.length-2;t[as]=k(e.substr(0,n)),t[ns]=k(e.substr(n,2)),t[ss]=k(e.substr(s)),c(a).bigHour=!0}),ae("Hmm",function(e,t,a){var n=e.length-2;t[as]=k(e.substr(0,n)),t[ns]=k(e.substr(n))}),ae("Hmmss",function(e,t,a){var n=e.length-4,s=e.length-2;t[as]=k(e.substr(0,n)),t[ns]=k(e.substr(n,2)),t[ss]=k(e.substr(s))});var ks,Ds=/[ap]\.?m?\.?/i,vs=R("Hours",!0),gs={calendar:Dn,longDateFormat:vn,invalidDate:gn,ordinal:wn,ordinalParse:Tn,relativeTime:bn,months:_s,monthsShort:us,week:hs,weekdays:Ms,weekdaysMin:Ls,weekdaysShort:fs,meridiemParse:Ds},ws={},Ts=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,bs=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,Ss=/Z|[+-]\d\d(?::?\d\d)?/,Hs=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],xs=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],js=/^\/?Date\((\-?\d+)/i;t.createFromInputFallback=g("value provided is not in a recognized ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(e){e._d=new Date(e._i+(e._useUTC?" UTC":""))}),t.ISO_8601=function(){};var Ps=g("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=Yt.apply(null,arguments);return this.isValid()&&e.isValid()?e<this?this:e:M()}),Ws=g("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=Yt.apply(null,arguments);return this.isValid()&&e.isValid()?e>this?this:e:M()}),Es=function(){return Date.now?Date.now():+new Date};Tt("Z",":"),Tt("ZZ",""),Q("Z",qn),Q("ZZ",qn),ae(["Z","ZZ"],function(e,t,a){a._useUTC=!0,a._tzm=bt(qn,e)});var As=/([\+\-]|\d\d)/gi;t.updateOffset=function(){};var Fs=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,Os=/^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;Rt.fn=vt.prototype;var zs=Ut(1,"add"),Js=Ut(-1,"subtract");t.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",t.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var Ns=g("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(e){return void 0===e?this.localeData():this.locale(e)});$(0,["gg",2],0,function(){return this.weekYear()%100}),$(0,["GG",2],0,function(){return this.isoWeekYear()%100}),wa("gggg","weekYear"),wa("ggggg","weekYear"),wa("GGGG","isoWeekYear"),wa("GGGGG","isoWeekYear"),F("weekYear","gg"),F("isoWeekYear","GG"),J("weekYear",1),J("isoWeekYear",1),Q("G",Vn),Q("g",Vn),Q("GG",Jn,An),Q("gg",Jn,An),Q("GGGG",In,On),Q("gggg",In,On),Q("GGGGG",Gn,zn),Q("ggggg",Gn,zn),ne(["gggg","ggggg","GGGG","GGGGG"],function(e,t,a,n){t[n.substr(0,2)]=k(e)}),ne(["gg","GG"],function(e,a,n,s){a[s]=t.parseTwoDigitYear(e)}),$("Q",0,"Qo","quarter"),F("quarter","Q"),J("quarter",7),Q("Q",En),ae("Q",function(e,t){t[es]=3*(k(e)-1)}),$("D",["DD",2],"Do","date"),F("date","D"),J("date",9),Q("D",Jn),Q("DD",Jn,An),Q("Do",function(e,t){return e?t._ordinalParse:t._ordinalParseLenient}),ae(["D","DD"],ts),ae("Do",function(e,t){t[ts]=k(e.match(Jn)[0],10)});var Rs=R("Date",!0);$("DDD",["DDDD",3],"DDDo","dayOfYear"),F("dayOfYear","DDD"),J("dayOfYear",4),Q("DDD",Cn),Q("DDDD",Fn),ae(["DDD","DDDD"],function(e,t,a){a._dayOfYear=k(e)}),$("m",["mm",2],0,"minute"),F("minute","m"),J("minute",14),Q("m",Jn),Q("mm",Jn,An),ae(["m","mm"],ns);var Cs=R("Minutes",!1);$("s",["ss",2],0,"second"),F("second","s"),J("second",15),Q("s",Jn),Q("ss",Jn,An),ae(["s","ss"],ss);var Is=R("Seconds",!1);$("S",0,0,function(){return~~(this.millisecond()/100)}),$(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),$(0,["SSS",3],0,"millisecond"),$(0,["SSSS",4],0,function(){return 10*this.millisecond()}),$(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),$(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),$(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),$(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),$(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),F("millisecond","ms"),J("millisecond",16),Q("S",Cn,En),Q("SS",Cn,An),Q("SSS",Cn,Fn);var Gs;for(Gs="SSSS";Gs.length<=9;Gs+="S")Q(Gs,Un);for(Gs="S";Gs.length<=9;Gs+="S")ae(Gs,Ea);var Us=R("Milliseconds",!1);$("z",0,0,"zoneAbbr"),$("zz",0,0,"zoneName");var Vs=p.prototype;Vs.add=zs,Vs.calendar=qt,Vs.clone=Bt,Vs.diff=aa,Vs.endOf=ha,Vs.format=ia,Vs.from=da,Vs.fromNow=oa,Vs.to=_a,Vs.toNow=ua,Vs.get=G,Vs.invalidAt=va,Vs.isAfter=Kt,Vs.isBefore=Zt,Vs.isBetween=Qt,Vs.isSame=Xt,Vs.isSameOrAfter=ea,Vs.isSameOrBefore=ta,Vs.isValid=ka,Vs.lang=Ns,Vs.locale=ma,Vs.localeData=la,Vs.max=Ws,Vs.min=Ps,Vs.parsingFlags=Da,Vs.set=U,Vs.startOf=ca,Vs.subtract=Js,Vs.toArray=pa,Vs.toObject=Ya,Vs.toDate=La,Vs.toISOString=ra,Vs.toJSON=ya,Vs.toString=sa,Vs.unix=fa,Vs.valueOf=Ma,Vs.creationData=ga,Vs.year=cs,Vs.isLeapYear=pe,Vs.weekYear=Ta,Vs.isoWeekYear=ba,Vs.quarter=Vs.quarters=Pa,Vs.month=me,Vs.daysInMonth=le,Vs.week=Vs.weeks=Se,Vs.isoWeek=Vs.isoWeeks=He,Vs.weeksInYear=Ha,Vs.isoWeeksInYear=Sa,Vs.date=Rs,Vs.day=Vs.days=Oe,Vs.weekday=ze,Vs.isoWeekday=Je,Vs.dayOfYear=Wa,Vs.hour=Vs.hours=vs,Vs.minute=Vs.minutes=Cs,Vs.second=Vs.seconds=Is,Vs.millisecond=Vs.milliseconds=Us,Vs.utcOffset=xt,Vs.utc=Pt,Vs.local=Wt,Vs.parseZone=Et,Vs.hasAlignedHourOffset=At,Vs.isDST=Ft,Vs.isLocal=zt,Vs.isUtcOffset=Jt,Vs.isUtc=Nt,Vs.isUTC=Nt,Vs.zoneAbbr=Aa,Vs.zoneName=Fa,Vs.dates=g("dates accessor is deprecated. Use date instead.",Rs),Vs.months=g("months accessor is deprecated. Use month instead",me),Vs.years=g("years accessor is deprecated. Use year instead",cs),Vs.zone=g("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",jt),Vs.isDSTShifted=g("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",Ot);var $s=Vs,qs=H.prototype;qs.calendar=x,qs.longDateFormat=j,qs.invalidDate=P,qs.ordinal=W,qs.preparse=Ja,qs.postformat=Ja,qs.relativeTime=E,qs.pastFuture=A,qs.set=b,qs.months=ie,qs.monthsShort=de,qs.monthsParse=_e,qs.monthsRegex=he,qs.monthsShortRegex=ce,qs.week=we,qs.firstDayOfYear=be,qs.firstDayOfWeek=Te,qs.weekdays=Pe,qs.weekdaysMin=Ee,qs.weekdaysShort=We,qs.weekdaysParse=Fe,qs.weekdaysRegex=Ne,qs.weekdaysShortRegex=Re,qs.weekdaysMinRegex=Ce,qs.isPM=qe,qs.meridiem=Be,Xe("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var t=e%10,a=1===k(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+a}}),t.lang=g("moment.lang is deprecated. Use moment.locale instead.",Xe),t.langData=g("moment.langData is deprecated. Use moment.localeData instead.",at);var Bs=Math.abs,Ks=sn("ms"),Zs=sn("s"),Qs=sn("m"),Xs=sn("h"),er=sn("d"),tr=sn("w"),ar=sn("M"),nr=sn("y"),sr=dn("milliseconds"),rr=dn("seconds"),ir=dn("minutes"),dr=dn("hours"),or=dn("days"),_r=dn("months"),ur=dn("years"),mr=Math.round,lr={s:45,m:45,h:22,d:26,M:11},cr=Math.abs,hr=vt.prototype;hr.abs=qa,hr.add=Ka,hr.subtract=Za,hr.as=an,hr.asMilliseconds=Ks,hr.asSeconds=Zs,hr.asMinutes=Qs,hr.asHours=Xs,hr.asDays=er,hr.asWeeks=tr,hr.asMonths=ar,hr.asYears=nr,hr.valueOf=nn,hr._bubble=Xa,hr.get=rn,hr.milliseconds=sr,hr.seconds=rr,hr.minutes=ir,hr.hours=dr,hr.days=or,hr.weeks=on,hr.months=_r,hr.years=ur,hr.humanize=cn,hr.toISOString=hn,hr.toString=hn,hr.toJSON=hn,hr.locale=ma,hr.localeData=la,hr.toIsoString=g("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",hn),hr.lang=Ns,$("X",0,0,"unix"),$("x",0,0,"valueOf"),Q("x",Vn),Q("X",Bn),ae("X",function(e,t,a){a._d=new Date(1e3*parseFloat(e,10))}),ae("x",function(e,t,a){a._d=new Date(k(e))}),t.version="2.15.2",n(Yt),t.fn=$s,t.min=kt,t.max=Dt,t.now=Es,t.utc=m,t.unix=Oa,t.months=Ia,t.isDate=d,t.locale=Xe,t.invalid=M,t.duration=Rt,t.isMoment=Y,t.weekdays=Ua,t.parseZone=za,t.localeData=at,t.isDuration=gt,t.monthsShort=Ga,t.weekdaysMin=$a,t.defineLocale=et,t.updateLocale=tt,t.locales=nt,t.weekdaysShort=Va,t.normalizeUnits=O,t.relativeTimeRounding=mn,t.relativeTimeThreshold=ln,t.calendarFormat=$t,t.prototype=$s;var Mr=t;return Mr})}).call(t,a(172)(e))},function(e,t,a){var n=a(23)("wks"),s=a(27),r=a(3).Symbol,i="function"==typeof r,d=e.exports=function(e){return n[e]||(n[e]=i&&r[e]||(i?r:s)("Symbol."+e))};d.store=n},function(e,t){var a=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=a)},function(e,t,a){var n=a(11);e.exports=function(e){if(!n(e))throw TypeError(e+" is not an object!");return e}},function(e,t,a){e.exports=!a(21)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t){var a={}.hasOwnProperty;e.exports=function(e,t){return a.call(e,t)}},function(e,t,a){var n=a(8),s=a(13);e.exports=a(5)?function(e,t,a){return n.f(e,t,s(1,a))}:function(e,t,a){return e[t]=a,e}},function(e,t,a){var n=a(4),s=a(143),r=a(159),i=Object.defineProperty;t.f=a(5)?Object.defineProperty:function(e,t,a){if(n(e),t=r(t,!0),n(a),s)try{return i(e,t,a)}catch(e){}if("get"in a||"set"in a)throw TypeError("Accessors not supported!");return"value"in a&&(e[t]=a.value),e}},function(e,t){var a=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=a)},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t){e.exports={}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t,a){var n=a(23)("keys"),s=a(27);e.exports=function(e){return n[e]||(n[e]=s(e))}},function(e,t){var a=Math.ceil,n=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?n:a)(e)}},function(e,t){var a={}.toString;e.exports=function(e){return a.call(e).slice(8,-1)}},function(e,t,a){var n=a(138);e.exports=function(e,t,a){if(n(e),void 0===t)return e;switch(a){case 1:return function(a){return e.call(t,a)};case 2:return function(a,n){return e.call(t,a,n)};case 3:return function(a,n,s){return e.call(t,a,n,s)}}return function(){return e.apply(t,arguments)}}},function(e,t,a){var n=a(11),s=a(3).document,r=n(s)&&n(s.createElement);e.exports=function(e){return r?s.createElement(e):{}}},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(e,t,a){var n=a(3),s=a(9),r=a(17),i=a(7),d="prototype",o=function(e,t,a){var _,u,m,l=e&o.F,c=e&o.G,h=e&o.S,M=e&o.P,f=e&o.B,L=e&o.W,p=c?s:s[t]||(s[t]={}),Y=p[d],y=c?n:h?n[t]:(n[t]||{})[d];c&&(a=t);for(_ in a)u=!l&&y&&void 0!==y[_],u&&_ in p||(m=u?y[_]:a[_],p[_]=c&&"function"!=typeof y[_]?a[_]:f&&u?r(m,n):L&&y[_]==m?function(e){var t=function(t,a,n){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,a)}return new e(t,a,n)}return e.apply(this,arguments)};return t[d]=e[d],t}(m):M&&"function"==typeof m?r(Function.call,m):m,M&&((p.virtual||(p.virtual={}))[_]=m,e&o.R&&Y&&!Y[_]&&i(Y,_,m)))};o.F=1,o.G=2,o.S=4,o.P=8,o.B=16,o.W=32,o.U=64,o.R=128,e.exports=o},function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,t,a){var n=a(8).f,s=a(6),r=a(2)("toStringTag");e.exports=function(e,t,a){e&&!s(e=a?e:e.prototype,r)&&n(e,r,{configurable:!0,value:t})}},function(e,t,a){var n=a(3),s="__core-js_shared__",r=n[s]||(n[s]={});e.exports=function(e){return r[e]||(r[e]={})}},function(e,t,a){var n=a(144),s=a(10);e.exports=function(e){return n(s(e))}},function(e,t,a){var n=a(15),s=Math.min;e.exports=function(e){return e>0?s(n(e),9007199254740991):0}},function(e,t,a){var n=a(10);e.exports=function(e){return Object(n(e))}},function(e,t){var a=0,n=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++a+n).toString(36))}},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var a=this[t];a[2]?e.push("@media "+a[2]+"{"+a[1]+"}"):e.push(a[1])}return e.join("")},e.i=function(t,a){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},s=0;s<this.length;s++){var r=this[s][0];"number"==typeof r&&(n[r]=!0)}for(s=0;s<t.length;s++){var i=t[s];"number"==typeof i[0]&&n[i[0]]||(a&&!i[2]?i[2]=a:a&&(i[2]="("+i[2]+") and ("+a+")"),e.push(i))}},e}},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("af",{months:"Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"),weekdays:"Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"),weekdaysShort:"Son_Maa_Din_Woe_Don_Vry_Sat".split("_"),weekdaysMin:"So_Ma_Di_Wo_Do_Vr_Sa".split("_"),meridiemParse:/vm|nm/i,isPM:function(e){return/^nm$/i.test(e)},meridiem:function(e,t,a){return e<12?a?"vm":"VM":a?"nm":"NM"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Vandag om] LT",nextDay:"[Môre om] LT",nextWeek:"dddd [om] LT",lastDay:"[Gister om] LT",lastWeek:"[Laas] dddd [om] LT",sameElse:"L"},relativeTime:{future:"oor %s",past:"%s gelede",s:"'n paar sekondes",m:"'n minuut",mm:"%d minute",h:"'n uur",hh:"%d ure",d:"'n dag",dd:"%d dae",M:"'n maand",MM:"%d maande",y:"'n jaar",yy:"%d jaar"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(e){return e+(1===e||8===e||e>=20?"ste":"de")},week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t={1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",0:"0"},a=function(e){return 0===e?0:1===e?1:2===e?2:e%100>=3&&e%100<=10?3:e%100>=11?4:5},n={s:["أقل من ثانية","ثانية واحدة",["ثانيتان","ثانيتين"],"%d ثوان","%d ثانية","%d ثانية"],m:["أقل من دقيقة","دقيقة واحدة",["دقيقتان","دقيقتين"],"%d دقائق","%d دقيقة","%d دقيقة"],h:["أقل من ساعة","ساعة واحدة",["ساعتان","ساعتين"],"%d ساعات","%d ساعة","%d ساعة"],d:["أقل من يوم","يوم واحد",["يومان","يومين"],"%d أيام","%d يومًا","%d يوم"],M:["أقل من شهر","شهر واحد",["شهران","شهرين"],"%d أشهر","%d شهرا","%d شهر"],y:["أقل من عام","عام واحد",["عامان","عامين"],"%d أعوام","%d عامًا","%d عام"]},s=function(e){return function(t,s,r,i){var d=a(t),o=n[e][a(t)];return 2===d&&(o=o[s?0:1]),o.replace(/%d/i,t)}},r=["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],i=e.defineLocale("ar-ly",{months:r,monthsShort:r,weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/‏M/‏YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/ص|م/,isPM:function(e){return"م"===e},meridiem:function(e,t,a){return e<12?"ص":"م"},calendar:{sameDay:"[اليوم عند الساعة] LT",nextDay:"[غدًا عند الساعة] LT",nextWeek:"dddd [عند الساعة] LT",lastDay:"[أمس عند الساعة] LT",lastWeek:"dddd [عند الساعة] LT",sameElse:"L"},relativeTime:{future:"بعد %s",past:"منذ %s",s:s("s"),m:s("m"),mm:s("m"),h:s("h"),hh:s("h"),d:s("d"),dd:s("d"),M:s("M"),MM:s("M"),y:s("y"),yy:s("y")},preparse:function(e){return e.replace(/\u200f/g,"").replace(/،/g,",")},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]}).replace(/,/g,"،")},week:{dow:6,doy:12}});return i})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("ar-ma",{months:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),monthsShort:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),weekdays:"الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},week:{dow:6,doy:12}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t={1:"١",2:"٢",3:"٣",4:"٤",5:"٥",6:"٦",7:"٧",8:"٨",9:"٩",0:"٠"},a={"١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","٠":"0"},n=e.defineLocale("ar-sa",{months:"يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),monthsShort:"يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/ص|م/,isPM:function(e){return"م"===e},meridiem:function(e,t,a){return e<12?"ص":"م"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},preparse:function(e){return e.replace(/[١٢٣٤٥٦٧٨٩٠]/g,function(e){return a[e]}).replace(/،/g,",")},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]}).replace(/,/g,"،")},week:{dow:6,doy:12}});return n})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("ar-tn",{months:"جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),monthsShort:"جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t={1:"١",2:"٢",3:"٣",4:"٤",5:"٥",6:"٦",7:"٧",8:"٨",9:"٩",0:"٠"},a={"١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","٠":"0"},n=function(e){return 0===e?0:1===e?1:2===e?2:e%100>=3&&e%100<=10?3:e%100>=11?4:5},s={s:["أقل من ثانية","ثانية واحدة",["ثانيتان","ثانيتين"],"%d ثوان","%d ثانية","%d ثانية"],m:["أقل من دقيقة","دقيقة واحدة",["دقيقتان","دقيقتين"],"%d دقائق","%d دقيقة","%d دقيقة"],h:["أقل من ساعة","ساعة واحدة",["ساعتان","ساعتين"],"%d ساعات","%d ساعة","%d ساعة"],d:["أقل من يوم","يوم واحد",["يومان","يومين"],"%d أيام","%d يومًا","%d يوم"],M:["أقل من شهر","شهر واحد",["شهران","شهرين"],"%d أشهر","%d شهرا","%d شهر"],y:["أقل من عام","عام واحد",["عامان","عامين"],"%d أعوام","%d عامًا","%d عام"]},r=function(e){return function(t,a,r,i){var d=n(t),o=s[e][n(t)];return 2===d&&(o=o[a?0:1]),o.replace(/%d/i,t)}},i=["كانون الثاني يناير","شباط فبراير","آذار مارس","نيسان أبريل","أيار مايو","حزيران يونيو","تموز يوليو","آب أغسطس","أيلول سبتمبر","تشرين الأول أكتوبر","تشرين الثاني نوفمبر","كانون الأول ديسمبر"],d=e.defineLocale("ar",{months:i,monthsShort:i,weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/‏M/‏YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/ص|م/,isPM:function(e){return"م"===e},meridiem:function(e,t,a){return e<12?"ص":"م"},calendar:{sameDay:"[اليوم عند الساعة] LT",nextDay:"[غدًا عند الساعة] LT",nextWeek:"dddd [عند الساعة] LT",lastDay:"[أمس عند الساعة] LT",lastWeek:"dddd [عند الساعة] LT",sameElse:"L"},relativeTime:{future:"بعد %s",past:"منذ %s",s:r("s"),m:r("m"),mm:r("m"),h:r("h"),hh:r("h"),d:r("d"),dd:r("d"),M:r("M"),MM:r("M"),y:r("y"),yy:r("y")},preparse:function(e){return e.replace(/\u200f/g,"").replace(/[١٢٣٤٥٦٧٨٩٠]/g,function(e){return a[e]}).replace(/،/g,",")},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]}).replace(/,/g,"،")},week:{dow:6,doy:12}});return d})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t={1:"-inci",5:"-inci",8:"-inci",70:"-inci",80:"-inci",2:"-nci",7:"-nci",20:"-nci",50:"-nci",3:"-üncü",4:"-üncü",100:"-üncü",6:"-ncı",9:"-uncu",10:"-uncu",30:"-uncu",60:"-ıncı",90:"-ıncı"},a=e.defineLocale("az",{months:"yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),monthsShort:"yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),weekdays:"Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə".split("_"),weekdaysShort:"Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən".split("_"),weekdaysMin:"Bz_BE_ÇA_Çə_CA_Cü_Şə".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[bugün saat] LT",nextDay:"[sabah saat] LT",nextWeek:"[gələn həftə] dddd [saat] LT",lastDay:"[dünən] LT",lastWeek:"[keçən həftə] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s əvvəl",s:"birneçə saniyyə",m:"bir dəqiqə",mm:"%d dəqiqə",h:"bir saat",hh:"%d saat",d:"bir gün",dd:"%d gün",M:"bir ay",MM:"%d ay",y:"bir il",yy:"%d il"},meridiemParse:/gecə|səhər|gündüz|axşam/,isPM:function(e){return/^(gündüz|axşam)$/.test(e)},meridiem:function(e,t,a){return e<4?"gecə":e<12?"səhər":e<17?"gündüz":"axşam"},ordinalParse:/\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,ordinal:function(e){if(0===e)return e+"-ıncı";var a=e%10,n=e%100-a,s=e>=100?100:null;return e+(t[a]||t[n]||t[s])},week:{dow:1,doy:7}});return a})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e,t){var a=e.split("_");return t%10===1&&t%100!==11?a[0]:t%10>=2&&t%10<=4&&(t%100<10||t%100>=20)?a[1]:a[2]}function a(e,a,n){var s={mm:a?"хвіліна_хвіліны_хвілін":"хвіліну_хвіліны_хвілін",hh:a?"гадзіна_гадзіны_гадзін":"гадзіну_гадзіны_гадзін",dd:"дзень_дні_дзён",MM:"месяц_месяцы_месяцаў",yy:"год_гады_гадоў"};return"m"===n?a?"хвіліна":"хвіліну":"h"===n?a?"гадзіна":"гадзіну":e+" "+t(s[n],+e)}var n=e.defineLocale("be",{months:{format:"студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня".split("_"),
	standalone:"студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань".split("_")},monthsShort:"студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж".split("_"),weekdays:{format:"нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу".split("_"),standalone:"нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота".split("_"),isFormat:/\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/},weekdaysShort:"нд_пн_ат_ср_чц_пт_сб".split("_"),weekdaysMin:"нд_пн_ат_ср_чц_пт_сб".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY г.",LLL:"D MMMM YYYY г., HH:mm",LLLL:"dddd, D MMMM YYYY г., HH:mm"},calendar:{sameDay:"[Сёння ў] LT",nextDay:"[Заўтра ў] LT",lastDay:"[Учора ў] LT",nextWeek:function(){return"[У] dddd [ў] LT"},lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return"[У мінулую] dddd [ў] LT";case 1:case 2:case 4:return"[У мінулы] dddd [ў] LT"}},sameElse:"L"},relativeTime:{future:"праз %s",past:"%s таму",s:"некалькі секунд",m:a,mm:a,h:a,hh:a,d:"дзень",dd:a,M:"месяц",MM:a,y:"год",yy:a},meridiemParse:/ночы|раніцы|дня|вечара/,isPM:function(e){return/^(дня|вечара)$/.test(e)},meridiem:function(e,t,a){return e<4?"ночы":e<12?"раніцы":e<17?"дня":"вечара"},ordinalParse:/\d{1,2}-(і|ы|га)/,ordinal:function(e,t){switch(t){case"M":case"d":case"DDD":case"w":case"W":return e%10!==2&&e%10!==3||e%100===12||e%100===13?e+"-ы":e+"-і";case"D":return e+"-га";default:return e}},week:{dow:1,doy:7}});return n})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("bg",{months:"януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),monthsShort:"янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),weekdays:"неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),weekdaysShort:"нед_пон_вто_сря_чет_пет_съб".split("_"),weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[Днес в] LT",nextDay:"[Утре в] LT",nextWeek:"dddd [в] LT",lastDay:"[Вчера в] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[В изминалата] dddd [в] LT";case 1:case 2:case 4:case 5:return"[В изминалия] dddd [в] LT"}},sameElse:"L"},relativeTime:{future:"след %s",past:"преди %s",s:"няколко секунди",m:"минута",mm:"%d минути",h:"час",hh:"%d часа",d:"ден",dd:"%d дни",M:"месец",MM:"%d месеца",y:"година",yy:"%d години"},ordinalParse:/\d{1,2}-(ев|ен|ти|ви|ри|ми)/,ordinal:function(e){var t=e%10,a=e%100;return 0===e?e+"-ев":0===a?e+"-ен":a>10&&a<20?e+"-ти":1===t?e+"-ви":2===t?e+"-ри":7===t||8===t?e+"-ми":e+"-ти"},week:{dow:1,doy:7}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t={1:"১",2:"২",3:"৩",4:"৪",5:"৫",6:"৬",7:"৭",8:"৮",9:"৯",0:"০"},a={"১":"1","২":"2","৩":"3","৪":"4","৫":"5","৬":"6","৭":"7","৮":"8","৯":"9","০":"0"},n=e.defineLocale("bn",{months:"জানুয়ারী_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর".split("_"),monthsShort:"জানু_ফেব_মার্চ_এপ্র_মে_জুন_জুল_আগ_সেপ্ট_অক্টো_নভে_ডিসে".split("_"),weekdays:"রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার".split("_"),weekdaysShort:"রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি".split("_"),weekdaysMin:"রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি".split("_"),longDateFormat:{LT:"A h:mm সময়",LTS:"A h:mm:ss সময়",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm সময়",LLLL:"dddd, D MMMM YYYY, A h:mm সময়"},calendar:{sameDay:"[আজ] LT",nextDay:"[আগামীকাল] LT",nextWeek:"dddd, LT",lastDay:"[গতকাল] LT",lastWeek:"[গত] dddd, LT",sameElse:"L"},relativeTime:{future:"%s পরে",past:"%s আগে",s:"কয়েক সেকেন্ড",m:"এক মিনিট",mm:"%d মিনিট",h:"এক ঘন্টা",hh:"%d ঘন্টা",d:"এক দিন",dd:"%d দিন",M:"এক মাস",MM:"%d মাস",y:"এক বছর",yy:"%d বছর"},preparse:function(e){return e.replace(/[১২৩৪৫৬৭৮৯০]/g,function(e){return a[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]})},meridiemParse:/রাত|সকাল|দুপুর|বিকাল|রাত/,meridiemHour:function(e,t){return 12===e&&(e=0),"রাত"===t&&e>=4||"দুপুর"===t&&e<5||"বিকাল"===t?e+12:e},meridiem:function(e,t,a){return e<4?"রাত":e<10?"সকাল":e<17?"দুপুর":e<20?"বিকাল":"রাত"},week:{dow:0,doy:6}});return n})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t={1:"༡",2:"༢",3:"༣",4:"༤",5:"༥",6:"༦",7:"༧",8:"༨",9:"༩",0:"༠"},a={"༡":"1","༢":"2","༣":"3","༤":"4","༥":"5","༦":"6","༧":"7","༨":"8","༩":"9","༠":"0"},n=e.defineLocale("bo",{months:"ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"),monthsShort:"ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"),weekdays:"གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་".split("_"),weekdaysShort:"ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),weekdaysMin:"ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm",LLLL:"dddd, D MMMM YYYY, A h:mm"},calendar:{sameDay:"[དི་རིང] LT",nextDay:"[སང་ཉིན] LT",nextWeek:"[བདུན་ཕྲག་རྗེས་མ], LT",lastDay:"[ཁ་སང] LT",lastWeek:"[བདུན་ཕྲག་མཐའ་མ] dddd, LT",sameElse:"L"},relativeTime:{future:"%s ལ་",past:"%s སྔན་ལ",s:"ལམ་སང",m:"སྐར་མ་གཅིག",mm:"%d སྐར་མ",h:"ཆུ་ཚོད་གཅིག",hh:"%d ཆུ་ཚོད",d:"ཉིན་གཅིག",dd:"%d ཉིན་",M:"ཟླ་བ་གཅིག",MM:"%d ཟླ་བ",y:"ལོ་གཅིག",yy:"%d ལོ"},preparse:function(e){return e.replace(/[༡༢༣༤༥༦༧༨༩༠]/g,function(e){return a[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]})},meridiemParse:/མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,meridiemHour:function(e,t){return 12===e&&(e=0),"མཚན་མོ"===t&&e>=4||"ཉིན་གུང"===t&&e<5||"དགོང་དག"===t?e+12:e},meridiem:function(e,t,a){return e<4?"མཚན་མོ":e<10?"ཞོགས་ཀས":e<17?"ཉིན་གུང":e<20?"དགོང་དག":"མཚན་མོ"},week:{dow:0,doy:6}});return n})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e,t,a){var n={mm:"munutenn",MM:"miz",dd:"devezh"};return e+" "+s(n[a],e)}function a(e){switch(n(e)){case 1:case 3:case 4:case 5:case 9:return e+" bloaz";default:return e+" vloaz"}}function n(e){return e>9?n(e%10):e}function s(e,t){return 2===t?r(e):e}function r(e){var t={m:"v",b:"v",d:"z"};return void 0===t[e.charAt(0)]?e:t[e.charAt(0)]+e.substring(1)}var i=e.defineLocale("br",{months:"Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),monthsShort:"Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),weekdays:"Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),weekdaysShort:"Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),weekdaysMin:"Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"h[e]mm A",LTS:"h[e]mm:ss A",L:"DD/MM/YYYY",LL:"D [a viz] MMMM YYYY",LLL:"D [a viz] MMMM YYYY h[e]mm A",LLLL:"dddd, D [a viz] MMMM YYYY h[e]mm A"},calendar:{sameDay:"[Hiziv da] LT",nextDay:"[Warc'hoazh da] LT",nextWeek:"dddd [da] LT",lastDay:"[Dec'h da] LT",lastWeek:"dddd [paset da] LT",sameElse:"L"},relativeTime:{future:"a-benn %s",past:"%s 'zo",s:"un nebeud segondennoù",m:"ur vunutenn",mm:t,h:"un eur",hh:"%d eur",d:"un devezh",dd:t,M:"ur miz",MM:t,y:"ur bloaz",yy:a},ordinalParse:/\d{1,2}(añ|vet)/,ordinal:function(e){var t=1===e?"añ":"vet";return e+t},week:{dow:1,doy:4}});return i})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e,t,a){var n=e+" ";switch(a){case"m":return t?"jedna minuta":"jedne minute";case"mm":return n+=1===e?"minuta":2===e||3===e||4===e?"minute":"minuta";case"h":return t?"jedan sat":"jednog sata";case"hh":return n+=1===e?"sat":2===e||3===e||4===e?"sata":"sati";case"dd":return n+=1===e?"dan":"dana";case"MM":return n+=1===e?"mjesec":2===e||3===e||4===e?"mjeseca":"mjeseci";case"yy":return n+=1===e?"godina":2===e||3===e||4===e?"godine":"godina"}}var a=e.defineLocale("bs",{months:"januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[jučer u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[prošlu] dddd [u] LT";case 6:return"[prošle] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[prošli] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",m:t,mm:t,h:t,hh:t,d:"dan",dd:t,M:"mjesec",MM:t,y:"godinu",yy:t},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});return a})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("ca",{months:"gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),monthsShort:"gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.".split("_"),monthsParseExact:!0,weekdays:"diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),weekdaysShort:"dg._dl._dt._dc._dj._dv._ds.".split("_"),weekdaysMin:"Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd D MMMM YYYY H:mm"},calendar:{sameDay:function(){return"[avui a "+(1!==this.hours()?"les":"la")+"] LT"},nextDay:function(){return"[demà a "+(1!==this.hours()?"les":"la")+"] LT"},nextWeek:function(){return"dddd [a "+(1!==this.hours()?"les":"la")+"] LT"},lastDay:function(){return"[ahir a "+(1!==this.hours()?"les":"la")+"] LT"},lastWeek:function(){return"[el] dddd [passat a "+(1!==this.hours()?"les":"la")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"fa %s",s:"uns segons",m:"un minut",mm:"%d minuts",h:"una hora",hh:"%d hores",d:"un dia",dd:"%d dies",M:"un mes",MM:"%d mesos",y:"un any",yy:"%d anys"},ordinalParse:/\d{1,2}(r|n|t|è|a)/,ordinal:function(e,t){var a=1===e?"r":2===e?"n":3===e?"r":4===e?"t":"è";return"w"!==t&&"W"!==t||(a="a"),e+a},week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e){return e>1&&e<5&&1!==~~(e/10)}function a(e,a,n,s){var r=e+" ";switch(n){case"s":return a||s?"pár sekund":"pár sekundami";case"m":return a?"minuta":s?"minutu":"minutou";case"mm":return a||s?r+(t(e)?"minuty":"minut"):r+"minutami";case"h":return a?"hodina":s?"hodinu":"hodinou";case"hh":return a||s?r+(t(e)?"hodiny":"hodin"):r+"hodinami";case"d":return a||s?"den":"dnem";case"dd":return a||s?r+(t(e)?"dny":"dní"):r+"dny";case"M":return a||s?"měsíc":"měsícem";case"MM":return a||s?r+(t(e)?"měsíce":"měsíců"):r+"měsíci";case"y":return a||s?"rok":"rokem";case"yy":return a||s?r+(t(e)?"roky":"let"):r+"lety"}}var n="leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"),s="led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_"),r=e.defineLocale("cs",{months:n,monthsShort:s,monthsParse:function(e,t){var a,n=[];for(a=0;a<12;a++)n[a]=new RegExp("^"+e[a]+"$|^"+t[a]+"$","i");return n}(n,s),shortMonthsParse:function(e){var t,a=[];for(t=0;t<12;t++)a[t]=new RegExp("^"+e[t]+"$","i");return a}(s),longMonthsParse:function(e){var t,a=[];for(t=0;t<12;t++)a[t]=new RegExp("^"+e[t]+"$","i");return a}(n),weekdays:"neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),weekdaysShort:"ne_po_út_st_čt_pá_so".split("_"),weekdaysMin:"ne_po_út_st_čt_pá_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm",l:"D. M. YYYY"},calendar:{sameDay:"[dnes v] LT",nextDay:"[zítra v] LT",nextWeek:function(){switch(this.day()){case 0:return"[v neděli v] LT";case 1:case 2:return"[v] dddd [v] LT";case 3:return"[ve středu v] LT";case 4:return"[ve čtvrtek v] LT";case 5:return"[v pátek v] LT";case 6:return"[v sobotu v] LT"}},lastDay:"[včera v] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulou neděli v] LT";case 1:case 2:return"[minulé] dddd [v] LT";case 3:return"[minulou středu v] LT";case 4:case 5:return"[minulý] dddd [v] LT";case 6:return"[minulou sobotu v] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"před %s",s:a,m:a,mm:a,h:a,hh:a,d:a,dd:a,M:a,MM:a,y:a,yy:a},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return r})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("cv",{months:"кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав".split("_"),monthsShort:"кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш".split("_"),weekdays:"вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун".split("_"),weekdaysShort:"выр_тун_ытл_юн_кӗҫ_эрн_шӑм".split("_"),weekdaysMin:"вр_тн_ыт_юн_кҫ_эр_шм".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]",LLL:"YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm",LLLL:"dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm"},calendar:{sameDay:"[Паян] LT [сехетре]",nextDay:"[Ыран] LT [сехетре]",lastDay:"[Ӗнер] LT [сехетре]",nextWeek:"[Ҫитес] dddd LT [сехетре]",lastWeek:"[Иртнӗ] dddd LT [сехетре]",sameElse:"L"},relativeTime:{future:function(e){var t=/сехет$/i.exec(e)?"рен":/ҫул$/i.exec(e)?"тан":"ран";return e+t},past:"%s каялла",s:"пӗр-ик ҫеккунт",m:"пӗр минут",mm:"%d минут",h:"пӗр сехет",hh:"%d сехет",d:"пӗр кун",dd:"%d кун",M:"пӗр уйӑх",MM:"%d уйӑх",y:"пӗр ҫул",yy:"%d ҫул"},ordinalParse:/\d{1,2}-мӗш/,ordinal:"%d-мӗш",week:{dow:1,doy:7}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("cy",{months:"Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),monthsShort:"Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),weekdays:"Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),weekdaysShort:"Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),weekdaysMin:"Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Heddiw am] LT",nextDay:"[Yfory am] LT",nextWeek:"dddd [am] LT",lastDay:"[Ddoe am] LT",lastWeek:"dddd [diwethaf am] LT",sameElse:"L"},relativeTime:{future:"mewn %s",past:"%s yn ôl",s:"ychydig eiliadau",m:"munud",mm:"%d munud",h:"awr",hh:"%d awr",d:"diwrnod",dd:"%d diwrnod",M:"mis",MM:"%d mis",y:"blwyddyn",yy:"%d flynedd"},ordinalParse:/\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,ordinal:function(e){var t=e,a="",n=["","af","il","ydd","ydd","ed","ed","ed","fed","fed","fed","eg","fed","eg","eg","fed","eg","eg","fed","eg","fed"];return t>20?a=40===t||50===t||60===t||80===t||100===t?"fed":"ain":t>0&&(a=n[t]),e+a},week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("da",{months:"januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),weekdaysShort:"søn_man_tir_ons_tor_fre_lør".split("_"),weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd [d.] D. MMMM YYYY HH:mm"},calendar:{sameDay:"[I dag kl.] LT",nextDay:"[I morgen kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[I går kl.] LT",lastWeek:"[sidste] dddd [kl] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s siden",s:"få sekunder",m:"et minut",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dage",M:"en måned",MM:"%d måneder",y:"et år",yy:"%d år"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e,t,a,n){var s={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[e+" Tage",e+" Tagen"],M:["ein Monat","einem Monat"],MM:[e+" Monate",e+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[e+" Jahre",e+" Jahren"]};return t?s[a][0]:s[a][1]}var a=e.defineLocale("de-at",{months:"Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd, D. MMMM YYYY HH:mm"},calendar:{sameDay:"[heute um] LT [Uhr]",sameElse:"L",nextDay:"[morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:t,mm:"%d Minuten",h:t,hh:"%d Stunden",d:t,dd:t,M:t,MM:t,y:t,yy:t},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return a})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e,t,a,n){var s={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[e+" Tage",e+" Tagen"],M:["ein Monat","einem Monat"],MM:[e+" Monate",e+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[e+" Jahre",e+" Jahren"]};return t?s[a][0]:s[a][1]}var a=e.defineLocale("de",{months:"Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd, D. MMMM YYYY HH:mm"},calendar:{sameDay:"[heute um] LT [Uhr]",sameElse:"L",nextDay:"[morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:t,mm:"%d Minuten",h:t,hh:"%d Stunden",d:t,dd:t,M:t,MM:t,y:t,yy:t},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return a})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=["ޖެނުއަރީ","ފެބްރުއަރީ","މާރިޗު","އޭޕްރީލު","މޭ","ޖޫން","ޖުލައި","އޯގަސްޓު","ސެޕްޓެމްބަރު","އޮކްޓޯބަރު","ނޮވެމްބަރު","ޑިސެމްބަރު"],a=["އާދިއްތަ","ހޯމަ","އަންގާރަ","ބުދަ","ބުރާސްފަތި","ހުކުރު","ހޮނިހިރު"],n=e.defineLocale("dv",{months:t,monthsShort:t,weekdays:a,weekdaysShort:a,weekdaysMin:"އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/M/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/މކ|މފ/,isPM:function(e){return"މފ"===e},meridiem:function(e,t,a){return e<12?"މކ":"މފ"},calendar:{sameDay:"[މިއަދު] LT",nextDay:"[މާދަމާ] LT",nextWeek:"dddd LT",lastDay:"[އިއްޔެ] LT",lastWeek:"[ފާއިތުވި] dddd LT",sameElse:"L"},relativeTime:{future:"ތެރޭގައި %s",past:"ކުރިން %s",s:"ސިކުންތުކޮޅެއް",m:"މިނިޓެއް",mm:"މިނިޓު %d",h:"ގަޑިއިރެއް",hh:"ގަޑިއިރު %d",d:"ދުވަހެއް",dd:"ދުވަސް %d",M:"މަހެއް",MM:"މަސް %d",y:"އަހަރެއް",yy:"އަހަރު %d"},preparse:function(e){return e.replace(/،/g,",")},postformat:function(e){return e.replace(/,/g,"،")},week:{dow:7,doy:12}});return n})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e){return e instanceof Function||"[object Function]"===Object.prototype.toString.call(e)}var a=e.defineLocale("el",{monthsNominativeEl:"Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"),monthsGenitiveEl:"Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου".split("_"),months:function(e,t){return/D/.test(t.substring(0,t.indexOf("MMMM")))?this._monthsGenitiveEl[e.month()]:this._monthsNominativeEl[e.month()]},monthsShort:"Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ".split("_"),weekdays:"Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"),weekdaysShort:"Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),weekdaysMin:"Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),meridiem:function(e,t,a){return e>11?a?"μμ":"ΜΜ":a?"πμ":"ΠΜ"},isPM:function(e){return"μ"===(e+"").toLowerCase()[0]},meridiemParse:/[ΠΜ]\.?Μ?\.?/i,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendarEl:{sameDay:"[Σήμερα {}] LT",nextDay:"[Αύριο {}] LT",nextWeek:"dddd [{}] LT",lastDay:"[Χθες {}] LT",lastWeek:function(){switch(this.day()){case 6:return"[το προηγούμενο] dddd [{}] LT";default:return"[την προηγούμενη] dddd [{}] LT"}},sameElse:"L"},calendar:function(e,a){var n=this._calendarEl[e],s=a&&a.hours();return t(n)&&(n=n.apply(a)),n.replace("{}",s%12===1?"στη":"στις")},relativeTime:{future:"σε %s",past:"%s πριν",s:"λίγα δευτερόλεπτα",m:"ένα λεπτό",mm:"%d λεπτά",h:"μία ώρα",hh:"%d ώρες",d:"μία μέρα",dd:"%d μέρες",M:"ένας μήνας",MM:"%d μήνες",y:"ένας χρόνος",yy:"%d χρόνια"},ordinalParse:/\d{1,2}η/,ordinal:"%dη",week:{dow:1,doy:4}});return a})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("en-au",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var t=e%10,a=1===~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+a},week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("en-ca",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"YYYY-MM-DD",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var t=e%10,a=1===~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+a}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("en-gb",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var t=e%10,a=1===~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+a},week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("en-ie",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var t=e%10,a=1===~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+a},week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("en-nz",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var t=e%10,a=1===~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+a},week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("eo",{months:"januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),weekdays:"Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato".split("_"),weekdaysShort:"Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Ĵa_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D[-an de] MMMM, YYYY",LLL:"D[-an de] MMMM, YYYY HH:mm",LLLL:"dddd, [la] D[-an de] MMMM, YYYY HH:mm"},meridiemParse:/[ap]\.t\.m/i,isPM:function(e){return"p"===e.charAt(0).toLowerCase()},meridiem:function(e,t,a){return e>11?a?"p.t.m.":"P.T.M.":a?"a.t.m.":"A.T.M."},calendar:{sameDay:"[Hodiaŭ je] LT",nextDay:"[Morgaŭ je] LT",nextWeek:"dddd [je] LT",lastDay:"[Hieraŭ je] LT",lastWeek:"[pasinta] dddd [je] LT",sameElse:"L"},relativeTime:{future:"je %s",past:"antaŭ %s",s:"sekundoj",m:"minuto",mm:"%d minutoj",h:"horo",hh:"%d horoj",d:"tago",dd:"%d tagoj",M:"monato",MM:"%d monatoj",y:"jaro",yy:"%d jaroj"},ordinalParse:/\d{1,2}a/,ordinal:"%da",week:{dow:1,doy:7}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t="ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),a="ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),n=e.defineLocale("es-do",{months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),monthsShort:function(e,n){return/-MMM-/.test(n)?a[e.month()]:t[e.month()]},monthsParseExact:!0,weekdays:"domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),weekdaysShort:"dom._lun._mar._mié._jue._vie._sáb.".split("_"),weekdaysMin:"do_lu_ma_mi_ju_vi_sá".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY h:mm A",LLLL:"dddd, D [de] MMMM [de] YYYY h:mm A"},calendar:{sameDay:function(){return"[hoy a la"+(1!==this.hours()?"s":"")+"] LT"},nextDay:function(){return"[mañana a la"+(1!==this.hours()?"s":"")+"] LT"},nextWeek:function(){return"dddd [a la"+(1!==this.hours()?"s":"")+"] LT"},lastDay:function(){return"[ayer a la"+(1!==this.hours()?"s":"")+"] LT"},lastWeek:function(){return"[el] dddd [pasado a la"+(1!==this.hours()?"s":"")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un día",dd:"%d días",M:"un mes",MM:"%d meses",y:"un año",yy:"%d años"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}});return n})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t="ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),a="ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),n=e.defineLocale("es",{months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),monthsShort:function(e,n){return/-MMM-/.test(n)?a[e.month()]:t[e.month()]},monthsParseExact:!0,weekdays:"domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),weekdaysShort:"dom._lun._mar._mié._jue._vie._sáb.".split("_"),weekdaysMin:"do_lu_ma_mi_ju_vi_sá".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY H:mm",LLLL:"dddd, D [de] MMMM [de] YYYY H:mm"},calendar:{sameDay:function(){return"[hoy a la"+(1!==this.hours()?"s":"")+"] LT"},nextDay:function(){return"[mañana a la"+(1!==this.hours()?"s":"")+"] LT"},nextWeek:function(){return"dddd [a la"+(1!==this.hours()?"s":"")+"] LT"},lastDay:function(){return"[ayer a la"+(1!==this.hours()?"s":"")+"] LT"},lastWeek:function(){return"[el] dddd [pasado a la"+(1!==this.hours()?"s":"")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un día",dd:"%d días",M:"un mes",MM:"%d meses",y:"un año",yy:"%d años"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}});return n})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e,t,a,n){var s={s:["mõne sekundi","mõni sekund","paar sekundit"],m:["ühe minuti","üks minut"],mm:[e+" minuti",e+" minutit"],h:["ühe tunni","tund aega","üks tund"],hh:[e+" tunni",e+" tundi"],d:["ühe päeva","üks päev"],M:["kuu aja","kuu aega","üks kuu"],
	MM:[e+" kuu",e+" kuud"],y:["ühe aasta","aasta","üks aasta"],yy:[e+" aasta",e+" aastat"]};return t?s[a][2]?s[a][2]:s[a][1]:n?s[a][0]:s[a][1]}var a=e.defineLocale("et",{months:"jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),monthsShort:"jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),weekdays:"pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"),weekdaysShort:"P_E_T_K_N_R_L".split("_"),weekdaysMin:"P_E_T_K_N_R_L".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[Täna,] LT",nextDay:"[Homme,] LT",nextWeek:"[Järgmine] dddd LT",lastDay:"[Eile,] LT",lastWeek:"[Eelmine] dddd LT",sameElse:"L"},relativeTime:{future:"%s pärast",past:"%s tagasi",s:t,m:t,mm:t,h:t,hh:t,d:t,dd:"%d päeva",M:t,MM:t,y:t,yy:t},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return a})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("eu",{months:"urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),monthsShort:"urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),monthsParseExact:!0,weekdays:"igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),weekdaysShort:"ig._al._ar._az._og._ol._lr.".split("_"),weekdaysMin:"ig_al_ar_az_og_ol_lr".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY[ko] MMMM[ren] D[a]",LLL:"YYYY[ko] MMMM[ren] D[a] HH:mm",LLLL:"dddd, YYYY[ko] MMMM[ren] D[a] HH:mm",l:"YYYY-M-D",ll:"YYYY[ko] MMM D[a]",lll:"YYYY[ko] MMM D[a] HH:mm",llll:"ddd, YYYY[ko] MMM D[a] HH:mm"},calendar:{sameDay:"[gaur] LT[etan]",nextDay:"[bihar] LT[etan]",nextWeek:"dddd LT[etan]",lastDay:"[atzo] LT[etan]",lastWeek:"[aurreko] dddd LT[etan]",sameElse:"L"},relativeTime:{future:"%s barru",past:"duela %s",s:"segundo batzuk",m:"minutu bat",mm:"%d minutu",h:"ordu bat",hh:"%d ordu",d:"egun bat",dd:"%d egun",M:"hilabete bat",MM:"%d hilabete",y:"urte bat",yy:"%d urte"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t={1:"۱",2:"۲",3:"۳",4:"۴",5:"۵",6:"۶",7:"۷",8:"۸",9:"۹",0:"۰"},a={"۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","۰":"0"},n=e.defineLocale("fa",{months:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),monthsShort:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),weekdays:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),weekdaysShort:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),weekdaysMin:"ی_د_س_چ_پ_ج_ش".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},meridiemParse:/قبل از ظهر|بعد از ظهر/,isPM:function(e){return/بعد از ظهر/.test(e)},meridiem:function(e,t,a){return e<12?"قبل از ظهر":"بعد از ظهر"},calendar:{sameDay:"[امروز ساعت] LT",nextDay:"[فردا ساعت] LT",nextWeek:"dddd [ساعت] LT",lastDay:"[دیروز ساعت] LT",lastWeek:"dddd [پیش] [ساعت] LT",sameElse:"L"},relativeTime:{future:"در %s",past:"%s پیش",s:"چندین ثانیه",m:"یک دقیقه",mm:"%d دقیقه",h:"یک ساعت",hh:"%d ساعت",d:"یک روز",dd:"%d روز",M:"یک ماه",MM:"%d ماه",y:"یک سال",yy:"%d سال"},preparse:function(e){return e.replace(/[۰-۹]/g,function(e){return a[e]}).replace(/،/g,",")},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]}).replace(/,/g,"،")},ordinalParse:/\d{1,2}م/,ordinal:"%dم",week:{dow:6,doy:12}});return n})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e,t,n,s){var r="";switch(n){case"s":return s?"muutaman sekunnin":"muutama sekunti";case"m":return s?"minuutin":"minuutti";case"mm":r=s?"minuutin":"minuuttia";break;case"h":return s?"tunnin":"tunti";case"hh":r=s?"tunnin":"tuntia";break;case"d":return s?"päivän":"päivä";case"dd":r=s?"päivän":"päivää";break;case"M":return s?"kuukauden":"kuukausi";case"MM":r=s?"kuukauden":"kuukautta";break;case"y":return s?"vuoden":"vuosi";case"yy":r=s?"vuoden":"vuotta"}return r=a(e,s)+" "+r}function a(e,t){return e<10?t?s[e]:n[e]:e}var n="nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" "),s=["nolla","yhden","kahden","kolmen","neljän","viiden","kuuden",n[7],n[8],n[9]],r=e.defineLocale("fi",{months:"tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),monthsShort:"tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),weekdays:"sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),weekdaysShort:"su_ma_ti_ke_to_pe_la".split("_"),weekdaysMin:"su_ma_ti_ke_to_pe_la".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"Do MMMM[ta] YYYY",LLL:"Do MMMM[ta] YYYY, [klo] HH.mm",LLLL:"dddd, Do MMMM[ta] YYYY, [klo] HH.mm",l:"D.M.YYYY",ll:"Do MMM YYYY",lll:"Do MMM YYYY, [klo] HH.mm",llll:"ddd, Do MMM YYYY, [klo] HH.mm"},calendar:{sameDay:"[tänään] [klo] LT",nextDay:"[huomenna] [klo] LT",nextWeek:"dddd [klo] LT",lastDay:"[eilen] [klo] LT",lastWeek:"[viime] dddd[na] [klo] LT",sameElse:"L"},relativeTime:{future:"%s päästä",past:"%s sitten",s:t,m:t,mm:t,h:t,hh:t,d:t,dd:t,M:t,MM:t,y:t,yy:t},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return r})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("fo",{months:"januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split("_"),weekdaysShort:"sun_mán_týs_mik_hós_frí_ley".split("_"),weekdaysMin:"su_má_tý_mi_hó_fr_le".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D. MMMM, YYYY HH:mm"},calendar:{sameDay:"[Í dag kl.] LT",nextDay:"[Í morgin kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[Í gjár kl.] LT",lastWeek:"[síðstu] dddd [kl] LT",sameElse:"L"},relativeTime:{future:"um %s",past:"%s síðani",s:"fá sekund",m:"ein minutt",mm:"%d minuttir",h:"ein tími",hh:"%d tímar",d:"ein dagur",dd:"%d dagar",M:"ein mánaði",MM:"%d mánaðir",y:"eitt ár",yy:"%d ár"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("fr-ca",{months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),monthsParseExact:!0,weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd'hui à] LT",nextDay:"[Demain à] LT",nextWeek:"dddd [à] LT",lastDay:"[Hier à] LT",lastWeek:"dddd [dernier à] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinalParse:/\d{1,2}(er|e)/,ordinal:function(e){return e+(1===e?"er":"e")}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("fr-ch",{months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),monthsParseExact:!0,weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd'hui à] LT",nextDay:"[Demain à] LT",nextWeek:"dddd [à] LT",lastDay:"[Hier à] LT",lastWeek:"dddd [dernier à] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinalParse:/\d{1,2}(er|e)/,ordinal:function(e){return e+(1===e?"er":"e")},week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("fr",{months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),monthsParseExact:!0,weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd'hui à] LT",nextDay:"[Demain à] LT",nextWeek:"dddd [à] LT",lastDay:"[Hier à] LT",lastWeek:"dddd [dernier à] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinalParse:/\d{1,2}(er|)/,ordinal:function(e){return e+(1===e?"er":"")},week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t="jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_"),a="jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),n=e.defineLocale("fy",{months:"jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"),monthsShort:function(e,n){return/-MMM-/.test(n)?a[e.month()]:t[e.month()]},monthsParseExact:!0,weekdays:"snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"),weekdaysShort:"si._mo._ti._wo._to._fr._so.".split("_"),weekdaysMin:"Si_Mo_Ti_Wo_To_Fr_So".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[hjoed om] LT",nextDay:"[moarn om] LT",nextWeek:"dddd [om] LT",lastDay:"[juster om] LT",lastWeek:"[ôfrûne] dddd [om] LT",sameElse:"L"},relativeTime:{future:"oer %s",past:"%s lyn",s:"in pear sekonden",m:"ien minút",mm:"%d minuten",h:"ien oere",hh:"%d oeren",d:"ien dei",dd:"%d dagen",M:"ien moanne",MM:"%d moannen",y:"ien jier",yy:"%d jierren"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(e){return e+(1===e||8===e||e>=20?"ste":"de")},week:{dow:1,doy:4}});return n})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=["Am Faoilleach","An Gearran","Am Màrt","An Giblean","An Cèitean","An t-Ògmhios","An t-Iuchar","An Lùnastal","An t-Sultain","An Dàmhair","An t-Samhain","An Dùbhlachd"],a=["Faoi","Gear","Màrt","Gibl","Cèit","Ògmh","Iuch","Lùn","Sult","Dàmh","Samh","Dùbh"],n=["Didòmhnaich","Diluain","Dimàirt","Diciadain","Diardaoin","Dihaoine","Disathairne"],s=["Did","Dil","Dim","Dic","Dia","Dih","Dis"],r=["Dò","Lu","Mà","Ci","Ar","Ha","Sa"],i=e.defineLocale("gd",{months:t,monthsShort:a,monthsParseExact:!0,weekdays:n,weekdaysShort:s,weekdaysMin:r,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[An-diugh aig] LT",nextDay:"[A-màireach aig] LT",nextWeek:"dddd [aig] LT",lastDay:"[An-dè aig] LT",lastWeek:"dddd [seo chaidh] [aig] LT",sameElse:"L"},relativeTime:{future:"ann an %s",past:"bho chionn %s",s:"beagan diogan",m:"mionaid",mm:"%d mionaidean",h:"uair",hh:"%d uairean",d:"latha",dd:"%d latha",M:"mìos",MM:"%d mìosan",y:"bliadhna",yy:"%d bliadhna"},ordinalParse:/\d{1,2}(d|na|mh)/,ordinal:function(e){var t=1===e?"d":e%10===2?"na":"mh";return e+t},week:{dow:1,doy:4}});return i})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("gl",{months:"xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro".split("_"),monthsShort:"xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"domingo_luns_martes_mércores_xoves_venres_sábado".split("_"),weekdaysShort:"dom._lun._mar._mér._xov._ven._sáb.".split("_"),weekdaysMin:"do_lu_ma_mé_xo_ve_sá".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY H:mm",LLLL:"dddd, D [de] MMMM [de] YYYY H:mm"},calendar:{sameDay:function(){return"[hoxe "+(1!==this.hours()?"ás":"á")+"] LT"},nextDay:function(){return"[mañá "+(1!==this.hours()?"ás":"á")+"] LT"},nextWeek:function(){return"dddd ["+(1!==this.hours()?"ás":"a")+"] LT"},lastDay:function(){return"[onte "+(1!==this.hours()?"á":"a")+"] LT"},lastWeek:function(){return"[o] dddd [pasado "+(1!==this.hours()?"ás":"a")+"] LT"},sameElse:"L"},relativeTime:{future:function(e){return 0===e.indexOf("un")?"n"+e:"en "+e},past:"hai %s",s:"uns segundos",m:"un minuto",mm:"%d minutos",h:"unha hora",hh:"%d horas",d:"un día",dd:"%d días",M:"un mes",MM:"%d meses",y:"un ano",yy:"%d anos"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("he",{months:"ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"),monthsShort:"ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳".split("_"),weekdays:"ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),weekdaysShort:"א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),weekdaysMin:"א_ב_ג_ד_ה_ו_ש".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [ב]MMMM YYYY",LLL:"D [ב]MMMM YYYY HH:mm",LLLL:"dddd, D [ב]MMMM YYYY HH:mm",l:"D/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY HH:mm",llll:"ddd, D MMM YYYY HH:mm"},calendar:{sameDay:"[היום ב־]LT",nextDay:"[מחר ב־]LT",nextWeek:"dddd [בשעה] LT",lastDay:"[אתמול ב־]LT",lastWeek:"[ביום] dddd [האחרון בשעה] LT",sameElse:"L"},relativeTime:{future:"בעוד %s",past:"לפני %s",s:"מספר שניות",m:"דקה",mm:"%d דקות",h:"שעה",hh:function(e){return 2===e?"שעתיים":e+" שעות"},d:"יום",dd:function(e){return 2===e?"יומיים":e+" ימים"},M:"חודש",MM:function(e){return 2===e?"חודשיים":e+" חודשים"},y:"שנה",yy:function(e){return 2===e?"שנתיים":e%10===0&&10!==e?e+" שנה":e+" שנים"}},meridiemParse:/אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,isPM:function(e){return/^(אחה"צ|אחרי הצהריים|בערב)$/.test(e)},meridiem:function(e,t,a){return e<5?"לפנות בוקר":e<10?"בבוקר":e<12?a?'לפנה"צ':"לפני הצהריים":e<18?a?'אחה"צ':"אחרי הצהריים":"בערב"}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t={1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"},a={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"},n=e.defineLocale("hi",{months:"जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"),monthsShort:"जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"),monthsParseExact:!0,weekdays:"रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),weekdaysShort:"रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"),weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),longDateFormat:{LT:"A h:mm बजे",LTS:"A h:mm:ss बजे",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm बजे",LLLL:"dddd, D MMMM YYYY, A h:mm बजे"},calendar:{sameDay:"[आज] LT",nextDay:"[कल] LT",nextWeek:"dddd, LT",lastDay:"[कल] LT",lastWeek:"[पिछले] dddd, LT",sameElse:"L"},relativeTime:{future:"%s में",past:"%s पहले",s:"कुछ ही क्षण",m:"एक मिनट",mm:"%d मिनट",h:"एक घंटा",hh:"%d घंटे",d:"एक दिन",dd:"%d दिन",M:"एक महीने",MM:"%d महीने",y:"एक वर्ष",yy:"%d वर्ष"},preparse:function(e){return e.replace(/[१२३४५६७८९०]/g,function(e){return a[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]})},meridiemParse:/रात|सुबह|दोपहर|शाम/,meridiemHour:function(e,t){return 12===e&&(e=0),"रात"===t?e<4?e:e+12:"सुबह"===t?e:"दोपहर"===t?e>=10?e:e+12:"शाम"===t?e+12:void 0},meridiem:function(e,t,a){return e<4?"रात":e<10?"सुबह":e<17?"दोपहर":e<20?"शाम":"रात"},week:{dow:0,doy:6}});return n})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e,t,a){var n=e+" ";switch(a){case"m":return t?"jedna minuta":"jedne minute";case"mm":return n+=1===e?"minuta":2===e||3===e||4===e?"minute":"minuta";case"h":return t?"jedan sat":"jednog sata";case"hh":return n+=1===e?"sat":2===e||3===e||4===e?"sata":"sati";case"dd":return n+=1===e?"dan":"dana";case"MM":return n+=1===e?"mjesec":2===e||3===e||4===e?"mjeseca":"mjeseci";case"yy":return n+=1===e?"godina":2===e||3===e||4===e?"godine":"godina"}}var a=e.defineLocale("hr",{months:{format:"siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_"),standalone:"siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_")},monthsShort:"sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),monthsParseExact:!0,weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[jučer u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[prošlu] dddd [u] LT";case 6:return"[prošle] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[prošli] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",m:t,mm:t,h:t,hh:t,d:"dan",dd:t,M:"mjesec",MM:t,y:"godinu",yy:t},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});return a})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e,t,a,n){var s=e;switch(a){case"s":return n||t?"néhány másodperc":"néhány másodperce";case"m":return"egy"+(n||t?" perc":" perce");case"mm":return s+(n||t?" perc":" perce");case"h":return"egy"+(n||t?" óra":" órája");case"hh":return s+(n||t?" óra":" órája");case"d":return"egy"+(n||t?" nap":" napja");case"dd":return s+(n||t?" nap":" napja");case"M":return"egy"+(n||t?" hónap":" hónapja");case"MM":return s+(n||t?" hónap":" hónapja");case"y":return"egy"+(n||t?" év":" éve");case"yy":return s+(n||t?" év":" éve")}return""}function a(e){return(e?"":"[múlt] ")+"["+n[this.day()]+"] LT[-kor]"}var n="vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(" "),s=e.defineLocale("hu",{months:"január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),monthsShort:"jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),weekdays:"vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),weekdaysShort:"vas_hét_kedd_sze_csüt_pén_szo".split("_"),weekdaysMin:"v_h_k_sze_cs_p_szo".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"YYYY.MM.DD.",LL:"YYYY. MMMM D.",LLL:"YYYY. MMMM D. H:mm",LLLL:"YYYY. MMMM D., dddd H:mm"},meridiemParse:/de|du/i,isPM:function(e){return"u"===e.charAt(1).toLowerCase()},meridiem:function(e,t,a){return e<12?a===!0?"de":"DE":a===!0?"du":"DU"},calendar:{sameDay:"[ma] LT[-kor]",nextDay:"[holnap] LT[-kor]",nextWeek:function(){return a.call(this,!0)},lastDay:"[tegnap] LT[-kor]",lastWeek:function(){return a.call(this,!1)},sameElse:"L"},relativeTime:{future:"%s múlva",past:"%s",s:t,m:t,mm:t,h:t,hh:t,d:t,dd:t,M:t,MM:t,y:t,yy:t},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});return s})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("hy-am",{months:{format:"հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի".split("_"),standalone:"հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր".split("_")},monthsShort:"հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ".split("_"),weekdays:"կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ".split("_"),weekdaysShort:"կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),weekdaysMin:"կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY թ.",LLL:"D MMMM YYYY թ., HH:mm",LLLL:"dddd, D MMMM YYYY թ., HH:mm"},calendar:{sameDay:"[այսօր] LT",nextDay:"[վաղը] LT",lastDay:"[երեկ] LT",nextWeek:function(){return"dddd [օրը ժամը] LT"},lastWeek:function(){return"[անցած] dddd [օրը ժամը] LT"},sameElse:"L"},relativeTime:{future:"%s հետո",past:"%s առաջ",s:"մի քանի վայրկյան",m:"րոպե",mm:"%d րոպե",h:"ժամ",hh:"%d ժամ",d:"օր",dd:"%d օր",M:"ամիս",MM:"%d ամիս",y:"տարի",yy:"%d տարի"},meridiemParse:/գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,isPM:function(e){return/^(ցերեկվա|երեկոյան)$/.test(e)},meridiem:function(e){return e<4?"գիշերվա":e<12?"առավոտվա":e<17?"ցերեկվա":"երեկոյան"},ordinalParse:/\d{1,2}|\d{1,2}-(ին|րդ)/,ordinal:function(e,t){switch(t){case"DDD":case"w":case"W":case"DDDo":return 1===e?e+"-ին":e+"-րդ";default:return e}},week:{dow:1,doy:7}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("id",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),weekdays:"Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),weekdaysShort:"Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|siang|sore|malam/,meridiemHour:function(e,t){return 12===e&&(e=0),"pagi"===t?e:"siang"===t?e>=11?e:e+12:"sore"===t||"malam"===t?e+12:void 0},meridiem:function(e,t,a){return e<11?"pagi":e<15?"siang":e<19?"sore":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Besok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kemarin pukul] LT",lastWeek:"dddd [lalu pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lalu",s:"beberapa detik",m:"semenit",mm:"%d menit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e){return e%100===11||e%10!==1}function a(e,a,n,s){var r=e+" ";switch(n){case"s":return a||s?"nokkrar sekúndur":"nokkrum sekúndum";case"m":return a?"mínúta":"mínútu";case"mm":return t(e)?r+(a||s?"mínútur":"mínútum"):a?r+"mínúta":r+"mínútu";case"hh":return t(e)?r+(a||s?"klukkustundir":"klukkustundum"):r+"klukkustund";case"d":return a?"dagur":s?"dag":"degi";case"dd":return t(e)?a?r+"dagar":r+(s?"daga":"dögum"):a?r+"dagur":r+(s?"dag":"degi");case"M":return a?"mánuður":s?"mánuð":"mánuði";case"MM":return t(e)?a?r+"mánuðir":r+(s?"mánuði":"mánuðum"):a?r+"mánuður":r+(s?"mánuð":"mánuði");case"y":return a||s?"ár":"ári";case"yy":return t(e)?r+(a||s?"ár":"árum"):r+(a||s?"ár":"ári")}}var n=e.defineLocale("is",{months:"janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"),monthsShort:"jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),weekdays:"sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"),weekdaysShort:"sun_mán_þri_mið_fim_fös_lau".split("_"),weekdaysMin:"Su_Má_Þr_Mi_Fi_Fö_La".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] H:mm",LLLL:"dddd, D. MMMM YYYY [kl.] H:mm"},calendar:{sameDay:"[í dag kl.] LT",nextDay:"[á morgun kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[í gær kl.] LT",lastWeek:"[síðasta] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"eftir %s",past:"fyrir %s síðan",s:a,m:a,mm:a,h:"klukkustund",hh:a,d:a,dd:a,M:a,MM:a,y:a,yy:a},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return n})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("it",{months:"gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),monthsShort:"gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),weekdays:"Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato".split("_"),weekdaysShort:"Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),weekdaysMin:"Do_Lu_Ma_Me_Gi_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Oggi alle] LT",nextDay:"[Domani alle] LT",nextWeek:"dddd [alle] LT",lastDay:"[Ieri alle] LT",lastWeek:function(){switch(this.day()){case 0:return"[la scorsa] dddd [alle] LT";default:return"[lo scorso] dddd [alle] LT"}},sameElse:"L"},relativeTime:{future:function(e){return(/^[0-9].+$/.test(e)?"tra":"in")+" "+e},past:"%s fa",s:"alcuni secondi",m:"un minuto",mm:"%d minuti",h:"un'ora",hh:"%d ore",d:"un giorno",dd:"%d giorni",M:"un mese",MM:"%d mesi",y:"un anno",yy:"%d anni"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("ja",{months:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),weekdaysShort:"日_月_火_水_木_金_土".split("_"),weekdaysMin:"日_月_火_水_木_金_土".split("_"),longDateFormat:{LT:"Ah時m分",LTS:"Ah時m分s秒",L:"YYYY/MM/DD",LL:"YYYY年M月D日",LLL:"YYYY年M月D日Ah時m分",LLLL:"YYYY年M月D日Ah時m分 dddd"},meridiemParse:/午前|午後/i,isPM:function(e){return"午後"===e},meridiem:function(e,t,a){return e<12?"午前":"午後"},calendar:{sameDay:"[今日] LT",nextDay:"[明日] LT",nextWeek:"[来週]dddd LT",lastDay:"[昨日] LT",lastWeek:"[前週]dddd LT",sameElse:"L"},ordinalParse:/\d{1,2}日/,ordinal:function(e,t){switch(t){case"d":case"D":case"DDD":return e+"日";default:return e}},relativeTime:{future:"%s後",past:"%s前",s:"数秒",m:"1分",mm:"%d分",h:"1時間",hh:"%d時間",d:"1日",dd:"%d日",M:"1ヶ月",MM:"%dヶ月",y:"1年",yy:"%d年"}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("jv",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"),weekdays:"Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"),weekdaysShort:"Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/enjing|siyang|sonten|ndalu/,meridiemHour:function(e,t){return 12===e&&(e=0),"enjing"===t?e:"siyang"===t?e>=11?e:e+12:"sonten"===t||"ndalu"===t?e+12:void 0},meridiem:function(e,t,a){return e<11?"enjing":e<15?"siyang":e<19?"sonten":"ndalu"},calendar:{sameDay:"[Dinten puniko pukul] LT",nextDay:"[Mbenjang pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kala wingi pukul] LT",lastWeek:"dddd [kepengker pukul] LT",sameElse:"L"},relativeTime:{future:"wonten ing %s",past:"%s ingkang kepengker",s:"sawetawis detik",m:"setunggal menit",mm:"%d menit",h:"setunggal jam",hh:"%d jam",d:"sedinten",dd:"%d dinten",M:"sewulan",MM:"%d wulan",y:"setaun",yy:"%d taun"},week:{dow:1,doy:7}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("ka",{months:{standalone:"იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split("_"),format:"იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს".split("_")},monthsShort:"იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"),weekdays:{standalone:"კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"),format:"კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს".split("_"),isFormat:/(წინა|შემდეგ)/},weekdaysShort:"კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"),weekdaysMin:"კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[დღეს] LT[-ზე]",nextDay:"[ხვალ] LT[-ზე]",lastDay:"[გუშინ] LT[-ზე]",nextWeek:"[შემდეგ] dddd LT[-ზე]",lastWeek:"[წინა] dddd LT-ზე",sameElse:"L"},relativeTime:{future:function(e){return/(წამი|წუთი|საათი|წელი)/.test(e)?e.replace(/ი$/,"ში"):e+"ში"},past:function(e){return/(წამი|წუთი|საათი|დღე|თვე)/.test(e)?e.replace(/(ი|ე)$/,"ის წინ"):/წელი/.test(e)?e.replace(/წელი$/,"წლის წინ"):void 0},s:"რამდენიმე წამი",m:"წუთი",mm:"%d წუთი",h:"საათი",hh:"%d საათი",d:"დღე",dd:"%d დღე",M:"თვე",MM:"%d თვე",y:"წელი",yy:"%d წელი"},ordinalParse:/0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,ordinal:function(e){return 0===e?e:1===e?e+"-ლი":e<20||e<=100&&e%20===0||e%100===0?"მე-"+e:e+"-ე"},week:{dow:1,doy:7}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t={0:"-ші",1:"-ші",2:"-ші",3:"-ші",4:"-ші",5:"-ші",6:"-шы",7:"-ші",8:"-ші",9:"-шы",10:"-шы",20:"-шы",30:"-шы",40:"-шы",50:"-ші",60:"-шы",70:"-ші",80:"-ші",90:"-шы",100:"-ші"},a=e.defineLocale("kk",{months:"қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан".split("_"),monthsShort:"қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел".split("_"),weekdays:"жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі".split("_"),weekdaysShort:"жек_дүй_сей_сәр_бей_жұм_сен".split("_"),weekdaysMin:"жк_дй_сй_ср_бй_жм_сн".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Бүгін сағат] LT",nextDay:"[Ертең сағат] LT",nextWeek:"dddd [сағат] LT",lastDay:"[Кеше сағат] LT",lastWeek:"[Өткен аптаның] dddd [сағат] LT",sameElse:"L"},relativeTime:{future:"%s ішінде",past:"%s бұрын",s:"бірнеше секунд",m:"бір минут",mm:"%d минут",h:"бір сағат",hh:"%d сағат",d:"бір күн",dd:"%d күн",M:"бір ай",MM:"%d ай",y:"бір жыл",yy:"%d жыл"},ordinalParse:/\d{1,2}-(ші|шы)/,ordinal:function(e){var a=e%10,n=e>=100?100:null;return e+(t[e]||t[a]||t[n])},week:{dow:1,doy:7}});return a})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("km",{months:"មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),monthsShort:"មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),weekdays:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),weekdaysShort:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),weekdaysMin:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[ថ្ងៃនេះ ម៉ោង] LT",nextDay:"[ស្អែក ម៉ោង] LT",nextWeek:"dddd [ម៉ោង] LT",lastDay:"[ម្សិលមិញ ម៉ោង] LT",lastWeek:"dddd [សប្តាហ៍មុន] [ម៉ោង] LT",sameElse:"L"},relativeTime:{future:"%sទៀត",past:"%sមុន",s:"ប៉ុន្មានវិនាទី",m:"មួយនាទី",mm:"%d នាទី",h:"មួយម៉ោង",hh:"%d ម៉ោង",d:"មួយថ្ងៃ",dd:"%d ថ្ងៃ",M:"មួយខែ",MM:"%d ខែ",y:"មួយឆ្នាំ",yy:"%d ឆ្នាំ"},
	week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("ko",{months:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),monthsShort:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),weekdays:"일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),weekdaysShort:"일_월_화_수_목_금_토".split("_"),weekdaysMin:"일_월_화_수_목_금_토".split("_"),longDateFormat:{LT:"A h시 m분",LTS:"A h시 m분 s초",L:"YYYY.MM.DD",LL:"YYYY년 MMMM D일",LLL:"YYYY년 MMMM D일 A h시 m분",LLLL:"YYYY년 MMMM D일 dddd A h시 m분"},calendar:{sameDay:"오늘 LT",nextDay:"내일 LT",nextWeek:"dddd LT",lastDay:"어제 LT",lastWeek:"지난주 dddd LT",sameElse:"L"},relativeTime:{future:"%s 후",past:"%s 전",s:"몇 초",ss:"%d초",m:"일분",mm:"%d분",h:"한 시간",hh:"%d시간",d:"하루",dd:"%d일",M:"한 달",MM:"%d달",y:"일 년",yy:"%d년"},ordinalParse:/\d{1,2}일/,ordinal:"%d일",meridiemParse:/오전|오후/,isPM:function(e){return"오후"===e},meridiem:function(e,t,a){return e<12?"오전":"오후"}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t={0:"-чү",1:"-чи",2:"-чи",3:"-чү",4:"-чү",5:"-чи",6:"-чы",7:"-чи",8:"-чи",9:"-чу",10:"-чу",20:"-чы",30:"-чу",40:"-чы",50:"-чү",60:"-чы",70:"-чи",80:"-чи",90:"-чу",100:"-чү"},a=e.defineLocale("ky",{months:"январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),monthsShort:"янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"),weekdays:"Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби".split("_"),weekdaysShort:"Жек_Дүй_Шей_Шар_Бей_Жум_Ише".split("_"),weekdaysMin:"Жк_Дй_Шй_Шр_Бй_Жм_Иш".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Бүгүн саат] LT",nextDay:"[Эртең саат] LT",nextWeek:"dddd [саат] LT",lastDay:"[Кече саат] LT",lastWeek:"[Өткен аптанын] dddd [күнү] [саат] LT",sameElse:"L"},relativeTime:{future:"%s ичинде",past:"%s мурун",s:"бирнече секунд",m:"бир мүнөт",mm:"%d мүнөт",h:"бир саат",hh:"%d саат",d:"бир күн",dd:"%d күн",M:"бир ай",MM:"%d ай",y:"бир жыл",yy:"%d жыл"},ordinalParse:/\d{1,2}-(чи|чы|чү|чу)/,ordinal:function(e){var a=e%10,n=e>=100?100:null;return e+(t[e]||t[a]||t[n])},week:{dow:1,doy:7}});return a})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e,t,a,n){var s={m:["eng Minutt","enger Minutt"],h:["eng Stonn","enger Stonn"],d:["een Dag","engem Dag"],M:["ee Mount","engem Mount"],y:["ee Joer","engem Joer"]};return t?s[a][0]:s[a][1]}function a(e){var t=e.substr(0,e.indexOf(" "));return s(t)?"a "+e:"an "+e}function n(e){var t=e.substr(0,e.indexOf(" "));return s(t)?"viru "+e:"virun "+e}function s(e){if(e=parseInt(e,10),isNaN(e))return!1;if(e<0)return!0;if(e<10)return 4<=e&&e<=7;if(e<100){var t=e%10,a=e/10;return s(0===t?a:t)}if(e<1e4){for(;e>=10;)e/=10;return s(e)}return e/=1e3,s(e)}var r=e.defineLocale("lb",{months:"Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),weekdaysShort:"So._Mé._Dë._Më._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mé_Dë_Më_Do_Fr_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm [Auer]",LTS:"H:mm:ss [Auer]",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm [Auer]",LLLL:"dddd, D. MMMM YYYY H:mm [Auer]"},calendar:{sameDay:"[Haut um] LT",sameElse:"L",nextDay:"[Muer um] LT",nextWeek:"dddd [um] LT",lastDay:"[Gëschter um] LT",lastWeek:function(){switch(this.day()){case 2:case 4:return"[Leschten] dddd [um] LT";default:return"[Leschte] dddd [um] LT"}}},relativeTime:{future:a,past:n,s:"e puer Sekonnen",m:t,mm:"%d Minutten",h:t,hh:"%d Stonnen",d:t,dd:"%d Deeg",M:t,MM:"%d Méint",y:t,yy:"%d Joer"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return r})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("lo",{months:"ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"),monthsShort:"ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"),weekdays:"ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),weekdaysShort:"ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),weekdaysMin:"ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"ວັນdddd D MMMM YYYY HH:mm"},meridiemParse:/ຕອນເຊົ້າ|ຕອນແລງ/,isPM:function(e){return"ຕອນແລງ"===e},meridiem:function(e,t,a){return e<12?"ຕອນເຊົ້າ":"ຕອນແລງ"},calendar:{sameDay:"[ມື້ນີ້ເວລາ] LT",nextDay:"[ມື້ອື່ນເວລາ] LT",nextWeek:"[ວັນ]dddd[ໜ້າເວລາ] LT",lastDay:"[ມື້ວານນີ້ເວລາ] LT",lastWeek:"[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT",sameElse:"L"},relativeTime:{future:"ອີກ %s",past:"%sຜ່ານມາ",s:"ບໍ່ເທົ່າໃດວິນາທີ",m:"1 ນາທີ",mm:"%d ນາທີ",h:"1 ຊົ່ວໂມງ",hh:"%d ຊົ່ວໂມງ",d:"1 ມື້",dd:"%d ມື້",M:"1 ເດືອນ",MM:"%d ເດືອນ",y:"1 ປີ",yy:"%d ປີ"},ordinalParse:/(ທີ່)\d{1,2}/,ordinal:function(e){return"ທີ່"+e}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e,t,a,n){return t?"kelios sekundės":n?"kelių sekundžių":"kelias sekundes"}function a(e,t,a,n){return t?s(a)[0]:n?s(a)[1]:s(a)[2]}function n(e){return e%10===0||e>10&&e<20}function s(e){return i[e].split("_")}function r(e,t,r,i){var d=e+" ";return 1===e?d+a(e,t,r[0],i):t?d+(n(e)?s(r)[1]:s(r)[0]):i?d+s(r)[1]:d+(n(e)?s(r)[1]:s(r)[2])}var i={m:"minutė_minutės_minutę",mm:"minutės_minučių_minutes",h:"valanda_valandos_valandą",hh:"valandos_valandų_valandas",d:"diena_dienos_dieną",dd:"dienos_dienų_dienas",M:"mėnuo_mėnesio_mėnesį",MM:"mėnesiai_mėnesių_mėnesius",y:"metai_metų_metus",yy:"metai_metų_metus"},d=e.defineLocale("lt",{months:{format:"sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"),standalone:"sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis".split("_"),isFormat:/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/},monthsShort:"sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),weekdays:{format:"sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį".split("_"),standalone:"sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split("_"),isFormat:/dddd HH:mm/},weekdaysShort:"Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),weekdaysMin:"S_P_A_T_K_Pn_Š".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY [m.] MMMM D [d.]",LLL:"YYYY [m.] MMMM D [d.], HH:mm [val.]",LLLL:"YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",l:"YYYY-MM-DD",ll:"YYYY [m.] MMMM D [d.]",lll:"YYYY [m.] MMMM D [d.], HH:mm [val.]",llll:"YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"},calendar:{sameDay:"[Šiandien] LT",nextDay:"[Rytoj] LT",nextWeek:"dddd LT",lastDay:"[Vakar] LT",lastWeek:"[Praėjusį] dddd LT",sameElse:"L"},relativeTime:{future:"po %s",past:"prieš %s",s:t,m:a,mm:r,h:a,hh:r,d:a,dd:r,M:a,MM:r,y:a,yy:r},ordinalParse:/\d{1,2}-oji/,ordinal:function(e){return e+"-oji"},week:{dow:1,doy:4}});return d})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e,t,a){return a?t%10===1&&t%100!==11?e[2]:e[3]:t%10===1&&t%100!==11?e[0]:e[1]}function a(e,a,n){return e+" "+t(r[n],e,a)}function n(e,a,n){return t(r[n],e,a)}function s(e,t){return t?"dažas sekundes":"dažām sekundēm"}var r={m:"minūtes_minūtēm_minūte_minūtes".split("_"),mm:"minūtes_minūtēm_minūte_minūtes".split("_"),h:"stundas_stundām_stunda_stundas".split("_"),hh:"stundas_stundām_stunda_stundas".split("_"),d:"dienas_dienām_diena_dienas".split("_"),dd:"dienas_dienām_diena_dienas".split("_"),M:"mēneša_mēnešiem_mēnesis_mēneši".split("_"),MM:"mēneša_mēnešiem_mēnesis_mēneši".split("_"),y:"gada_gadiem_gads_gadi".split("_"),yy:"gada_gadiem_gads_gadi".split("_")},i=e.defineLocale("lv",{months:"janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"),monthsShort:"jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"),weekdays:"svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"),weekdaysShort:"Sv_P_O_T_C_Pk_S".split("_"),weekdaysMin:"Sv_P_O_T_C_Pk_S".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY.",LL:"YYYY. [gada] D. MMMM",LLL:"YYYY. [gada] D. MMMM, HH:mm",LLLL:"YYYY. [gada] D. MMMM, dddd, HH:mm"},calendar:{sameDay:"[Šodien pulksten] LT",nextDay:"[Rīt pulksten] LT",nextWeek:"dddd [pulksten] LT",lastDay:"[Vakar pulksten] LT",lastWeek:"[Pagājušā] dddd [pulksten] LT",sameElse:"L"},relativeTime:{future:"pēc %s",past:"pirms %s",s:s,m:n,mm:a,h:n,hh:a,d:n,dd:a,M:n,MM:a,y:n,yy:a},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return i})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t={words:{m:["jedan minut","jednog minuta"],mm:["minut","minuta","minuta"],h:["jedan sat","jednog sata"],hh:["sat","sata","sati"],dd:["dan","dana","dana"],MM:["mjesec","mjeseca","mjeseci"],yy:["godina","godine","godina"]},correctGrammaticalCase:function(e,t){return 1===e?t[0]:e>=2&&e<=4?t[1]:t[2]},translate:function(e,a,n){var s=t.words[n];return 1===n.length?a?s[0]:s[1]:e+" "+t.correctGrammaticalCase(e,s)}},a=e.defineLocale("me",{months:"januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),monthsShort:"jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sjutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[juče u] LT",lastWeek:function(){var e=["[prošle] [nedjelje] [u] LT","[prošlog] [ponedjeljka] [u] LT","[prošlog] [utorka] [u] LT","[prošle] [srijede] [u] LT","[prošlog] [četvrtka] [u] LT","[prošlog] [petka] [u] LT","[prošle] [subote] [u] LT"];return e[this.day()]},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"nekoliko sekundi",m:t.translate,mm:t.translate,h:t.translate,hh:t.translate,d:"dan",dd:t.translate,M:"mjesec",MM:t.translate,y:"godinu",yy:t.translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});return a})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("mi",{months:"Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea".split("_"),monthsShort:"Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki".split("_"),monthsRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,monthsStrictRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,monthsShortRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,monthsShortStrictRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,weekdays:"Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei".split("_"),weekdaysShort:"Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"),weekdaysMin:"Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [i] HH:mm",LLLL:"dddd, D MMMM YYYY [i] HH:mm"},calendar:{sameDay:"[i teie mahana, i] LT",nextDay:"[apopo i] LT",nextWeek:"dddd [i] LT",lastDay:"[inanahi i] LT",lastWeek:"dddd [whakamutunga i] LT",sameElse:"L"},relativeTime:{future:"i roto i %s",past:"%s i mua",s:"te hēkona ruarua",m:"he meneti",mm:"%d meneti",h:"te haora",hh:"%d haora",d:"he ra",dd:"%d ra",M:"he marama",MM:"%d marama",y:"he tau",yy:"%d tau"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("mk",{months:"јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември".split("_"),monthsShort:"јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек".split("_"),weekdays:"недела_понеделник_вторник_среда_четврток_петок_сабота".split("_"),weekdaysShort:"нед_пон_вто_сре_чет_пет_саб".split("_"),weekdaysMin:"нe_пo_вт_ср_че_пе_сa".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[Денес во] LT",nextDay:"[Утре во] LT",nextWeek:"[Во] dddd [во] LT",lastDay:"[Вчера во] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[Изминатата] dddd [во] LT";case 1:case 2:case 4:case 5:return"[Изминатиот] dddd [во] LT"}},sameElse:"L"},relativeTime:{future:"после %s",past:"пред %s",s:"неколку секунди",m:"минута",mm:"%d минути",h:"час",hh:"%d часа",d:"ден",dd:"%d дена",M:"месец",MM:"%d месеци",y:"година",yy:"%d години"},ordinalParse:/\d{1,2}-(ев|ен|ти|ви|ри|ми)/,ordinal:function(e){var t=e%10,a=e%100;return 0===e?e+"-ев":0===a?e+"-ен":a>10&&a<20?e+"-ти":1===t?e+"-ви":2===t?e+"-ри":7===t||8===t?e+"-ми":e+"-ти"},week:{dow:1,doy:7}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("ml",{months:"ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ".split("_"),monthsShort:"ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.".split("_"),monthsParseExact:!0,weekdays:"ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച".split("_"),weekdaysShort:"ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി".split("_"),weekdaysMin:"ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ".split("_"),longDateFormat:{LT:"A h:mm -നു",LTS:"A h:mm:ss -നു",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm -നു",LLLL:"dddd, D MMMM YYYY, A h:mm -നു"},calendar:{sameDay:"[ഇന്ന്] LT",nextDay:"[നാളെ] LT",nextWeek:"dddd, LT",lastDay:"[ഇന്നലെ] LT",lastWeek:"[കഴിഞ്ഞ] dddd, LT",sameElse:"L"},relativeTime:{future:"%s കഴിഞ്ഞ്",past:"%s മുൻപ്",s:"അൽപ നിമിഷങ്ങൾ",m:"ഒരു മിനിറ്റ്",mm:"%d മിനിറ്റ്",h:"ഒരു മണിക്കൂർ",hh:"%d മണിക്കൂർ",d:"ഒരു ദിവസം",dd:"%d ദിവസം",M:"ഒരു മാസം",MM:"%d മാസം",y:"ഒരു വർഷം",yy:"%d വർഷം"},meridiemParse:/രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,meridiemHour:function(e,t){return 12===e&&(e=0),"രാത്രി"===t&&e>=4||"ഉച്ച കഴിഞ്ഞ്"===t||"വൈകുന്നേരം"===t?e+12:e},meridiem:function(e,t,a){return e<4?"രാത്രി":e<12?"രാവിലെ":e<17?"ഉച്ച കഴിഞ്ഞ്":e<20?"വൈകുന്നേരം":"രാത്രി"}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e,t,a,n){var s="";if(t)switch(a){case"s":s="काही सेकंद";break;case"m":s="एक मिनिट";break;case"mm":s="%d मिनिटे";break;case"h":s="एक तास";break;case"hh":s="%d तास";break;case"d":s="एक दिवस";break;case"dd":s="%d दिवस";break;case"M":s="एक महिना";break;case"MM":s="%d महिने";break;case"y":s="एक वर्ष";break;case"yy":s="%d वर्षे"}else switch(a){case"s":s="काही सेकंदां";break;case"m":s="एका मिनिटा";break;case"mm":s="%d मिनिटां";break;case"h":s="एका तासा";break;case"hh":s="%d तासां";break;case"d":s="एका दिवसा";break;case"dd":s="%d दिवसां";break;case"M":s="एका महिन्या";break;case"MM":s="%d महिन्यां";break;case"y":s="एका वर्षा";break;case"yy":s="%d वर्षां"}return s.replace(/%d/i,e)}var a={1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"},n={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"},s=e.defineLocale("mr",{months:"जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"),monthsShort:"जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"),monthsParseExact:!0,weekdays:"रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),weekdaysShort:"रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"),weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),longDateFormat:{LT:"A h:mm वाजता",LTS:"A h:mm:ss वाजता",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm वाजता",LLLL:"dddd, D MMMM YYYY, A h:mm वाजता"},calendar:{sameDay:"[आज] LT",nextDay:"[उद्या] LT",nextWeek:"dddd, LT",lastDay:"[काल] LT",lastWeek:"[मागील] dddd, LT",sameElse:"L"},relativeTime:{future:"%sमध्ये",past:"%sपूर्वी",s:t,m:t,mm:t,h:t,hh:t,d:t,dd:t,M:t,MM:t,y:t,yy:t},preparse:function(e){return e.replace(/[१२३४५६७८९०]/g,function(e){return n[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return a[e]})},meridiemParse:/रात्री|सकाळी|दुपारी|सायंकाळी/,meridiemHour:function(e,t){return 12===e&&(e=0),"रात्री"===t?e<4?e:e+12:"सकाळी"===t?e:"दुपारी"===t?e>=10?e:e+12:"सायंकाळी"===t?e+12:void 0},meridiem:function(e,t,a){return e<4?"रात्री":e<10?"सकाळी":e<17?"दुपारी":e<20?"सायंकाळी":"रात्री"},week:{dow:0,doy:6}});return s})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("ms-my",{months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|tengahari|petang|malam/,meridiemHour:function(e,t){return 12===e&&(e=0),"pagi"===t?e:"tengahari"===t?e>=11?e:e+12:"petang"===t||"malam"===t?e+12:void 0},meridiem:function(e,t,a){return e<11?"pagi":e<15?"tengahari":e<19?"petang":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Esok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kelmarin pukul] LT",lastWeek:"dddd [lepas pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lepas",s:"beberapa saat",m:"seminit",mm:"%d minit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("ms",{months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|tengahari|petang|malam/,meridiemHour:function(e,t){return 12===e&&(e=0),"pagi"===t?e:"tengahari"===t?e>=11?e:e+12:"petang"===t||"malam"===t?e+12:void 0},meridiem:function(e,t,a){return e<11?"pagi":e<15?"tengahari":e<19?"petang":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Esok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kelmarin pukul] LT",lastWeek:"dddd [lepas pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lepas",s:"beberapa saat",m:"seminit",mm:"%d minit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t={1:"၁",2:"၂",3:"၃",4:"၄",5:"၅",6:"၆",7:"၇",8:"၈",9:"၉",0:"၀"},a={"၁":"1","၂":"2","၃":"3","၄":"4","၅":"5","၆":"6","၇":"7","၈":"8","၉":"9","၀":"0"},n=e.defineLocale("my",{months:"ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ".split("_"),monthsShort:"ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ".split("_"),weekdays:"တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ".split("_"),weekdaysShort:"နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),weekdaysMin:"နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[ယနေ.] LT [မှာ]",nextDay:"[မနက်ဖြန်] LT [မှာ]",nextWeek:"dddd LT [မှာ]",lastDay:"[မနေ.က] LT [မှာ]",lastWeek:"[ပြီးခဲ့သော] dddd LT [မှာ]",sameElse:"L"},relativeTime:{future:"လာမည့် %s မှာ",past:"လွန်ခဲ့သော %s က",s:"စက္ကန်.အနည်းငယ်",m:"တစ်မိနစ်",mm:"%d မိနစ်",h:"တစ်နာရီ",hh:"%d နာရီ",d:"တစ်ရက်",dd:"%d ရက်",M:"တစ်လ",MM:"%d လ",y:"တစ်နှစ်",yy:"%d နှစ်"},preparse:function(e){return e.replace(/[၁၂၃၄၅၆၇၈၉၀]/g,function(e){return a[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]})},week:{dow:1,doy:4}});return n})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("nb",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),monthsParseExact:!0,weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),weekdaysShort:"sø._ma._ti._on._to._fr._lø.".split("_"),weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] HH:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"},calendar:{sameDay:"[i dag kl.] LT",nextDay:"[i morgen kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[i går kl.] LT",lastWeek:"[forrige] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s siden",s:"noen sekunder",m:"ett minutt",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dager",M:"en måned",MM:"%d måneder",y:"ett år",yy:"%d år"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t={1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"},a={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"},n=e.defineLocale("ne",{months:"जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split("_"),monthsShort:"जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split("_"),monthsParseExact:!0,weekdays:"आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split("_"),weekdaysShort:"आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"),weekdaysMin:"आ._सो._मं._बु._बि._शु._श.".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"Aको h:mm बजे",LTS:"Aको h:mm:ss बजे",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, Aको h:mm बजे",LLLL:"dddd, D MMMM YYYY, Aको h:mm बजे"},preparse:function(e){return e.replace(/[१२३४५६७८९०]/g,function(e){return a[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]})},meridiemParse:/राति|बिहान|दिउँसो|साँझ/,meridiemHour:function(e,t){return 12===e&&(e=0),"राति"===t?e<4?e:e+12:"बिहान"===t?e:"दिउँसो"===t?e>=10?e:e+12:"साँझ"===t?e+12:void 0},meridiem:function(e,t,a){return e<3?"राति":e<12?"बिहान":e<16?"दिउँसो":e<20?"साँझ":"राति"},calendar:{sameDay:"[आज] LT",nextDay:"[भोलि] LT",nextWeek:"[आउँदो] dddd[,] LT",lastDay:"[हिजो] LT",lastWeek:"[गएको] dddd[,] LT",sameElse:"L"},relativeTime:{future:"%sमा",past:"%s अगाडि",s:"केही क्षण",m:"एक मिनेट",mm:"%d मिनेट",h:"एक घण्टा",hh:"%d घण्टा",d:"एक दिन",dd:"%d दिन",M:"एक महिना",MM:"%d महिना",y:"एक बर्ष",yy:"%d बर्ष"},week:{dow:0,doy:6}});return n})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t="jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),a="jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),n=[/^jan/i,/^feb/i,/^maart|mrt.?$/i,/^apr/i,/^mei$/i,/^jun[i.]?$/i,/^jul[i.]?$/i,/^aug/i,/^sep/i,/^okt/i,/^nov/i,/^dec/i],s=/^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,r=e.defineLocale("nl",{months:"januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),monthsShort:function(e,n){return/-MMM-/.test(n)?a[e.month()]:t[e.month()]},monthsRegex:s,monthsShortRegex:s,monthsStrictRegex:/^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,monthsShortStrictRegex:/^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,monthsParse:n,longMonthsParse:n,shortMonthsParse:n,weekdays:"zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),weekdaysShort:"zo._ma._di._wo._do._vr._za.".split("_"),weekdaysMin:"Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[vandaag om] LT",nextDay:"[morgen om] LT",nextWeek:"dddd [om] LT",lastDay:"[gisteren om] LT",lastWeek:"[afgelopen] dddd [om] LT",sameElse:"L"},relativeTime:{future:"over %s",past:"%s geleden",s:"een paar seconden",m:"één minuut",mm:"%d minuten",h:"één uur",hh:"%d uur",d:"één dag",dd:"%d dagen",M:"één maand",MM:"%d maanden",y:"één jaar",yy:"%d jaar"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(e){return e+(1===e||8===e||e>=20?"ste":"de")},week:{dow:1,doy:4}});return r})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("nn",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),weekdaysShort:"sun_mån_tys_ons_tor_fre_lau".split("_"),weekdaysMin:"su_må_ty_on_to_fr_lø".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] H:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"},calendar:{sameDay:"[I dag klokka] LT",nextDay:"[I morgon klokka] LT",nextWeek:"dddd [klokka] LT",lastDay:"[I går klokka] LT",lastWeek:"[Føregåande] dddd [klokka] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s sidan",s:"nokre sekund",m:"eit minutt",mm:"%d minutt",h:"ein time",hh:"%d timar",d:"ein dag",dd:"%d dagar",M:"ein månad",MM:"%d månader",y:"eit år",yy:"%d år"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t={1:"੧",2:"੨",3:"੩",4:"੪",5:"੫",6:"੬",7:"੭",8:"੮",9:"੯",0:"੦"},a={"੧":"1","੨":"2","੩":"3","੪":"4","੫":"5","੬":"6","੭":"7","੮":"8","੯":"9","੦":"0"},n=e.defineLocale("pa-in",{months:"ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"),monthsShort:"ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"),weekdays:"ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ".split("_"),weekdaysShort:"ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"),weekdaysMin:"ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"),longDateFormat:{LT:"A h:mm ਵਜੇ",LTS:"A h:mm:ss ਵਜੇ",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm ਵਜੇ",LLLL:"dddd, D MMMM YYYY, A h:mm ਵਜੇ"},calendar:{sameDay:"[ਅਜ] LT",nextDay:"[ਕਲ] LT",nextWeek:"dddd, LT",lastDay:"[ਕਲ] LT",lastWeek:"[ਪਿਛਲੇ] dddd, LT",sameElse:"L"},relativeTime:{future:"%s ਵਿੱਚ",past:"%s ਪਿਛਲੇ",s:"ਕੁਝ ਸਕਿੰਟ",m:"ਇਕ ਮਿੰਟ",mm:"%d ਮਿੰਟ",h:"ਇੱਕ ਘੰਟਾ",hh:"%d ਘੰਟੇ",d:"ਇੱਕ ਦਿਨ",dd:"%d ਦਿਨ",M:"ਇੱਕ ਮਹੀਨਾ",MM:"%d ਮਹੀਨੇ",y:"ਇੱਕ ਸਾਲ",yy:"%d ਸਾਲ"},preparse:function(e){return e.replace(/[੧੨੩੪੫੬੭੮੯੦]/g,function(e){return a[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]})},meridiemParse:/ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,meridiemHour:function(e,t){return 12===e&&(e=0),"ਰਾਤ"===t?e<4?e:e+12:"ਸਵੇਰ"===t?e:"ਦੁਪਹਿਰ"===t?e>=10?e:e+12:"ਸ਼ਾਮ"===t?e+12:void 0},meridiem:function(e,t,a){return e<4?"ਰਾਤ":e<10?"ਸਵੇਰ":e<17?"ਦੁਪਹਿਰ":e<20?"ਸ਼ਾਮ":"ਰਾਤ"},week:{dow:0,doy:6}});return n})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e){return e%10<5&&e%10>1&&~~(e/10)%10!==1}function a(e,a,n){var s=e+" ";switch(n){case"m":return a?"minuta":"minutę";case"mm":return s+(t(e)?"minuty":"minut");case"h":return a?"godzina":"godzinę";case"hh":return s+(t(e)?"godziny":"godzin");case"MM":return s+(t(e)?"miesiące":"miesięcy");case"yy":return s+(t(e)?"lata":"lat")}}var n="styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"),s="stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_"),r=e.defineLocale("pl",{months:function(e,t){return""===t?"("+s[e.month()]+"|"+n[e.month()]+")":/D MMMM/.test(t)?s[e.month()]:n[e.month()]},monthsShort:"sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),weekdays:"niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),weekdaysShort:"nie_pon_wt_śr_czw_pt_sb".split("_"),weekdaysMin:"Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Dziś o] LT",nextDay:"[Jutro o] LT",nextWeek:"[W] dddd [o] LT",lastDay:"[Wczoraj o] LT",lastWeek:function(){switch(this.day()){case 0:return"[W zeszłą niedzielę o] LT";case 3:return"[W zeszłą środę o] LT";case 6:return"[W zeszłą sobotę o] LT";default:return"[W zeszły] dddd [o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"%s temu",s:"kilka sekund",m:a,mm:a,h:a,hh:a,d:"1 dzień",dd:"%d dni",M:"miesiąc",MM:a,y:"rok",yy:a},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return r})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("pt-br",{months:"Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),weekdaysMin:"Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY [às] HH:mm",LLLL:"dddd, D [de] MMMM [de] YYYY [às] HH:mm"},calendar:{sameDay:"[Hoje às] LT",nextDay:"[Amanhã às] LT",nextWeek:"dddd [às] LT",lastDay:"[Ontem às] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[Último] dddd [às] LT":"[Última] dddd [às] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"%s atrás",s:"poucos segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um mês",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinalParse:/\d{1,2}º/,ordinal:"%dº"});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("pt",{months:"Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),weekdaysMin:"Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY HH:mm",LLLL:"dddd, D [de] MMMM [de] YYYY HH:mm"},calendar:{sameDay:"[Hoje às] LT",nextDay:"[Amanhã às] LT",nextWeek:"dddd [às] LT",lastDay:"[Ontem às] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[Último] dddd [às] LT":"[Última] dddd [às] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"há %s",s:"segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um mês",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e,t,a){var n={mm:"minute",hh:"ore",dd:"zile",MM:"luni",yy:"ani"},s=" ";return(e%100>=20||e>=100&&e%100===0)&&(s=" de "),e+s+n[a]}var a=e.defineLocale("ro",{months:"ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),
	monthsShort:"ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"duminică_luni_marți_miercuri_joi_vineri_sâmbătă".split("_"),weekdaysShort:"Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),weekdaysMin:"Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[azi la] LT",nextDay:"[mâine la] LT",nextWeek:"dddd [la] LT",lastDay:"[ieri la] LT",lastWeek:"[fosta] dddd [la] LT",sameElse:"L"},relativeTime:{future:"peste %s",past:"%s în urmă",s:"câteva secunde",m:"un minut",mm:t,h:"o oră",hh:t,d:"o zi",dd:t,M:"o lună",MM:t,y:"un an",yy:t},week:{dow:1,doy:7}});return a})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e,t){var a=e.split("_");return t%10===1&&t%100!==11?a[0]:t%10>=2&&t%10<=4&&(t%100<10||t%100>=20)?a[1]:a[2]}function a(e,a,n){var s={mm:a?"минута_минуты_минут":"минуту_минуты_минут",hh:"час_часа_часов",dd:"день_дня_дней",MM:"месяц_месяца_месяцев",yy:"год_года_лет"};return"m"===n?a?"минута":"минуту":e+" "+t(s[n],+e)}var n=[/^янв/i,/^фев/i,/^мар/i,/^апр/i,/^ма[йя]/i,/^июн/i,/^июл/i,/^авг/i,/^сен/i,/^окт/i,/^ноя/i,/^дек/i],s=e.defineLocale("ru",{months:{format:"января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"),standalone:"январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_")},monthsShort:{format:"янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"),standalone:"янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_")},weekdays:{standalone:"воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),format:"воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_"),isFormat:/\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/},weekdaysShort:"вс_пн_вт_ср_чт_пт_сб".split("_"),weekdaysMin:"вс_пн_вт_ср_чт_пт_сб".split("_"),monthsParse:n,longMonthsParse:n,shortMonthsParse:n,monthsRegex:/^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,monthsShortRegex:/^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,monthsStrictRegex:/^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,monthsShortStrictRegex:/^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY г.",LLL:"D MMMM YYYY г., HH:mm",LLLL:"dddd, D MMMM YYYY г., HH:mm"},calendar:{sameDay:"[Сегодня в] LT",nextDay:"[Завтра в] LT",lastDay:"[Вчера в] LT",nextWeek:function(e){if(e.week()===this.week())return 2===this.day()?"[Во] dddd [в] LT":"[В] dddd [в] LT";switch(this.day()){case 0:return"[В следующее] dddd [в] LT";case 1:case 2:case 4:return"[В следующий] dddd [в] LT";case 3:case 5:case 6:return"[В следующую] dddd [в] LT"}},lastWeek:function(e){if(e.week()===this.week())return 2===this.day()?"[Во] dddd [в] LT":"[В] dddd [в] LT";switch(this.day()){case 0:return"[В прошлое] dddd [в] LT";case 1:case 2:case 4:return"[В прошлый] dddd [в] LT";case 3:case 5:case 6:return"[В прошлую] dddd [в] LT"}},sameElse:"L"},relativeTime:{future:"через %s",past:"%s назад",s:"несколько секунд",m:a,mm:a,h:"час",hh:a,d:"день",dd:a,M:"месяц",MM:a,y:"год",yy:a},meridiemParse:/ночи|утра|дня|вечера/i,isPM:function(e){return/^(дня|вечера)$/.test(e)},meridiem:function(e,t,a){return e<4?"ночи":e<12?"утра":e<17?"дня":"вечера"},ordinalParse:/\d{1,2}-(й|го|я)/,ordinal:function(e,t){switch(t){case"M":case"d":case"DDD":return e+"-й";case"D":return e+"-го";case"w":case"W":return e+"-я";default:return e}},week:{dow:1,doy:7}});return s})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("se",{months:"ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu".split("_"),monthsShort:"ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov".split("_"),weekdays:"sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat".split("_"),weekdaysShort:"sotn_vuos_maŋ_gask_duor_bear_láv".split("_"),weekdaysMin:"s_v_m_g_d_b_L".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"MMMM D. [b.] YYYY",LLL:"MMMM D. [b.] YYYY [ti.] HH:mm",LLLL:"dddd, MMMM D. [b.] YYYY [ti.] HH:mm"},calendar:{sameDay:"[otne ti] LT",nextDay:"[ihttin ti] LT",nextWeek:"dddd [ti] LT",lastDay:"[ikte ti] LT",lastWeek:"[ovddit] dddd [ti] LT",sameElse:"L"},relativeTime:{future:"%s geažes",past:"maŋit %s",s:"moadde sekunddat",m:"okta minuhta",mm:"%d minuhtat",h:"okta diimmu",hh:"%d diimmut",d:"okta beaivi",dd:"%d beaivvit",M:"okta mánnu",MM:"%d mánut",y:"okta jahki",yy:"%d jagit"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("si",{months:"ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්".split("_"),monthsShort:"ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ".split("_"),weekdays:"ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා".split("_"),weekdaysShort:"ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන".split("_"),weekdaysMin:"ඉ_ස_අ_බ_බ්‍ර_සි_සෙ".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"a h:mm",LTS:"a h:mm:ss",L:"YYYY/MM/DD",LL:"YYYY MMMM D",LLL:"YYYY MMMM D, a h:mm",LLLL:"YYYY MMMM D [වැනි] dddd, a h:mm:ss"},calendar:{sameDay:"[අද] LT[ට]",nextDay:"[හෙට] LT[ට]",nextWeek:"dddd LT[ට]",lastDay:"[ඊයේ] LT[ට]",lastWeek:"[පසුගිය] dddd LT[ට]",sameElse:"L"},relativeTime:{future:"%sකින්",past:"%sකට පෙර",s:"තත්පර කිහිපය",m:"මිනිත්තුව",mm:"මිනිත්තු %d",h:"පැය",hh:"පැය %d",d:"දිනය",dd:"දින %d",M:"මාසය",MM:"මාස %d",y:"වසර",yy:"වසර %d"},ordinalParse:/\d{1,2} වැනි/,ordinal:function(e){return e+" වැනි"},meridiemParse:/පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,isPM:function(e){return"ප.ව."===e||"පස් වරු"===e},meridiem:function(e,t,a){return e>11?a?"ප.ව.":"පස් වරු":a?"පෙ.ව.":"පෙර වරු"}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e){return e>1&&e<5}function a(e,a,n,s){var r=e+" ";switch(n){case"s":return a||s?"pár sekúnd":"pár sekundami";case"m":return a?"minúta":s?"minútu":"minútou";case"mm":return a||s?r+(t(e)?"minúty":"minút"):r+"minútami";case"h":return a?"hodina":s?"hodinu":"hodinou";case"hh":return a||s?r+(t(e)?"hodiny":"hodín"):r+"hodinami";case"d":return a||s?"deň":"dňom";case"dd":return a||s?r+(t(e)?"dni":"dní"):r+"dňami";case"M":return a||s?"mesiac":"mesiacom";case"MM":return a||s?r+(t(e)?"mesiace":"mesiacov"):r+"mesiacmi";case"y":return a||s?"rok":"rokom";case"yy":return a||s?r+(t(e)?"roky":"rokov"):r+"rokmi"}}var n="január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"),s="jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_"),r=e.defineLocale("sk",{months:n,monthsShort:s,weekdays:"nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),weekdaysShort:"ne_po_ut_st_št_pi_so".split("_"),weekdaysMin:"ne_po_ut_st_št_pi_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm"},calendar:{sameDay:"[dnes o] LT",nextDay:"[zajtra o] LT",nextWeek:function(){switch(this.day()){case 0:return"[v nedeľu o] LT";case 1:case 2:return"[v] dddd [o] LT";case 3:return"[v stredu o] LT";case 4:return"[vo štvrtok o] LT";case 5:return"[v piatok o] LT";case 6:return"[v sobotu o] LT"}},lastDay:"[včera o] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulú nedeľu o] LT";case 1:case 2:return"[minulý] dddd [o] LT";case 3:return"[minulú stredu o] LT";case 4:case 5:return"[minulý] dddd [o] LT";case 6:return"[minulú sobotu o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"pred %s",s:a,m:a,mm:a,h:a,hh:a,d:a,dd:a,M:a,MM:a,y:a,yy:a},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return r})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e,t,a,n){var s=e+" ";switch(a){case"s":return t||n?"nekaj sekund":"nekaj sekundami";case"m":return t?"ena minuta":"eno minuto";case"mm":return s+=1===e?t?"minuta":"minuto":2===e?t||n?"minuti":"minutama":e<5?t||n?"minute":"minutami":t||n?"minut":"minutami";case"h":return t?"ena ura":"eno uro";case"hh":return s+=1===e?t?"ura":"uro":2===e?t||n?"uri":"urama":e<5?t||n?"ure":"urami":t||n?"ur":"urami";case"d":return t||n?"en dan":"enim dnem";case"dd":return s+=1===e?t||n?"dan":"dnem":2===e?t||n?"dni":"dnevoma":t||n?"dni":"dnevi";case"M":return t||n?"en mesec":"enim mesecem";case"MM":return s+=1===e?t||n?"mesec":"mesecem":2===e?t||n?"meseca":"mesecema":e<5?t||n?"mesece":"meseci":t||n?"mesecev":"meseci";case"y":return t||n?"eno leto":"enim letom";case"yy":return s+=1===e?t||n?"leto":"letom":2===e?t||n?"leti":"letoma":e<5?t||n?"leta":"leti":t||n?"let":"leti"}}var a=e.defineLocale("sl",{months:"januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),weekdaysShort:"ned._pon._tor._sre._čet._pet._sob.".split("_"),weekdaysMin:"ne_po_to_sr_če_pe_so".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danes ob] LT",nextDay:"[jutri ob] LT",nextWeek:function(){switch(this.day()){case 0:return"[v] [nedeljo] [ob] LT";case 3:return"[v] [sredo] [ob] LT";case 6:return"[v] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[v] dddd [ob] LT"}},lastDay:"[včeraj ob] LT",lastWeek:function(){switch(this.day()){case 0:return"[prejšnjo] [nedeljo] [ob] LT";case 3:return"[prejšnjo] [sredo] [ob] LT";case 6:return"[prejšnjo] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[prejšnji] dddd [ob] LT"}},sameElse:"L"},relativeTime:{future:"čez %s",past:"pred %s",s:t,m:t,mm:t,h:t,hh:t,d:t,dd:t,M:t,MM:t,y:t,yy:t},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});return a})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("sq",{months:"Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"),monthsShort:"Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),weekdays:"E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split("_"),weekdaysShort:"Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),weekdaysMin:"D_H_Ma_Më_E_P_Sh".split("_"),weekdaysParseExact:!0,meridiemParse:/PD|MD/,isPM:function(e){return"M"===e.charAt(0)},meridiem:function(e,t,a){return e<12?"PD":"MD"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Sot në] LT",nextDay:"[Nesër në] LT",nextWeek:"dddd [në] LT",lastDay:"[Dje në] LT",lastWeek:"dddd [e kaluar në] LT",sameElse:"L"},relativeTime:{future:"në %s",past:"%s më parë",s:"disa sekonda",m:"një minutë",mm:"%d minuta",h:"një orë",hh:"%d orë",d:"një ditë",dd:"%d ditë",M:"një muaj",MM:"%d muaj",y:"një vit",yy:"%d vite"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t={words:{m:["један минут","једне минуте"],mm:["минут","минуте","минута"],h:["један сат","једног сата"],hh:["сат","сата","сати"],dd:["дан","дана","дана"],MM:["месец","месеца","месеци"],yy:["година","године","година"]},correctGrammaticalCase:function(e,t){return 1===e?t[0]:e>=2&&e<=4?t[1]:t[2]},translate:function(e,a,n){var s=t.words[n];return 1===n.length?a?s[0]:s[1]:e+" "+t.correctGrammaticalCase(e,s)}},a=e.defineLocale("sr-cyrl",{months:"јануар_фебруар_март_април_мај_јун_јул_август_септембар_октобар_новембар_децембар".split("_"),monthsShort:"јан._феб._мар._апр._мај_јун_јул_авг._сеп._окт._нов._дец.".split("_"),monthsParseExact:!0,weekdays:"недеља_понедељак_уторак_среда_четвртак_петак_субота".split("_"),weekdaysShort:"нед._пон._уто._сре._чет._пет._суб.".split("_"),weekdaysMin:"не_по_ут_ср_че_пе_су".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[данас у] LT",nextDay:"[сутра у] LT",nextWeek:function(){switch(this.day()){case 0:return"[у] [недељу] [у] LT";case 3:return"[у] [среду] [у] LT";case 6:return"[у] [суботу] [у] LT";case 1:case 2:case 4:case 5:return"[у] dddd [у] LT"}},lastDay:"[јуче у] LT",lastWeek:function(){var e=["[прошле] [недеље] [у] LT","[прошлог] [понедељка] [у] LT","[прошлог] [уторка] [у] LT","[прошле] [среде] [у] LT","[прошлог] [четвртка] [у] LT","[прошлог] [петка] [у] LT","[прошле] [суботе] [у] LT"];return e[this.day()]},sameElse:"L"},relativeTime:{future:"за %s",past:"пре %s",s:"неколико секунди",m:t.translate,mm:t.translate,h:t.translate,hh:t.translate,d:"дан",dd:t.translate,M:"месец",MM:t.translate,y:"годину",yy:t.translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});return a})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t={words:{m:["jedan minut","jedne minute"],mm:["minut","minute","minuta"],h:["jedan sat","jednog sata"],hh:["sat","sata","sati"],dd:["dan","dana","dana"],MM:["mesec","meseca","meseci"],yy:["godina","godine","godina"]},correctGrammaticalCase:function(e,t){return 1===e?t[0]:e>=2&&e<=4?t[1]:t[2]},translate:function(e,a,n){var s=t.words[n];return 1===n.length?a?s[0]:s[1]:e+" "+t.correctGrammaticalCase(e,s)}},a=e.defineLocale("sr",{months:"januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),monthsShort:"jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sre._čet._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedelju] [u] LT";case 3:return"[u] [sredu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[juče u] LT",lastWeek:function(){var e=["[prošle] [nedelje] [u] LT","[prošlog] [ponedeljka] [u] LT","[prošlog] [utorka] [u] LT","[prošle] [srede] [u] LT","[prošlog] [četvrtka] [u] LT","[prošlog] [petka] [u] LT","[prošle] [subote] [u] LT"];return e[this.day()]},sameElse:"L"},relativeTime:{future:"za %s",past:"pre %s",s:"nekoliko sekundi",m:t.translate,mm:t.translate,h:t.translate,hh:t.translate,d:"dan",dd:t.translate,M:"mesec",MM:t.translate,y:"godinu",yy:t.translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});return a})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("ss",{months:"Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split("_"),monthsShort:"Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo".split("_"),weekdays:"Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo".split("_"),weekdaysShort:"Lis_Umb_Lsb_Les_Lsi_Lsh_Umg".split("_"),weekdaysMin:"Li_Us_Lb_Lt_Ls_Lh_Ug".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Namuhla nga] LT",nextDay:"[Kusasa nga] LT",nextWeek:"dddd [nga] LT",lastDay:"[Itolo nga] LT",lastWeek:"dddd [leliphelile] [nga] LT",sameElse:"L"},relativeTime:{future:"nga %s",past:"wenteka nga %s",s:"emizuzwana lomcane",m:"umzuzu",mm:"%d emizuzu",h:"lihora",hh:"%d emahora",d:"lilanga",dd:"%d emalanga",M:"inyanga",MM:"%d tinyanga",y:"umnyaka",yy:"%d iminyaka"},meridiemParse:/ekuseni|emini|entsambama|ebusuku/,meridiem:function(e,t,a){return e<11?"ekuseni":e<15?"emini":e<19?"entsambama":"ebusuku"},meridiemHour:function(e,t){return 12===e&&(e=0),"ekuseni"===t?e:"emini"===t?e>=11?e:e+12:"entsambama"===t||"ebusuku"===t?0===e?0:e+12:void 0},ordinalParse:/\d{1,2}/,ordinal:"%d",week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("sv",{months:"januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),weekdaysShort:"sön_mån_tis_ons_tor_fre_lör".split("_"),weekdaysMin:"sö_må_ti_on_to_fr_lö".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [kl.] HH:mm",LLLL:"dddd D MMMM YYYY [kl.] HH:mm",lll:"D MMM YYYY HH:mm",llll:"ddd D MMM YYYY HH:mm"},calendar:{sameDay:"[Idag] LT",nextDay:"[Imorgon] LT",lastDay:"[Igår] LT",nextWeek:"[På] dddd LT",lastWeek:"[I] dddd[s] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"för %s sedan",s:"några sekunder",m:"en minut",mm:"%d minuter",h:"en timme",hh:"%d timmar",d:"en dag",dd:"%d dagar",M:"en månad",MM:"%d månader",y:"ett år",yy:"%d år"},ordinalParse:/\d{1,2}(e|a)/,ordinal:function(e){var t=e%10,a=1===~~(e%100/10)?"e":1===t?"a":2===t?"a":"e";return e+a},week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("sw",{months:"Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"),weekdays:"Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split("_"),weekdaysShort:"Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"),weekdaysMin:"J2_J3_J4_J5_Al_Ij_J1".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[leo saa] LT",nextDay:"[kesho saa] LT",nextWeek:"[wiki ijayo] dddd [saat] LT",lastDay:"[jana] LT",lastWeek:"[wiki iliyopita] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s baadaye",past:"tokea %s",s:"hivi punde",m:"dakika moja",mm:"dakika %d",h:"saa limoja",hh:"masaa %d",d:"siku moja",dd:"masiku %d",M:"mwezi mmoja",MM:"miezi %d",y:"mwaka mmoja",yy:"miaka %d"},week:{dow:1,doy:7}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t={1:"௧",2:"௨",3:"௩",4:"௪",5:"௫",6:"௬",7:"௭",8:"௮",9:"௯",0:"௦"},a={"௧":"1","௨":"2","௩":"3","௪":"4","௫":"5","௬":"6","௭":"7","௮":"8","௯":"9","௦":"0"},n=e.defineLocale("ta",{months:"ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),monthsShort:"ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),weekdays:"ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை".split("_"),weekdaysShort:"ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி".split("_"),weekdaysMin:"ஞா_தி_செ_பு_வி_வெ_ச".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, HH:mm",LLLL:"dddd, D MMMM YYYY, HH:mm"},calendar:{sameDay:"[இன்று] LT",nextDay:"[நாளை] LT",nextWeek:"dddd, LT",lastDay:"[நேற்று] LT",lastWeek:"[கடந்த வாரம்] dddd, LT",sameElse:"L"},relativeTime:{future:"%s இல்",past:"%s முன்",s:"ஒரு சில விநாடிகள்",m:"ஒரு நிமிடம்",mm:"%d நிமிடங்கள்",h:"ஒரு மணி நேரம்",hh:"%d மணி நேரம்",d:"ஒரு நாள்",dd:"%d நாட்கள்",M:"ஒரு மாதம்",MM:"%d மாதங்கள்",y:"ஒரு வருடம்",yy:"%d ஆண்டுகள்"},ordinalParse:/\d{1,2}வது/,ordinal:function(e){return e+"வது"},preparse:function(e){return e.replace(/[௧௨௩௪௫௬௭௮௯௦]/g,function(e){return a[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]})},meridiemParse:/யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,meridiem:function(e,t,a){return e<2?" யாமம்":e<6?" வைகறை":e<10?" காலை":e<14?" நண்பகல்":e<18?" எற்பாடு":e<22?" மாலை":" யாமம்"},meridiemHour:function(e,t){return 12===e&&(e=0),"யாமம்"===t?e<2?e:e+12:"வைகறை"===t||"காலை"===t?e:"நண்பகல்"===t&&e>=10?e:e+12},week:{dow:0,doy:6}});return n})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("te",{months:"జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జూలై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్".split("_"),monthsShort:"జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జూలై_ఆగ._సెప్._అక్టో._నవ._డిసె.".split("_"),monthsParseExact:!0,weekdays:"ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం".split("_"),weekdaysShort:"ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని".split("_"),weekdaysMin:"ఆ_సో_మం_బు_గు_శు_శ".split("_"),longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm",LLLL:"dddd, D MMMM YYYY, A h:mm"},calendar:{sameDay:"[నేడు] LT",nextDay:"[రేపు] LT",nextWeek:"dddd, LT",lastDay:"[నిన్న] LT",lastWeek:"[గత] dddd, LT",sameElse:"L"},relativeTime:{future:"%s లో",past:"%s క్రితం",s:"కొన్ని క్షణాలు",m:"ఒక నిమిషం",mm:"%d నిమిషాలు",h:"ఒక గంట",hh:"%d గంటలు",d:"ఒక రోజు",dd:"%d రోజులు",M:"ఒక నెల",MM:"%d నెలలు",y:"ఒక సంవత్సరం",yy:"%d సంవత్సరాలు"},ordinalParse:/\d{1,2}వ/,ordinal:"%dవ",meridiemParse:/రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,meridiemHour:function(e,t){return 12===e&&(e=0),"రాత్రి"===t?e<4?e:e+12:"ఉదయం"===t?e:"మధ్యాహ్నం"===t?e>=10?e:e+12:"సాయంత్రం"===t?e+12:void 0},meridiem:function(e,t,a){return e<4?"రాత్రి":e<10?"ఉదయం":e<17?"మధ్యాహ్నం":e<20?"సాయంత్రం":"రాత్రి"},week:{dow:0,doy:6}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("th",{months:"มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"),monthsShort:"ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.".split("_"),monthsParseExact:!0,weekdays:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"),weekdaysShort:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split("_"),weekdaysMin:"อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"YYYY/MM/DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY เวลา H:mm",LLLL:"วันddddที่ D MMMM YYYY เวลา H:mm"},meridiemParse:/ก่อนเที่ยง|หลังเที่ยง/,isPM:function(e){return"หลังเที่ยง"===e},meridiem:function(e,t,a){return e<12?"ก่อนเที่ยง":"หลังเที่ยง"},calendar:{sameDay:"[วันนี้ เวลา] LT",nextDay:"[พรุ่งนี้ เวลา] LT",nextWeek:"dddd[หน้า เวลา] LT",lastDay:"[เมื่อวานนี้ เวลา] LT",lastWeek:"[วัน]dddd[ที่แล้ว เวลา] LT",sameElse:"L"},relativeTime:{future:"อีก %s",past:"%sที่แล้ว",s:"ไม่กี่วินาที",m:"1 นาที",mm:"%d นาที",h:"1 ชั่วโมง",hh:"%d ชั่วโมง",d:"1 วัน",dd:"%d วัน",M:"1 เดือน",MM:"%d เดือน",y:"1 ปี",yy:"%d ปี"}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("tl-ph",{months:"Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),monthsShort:"Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),weekdays:"Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),weekdaysShort:"Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),weekdaysMin:"Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"MM/D/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY HH:mm",LLLL:"dddd, MMMM DD, YYYY HH:mm"},calendar:{sameDay:"[Ngayon sa] LT",nextDay:"[Bukas sa] LT",nextWeek:"dddd [sa] LT",lastDay:"[Kahapon sa] LT",lastWeek:"dddd [huling linggo] LT",sameElse:"L"},relativeTime:{future:"sa loob ng %s",past:"%s ang nakalipas",s:"ilang segundo",m:"isang minuto",mm:"%d minuto",h:"isang oras",hh:"%d oras",d:"isang araw",dd:"%d araw",M:"isang buwan",MM:"%d buwan",y:"isang taon",yy:"%d taon"},ordinalParse:/\d{1,2}/,ordinal:function(e){return e},week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e){var t=e;return t=e.indexOf("jaj")!==-1?t.slice(0,-3)+"leS":e.indexOf("jar")!==-1?t.slice(0,-3)+"waQ":e.indexOf("DIS")!==-1?t.slice(0,-3)+"nem":t+" pIq"}function a(e){var t=e;return t=e.indexOf("jaj")!==-1?t.slice(0,-3)+"Hu’":e.indexOf("jar")!==-1?t.slice(0,-3)+"wen":e.indexOf("DIS")!==-1?t.slice(0,-3)+"ben":t+" ret"}function n(e,t,a,n){var r=s(e);switch(a){case"mm":return r+" tup";case"hh":return r+" rep";case"dd":return r+" jaj";case"MM":return r+" jar";case"yy":return r+" DIS"}}function s(e){var t=Math.floor(e%1e3/100),a=Math.floor(e%100/10),n=e%10,s="";return t>0&&(s+=r[t]+"vatlh"),a>0&&(s+=(""!==s?" ":"")+r[a]+"maH"),n>0&&(s+=(""!==s?" ":"")+r[n]),""===s?"pagh":s}var r="pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut".split("_"),i=e.defineLocale("tlh",{months:"tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’".split("_"),monthsShort:"jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’".split("_"),monthsParseExact:!0,weekdays:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),weekdaysShort:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),weekdaysMin:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[DaHjaj] LT",nextDay:"[wa’leS] LT",nextWeek:"LLL",lastDay:"[wa’Hu’] LT",lastWeek:"LLL",sameElse:"L"},relativeTime:{future:t,past:a,s:"puS lup",m:"wa’ tup",mm:n,h:"wa’ rep",hh:n,d:"wa’ jaj",dd:n,M:"wa’ jar",MM:n,y:"wa’ DIS",yy:n},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return i})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t={1:"'inci",5:"'inci",8:"'inci",70:"'inci",80:"'inci",2:"'nci",7:"'nci",20:"'nci",50:"'nci",3:"'üncü",4:"'üncü",100:"'üncü",6:"'ncı",9:"'uncu",10:"'uncu",30:"'uncu",60:"'ıncı",90:"'ıncı"},a=e.defineLocale("tr",{months:"Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),monthsShort:"Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),weekdays:"Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),weekdaysShort:"Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),weekdaysMin:"Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[bugün saat] LT",nextDay:"[yarın saat] LT",nextWeek:"[haftaya] dddd [saat] LT",lastDay:"[dün] LT",lastWeek:"[geçen hafta] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s önce",s:"birkaç saniye",m:"bir dakika",mm:"%d dakika",h:"bir saat",hh:"%d saat",d:"bir gün",dd:"%d gün",M:"bir ay",MM:"%d ay",y:"bir yıl",yy:"%d yıl"},ordinalParse:/\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,ordinal:function(e){if(0===e)return e+"'ıncı";var a=e%10,n=e%100-a,s=e>=100?100:null;return e+(t[a]||t[n]||t[s])},week:{dow:1,doy:7}});return a})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e,t,a,n){var s={s:["viensas secunds","'iensas secunds"],m:["'n míut","'iens míut"],mm:[e+" míuts",""+e+" míuts"],h:["'n þora","'iensa þora"],hh:[e+" þoras",""+e+" þoras"],d:["'n ziua","'iensa ziua"],dd:[e+" ziuas",""+e+" ziuas"],M:["'n mes","'iens mes"],MM:[e+" mesen",""+e+" mesen"],y:["'n ar","'iens ar"],yy:[e+" ars",""+e+" ars"]};return n?s[a][0]:t?s[a][0]:s[a][1]}var a=e.defineLocale("tzl",{months:"Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar".split("_"),monthsShort:"Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec".split("_"),weekdays:"Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi".split("_"),weekdaysShort:"Súl_Lún_Mai_Már_Xhú_Vié_Sát".split("_"),weekdaysMin:"Sú_Lú_Ma_Má_Xh_Vi_Sá".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"D. MMMM [dallas] YYYY",LLL:"D. MMMM [dallas] YYYY HH.mm",LLLL:"dddd, [li] D. MMMM [dallas] YYYY HH.mm"},meridiemParse:/d\'o|d\'a/i,isPM:function(e){return"d'o"===e.toLowerCase()},meridiem:function(e,t,a){return e>11?a?"d'o":"D'O":a?"d'a":"D'A"},calendar:{sameDay:"[oxhi à] LT",nextDay:"[demà à] LT",nextWeek:"dddd [à] LT",lastDay:"[ieiri à] LT",lastWeek:"[sür el] dddd [lasteu à] LT",sameElse:"L"},relativeTime:{future:"osprei %s",past:"ja%s",s:t,m:t,mm:t,h:t,hh:t,d:t,dd:t,M:t,MM:t,y:t,yy:t},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return a})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("tzm-latn",{months:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),monthsShort:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),weekdays:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),weekdaysShort:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),weekdaysMin:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[asdkh g] LT",nextDay:"[aska g] LT",nextWeek:"dddd [g] LT",lastDay:"[assant g] LT",lastWeek:"dddd [g] LT",sameElse:"L"},relativeTime:{future:"dadkh s yan %s",past:"yan %s",s:"imik",m:"minuḍ",mm:"%d minuḍ",h:"saɛa",hh:"%d tassaɛin",d:"ass",dd:"%d ossan",M:"ayowr",MM:"%d iyyirn",y:"asgas",yy:"%d isgasn"},week:{dow:6,doy:12}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("tzm",{months:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),monthsShort:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),weekdays:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),weekdaysShort:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),weekdaysMin:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[ⴰⵙⴷⵅ ⴴ] LT",nextDay:"[ⴰⵙⴽⴰ ⴴ] LT",nextWeek:"dddd [ⴴ] LT",lastDay:"[ⴰⵚⴰⵏⵜ ⴴ] LT",lastWeek:"dddd [ⴴ] LT",sameElse:"L"},relativeTime:{future:"ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s",past:"ⵢⴰⵏ %s",s:"ⵉⵎⵉⴽ",m:"ⵎⵉⵏⵓⴺ",mm:"%d ⵎⵉⵏⵓⴺ",h:"ⵙⴰⵄⴰ",hh:"%d ⵜⴰⵙⵙⴰⵄⵉⵏ",d:"ⴰⵙⵙ",dd:"%d oⵙⵙⴰⵏ",M:"ⴰⵢoⵓⵔ",MM:"%d ⵉⵢⵢⵉⵔⵏ",y:"ⴰⵙⴳⴰⵙ",yy:"%d ⵉⵙⴳⴰⵙⵏ"},week:{dow:6,doy:12}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";function t(e,t){var a=e.split("_");return t%10===1&&t%100!==11?a[0]:t%10>=2&&t%10<=4&&(t%100<10||t%100>=20)?a[1]:a[2]}function a(e,a,n){var s={mm:a?"хвилина_хвилини_хвилин":"хвилину_хвилини_хвилин",hh:a?"година_години_годин":"годину_години_годин",dd:"день_дні_днів",MM:"місяць_місяці_місяців",yy:"рік_роки_років"};return"m"===n?a?"хвилина":"хвилину":"h"===n?a?"година":"годину":e+" "+t(s[n],+e)}function n(e,t){var a={nominative:"неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),accusative:"неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"),genitive:"неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split("_")},n=/(\[[ВвУу]\]) ?dddd/.test(t)?"accusative":/\[?(?:минулої|наступної)? ?\] ?dddd/.test(t)?"genitive":"nominative";return a[n][e.day()]}function s(e){return function(){return e+"о"+(11===this.hours()?"б":"")+"] LT"}}var r=e.defineLocale("uk",{months:{format:"січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_"),
	standalone:"січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_")},monthsShort:"січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),weekdays:n,weekdaysShort:"нд_пн_вт_ср_чт_пт_сб".split("_"),weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY р.",LLL:"D MMMM YYYY р., HH:mm",LLLL:"dddd, D MMMM YYYY р., HH:mm"},calendar:{sameDay:s("[Сьогодні "),nextDay:s("[Завтра "),lastDay:s("[Вчора "),nextWeek:s("[У] dddd ["),lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return s("[Минулої] dddd [").call(this);case 1:case 2:case 4:return s("[Минулого] dddd [").call(this)}},sameElse:"L"},relativeTime:{future:"за %s",past:"%s тому",s:"декілька секунд",m:a,mm:a,h:"годину",hh:a,d:"день",dd:a,M:"місяць",MM:a,y:"рік",yy:a},meridiemParse:/ночі|ранку|дня|вечора/,isPM:function(e){return/^(дня|вечора)$/.test(e)},meridiem:function(e,t,a){return e<4?"ночі":e<12?"ранку":e<17?"дня":"вечора"},ordinalParse:/\d{1,2}-(й|го)/,ordinal:function(e,t){switch(t){case"M":case"d":case"DDD":case"w":case"W":return e+"-й";case"D":return e+"-го";default:return e}},week:{dow:1,doy:7}});return r})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("uz",{months:"январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split("_"),monthsShort:"янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),weekdays:"Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"),weekdaysShort:"Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"),weekdaysMin:"Як_Ду_Се_Чо_Па_Жу_Ша".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"D MMMM YYYY, dddd HH:mm"},calendar:{sameDay:"[Бугун соат] LT [да]",nextDay:"[Эртага] LT [да]",nextWeek:"dddd [куни соат] LT [да]",lastDay:"[Кеча соат] LT [да]",lastWeek:"[Утган] dddd [куни соат] LT [да]",sameElse:"L"},relativeTime:{future:"Якин %s ичида",past:"Бир неча %s олдин",s:"фурсат",m:"бир дакика",mm:"%d дакика",h:"бир соат",hh:"%d соат",d:"бир кун",dd:"%d кун",M:"бир ой",MM:"%d ой",y:"бир йил",yy:"%d йил"},week:{dow:1,doy:7}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("vi",{months:"tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"),monthsShort:"Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),monthsParseExact:!0,weekdays:"chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),weekdaysShort:"CN_T2_T3_T4_T5_T6_T7".split("_"),weekdaysMin:"CN_T2_T3_T4_T5_T6_T7".split("_"),weekdaysParseExact:!0,meridiemParse:/sa|ch/i,isPM:function(e){return/^ch$/i.test(e)},meridiem:function(e,t,a){return e<12?a?"sa":"SA":a?"ch":"CH"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM [năm] YYYY",LLL:"D MMMM [năm] YYYY HH:mm",LLLL:"dddd, D MMMM [năm] YYYY HH:mm",l:"DD/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY HH:mm",llll:"ddd, D MMM YYYY HH:mm"},calendar:{sameDay:"[Hôm nay lúc] LT",nextDay:"[Ngày mai lúc] LT",nextWeek:"dddd [tuần tới lúc] LT",lastDay:"[Hôm qua lúc] LT",lastWeek:"dddd [tuần rồi lúc] LT",sameElse:"L"},relativeTime:{future:"%s tới",past:"%s trước",s:"vài giây",m:"một phút",mm:"%d phút",h:"một giờ",hh:"%d giờ",d:"một ngày",dd:"%d ngày",M:"một tháng",MM:"%d tháng",y:"một năm",yy:"%d năm"},ordinalParse:/\d{1,2}/,ordinal:function(e){return e},week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("x-pseudo",{months:"J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér".split("_"),monthsShort:"J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc".split("_"),monthsParseExact:!0,weekdays:"S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý".split("_"),weekdaysShort:"S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát".split("_"),weekdaysMin:"S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[T~ódá~ý át] LT",nextDay:"[T~ómó~rró~w át] LT",nextWeek:"dddd [át] LT",lastDay:"[Ý~ést~érdá~ý át] LT",lastWeek:"[L~ást] dddd [át] LT",sameElse:"L"},relativeTime:{future:"í~ñ %s",past:"%s á~gó",s:"á ~féw ~sécó~ñds",m:"á ~míñ~úté",mm:"%d m~íñú~tés",h:"á~ñ hó~úr",hh:"%d h~óúrs",d:"á ~dáý",dd:"%d d~áýs",M:"á ~móñ~th",MM:"%d m~óñt~hs",y:"á ~ýéár",yy:"%d ý~éárs"},ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var t=e%10,a=1===~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+a},week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("zh-cn",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"Ah点mm分",LTS:"Ah点m分s秒",L:"YYYY-MM-DD",LL:"YYYY年MMMD日",LLL:"YYYY年MMMD日Ah点mm分",LLLL:"YYYY年MMMD日ddddAh点mm分",l:"YYYY-MM-DD",ll:"YYYY年MMMD日",lll:"YYYY年MMMD日Ah点mm分",llll:"YYYY年MMMD日ddddAh点mm分"},meridiemParse:/凌晨|早上|上午|中午|下午|晚上/,meridiemHour:function(e,t){return 12===e&&(e=0),"凌晨"===t||"早上"===t||"上午"===t?e:"下午"===t||"晚上"===t?e+12:e>=11?e:e+12},meridiem:function(e,t,a){var n=100*e+t;return n<600?"凌晨":n<900?"早上":n<1130?"上午":n<1230?"中午":n<1800?"下午":"晚上"},calendar:{sameDay:function(){return 0===this.minutes()?"[今天]Ah[点整]":"[今天]LT"},nextDay:function(){return 0===this.minutes()?"[明天]Ah[点整]":"[明天]LT"},lastDay:function(){return 0===this.minutes()?"[昨天]Ah[点整]":"[昨天]LT"},nextWeek:function(){var t,a;return t=e().startOf("week"),a=this.diff(t,"days")>=7?"[下]":"[本]",0===this.minutes()?a+"dddAh点整":a+"dddAh点mm"},lastWeek:function(){var t,a;return t=e().startOf("week"),a=this.unix()<t.unix()?"[上]":"[本]",0===this.minutes()?a+"dddAh点整":a+"dddAh点mm"},sameElse:"LL"},ordinalParse:/\d{1,2}(日|月|周)/,ordinal:function(e,t){switch(t){case"d":case"D":case"DDD":return e+"日";case"M":return e+"月";case"w":case"W":return e+"周";default:return e}},relativeTime:{future:"%s内",past:"%s前",s:"几秒",m:"1 分钟",mm:"%d 分钟",h:"1 小时",hh:"%d 小时",d:"1 天",dd:"%d 天",M:"1 个月",MM:"%d 个月",y:"1 年",yy:"%d 年"},week:{dow:1,doy:4}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("zh-hk",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"週日_週一_週二_週三_週四_週五_週六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"Ah點mm分",LTS:"Ah點m分s秒",L:"YYYY年MMMD日",LL:"YYYY年MMMD日",LLL:"YYYY年MMMD日Ah點mm分",LLLL:"YYYY年MMMD日ddddAh點mm分",l:"YYYY年MMMD日",ll:"YYYY年MMMD日",lll:"YYYY年MMMD日Ah點mm分",llll:"YYYY年MMMD日ddddAh點mm分"},meridiemParse:/凌晨|早上|上午|中午|下午|晚上/,meridiemHour:function(e,t){return 12===e&&(e=0),"凌晨"===t||"早上"===t||"上午"===t?e:"中午"===t?e>=11?e:e+12:"下午"===t||"晚上"===t?e+12:void 0},meridiem:function(e,t,a){var n=100*e+t;return n<600?"凌晨":n<900?"早上":n<1130?"上午":n<1230?"中午":n<1800?"下午":"晚上"},calendar:{sameDay:"[今天]LT",nextDay:"[明天]LT",nextWeek:"[下]ddddLT",lastDay:"[昨天]LT",lastWeek:"[上]ddddLT",sameElse:"L"},ordinalParse:/\d{1,2}(日|月|週)/,ordinal:function(e,t){switch(t){case"d":case"D":case"DDD":return e+"日";case"M":return e+"月";case"w":case"W":return e+"週";default:return e}},relativeTime:{future:"%s內",past:"%s前",s:"幾秒",m:"1 分鐘",mm:"%d 分鐘",h:"1 小時",hh:"%d 小時",d:"1 天",dd:"%d 天",M:"1 個月",MM:"%d 個月",y:"1 年",yy:"%d 年"}});return t})},function(e,t,a){!function(e,t){t(a(1))}(this,function(e){"use strict";var t=e.defineLocale("zh-tw",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"週日_週一_週二_週三_週四_週五_週六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"Ah點mm分",LTS:"Ah點m分s秒",L:"YYYY年MMMD日",LL:"YYYY年MMMD日",LLL:"YYYY年MMMD日Ah點mm分",LLLL:"YYYY年MMMD日ddddAh點mm分",l:"YYYY年MMMD日",ll:"YYYY年MMMD日",lll:"YYYY年MMMD日Ah點mm分",llll:"YYYY年MMMD日ddddAh點mm分"},meridiemParse:/凌晨|早上|上午|中午|下午|晚上/,meridiemHour:function(e,t){return 12===e&&(e=0),"凌晨"===t||"早上"===t||"上午"===t?e:"中午"===t?e>=11?e:e+12:"下午"===t||"晚上"===t?e+12:void 0},meridiem:function(e,t,a){var n=100*e+t;return n<600?"凌晨":n<900?"早上":n<1130?"上午":n<1230?"中午":n<1800?"下午":"晚上"},calendar:{sameDay:"[今天]LT",nextDay:"[明天]LT",nextWeek:"[下]ddddLT",lastDay:"[昨天]LT",lastWeek:"[上]ddddLT",sameElse:"L"},ordinalParse:/\d{1,2}(日|月|週)/,ordinal:function(e,t){switch(t){case"d":case"D":case"DDD":return e+"日";case"M":return e+"月";case"w":case"W":return e+"週";default:return e}},relativeTime:{future:"%s內",past:"%s前",s:"幾秒",m:"1 分鐘",mm:"%d 分鐘",h:"1 小時",hh:"%d 小時",d:"1 天",dd:"%d 天",M:"1 個月",MM:"%d 個月",y:"1 年",yy:"%d 年"}});return t})},function(e,t,a){function n(e,t){for(var a=0;a<e.length;a++){var n=e[a],s=m[n.id];if(s){s.refs++;for(var r=0;r<s.parts.length;r++)s.parts[r](n.parts[r]);for(;r<n.parts.length;r++)s.parts.push(o(n.parts[r],t))}else{for(var i=[],r=0;r<n.parts.length;r++)i.push(o(n.parts[r],t));m[n.id]={id:n.id,refs:1,parts:i}}}}function s(e){for(var t=[],a={},n=0;n<e.length;n++){var s=e[n],r=s[0],i=s[1],d=s[2],o=s[3],_={css:i,media:d,sourceMap:o};a[r]?a[r].parts.push(_):t.push(a[r]={id:r,parts:[_]})}return t}function r(e,t){var a=h(),n=L[L.length-1];if("top"===e.insertAt)n?n.nextSibling?a.insertBefore(t,n.nextSibling):a.appendChild(t):a.insertBefore(t,a.firstChild),L.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");a.appendChild(t)}}function i(e){e.parentNode.removeChild(e);var t=L.indexOf(e);t>=0&&L.splice(t,1)}function d(e){var t=document.createElement("style");return t.type="text/css",r(e,t),t}function o(e,t){var a,n,s;if(t.singleton){var r=f++;a=M||(M=d(t)),n=_.bind(null,a,r,!1),s=_.bind(null,a,r,!0)}else a=d(t),n=u.bind(null,a),s=function(){i(a)};return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else s()}}function _(e,t,a,n){var s=a?"":n.css;if(e.styleSheet)e.styleSheet.cssText=p(t,s);else{var r=document.createTextNode(s),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(r,i[t]):e.appendChild(r)}}function u(e,t){var a=t.css,n=t.media,s=t.sourceMap;if(n&&e.setAttribute("media",n),s&&(a+="\n/*# sourceURL="+s.sources[0]+" */",a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),e.styleSheet)e.styleSheet.cssText=a;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(a))}}var m={},l=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},c=l(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=l(function(){return document.head||document.getElementsByTagName("head")[0]}),M=null,f=0,L=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=c()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var a=s(e);return n(a,t),function(e){for(var r=[],i=0;i<a.length;i++){var d=a[i],o=m[d.id];o.refs--,r.push(o)}if(e){var _=s(e);n(_,t)}for(var i=0;i<r.length;i++){var o=r[i];if(0===o.refs){for(var u=0;u<o.parts.length;u++)o.parts[u]();delete m[o.id]}}}};var p=function(){var e=[];return function(t,a){return e[t]=a,e.filter(Boolean).join("\n")}}()},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=a(136),r=n(s);t.default={data:function(){var e=new Date;return{panelState:!1,panelType:"date",coordinates:{},year:e.getFullYear(),month:e.getMonth(),date:e.getDate(),tmpYear:e.getFullYear(),tmpMonth:e.getMonth(),tmpStartYear:e.getFullYear(),tmpStartMonth:e.getMonth(),tmpStartDate:e.getDate(),tmpEndYear:e.getFullYear(),tmpEndMonth:e.getMonth(),tmpEndDate:e.getDate(),yearList:(0,r.default)({length:12},function(e,t){return(new Date).getFullYear()+t}),monthList:[1,2,3,4,5,6,7,8,9,10,11,12],weekList:[0,1,2,3,4,5,6],rangeStart:!1}},props:{language:{default:"en"},min:{default:"1970-01-01"},max:{default:"3016-01-01"},minYear:Number,minMonth:Number,minDate:Number,maxYear:Number,maxMonth:Number,maxDate:Number,value:{type:[String,Array],twoway:!0},range:{type:Boolean,default:!1}},methods:{togglePanel:function(){this.panelState=!this.panelState,this.rangeStart=!1},isSelected:function(e,t){switch(e){case"year":return this.range?new Date(t,0).getTime()>=new Date(this.tmpStartYear,0).getTime()&&new Date(t,0).getTime()<=new Date(this.tmpEndYear,0).getTime():t===this.tmpYear;case"month":return this.range?new Date(this.tmpYear,t).getTime()>=new Date(this.tmpStartYear,this.tmpStartMonth).getTime()&&new Date(this.tmpYear,t).getTime()<=new Date(this.tmpEndYear,this.tmpEndMonth).getTime():t===this.tmpMonth&&this.year===this.tmpYear;case"date":if(!this.range)return this.date===t.value&&this.month===this.tmpMonth&&t.currentMonth;var a=this.tmpMonth;return t.previousMonth&&a--,t.nextMonth&&a++,new Date(this.tmpYear,a,t.value).getTime()>=new Date(this.tmpStartYear,this.tmpStartMonth,this.tmpStartDate).getTime()&&new Date(this.tmpYear,a,t.value).getTime()<=new Date(this.tmpEndYear,this.tmpEndMonth,this.tmpEndDate).getTime()}},chType:function(e){this.panelType=e},chYearRange:function(e){e?this.yearList=this.yearList.map(function(e){return e+12}):this.yearList=this.yearList.map(function(e){return e-12})},prevMonthPreview:function(){this.tmpMonth=0===this.tmpMonth?0:this.tmpMonth-1},nextMonthPreview:function(){this.tmpMonth=11===this.tmpMonth?11:this.tmpMonth+1},selectYear:function(e){this.validateYear(e)||(this.tmpYear=e,this.panelType="month")},selectMonth:function(e){this.validateMonth(e)||(this.tmpMonth=e,this.panelType="date")},selectDate:function(e){var t=this;setTimeout(function(){if(!t.validateDate(e))if(e.previousMonth?0===t.tmpMonth?(t.year-=1,t.tmpYear-=1,t.month=t.tmpMonth=11):(t.month=t.tmpMonth-1,t.tmpMonth-=1):e.nextMonth&&(11===t.tmpMonth?(t.year+=1,t.tmpYear+=1,t.month=t.tmpMonth=0):(t.month=t.tmpMonth+1,t.tmpMonth+=1)),t.range){if(t.range&&!t.rangeStart)t.tmpEndYear=t.tmpStartYear=t.tmpYear,t.tmpEndMonth=t.tmpStartMonth=t.tmpMonth,t.tmpEndDate=t.tmpStartDate=e.value,t.rangeStart=!0;else if(t.range&&t.rangeStart){t.tmpEndYear=t.tmpYear,t.tmpEndMonth=t.tmpMonth,t.tmpEndDate=e.value;var a=new Date(t.tmpStartYear,t.tmpStartMonth,t.tmpStartDate).getTime(),n=new Date(t.tmpEndYear,t.tmpEndMonth,t.tmpEndDate).getTime();if(a>n){var s=void 0,r=void 0,i=void 0;s=t.tmpEndYear,r=t.tmpEndMonth,i=t.tmpEndDate,t.tmpEndYear=t.tmpStartYear,t.tmpEndMonth=t.tmpStartMonth,t.tmpEndDate=t.tmpStartDate,t.tmpStartYear=s,t.tmpStartMonth=r,t.tmpStartDate=i}var d=t.tmpStartYear+"-"+("0"+(t.tmpStartMonth+1)).slice(-2)+"-"+("0"+t.tmpStartDate).slice(-2),o=t.tmpEndYear+"-"+("0"+(t.tmpEndMonth+1)).slice(-2)+"-"+("0"+t.tmpEndDate).slice(-2);t.value=[d,o],t.rangeStart=!1,t.panelState=!1}}else t.year=t.tmpYear,t.month=t.tmpMonth,t.date=e.value,t.value=t.tmpYear+"-"+("0"+(t.month+1)).slice(-2)+"-"+("0"+t.date).slice(-2),t.panelState=!1},0)},validateYear:function(e){return e>this.maxYear||e<this.minYear},validateMonth:function(e){return!(new Date(this.tmpYear,e).getTime()>=new Date(this.minYear,this.minMonth-1).getTime()&&new Date(this.tmpYear,e).getTime()<=new Date(this.maxYear,this.maxMonth-1).getTime())},validateDate:function(e){var t=this.tmpMonth;return e.previousMonth?t-=1:e.nextMonth&&(t+=1),!(new Date(this.tmpYear,t,e.value).getTime()>=new Date(this.minYear,this.minMonth-1,this.minDate).getTime()&&new Date(this.tmpYear,t,e.value).getTime()<=new Date(this.maxYear,this.maxMonth-1,this.maxDate).getTime())},close:function(e){this.$el.contains(e.target)||(this.panelState=!1,this.rangeStart=!1)}},watch:{min:function(e){var t=e.split("-");this.minYear=Number(t[0]),this.minMonth=Number(t[1]),this.minDate=Number(t[2])},max:function(e){var t=e.split("-");this.maxYear=Number(t[0]),this.maxMonth=Number(t[1]),this.maxDate=Number(t[2])},value:function(e){var t=e.split("-");this.year=Number(t[0]),this.month=Number(t[1]-1),this.date=Number(t[2]),this.tmpYear=this.year,this.tmpMonth=this.month}},computed:{dateList:function e(){for(var t=new Date(this.tmpYear,this.tmpMonth+1,0).getDate(),e=(0,r.default)({length:t},function(e,t){return{currentMonth:!0,value:t+1}}),a=new Date(this.year,this.tmpMonth,1).getDay(),n=new Date(this.year,this.tmpMonth,0).getDate(),s=0,i=a;s<i;s++)e=[{previousMonth:!0,value:n-s}].concat(e);for(var d=e.length,o=1;d<42;d++,o++)e[e.length]={nextMonth:!0,value:o};return e}},filters:{week:function(e,t){switch(t){case"en":return{0:"Su",1:"Mo",2:"Tu",3:"We",4:"Th",5:"Fr",6:"Sa"}[e];case"ch":return{0:"日",1:"一",2:"二",3:"三",4:"四",5:"五",6:"六"}[e];default:return e}},month:function(e,t){switch(t){case"en":return{1:"Jan",2:"Feb",3:"Mar",4:"Apr",5:"May",6:"Jun",7:"Jul",8:"Aug",9:"Sep",10:"Oct",11:"Nov",12:"Dec"}[e];case"ch":return{1:"一",2:"二",3:"三",4:"四",5:"五",6:"六",7:"七",8:"八",9:"九",10:"十",11:"十一",12:"十二"}[e];default:return e}}},ready:function(){this.$el.parentNode.offsetWidth+this.$el.parentNode.offsetLeft-this.$el.offsetLeft<=300?this.coordinates={right:"5",top:window.getComputedStyle(this.$el.children[0]).offsetHeight+4+"px"}:this.coordinates={left:"5",top:window.getComputedStyle(this.$el.children[0]).offsetHeight+4+"px"};var e=this.min.split("-");this.minYear=Number(e[0]),this.minMonth=Number(e[1]),this.minDate=Number(e[2]);var t=this.max.split("-");if(this.maxYear=Number(t[0]),this.maxMonth=Number(t[1]),this.maxDate=Number(t[2]),this.range){var a=this.value[0].split("-"),n=this.value[1].split("-");this.tmpStartYear=Number(a[0]),this.tmpStartMonth=Number(a[1])-1,this.tmpStartDate=Number(a[2]),this.tmpEndYear=Number(n[0]),this.tmpEndMonth=Number(n[1])-1,this.tmpEndDate=Number(n[2])}this.value||(this.value=this.tmpYear+"-"+("0"+(this.month+1)).slice(-2)+"-"+("0"+this.date).slice(-2)),window.addEventListener("click",this.close)},beforeDestroy:function(){console.log("before ===> ",this.panelState),window.removeEventListener("click",this.close),console.log("after ===> ",this.panelState)}}},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=a(1),r=n(s),i=a(168),d=n(i);t.default={props:{language:{type:String,required:!1,default:"en"},adjustBy:{type:String,required:!1,default:"day"},hasAdjuster:{type:Boolean,required:!1,default:!1},dateFormat:{type:String,required:!1,default:"YYYY-MM-DD"},startDate:{type:String,required:!0,twoWay:!0,default:(0,r.default)().format("YYYY-MM-DD")},endDate:{type:String,required:!0,twoWay:!0,default:(0,r.default)().format("YYYY-MM-DD")},startMin:{type:String,required:!1,default:"1970-01-01"},endMin:{type:String,required:!1,default:"1970-01-01"},startMax:{type:String,required:!1,default:(0,r.default)().format("YYYY-MM-DD")},endMax:{type:String,required:!1,default:(0,r.default)().format("YYYY-MM-DD")},absoluteOption:{type:Array,required:!1,default:function(){return[]}},relativeOption:{type:Array,required:!1,default:function(){return[]}}},data:function(){return{toggleRangePicker:!1,coordinates:{},options:{absolute:[{name:"今天",value:0,unit:"day",type:"absolute",weekFormat:"isoweek"},{name:"昨天",value:1,unit:"day",type:"absolute",weekFormat:"isoweek"},{name:"本周",value:0,unit:"week",type:"absolute",weekFormat:"isoweek"},{name:"上周",value:1,unit:"week",type:"absolute",weekFormat:"isoweek"},{name:"本月",value:0,unit:"month",type:"absolute",weekFormat:"isoweek"}],relative:[{name:"过去7天",value:7,unit:"day",type:"relative",weekFormat:"isoweek"},{name:"过去30天",value:30,unit:"day",type:"relative",weekFormat:"isoweek"},{name:"过去3个月",value:3,unit:"month",type:"relative",weekFormat:"isoweek"},{name:"过去半年",value:.5,unit:"year",type:"relative",weekFormat:"isoweek"}]},isActive:!0}},watch:{startDate:function(e){console.log(e),this.endMin=this.startDate},endDate:function(e){this.startMax=this.endDate}},ready:function(){var e=this;this.absoluteOption.map(function(t){e.options.absolute.push(t)}),this.relativeOption.map(function(t){e.options.relative.push(t)}),this.$el.parentNode.offsetWidth+this.$el.parentNode.offsetLeft-this.$el.offsetLeft<=300?this.coordinates={right:"10",top:window.getComputedStyle(this.$el.children[0]).offsetHeight+4+"px"}:this.coordinates={left:"10",top:window.getComputedStyle(this.$el.children[0]).offsetHeight+4+"px"},window.addEventListener("click",this.close)},beforeDestroy:function(){window.removeEventListener("click",this.close)},components:{datepicker:d.default},methods:{adjustRangeBy:function(e){e=e||e in["day","isoweek","month","quarter","year"]?e:"day",this.startDate=(0,r.default)(this.startDate).startOf(e).format(this.dateFormat),this.endDate=(0,r.default)(this.endDate).endOf(e).format(this.dateFormat),(0,r.default)(this.endDate)>(0,r.default)()&&(this.endDate=(0,r.default)().format(this.dateFormat))},toggle_range_picker:function(){this.toggleRangePicker=!this.toggleRangePicker},switchTab:function(){this.isActive=!this.isActive},close:function(e){this.$el.contains(e.target)||(this.toggleRangePicker=!1)},changeDateRange:function(e){"absolute"===e.type?(this.startDate=(0,r.default)().startOf("week"===e.unit?e.weekFormat:e.unit).subtract(e.value,e.unit).format(this.dateFormat),e.value?this.endDate=(0,r.default)().subtract(e.value,e.unit).endOf("week"===e.unit?e.weekFormat:e.unit).format(this.dateFormat):this.endDate=(0,r.default)().format(this.dateFormat)):"relative"===e.type&&(this.startDate=(0,r.default)().subtract(e.value,e.unit).format(this.dateFormat),this.endDate=(0,r.default)().format(this.dateFormat)),this.toggle_range_picker()}}}},function(e,t,a){e.exports={default:a(137),__esModule:!0}},function(e,t,a){a(162),a(161),e.exports=a(9).Array.from},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t,a){var n=a(24),s=a(25),r=a(158);e.exports=function(e){return function(t,a,i){var d,o=n(t),_=s(o.length),u=r(i,_);if(e&&a!=a){for(;_>u;)if(d=o[u++],d!=d)return!0}else for(;_>u;u++)if((e||u in o)&&o[u]===a)return e||u||0;return!e&&-1}}},function(e,t,a){var n=a(16),s=a(2)("toStringTag"),r="Arguments"==n(function(){return arguments}()),i=function(e,t){try{return e[t]}catch(e){}};e.exports=function(e){var t,a,d;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(a=i(t=Object(e),s))?a:r?n(t):"Object"==(d=n(t))&&"function"==typeof t.callee?"Arguments":d}},function(e,t,a){"use strict";var n=a(8),s=a(13);e.exports=function(e,t,a){t in e?n.f(e,t,s(0,a)):e[t]=a}},function(e,t,a){e.exports=a(3).document&&document.documentElement},function(e,t,a){e.exports=!a(5)&&!a(21)(function(){return 7!=Object.defineProperty(a(18)("div"),"a",{get:function(){return 7}}).a})},function(e,t,a){var n=a(16);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==n(e)?e.split(""):Object(e)}},function(e,t,a){var n=a(12),s=a(2)("iterator"),r=Array.prototype;e.exports=function(e){return void 0!==e&&(n.Array===e||r[s]===e)}},function(e,t,a){var n=a(4);e.exports=function(e,t,a,s){try{return s?t(n(a)[0],a[1]):t(a)}catch(t){var r=e.return;throw void 0!==r&&n(r.call(e)),t}}},function(e,t,a){"use strict";var n=a(151),s=a(13),r=a(22),i={};a(7)(i,a(2)("iterator"),function(){return this}),e.exports=function(e,t,a){e.prototype=n(i,{next:s(1,a)}),r(e,t+" Iterator")}},function(e,t,a){"use strict";var n=a(150),s=a(20),r=a(156),i=a(7),d=a(6),o=a(12),_=a(147),u=a(22),m=a(153),l=a(2)("iterator"),c=!([].keys&&"next"in[].keys()),h="@@iterator",M="keys",f="values",L=function(){return this};e.exports=function(e,t,a,p,Y,y,k){_(a,t,p);var D,v,g,w=function(e){if(!c&&e in H)return H[e];switch(e){case M:return function(){return new a(this,e)};case f:return function(){return new a(this,e)}}return function(){return new a(this,e)}},T=t+" Iterator",b=Y==f,S=!1,H=e.prototype,x=H[l]||H[h]||Y&&H[Y],j=x||w(Y),P=Y?b?w("entries"):j:void 0,W="Array"==t?H.entries||x:x;if(W&&(g=m(W.call(new e)),g!==Object.prototype&&(u(g,T,!0),n||d(g,l)||i(g,l,L))),b&&x&&x.name!==f&&(S=!0,j=function(){return x.call(this)}),n&&!k||!c&&!S&&H[l]||i(H,l,j),o[t]=j,o[T]=L,Y)if(D={values:b?j:w(f),keys:y?j:w(M),entries:P},k)for(v in D)v in H||r(H,v,D[v]);else s(s.P+s.F*(c||S),t,D);return D}},function(e,t,a){var n=a(2)("iterator"),s=!1;try{var r=[7][n]();r.return=function(){s=!0},Array.from(r,function(){throw 2})}catch(e){}e.exports=function(e,t){if(!t&&!s)return!1;var a=!1;try{var r=[7],i=r[n]();i.next=function(){return{done:a=!0}},r[n]=function(){return i},e(r)}catch(e){}return a}},function(e,t){e.exports=!0},function(e,t,a){var n=a(4),s=a(152),r=a(19),i=a(14)("IE_PROTO"),d=function(){},o="prototype",_=function(){var e,t=a(18)("iframe"),n=r.length,s="<",i=">";for(t.style.display="none",a(142).appendChild(t),t.src="javascript:",e=t.contentWindow.document,e.open(),e.write(s+"script"+i+"document.F=Object"+s+"/script"+i),e.close(),_=e.F;n--;)delete _[o][r[n]];return _()};e.exports=Object.create||function(e,t){var a;return null!==e?(d[o]=n(e),a=new d,d[o]=null,a[i]=e):a=_(),void 0===t?a:s(a,t)}},function(e,t,a){var n=a(8),s=a(4),r=a(155);e.exports=a(5)?Object.defineProperties:function(e,t){s(e);for(var a,i=r(t),d=i.length,o=0;d>o;)n.f(e,a=i[o++],t[a]);return e}},function(e,t,a){var n=a(6),s=a(26),r=a(14)("IE_PROTO"),i=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=s(e),n(e,r)?e[r]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?i:null}},function(e,t,a){var n=a(6),s=a(24),r=a(139)(!1),i=a(14)("IE_PROTO");e.exports=function(e,t){var a,d=s(e),o=0,_=[];for(a in d)a!=i&&n(d,a)&&_.push(a);for(;t.length>o;)n(d,a=t[o++])&&(~r(_,a)||_.push(a));return _}},function(e,t,a){var n=a(154),s=a(19);e.exports=Object.keys||function(e){return n(e,s)}},function(e,t,a){e.exports=a(7)},function(e,t,a){var n=a(15),s=a(10);e.exports=function(e){return function(t,a){var r,i,d=String(s(t)),o=n(a),_=d.length;return o<0||o>=_?e?"":void 0:(r=d.charCodeAt(o),r<55296||r>56319||o+1===_||(i=d.charCodeAt(o+1))<56320||i>57343?e?d.charAt(o):r:e?d.slice(o,o+2):(r-55296<<10)+(i-56320)+65536)}}},function(e,t,a){var n=a(15),s=Math.max,r=Math.min;e.exports=function(e,t){return e=n(e),e<0?s(e+t,0):r(e,t)}},function(e,t,a){var n=a(11);e.exports=function(e,t){if(!n(e))return e;var a,s;if(t&&"function"==typeof(a=e.toString)&&!n(s=a.call(e)))return s;if("function"==typeof(a=e.valueOf)&&!n(s=a.call(e)))return s;if(!t&&"function"==typeof(a=e.toString)&&!n(s=a.call(e)))return s;throw TypeError("Can't convert object to primitive value")}},function(e,t,a){var n=a(140),s=a(2)("iterator"),r=a(12);e.exports=a(9).getIteratorMethod=function(e){if(void 0!=e)return e[s]||e["@@iterator"]||r[n(e)]}},function(e,t,a){"use strict";var n=a(17),s=a(20),r=a(26),i=a(146),d=a(145),o=a(25),_=a(141),u=a(160);s(s.S+s.F*!a(149)(function(e){Array.from(e)}),"Array",{from:function(e){var t,a,s,m,l=r(e),c="function"==typeof this?this:Array,h=arguments.length,M=h>1?arguments[1]:void 0,f=void 0!==M,L=0,p=u(l);if(f&&(M=n(M,h>2?arguments[2]:void 0,2)),void 0==p||c==Array&&d(p))for(t=o(l.length),a=new c(t);t>L;L++)_(a,L,f?M(l[L],L):l[L]);else for(m=p.call(l),a=new c;!(s=m.next()).done;L++)_(a,L,f?i(m,M,[s.value,L],!0):s.value);return a.length=L,a}})},function(e,t,a){"use strict";var n=a(157)(!0);a(148)(String,"String",function(e){this._t=String(e),this._i=0},function(){var e,t=this._t,a=this._i;return a>=t.length?{value:void 0,done:!0}:(e=n(t,a),this._i+=e.length,{value:e,done:!1})})},function(e,t,a){t=e.exports=a(28)(),t.push([e.id,".rangepicker[_v-734528a0]{max-width:230px;min-width:150px;float:none;display:inline-block}.rangepicker-widget[_v-734528a0]{position:absolute;z-index:1000;border:1px solid #ccc;border-radius:3px;top:35px;background-color:#fff}.rangepicker-widget .header ul[_v-734528a0]{margin-bottom:0}.rangepicker-widget .header li:first-child a[_v-734528a0]{border-left:0}.rangepicker-widget .header li:last-child a[_v-734528a0]{border-right:0}.rangepicker-widget .header li.active a[_v-734528a0]{border-top:2px solid #009688}.rangepicker-widget .options[_v-734528a0]{padding:10px}.rangepicker-widget .options .options-btn[_v-734528a0]{width:50%;padding:4px;display:inline-block}.rangepicker-widget .options .btn[_v-734528a0]{width:100%}.rangepicker-widget .range-picker[_v-734528a0]{border-top:1px solid #ccc;padding:14px}.rangepicker-widget .range-picker label[_v-734528a0]{position:relative;width:100%;margin-bottom:4px;font-weight:400;line-height:36px}.rangepicker-widget .range-picker label .date-picker[_v-734528a0]{position:absolute;padding-left:32px;top:0;width:100%}",""])},function(e,t,a){t=e.exports=a(28)(),t.push([e.id,"ul[_v-fc7c53b2]{padding:0;margin:0;list-style:none}.date-picker input[_v-fc7c53b2]{width:100%;border:1px solid #ddd;border-radius:3px;padding-left:10px;line-height:28px}.input[_v-fc7c53b2]{width:100%;height:100%;font-size:inherit;line-height:2;padding-left:4px;box-sizing:border-box;outline:none;border:1px solid #ccc;border-radius:2px}.date-panel[_v-fc7c53b2]{position:absolute;z-index:5000;border:1px solid #ddd;box-sizing:border-box;width:300px}.panel-header[_v-fc7c53b2]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row;background-color:#fff;width:100%}.arrow-left[_v-fc7c53b2],.arrow-right[_v-fc7c53b2]{-webkit-box-flex:1;-ms-flex:1;flex:1;font-size:16px;line-height:40px;color:#999;text-align:center;cursor:pointer}.arrow-left[_v-fc7c53b2]:hover,.arrow-right[_v-fc7c53b2]:hover{background-color:#eee}.year-range[_v-fc7c53b2]{color:#333;font-size:16px;line-height:40px;-ms-flex:3;flex:3;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.year-month-box[_v-fc7c53b2],.year-range[_v-fc7c53b2]{-webkit-box-flex:3;display:-webkit-box;display:-ms-flexbox;display:flex}.year-month-box[_v-fc7c53b2]{-ms-flex:3;flex:3;-ms-flex-flow:row nowrap;flex-flow:row;-ms-flex-pack:distribute;justify-content:space-around}.date-list[_v-fc7c53b2],.type-month[_v-fc7c53b2],.type-year[_v-fc7c53b2]{background-color:#fff}.month-box[_v-fc7c53b2],.year-box[_v-fc7c53b2]{-webkit-transition:all .1s ease;transition:all .1s ease;color:#333;-webkit-box-flex:1;-ms-flex:1;flex:1;text-align:center;font-size:16px;line-height:40px;cursor:pointer}.month-box[_v-fc7c53b2]:hover,.year-box[_v-fc7c53b2]:hover{background-color:#009688;color:#fff}.month-list[_v-fc7c53b2],.year-list[_v-fc7c53b2]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.month-list li[_v-fc7c53b2],.year-list li[_v-fc7c53b2]{-webkit-transition:all .1s ease;transition:all .1s ease;cursor:pointer;text-align:center;font-size:16px;width:33%;padding:10px 0}.month-list li[_v-fc7c53b2]:not(.invalid):hover,.year-list li[_v-fc7c53b2]:not(.invalid):hover{background-color:#eee}.month-list li.selected[_v-fc7c53b2],.year-list li.selected[_v-fc7c53b2]{background-color:#009688;color:#fff}.month-list li.selected[_v-fc7c53b2]:hover,.year-list li.selected[_v-fc7c53b2]:hover{background-color:#4db6ac}.month-list li.invalid[_v-fc7c53b2],.year-list li.invalid[_v-fc7c53b2]{cursor:not-allowed;color:#ccc}.date-list[_v-fc7c53b2]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.date-list .valid[_v-fc7c53b2]:hover{background-color:#eee}.date-list li[_v-fc7c53b2]{-webkit-transition:all .1s ease;transition:all .1s ease;cursor:pointer;box-sizing:border-box;border-bottom:1px solid #fff}.date-list li[_v-fc7c53b2]:not(.invalid):hover{background-color:#eee}.date-list li.selected[_v-fc7c53b2]{background-color:#009688;color:#fff}.date-list li.selected[_v-fc7c53b2]:hover{background-color:#4db6ac}.date-list li.invalid[_v-fc7c53b2]{cursor:not-allowed;color:#ccc}.weeks[_v-fc7c53b2]{background-color:#eee;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.weeks li[_v-fc7c53b2]{font-weight:600}.date-list[_v-fc7c53b2],.weeks[_v-fc7c53b2]{width:100%;text-align:center}.date-list .nextMonth[_v-fc7c53b2],.date-list .preMonth[_v-fc7c53b2],.weeks .nextMonth[_v-fc7c53b2],.weeks .preMonth[_v-fc7c53b2]{color:#ccc}.date-list li[_v-fc7c53b2],.weeks li[_v-fc7c53b2]{font-family:Roboto;width:14%;height:30px;text-align:center;line-height:30px}.toggle-transition[_v-fc7c53b2]{-webkit-transition:all .2s ease;transition:all .2s ease}.toggle-enter[_v-fc7c53b2],.toggle-leave[_v-fc7c53b2]{opacity:0}",""]);
	},function(e,t,a){function n(e){return a(s(e))}function s(e){return r[e]||function(){throw new Error("Cannot find module '"+e+"'.")}()}var r={"./af":29,"./af.js":29,"./ar":34,"./ar-ly":30,"./ar-ly.js":30,"./ar-ma":31,"./ar-ma.js":31,"./ar-sa":32,"./ar-sa.js":32,"./ar-tn":33,"./ar-tn.js":33,"./ar.js":34,"./az":35,"./az.js":35,"./be":36,"./be.js":36,"./bg":37,"./bg.js":37,"./bn":38,"./bn.js":38,"./bo":39,"./bo.js":39,"./br":40,"./br.js":40,"./bs":41,"./bs.js":41,"./ca":42,"./ca.js":42,"./cs":43,"./cs.js":43,"./cv":44,"./cv.js":44,"./cy":45,"./cy.js":45,"./da":46,"./da.js":46,"./de":48,"./de-at":47,"./de-at.js":47,"./de.js":48,"./dv":49,"./dv.js":49,"./el":50,"./el.js":50,"./en-au":51,"./en-au.js":51,"./en-ca":52,"./en-ca.js":52,"./en-gb":53,"./en-gb.js":53,"./en-ie":54,"./en-ie.js":54,"./en-nz":55,"./en-nz.js":55,"./eo":56,"./eo.js":56,"./es":58,"./es-do":57,"./es-do.js":57,"./es.js":58,"./et":59,"./et.js":59,"./eu":60,"./eu.js":60,"./fa":61,"./fa.js":61,"./fi":62,"./fi.js":62,"./fo":63,"./fo.js":63,"./fr":66,"./fr-ca":64,"./fr-ca.js":64,"./fr-ch":65,"./fr-ch.js":65,"./fr.js":66,"./fy":67,"./fy.js":67,"./gd":68,"./gd.js":68,"./gl":69,"./gl.js":69,"./he":70,"./he.js":70,"./hi":71,"./hi.js":71,"./hr":72,"./hr.js":72,"./hu":73,"./hu.js":73,"./hy-am":74,"./hy-am.js":74,"./id":75,"./id.js":75,"./is":76,"./is.js":76,"./it":77,"./it.js":77,"./ja":78,"./ja.js":78,"./jv":79,"./jv.js":79,"./ka":80,"./ka.js":80,"./kk":81,"./kk.js":81,"./km":82,"./km.js":82,"./ko":83,"./ko.js":83,"./ky":84,"./ky.js":84,"./lb":85,"./lb.js":85,"./lo":86,"./lo.js":86,"./lt":87,"./lt.js":87,"./lv":88,"./lv.js":88,"./me":89,"./me.js":89,"./mi":90,"./mi.js":90,"./mk":91,"./mk.js":91,"./ml":92,"./ml.js":92,"./mr":93,"./mr.js":93,"./ms":95,"./ms-my":94,"./ms-my.js":94,"./ms.js":95,"./my":96,"./my.js":96,"./nb":97,"./nb.js":97,"./ne":98,"./ne.js":98,"./nl":99,"./nl.js":99,"./nn":100,"./nn.js":100,"./pa-in":101,"./pa-in.js":101,"./pl":102,"./pl.js":102,"./pt":104,"./pt-br":103,"./pt-br.js":103,"./pt.js":104,"./ro":105,"./ro.js":105,"./ru":106,"./ru.js":106,"./se":107,"./se.js":107,"./si":108,"./si.js":108,"./sk":109,"./sk.js":109,"./sl":110,"./sl.js":110,"./sq":111,"./sq.js":111,"./sr":113,"./sr-cyrl":112,"./sr-cyrl.js":112,"./sr.js":113,"./ss":114,"./ss.js":114,"./sv":115,"./sv.js":115,"./sw":116,"./sw.js":116,"./ta":117,"./ta.js":117,"./te":118,"./te.js":118,"./th":119,"./th.js":119,"./tl-ph":120,"./tl-ph.js":120,"./tlh":121,"./tlh.js":121,"./tr":122,"./tr.js":122,"./tzl":123,"./tzl.js":123,"./tzm":125,"./tzm-latn":124,"./tzm-latn.js":124,"./tzm.js":125,"./uk":126,"./uk.js":126,"./uz":127,"./uz.js":127,"./vi":128,"./vi.js":128,"./x-pseudo":129,"./x-pseudo.js":129,"./zh-cn":130,"./zh-cn.js":130,"./zh-hk":131,"./zh-hk.js":131,"./zh-tw":132,"./zh-tw.js":132};n.keys=function(){return Object.keys(r)},n.resolve=s,e.exports=n,n.id=165},function(e,t){e.exports=' <div class="col-sm-6 col-xs-12 rangepicker" _v-734528a0=""> <input type=text class=form-control @click=toggle_range_picker value="{{ startDate + \' 至 \' + endDate }}" _v-734528a0=""> <div class=rangepicker-widget v-show=toggleRangePicker :style=coordinates _v-734528a0=""> <div class=header _v-734528a0=""> <ul class="nav nav-tabs nav-justified" _v-734528a0=""> <li role=presentation :class="{ \'active\': isActive }" @click=switchTab _v-734528a0=""><a _v-734528a0="">自然时间</a></li> <li role=presentation :class="{ \'active\': !isActive }" @click=switchTab _v-734528a0=""><a _v-734528a0="">相对时间</a></li> </ul> </div> <div class=options _v-734528a0=""> <div id=absolute-date :class="{ \'hidden\': !isActive }" _v-734528a0=""> <span class=options-btn v-for="metric in options.absolute" _v-734528a0=""><button type=button class="btn btn-default" @click=changeDateRange(metric) _v-734528a0="">{{ metric.name }}</button></span> </div> <div id=relative-date :class="{ \'hidden\': isActive }" _v-734528a0=""> <span class=options-btn v-for="metric in options.relative" _v-734528a0=""><button type=button class="btn btn-default" @click=changeDateRange(metric) _v-734528a0="">{{ metric.name }}</button></span> </div> </div> <div class=range-picker _v-734528a0=""> <label for=start-date _v-734528a0="">开始 <datepicker :min=startMin :value.sync=startDate :language=language :max=startMax _v-734528a0=""></datepicker></label> <label for=end-date _v-734528a0="">结束 <datepicker :min=endMin :value.sync=endDate :language=language :max=endMax _v-734528a0=""></datepicker></label> </div> </div> </div> '},function(e,t){e.exports=' <div class=date-picker _v-fc7c53b2=""> <input type=text @click=togglePanel value="{{ range ? value[0] + \' -- \' + value[1] : value }}" _v-fc7c53b2=""> <div class=date-panel v-show=panelState :style=coordinates transition=toggle _v-fc7c53b2=""> <div class=panel-header v-show="panelType !== \'year\'" _v-fc7c53b2=""> <div class=arrow-left @click=prevMonthPreview() _v-fc7c53b2="">&lt;</div> <div class=year-month-box _v-fc7c53b2=""> <div class=year-box @click="chType(\'year\')" v-text=tmpYear _v-fc7c53b2=""></div> <div class=month-box @click="chType(\'month\')" v-text="tmpMonth + 1 | month language" _v-fc7c53b2=""></div> </div> <div class=arrow-right @click=nextMonthPreview() _v-fc7c53b2="">&gt;</div> </div> <div class=panel-header v-show="panelType === \'year\'" _v-fc7c53b2=""> <div class=arrow-left @click=chYearRange(0) _v-fc7c53b2="">&lt;</div> <div class=year-range _v-fc7c53b2=""> <span v-text=yearList[0] _v-fc7c53b2=""></span> - <span v-text="yearList[yearList.length - 1]" _v-fc7c53b2=""></span> </div> <div class=arrow-right @click=chYearRange(1) _v-fc7c53b2="">&gt;</div> </div> <div class=type-year v-show="panelType === \'year\'" _v-fc7c53b2=""> <ul class=year-list _v-fc7c53b2=""> <li v-for="item in yearList" v-text=item :class="{selected: isSelected(\'year\', item), invalid: validateYear(item)}" @click=selectYear(item) _v-fc7c53b2=""> </li> </ul> </div> <div class=type-month v-show="panelType === \'month\'" _v-fc7c53b2=""> <ul class=month-list _v-fc7c53b2=""> <li v-for="item in monthList" v-text="item | month language" :class="{selected: isSelected(\'month\', $index), invalid: validateMonth($index)}" @click=selectMonth($index) _v-fc7c53b2=""> </li> </ul> </div> <div class=type-date v-show="panelType === \'date\'" _v-fc7c53b2=""> <ul class=weeks _v-fc7c53b2=""> <li v-for="item in weekList" v-text="item | week language" _v-fc7c53b2=""></li> </ul> <ul class=date-list _v-fc7c53b2=""> <li v-for="item in dateList" v-text=item.value :class="{preMonth: item.previousMonth, nextMonth: item.nextMonth,\n                        selected: isSelected(\'date\', item), invalid: validateDate(item)}" @click=selectDate(item) _v-fc7c53b2=""> </li> </ul> </div> </div> </div> '},function(e,t,a){var n,s,r={};a(171),n=a(134),s=a(167),e.exports=n||{},e.exports.__esModule&&(e.exports=e.exports.default);var i="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;s&&(i.template=s),i.computed||(i.computed={}),Object.keys(r).forEach(function(e){var t=r[e];i.computed[e]=function(){return t}})},function(e,t,a){var n,s,r={};a(170),n=a(135),s=a(166),e.exports=n||{},e.exports.__esModule&&(e.exports=e.exports.default);var i="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;s&&(i.template=s),i.computed||(i.computed={}),Object.keys(r).forEach(function(e){var t=r[e];i.computed[e]=function(){return t}})},function(e,t,a){var n=a(163);"string"==typeof n&&(n=[[e.id,n,""]]);a(133)(n,{});n.locals&&(e.exports=n.locals)},function(e,t,a){var n=a(164);"string"==typeof n&&(n=[[e.id,n,""]]);a(133)(n,{});n.locals&&(e.exports=n.locals)},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}}])});
	//# sourceMappingURL=rangepicker.js.map

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n    <rangepicker :start-date.sync=\"startDate\" :end-date.sync=\"endDate\"></rangepicker>\n</div>\n"

/***/ }
/******/ ]);