webpackJsonp([5],{

/***/ 158:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["index"] = __webpack_require__(175);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 175:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Breadcrumb = __webpack_require__(204);
	
	var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _Breadcrumb2.default;
	module.exports = exports['default'];

/***/ },

/***/ 176:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Breadcrumb = function (_Component) {
	  _inherits(Breadcrumb, _Component);
	
	  function Breadcrumb() {
	    _classCallCheck(this, Breadcrumb);
	
	    return _possibleConstructorReturn(this, (Breadcrumb.__proto__ || Object.getPrototypeOf(Breadcrumb)).apply(this, arguments));
	  }
	
	  _createClass(Breadcrumb, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        { className: "breadcrumb" },
	        this.props.items.map(function (item, index) {
	          return _react2.default.createElement(
	            "div",
	            { className: "breadcrumb-item", key: index },
	            item.to && _react2.default.createElement(
	              "a",
	              { href: item.to },
	              item.title
	            ),
	            !item.to && _react2.default.createElement(
	              "span",
	              null,
	              item.title
	            )
	          );
	        })
	      );
	    }
	  }]);
	
	  return Breadcrumb;
	}(_react.Component);
	
	Breadcrumb.propTypes = {
	  items: _react.PropTypes.array.isRequired
	};
	exports.default = Breadcrumb;
	module.exports = exports["default"];

/***/ },

/***/ 204:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["Breadcrumb"] = __webpack_require__(176);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 355:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(158);


/***/ }

},[355]);