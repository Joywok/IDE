webpackJsonp([3],{

/***/ 723:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(296);

	var _redux = __webpack_require__(201);

	var _reactRedux = __webpack_require__(194);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var request = __webpack_require__(711);

	module.exports = function () {
		var data = {};
		function App() {
			var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : data;
			var action = arguments[1];

			switch (action.type) {
				default:
					return state;
			}
		}

		var Controller = function (_Component) {
			_inherits(Controller, _Component);

			function Controller() {
				_classCallCheck(this, Controller);

				return _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).apply(this, arguments));
			}

			_createClass(Controller, [{
				key: 'render',
				value: function render() {
					return _react2.default.createElement(
						'div',
						{ className: '' },
						'Project'
					);
				}
			}]);

			return Controller;
		}(_react.Component);

		function select(state) {
			return state;
		}
		var RootApp = (0, _reactRedux.connect)(select)(Controller);
		var store = (0, _redux.createStore)(App);

		var Main = function (_Component2) {
			_inherits(Main, _Component2);

			function Main() {
				_classCallCheck(this, Main);

				return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
			}

			_createClass(Main, [{
				key: 'render',
				value: function render() {
					return _react2.default.createElement(
						_reactRedux.Provider,
						{ store: store },
						_react2.default.createElement(RootApp, null)
					);
				}
			}]);

			return Main;
		}(_react.Component);

		return Main;
	}();

/***/ }

});