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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	$.notice = function (options) {
	  var self = this;
	  var sysBar = $('<div class="notice-bar style-' + options.type + '" style="z-index:' + options.zIndex + '">\
								<div class="notice-bar-w">\
									<span class="notice-bar-c">' + options.text + '</span>\
								</div>\
							</div>');
	  $('body').prepend(sysBar);
	  setTimeout(function () {
	    sysBar.addClass('moveing');
	    options.delay && setTimeout(function () {
	      sysBar.remove();
	    }, options.delay);
	  }, 10);
	};
	window.Store = function (name) {
	  this.name = name;
	  var store = localStorage.getItem(this.name);
	  this.data = store && JSON.parse(store) || {};
	};
	_.extend(Store.prototype, {

	  // Save the current state of the **Store** to *localStorage*.
	  save: function save() {
	    localStorage.setItem(this.name, JSON.stringify(this.data));
	  },

	  // Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
	  // have an id of it's own.
	  create: function create(model) {
	    if (!model.id) model.id = model.attributes.id = guid();
	    this.data[model.id] = model;
	    this.save();
	    return model;
	  },

	  // Update a model by replacing its copy in `this.data`.
	  update: function update(model) {
	    var self = this;
	    this.data[model.id] = model;
	    this.save();
	    return model;
	  },

	  // Retrieve a model from `this.data` by id.
	  find: function find(model) {
	    return this.data[model.id];
	  },

	  // Return the array of all models currently in storage.
	  findAll: function findAll() {
	    return _.values(this.data);
	  },

	  // Delete a model from `this.data`, returning it.
	  destroy: function destroy(model) {
	    delete this.data[model.id];
	    this.save();
	    return model;
	  }

	});

/***/ }
/******/ ]);