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

	module.exports = __webpack_require__(495);


/***/ },

/***/ 488:
/***/ function(module, exports) {

	module.exports = require("nw.gui");

/***/ },

/***/ 495:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nowWin = __webpack_require__(488).Window.get();
	window.phoneInset;
	window.EditorTarget;
	module.exports = function (app, store, emitter) {
	  var platformWindow = Screen.screens[0]['bounds'];
	  if (platformWindow['width'] > 1440) {
	    nowWin.resizeTo(1440, 900);
	    // if(platformWindow['width'] == 1440){
	    //   nowWin.maximize();
	    //   nowWin.moveTo(0,0);
	    // }else{
	    nowWin.moveTo((platformWindow['width'] - 1440) / 2, (platformWindow['height'] - 900) / 2);
	    // }
	  } else {
	    if (platformWindow['width'] == '1440') {
	      if (platform == 'win') {
	        nowWin.maximize();
	      } else {
	        nowWin.maximize();
	        nowWin.moveTo(0, 0);
	      }
	    } else {
	      nowWin.maximize();
	    }
	  }
	  var time = void 0;
	  nowWin.on('resize', function () {
	    clearTimeout(time);
	    time = setTimeout(function () {
	      store.dispatch({
	        type: 'info/changeWindow',
	        data: {
	          windowW: nowWin.width,
	          windowH: nowWin.height
	        }
	      });
	    }, 400);
	  });
	  // function reloadWindow(){
	  //   console.log(window.project,'222222222222');
	  //   let date = Date.parse(new Date())/1000;
	  //   // let src = $('#phone-inset').attr('src').split('?')[0];
	  //   $('#phone-inset').attr('src','http://127.0.0.1:'+nodeServerPort+'?time='+date);
	  //   let consoleContainer = document.getElementById('phone-inset');
	  //   consoleContainer.src = 'http://127.0.0.1:'+nodeServerPort+'?time='+date;
	  //   store.dispatch({
	  //     type:'info/resetNormal',
	  //   })
	  //   setTimeout(function(){
	  //     document.getElementById('phone-inset').showDevTools(true, document.getElementById('cdt'));   
	  //   },0)
	  // }
	  // emitter.on('reload',reloadWindow)
	  window.addEventListener('message', function (e) {
	    var type = e.data['type'];
	    var data = e.data;
	    if (type == 'changeFile') {
	      // reloadWindow();
	      emitter.emit('phoneReload');
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