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

	module.exports = __webpack_require__(728);


/***/ },

/***/ 726:
/***/ function(module, exports) {

	module.exports = require("nw.gui");

/***/ },

/***/ 728:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nowWin = __webpack_require__(726).Window.get();
	var Screen = __webpack_require__(726).Screen.Init();
	module.exports = function (app, store, emitter) {
	  var platform = Screen.screens[0]['bounds'];
	  if (platform['width'] > 1440) {
	    nowWin.resizeTo(1440, 900);
	  } else {
	    nowWin.maximize();
	  }
	  nowWin.on('resize', function () {
	    store.dispatch({
	      type: 'info/changeWindow',
	      data: {
	        windowW: nowWin.width,
	        windowH: nowWin.height
	      }
	    });
	  });
	  function reloadWindow() {
	    var date = Date.parse(new Date()) / 1000;
	    var src = $('#phone-inset').attr('src').split('?')[0];
	    $('#phone-inset').attr('src', src + '?time=' + date);
	    var consoleContainer = document.getElementById('aaa');
	    consoleContainer.src = src + '?time=' + date;
	    var cdt = document.getElementById('cdt');
	    setTimeout(function () {
	      document.getElementById('aaa').showDevTools(true, cdt);
	    }, 300);
	  }
	  emitter.on('reload', reloadWindow);
	  window.addEventListener('message', function (e) {
	    if (e.data['type'] == 'changeFile') {
	      reloadWindow();
	    }
	  });
	};

/***/ }

/******/ });