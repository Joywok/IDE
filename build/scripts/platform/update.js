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

	window.newNotication = function () {
		var nowWin = gui.Screen.screens[0]['bounds'];
		var newWin = void 0;
		gui.Window.open('file://' + basurl + '/build/template/update.html', {
			x: nowWin['width'] - 375,
			y: 40,
			width: 360,
			height: 126,
			frame: false
		}, function (new_win) {
			newWin = new_win;
			newWin.on('loaded', function () {
				var target = $(newWin.window.document);
				var title = target.find('.title');
				var content = target.find('.content');
				content.html('新版本0.0.1已经准备好，立刻重启更新？');
				newWin.window.restart = function () {
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
						console.log('下载完了');
						targz().extract('a.tgz', '.', function (err) {
							if (err) console.log('Something is wrong ', err.stack);
							fsExtra.remove('a.tgz', function (err) {});
							console.log('Job done!');
						});
					}).pipe(fs.createWriteStream('a.tgz'));
				};
				newWin.window.close = function () {
					newWin.close();
				};
			});
		});
	};

/***/ }

/******/ });