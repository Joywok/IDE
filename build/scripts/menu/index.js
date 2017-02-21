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

	module.exports = __webpack_require__(492);


/***/ },

/***/ 488:
/***/ function(module, exports) {

	module.exports = require("nw.gui");

/***/ },

/***/ 492:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (emitter) {
		var gui = __webpack_require__(488);
		var nowWin = gui.Window.get();
		var tray = new gui.Tray({
			icon: platform == "mac" ? 'build/images/icon-64.icns' : 'build/images/icon-32.png',
			alticon: true
		}); //window下面可以
		tray.tooltip = '点击打开';
		tray.on('click', function () {
			nowWin.show();
		});
		var platformKey = 'darwin' === process.platform ? 'cmd' : 'ctrl';
		var menuItems = new gui.Menu();
		// menuItems.append(new gui.MenuItem({ 
		// 	label: '项目重建',
		// 	key: 'B',
		// 	modifiers:platformKey,
		// 	click:function(){
		// 	}
		// }));
		menuItems.append(new gui.MenuItem({
			label: '刷新',
			key: 'R',
			modifiers: platformKey,
			click: function click() {
				emitter.emit('phoneReload');
			}
		}));
		// menuItems.append(new gui.MenuItem({ 
		// 	label: '后退',
		// 	key: 'Left',
		// 	modifiers:platformKey,
		// 	click:function(){
		// 	}
		// }));
		// menuItems.append(new gui.MenuItem({ 
		// 	label: '前进',
		// 	key: 'Right',
		// 	modifiers:platformKey,
		// 	click:function(){
		// 	}
		// }));
		// menuItems.append(new gui.MenuItem({ 
		// 	type: 'separator'
		// }));
		// menuItems.append(new gui.MenuItem({ 
		// 	label: '设置',
		// 	click:function(){
		// 	}
		// }));
		if (platform == 'mac') {
			var menu = new gui.Menu({ type: 'menubar' });
			menu.createMacBuiltin('App', {
				// hideEdit: true,
				// hideWindow: true
			});
			menu.append(new gui.MenuItem({
				label: '动作',
				submenu: menuItems
			}));
			gui.Window.get().menu = menu;
		} else {

			tray.menu = menuItems;
		}
	};

/***/ }

/******/ });