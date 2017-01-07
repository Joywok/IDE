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
/******/ 	__webpack_require__.p = "build/scripts/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(733);


/***/ },

/***/ 733:
/***/ function(module, exports) {

	'use strict';

	window.JoywokMobileApp = {
	  callHandler: function callHandler(func_name, data, callBack) {
	    this[func_name](data, callBack);
	  },
	  setTitle: function setTitle(data, callBack) {
	    console.log('123123123123');
	  },
	  checkJsApi: function checkJsApi() {},
	  getInfo: function getInfo() {},
	  pushWebView: function pushWebView() {},
	  newWebView: function newWebView() {},
	  closeWebView: function closeWebView() {},
	  setFuncBtns: function setFuncBtns() {},
	  setFuncBtnStatus: function setFuncBtnStatus() {},
	  showTabs: function showTabs() {},
	  hideTabs: function hideTabs() {},
	  mailto: function mailto() {},
	  back: function back() {},
	  onSelectTab: function onSelectTab() {},
	  onNavBtnClick: function onNavBtnClick() {},
	  getAuthCode: function getAuthCode() {},
	  openImages: function openImages() {}
	};

/***/ }

/******/ });