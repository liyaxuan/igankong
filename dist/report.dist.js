webpackJsonp([10],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Vue, $) {'use strict';

	__webpack_require__(6);

	__webpack_require__(108);

	var _util = __webpack_require__(13);

	var _ajax = __webpack_require__(12);

	var alarmId = 1;
	var exposureId = 1;

	(0, _ajax.login)().then(function () {
		new Vue({
			el: '.vue-container',
			data: {
				isSymptom: 0,
				description: ''
			},
			methods: {
				submit: function submit() {
					if (this.description == '') {
						alert('暴露过程描述不能为空');
						return;
					}

					(0, _ajax.errorFilter)($.ajax({
						url: _ajax.host + '/weixin/expose_symptom',
						type: 'POST',
						data: JSON.stringify({
							alarmId: alarmId,
							exposeId: exposureId,
							isSymptom: this.isSymptom,
							note: this.description
						}),
						contentType: 'application/json;charset=UTF-8',
						headers: {
							Token: (0, _ajax.getToken)()
						}
					})).then(function (res) {
						window.location.href = 'exposure_index.html';
					});
				}
			},
			mounted: function mounted() {
				alarmId = parseInt((0, _util.getParam)('alarmId')) || alarmId;
				exposureId = parseInt((0, _util.getParam)('exposureId')) || exposureId;
			}
		});
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(4)))

/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/.0.25.0@css-loader/index.js!./../../node_modules/.2.2.3@less-loader/index.js!./common.less", function() {
				var newContent = require("!!./../../node_modules/.0.25.0@css-loader/index.js!./../../node_modules/.2.2.3@less-loader/index.js!./common.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, ".rounded-corner {\n  border-radius: 4px;\n}\n.round-border {\n  border-radius: 50%;\n}\nhtml,\nbody {\n  font-size: 14px;\n}\nbody {\n  margin: 0;\n  padding: 8px;\n}\na {\n  text-decoration: none;\n}\n.fl {\n  float: left;\n}\n.fr {\n  float: right;\n}\n.cf {\n  clear: both;\n}\n.text-input {\n  box-sizing: border-box;\n  height: 32px;\n  line-height: 16px;\n  padding: 7px;\n  border: 1px solid #5dc12d;\n  border-radius: 4px;\n  font-size: 14px;\n}\n.sub-header,\n.tag-header {\n  height: 32px;\n  line-height: 32px;\n  margin-bottom: 8px;\n  padding-left: 8px;\n}\n.sub-header.green,\n.tag-header.green {\n  border-left: 4px solid #5dc12d;\n}\n.bottom-button-group {\n  display: -webkit-flex;\n  display: flex;\n  justify-content: space-between;\n}\n.bottom-button-group > .button {\n  flex-grow: 1;\n  height: 32px;\n  line-height: 32px;\n  background-color: #5dc12d;\n  border-radius: 4px;\n  text-align: center;\n  color: #ffffff;\n}\n.bottom-button-group > .button.left {\n  margin-right: 8px;\n}\n.checkbox {\n  padding: 3px;\n  border: 1px solid #9f9f9f;\n}\n.checkbox > .inner {\n  width: 16px;\n  height: 16px;\n}\n.checkbox.arc {\n  border-radius: 50%;\n}\n.checkbox.arc > .inner {\n  border-radius: 50%;\n}\n.checkbox.green.selected {\n  border: 1px solid #5dc12d;\n}\n.checkbox.green.selected > .inner {\n  background-color: #5dc12d;\n}\n.checkbox.orange.selected {\n  border: 1px solid #f39b77;\n}\n.checkbox.orange.selected > .inner {\n  background-color: #f39b77;\n}\n.checkbox.pink.selected {\n  border: 1px solid #f29c9f;\n}\n.checkbox.pink.selected > .inner {\n  background-color: #f29c9f;\n}\n.checkbox.blue.selected {\n  border: 1px solid #7ecef3;\n}\n.checkbox.blue.selected > .inner {\n  background-color: #7ecef3;\n}\n.rect-option {\n  box-sizing: border-box;\n  height: 32px;\n  line-height: 30px;\n  margin-left: 8px;\n  border: 1px solid #9f9f9f;\n  border-radius: 4px;\n  text-align: center;\n  color: #9f9f9f;\n}\n.rect-option.equal {\n  width: 32px;\n}\n.rect-option.not-equal {\n  width: 96px;\n}\n.rect-option.selected {\n  border: none;\n  color: #ffffff;\n}\n.rect-option.selected.green {\n  background-color: #5dc12d;\n}\n.rect-option.selected.orange {\n  background-color: #f39b77;\n}\n.rect-option.selected.pink {\n  background-color: #f29c9f;\n}\n.rect-option.selected.blue {\n  background-color: #7ecef3;\n}\n.toggle-button {\n  width: 16px;\n  height: 16px;\n  margin-left: 8px;\n  background-color: #5dc12d;\n  border-radius: 50%;\n}\n.toggle-button > .iconfont {\n  width: 100%;\n  height: 100%;\n  line-height: 16px;\n  font-size: 12px;\n  text-align: center;\n  color: #ffffff;\n  display: block;\n}\n", ""]);

	// exports


/***/ },

/***/ 8:
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var host = 'http://121.42.137.63:8080';
	var username = 'gaozhiqiang';
	var password = 'abcdefgh';

	// function setCookie(key, value) {
	// 	sessionStorage[key] = value;
	// }

	// function getCookie(key) {
	// 	return sessionStorage[key];
	// }

	function getUsername() {
		return sessionStorage.username;
	};

	function getToken() {
		return sessionStorage.token;
	};

	var login = function () {
		return function () {
			return new Promise(function (resolve) {
				resolve();
			});
		};
		// sessionStorage.username = username;
		// sessionStorage.password = password;

		// function updateToken() {
		// 	$.ajax({
		// 		url: `${host}/token`,
		// 		data: {
		// 			username: username,
		// 			password: password
		// 		}
		// 	}).then(function (res) {
		// 		sessionStorage.token = res.data.token;
		// 	});
		// }

		// setInterval(updateToken, 7200*1000);
		// updateToken();

		// return function () {
		// 	if(sessionStorage.token)
		// 		return new Promise(function (resolve) {
		// 			resolve(sessionStorage.token);
		// 		});
		// 	else
		// 		return $.ajax({
		// 			url: `${host}/token`,
		// 			data: {
		// 				username: username,
		// 				password: password
		// 			}
		// 		}).then(function (res) {
		// 			return new Promise(function (resolve) {
		// 				resolve(res.data.token);
		// 			});
		// 		});
		// }
	}();

	var notice = {
		list: function list() {
			return $.ajax({
				url: host + '/weixin/notification',
				type: 'GET',
				headers: {
					Token: getToken()
				}
			});
		}
	};

	var department = {
		listMain: function listMain() {
			return $.ajax({
				url: host + '/weixin/main_department',
				type: 'GET',
				headers: {
					Token: getToken()
				}
			});
		},
		listSecondary: function listSecondary(mainName) {
			return $.ajax({
				url: host + '/weixin/sub_department',
				type: 'GET',
				data: {
					name: mainName
				},
				headers: {
					Token: getToken()
				}
			});
		}
	};

	var clerk = {
		list: function list() {
			return $.ajax({
				url: host + '/weixin/gklist',
				type: 'GET',
				headers: {
					Token: getToken()
				}
			});
		}
	};

	var sheet = {
		list: function list() {
			return $.ajax({
				url: host + '/weixin/worksheet_schema',
				type: 'GET',
				headers: {
					Token: getToken()
				}
			});
		}
	};

	var basic = {
		listConst: function listConst(type) {
			return $.ajax({
				url: host + '/dictionary',
				type: 'GET',
				data: {
					type: type
				},
				headers: {
					Token: getToken()
				}
			});
		},
		listTitle: function listTitle() {
			return $.ajax({
				url: host + '/dictionary?type=1',
				type: 'GET',
				headers: {
					Token: getToken()
				}
			});
		},
		listPosition: function listPosition() {
			return $.ajax({
				url: host + '/dictionary?type=2',
				type: 'GET',
				headers: {
					Token: getToken()
				}
			});
		}
	};

	var exposure = {
		getInfo: function getInfo(id) {
			return $.ajax({
				url: host + '/weixin/expose_info',
				type: 'GET',
				data: {
					exposeId: id
				},
				headers: {
					Token: getToken()
				}
			});
		}
	};

	function errorFilter(promise) {
		return promise.then(function (res) {
			var error = res.error || res.body.error;

			if (error == 'succ') {
				alert('提交成功');
				return new Promise(function (resolve) {
					resolve(res);
				});
			} else alert('提交失败, 错误代码: ' + error);
		});
	}

	exports.host = host;
	exports.getUsername = getUsername;
	exports.getToken = getToken;
	exports.login = login;
	exports.department = department;
	exports.basic = basic;
	exports.sheet = sheet;
	exports.clerk = clerk;
	exports.notice = notice;
	exports.exposure = exposure;
	exports.errorFilter = errorFilter;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 13:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function getDate() {
		var date = new Date();

		return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	}

	function getTime() {
		var date = new Date();

		return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
	}

	function diffDate(a, b) {
		a = a.split('-');
		b = b.split('-');

		var oa = new Date(a[0], parseInt(a[1]) - 1, a[2]);
		var ob = new Date(b[0], parseInt(b[1]) - 1, b[2]);

		return parseInt(Math.abs(oa - ob) / 1000 / 60 / 60 / 24);
	}

	function getParam(key) {
		var qs = window.location.search;
		var result = new RegExp('[?|&]' + key + '=(.+)?&?').exec(qs);
		if (result != null) return result[1];else return null;
	}

	function transform(array) {
		return array.map(function (item) {
			return {
				content: item.name,
				code: item.code,
				isSelected: false
			};
		});
	}

	function mutipleSelect(constArray, codeArray) {
		constArray.forEach(function (item) {
			codeArray.forEach(function (code) {
				item.isSelected = item.isSelected || item.code == code;
			});
		});
	}

	function getMutipleSelect(array) {
		return array.filter(function (item) {
			return item.isSelected;
		}).map(function (item) {
			return item.code;
		});
	}

	exports.getDate = getDate;
	exports.diffDate = diffDate;
	exports.getTime = getTime;
	exports.getParam = getParam;
	exports.transform = transform;
	exports.mutipleSelect = mutipleSelect;
	exports.getMutipleSelect = getMutipleSelect;

/***/ },

/***/ 108:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(109);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/.0.25.0@css-loader/index.js!./../../node_modules/.2.2.3@less-loader/index.js!./report.less", function() {
				var newContent = require("!!./../../node_modules/.0.25.0@css-loader/index.js!./../../node_modules/.2.2.3@less-loader/index.js!./report.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 109:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, ".rounded-corner {\n  border-radius: 4px;\n}\n.round-border {\n  border-radius: 50%;\n}\n.title {\n  margin-bottom: 8px;\n}\n.option-group {\n  margin-bottom: 8px;\n  dipslay: flex;\n  display: -webkit-flex;\n}\n.option {\n  height: 16px;\n  line-height: 16px;\n  padding: 8px;\n  border: 1px solid #5dc12d;\n  border-radius: 4px;\n  flex-grow: 1;\n  text-align: center;\n}\n.option.selected {\n  background-color: #5dc12d;\n  color: #ffffff;\n}\n.textarea {\n  box-sizing: border-box;\n  width: 100%;\n  margin-bottom: 8px;\n  padding: 8px;\n  border: 1px solid #5dc12d;\n  border-radius: 4px;\n}\n.right {\n  margin-right: 8px;\n}\n", ""]);

	// exports


/***/ }

});