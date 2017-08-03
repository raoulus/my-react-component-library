webpackJsonp([5],{

/***/ 160:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["index"] = __webpack_require__(179);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 179:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Image = __webpack_require__(209);
	
	var _Image2 = _interopRequireDefault(_Image);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _Image2.default;
	module.exports = exports['default'];

/***/ },

/***/ 180:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
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
	
	/**
	 * Render lot images based on a resource-ID
	 */
	var Image = function (_Component) {
	  _inherits(Image, _Component);
	
	  function Image(props) {
	    _classCallCheck(this, Image);
	
	    var _this = _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this, props));
	
	    _this.sizes = {
	      tiny: {
	        width: 80,
	        height: 60
	      },
	      small: {
	        width: 120,
	        height: 90
	      },
	      medium: {
	        width: 180,
	        height: 135
	      },
	      large: {
	        width: 380,
	        height: 300
	      },
	      squareSmall: {
	        width: 95,
	        height: 95
	      }
	    };
	    return _this;
	  }
	
	  _createClass(Image, [{
	    key: 'getWidth',
	    value: function getWidth(type) {
	      return this.sizes[type].width;
	    }
	  }, {
	    key: 'getHeight',
	    value: function getHeight(type) {
	      return this.sizes[type].height;
	    }
	  }, {
	    key: 'getImageUrl',
	    value: function getImageUrl() {
	      var _props = this.props,
	          resourceId = _props.resourceId,
	          type = _props.type,
	          rootUrl = _props.rootUrl,
	          border = _props.border;
	
	      var borderWidth = border * 2;
	      var imageSize = this.getWidth(type) - borderWidth + 'x' + (this.getHeight(type) - borderWidth) + '-tyc';
	      var imagePath = resourceId.substr(0, 2) + '/' + resourceId.substr(2, 2) + '/' + resourceId.substr(4);
	      return rootUrl + '/resources/' + imageSize + '/' + imagePath;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props,
	          type = _props2.type,
	          className = _props2.className,
	          placeholderClassName = _props2.placeholderClassName;
	
	      var url = this.getImageUrl();
	      var divStyle = {
	        width: this.getWidth(type),
	        height: this.getHeight(type)
	      };
	      return _react2.default.createElement(
	        'div',
	        { className: placeholderClassName, style: divStyle },
	        url && _react2.default.createElement('img', { src: url, alt: this.props.alt, className: className, title: this.props.title })
	      );
	    }
	  }]);
	
	  return Image;
	}(_react.Component);
	
	Image.propTypes = {
	  alt: _react.PropTypes.string,
	  border: _react.PropTypes.number,
	  className: _react.PropTypes.string,
	  placeholderClassName: _react.PropTypes.string,
	  resourceId: _react.PropTypes.string.isRequired,
	  rootUrl: _react.PropTypes.string,
	  title: _react.PropTypes.string,
	  type: _react.PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'squareSmall']).isRequired
	};
	Image.defaultProps = {
	  border: 0,
	  className: 'lot-image',
	  placeholderClassName: 'placeholder',
	  rootUrl: 'https://localhost',
	  type: 'tiny'
	};
	exports.default = Image;
	module.exports = exports['default'];

/***/ },

/***/ 209:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["Image"] = __webpack_require__(180);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 370:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(160);


/***/ }

},[370]);