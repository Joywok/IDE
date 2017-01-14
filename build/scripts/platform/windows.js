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

	module.exports = __webpack_require__(689);


/***/ },

/***/ 687:
/***/ function(module, exports) {

	module.exports = require("nw.gui");

/***/ },

/***/ 689:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nowWin = __webpack_require__(687).Window.get();
	var Screen = __webpack_require__(687).Screen.Init();
	window.phoneInset;
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
	    // let src = $('#phone-inset').attr('src').split('?')[0];
	    $('#phone-inset').attr('src', 'http://127.0.0.1:10000?time=' + date);
	    var consoleContainer = document.getElementById('phone-inset');
	    consoleContainer.src = 'http://127.0.0.1:10000?time=' + date;
	    store.dispatch({
	      type: 'info/resetNormal'
	    });
	    setTimeout(function () {
	      document.getElementById('phone-inset').showDevTools(true, document.getElementById('cdt'));
	    }, 0);
	  }
	  emitter.on('reload', reloadWindow);
	  window.addEventListener('message', function (e) {
	    var type = e.data['type'];
	    var data = e.data;
	    if (type == 'changeFile') {
	      reloadWindow();
	    } else if (type == 'changePhone') {
	      switch (data['phoneType']) {
	        case "setTitle":
	          store.dispatch({
	            type: 'info/changeTitle',
	            data: data['data']['title']
	          });
	          break;
	        case "setFuncBtns":
	          store.dispatch({
	            type: 'info/setFuncBtns',
	            data: data['data']['buttons']
	          });
	          break;
	        case "setFuncBtnStatus":
	          store.dispatch({
	            type: 'info/setFuncBtnStatus',
	            data: {
	              type: data['data']['type'],
	              disabled: data['data']['status']
	            }
	          });
	          break;
	        case "showTabs":
	          store.dispatch({
	            type: 'info/showTabs',
	            data: data['data']
	          });
	          break;
	        case "hideTabs":
	          store.dispatch({
	            type: 'info/hideTabs'
	          });
	          break;
	        default:
	          break;
	      }
	    } else if (type == "phoneInsetInit") {
	      if (!window.phoneInset) {
	        window.phoneInset = e.source;
	      }
	    } else if (type == "phoneFile") {
	      if (data['phoneType'] == 'choseFile') {
	        $('.phone-specail').html('<input style="display:none;" id="fileDialog" type="file" accept=".png,.gif,.jpg,.jpeg" />');
	        var chooser = $('#fileDialog');
	        chooser.unbind('change cancel');
	        chooser.change(function (evt) {
	          phoneInset.postMessage({
	            type: 'callback',
	            data: '{"errMsg":"choseFile:ok","localFiles":[{"id":"http://blogs-1774886889.cn-north-1.elb.amazonaws.com.cn/siteconsole/public/images/blog/article/1AdnlO_resize.jpeg","type":"image/jpeg"},{"id":"http://blogs-1774886889.cn-north-1.elb.amazonaws.com.cn/siteconsole/public/images/blog/article/1B5Rto_resize.png","type":"image/png"}]}'
	          }, '*');
	        });
	        chooser.on("cancel", function (evt) {
	          phoneInset.postMessage({
	            type: 'callback',
	            data: '{"errMsg":"choseFile:cancel"}'
	          }, '*');
	        });
	        chooser.click();
	      } else if (data['phoneType'] == 'xxxxx') {}
	    }
	  });
	};

/***/ }

/******/ });