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

	module.exports = __webpack_require__(693);


/***/ },

/***/ 402:
/***/ function(module, exports) {

	module.exports = require("child_process");

/***/ },

/***/ 687:
/***/ function(module, exports) {

	module.exports = require("nw.gui");

/***/ },

/***/ 693:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nowVersion = ide.verion;
	window.AppRestart = function () {
		var child,
		    child_process = __webpack_require__(402),
		    gui = __webpack_require__(687),
		    win = gui.Window.get();
		if (process.platform == "darwin") {
			child = child_process.spawn("open", ["-n", "-a", process.execPath.match(/^([^\0]+?\.app)\//)[1]], { detached: true });
		} else {
			child = child_process.spawn(process.execPath, [], { detached: true });
		}
		child.unref();
		win.hide();
		gui.App.quit();
	};
	window.newNotication = function () {
		var nowWin = gui.Screen.screens[0]['bounds'];
		var newWin = void 0;
		gui.Window.open('file://' + basurl + '/build/template/update.html', {
			// position:"center",
			x: nowWin['width'] - 375,
			y: 40,
			width: 360,
			height: 126,
			frame: false
		}, function (new_win) {
			newWin = new_win;
			newWin.on('document-end', function () {
				var target = $(newWin.window.document);
				var title = target.find('.title');
				var content = target.find('.content');
				content.html('新版本' + nowVersion + '已经准备好，立刻重启更新？');
				newWin.window.restart = function () {
					targz().extract('update.tgz', '.', function (err) {
						if (err) console.log('Something is wrong ', err.stack);
						fsExtra.remove('update.tgz', function (err) {});
						console.log('Job done!');
						newWin.close();
						window.AppRestart();
					});
				};
				newWin.window.close = function () {
					newWin.close();
				};
			});
		});
	};
	window.UpdateDownload = function () {
		var body = "";
		var cur = 0;
		var len = 0;
		var data = [];
		request.get('http://192.168.1.73/test/a.tgz').on('response', function (data) {
			len = parseInt(data.headers['content-length']);
		}).on("data", function (chunk) {
			data.push(chunk);
			body += chunk;
			cur += chunk.length;
			console.log("Downloading " + parseInt(100.0 * cur / len) + "% ");
		}).on('end', function () {
			window.newNotication();
		}).pipe(fs.createWriteStream('update.tgz'));
	};

	window.checkVersion = function () {
		request.get('http://192.168.1.73/ide/version/check').on('end', function (data) {
			if (ide.verion != data) {
				nowVersion = data;
				window.UpdateDownload();
			}
		});
	};

/***/ }

/******/ });