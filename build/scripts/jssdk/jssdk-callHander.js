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
/******/ 	__webpack_require__.p = "/build/scripts/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(692);


/***/ },

/***/ 692:
/***/ function(module, exports) {

	'use strict';

	function initBridge() {
	  this.init = function (callback) {
	    callback('xxxxx', function () {});
	  };
	  this.callHandler = function (func_name, data, callback) {
	    console.log(func_name, data);
	  };
	  this.registerHandler = function () {}, this.setTitle = function () {};
	  this.checkJsApi = function () {};
	  this.getInfo = function () {};
	  this.pushWebView = function () {};
	  this.newWebView = function () {};
	  this.closeWebView = function () {};
	  this.setFuncBtns = function () {};
	  this.setFuncBtnStatus = function () {};
	  this.showTabs = function () {};
	  this.hideTabs = function () {};
	  this.mailto = function () {};
	  this.back = function () {};
	  this.AuthCode = function () {};
	  return this;
	}
	window.JoywokMobileApp = window.WebViewJavascriptBridge = new initBridge();

/***/ }

/******/ });