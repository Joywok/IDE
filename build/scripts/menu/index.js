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

	module.exports = __webpack_require__(687);


/***/ },

/***/ 686:
/***/ function(module, exports) {

	module.exports = require("nw.gui");

/***/ },

/***/ 687:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (emitter) {
		var gui = __webpack_require__(686);

		if (platform == 'mac') {
			var menu = new gui.Menu({ type: 'menubar' });
			var menuItems = new gui.Menu();
			var _platform = 'darwin' === process.platform ? 'cmd' : 'ctrl';
			menuItems.append(new gui.MenuItem({
				label: '项目重建',
				key: 'B',
				modifiers: _platform,
				click: function click() {}
			}));
			menuItems.append(new gui.MenuItem({
				label: '刷新',
				key: 'R',
				modifiers: _platform,
				click: function click() {
					emitter.emit('reload');
				}
			}));
			menuItems.append(new gui.MenuItem({
				label: '后退',
				key: 'Left',
				modifiers: _platform,
				click: function click() {}
			}));
			menuItems.append(new gui.MenuItem({
				label: '前进',
				key: 'Right',
				modifiers: _platform,
				click: function click() {}
			}));
			menuItems.append(new gui.MenuItem({
				type: 'separator'
			}));
			menuItems.append(new gui.MenuItem({
				label: '设置',
				click: function click() {}
			}));
			menu.createMacBuiltin('App', {
				// hideEdit: true,
				hideWindow: true
			});
			menu.append(new gui.MenuItem({
				label: '动作',
				submenu: menuItems
			}));
			gui.Window.get().menu = menu;
		} else {
			var gui = __webpack_require__(686);
			var item;

			// Create a separator
			item = new gui.MenuItem({ type: 'separator' });

			// Create a normal item with label and icon
			item = new gui.MenuItem({
				type: "normal",
				label: "I'm a menu item",
				icon: "img/icon.png"
			});

			// Or you can omit the 'type' field for normal items
			item = new gui.MenuItem({ label: 'Simple item' });

			// Bind a callback to item
			item = new gui.MenuItem({
				label: "Click me",
				click: function click() {
					console.log("I'm clicked");
				},
				key: "s",
				modifiers: "ctrl-alt"
			});

			// You can have submenu!
			var submenu = new gui.Menu();
			submenu.append(new gui.MenuItem({ label: 'Item 1' }));
			submenu.append(new gui.MenuItem({ label: 'Item 2' }));
			submenu.append(new gui.MenuItem({ label: 'Item 3' }));
			item.submenu = submenu;

			// And everything can be changed at runtime
			item.label = 'New label';
			item.click = function () {
				console.log('New click callback');
			};
		}
	};

/***/ }

/******/ });