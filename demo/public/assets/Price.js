webpackJsonp([4],{

/***/ 162:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["index"] = __webpack_require__(184);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 184:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Price = __webpack_require__(212);
	
	var _Price2 = _interopRequireDefault(_Price);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _Price2.default;
	module.exports = exports['default'];

/***/ },

/***/ 185:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var currencyMapping = {
	  USD: '$',
	  EUR: '€'
	};
	
	/**
	 * Render a number as a price. Position of currency is controlled
	 * by locale.
	 */
	
	var Price = function (_React$Component) {
	  _inherits(Price, _React$Component);
	
	  function Price() {
	    _classCallCheck(this, Price);
	
	    return _possibleConstructorReturn(this, (Price.__proto__ || Object.getPrototypeOf(Price)).apply(this, arguments));
	  }
	
	  _createClass(Price, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          currency = _props.currency,
	          decimalPlaces = _props.decimalPlaces,
	          fallback = _props.fallback,
	          locale = _props.locale;
	
	      var currencySign = currencyMapping[currency];
	      var currencyTag = _react2.default.createElement('span', { key: 'currency', className: 'currency', dangerouslySetInnerHTML: { __html: currencySign } });
	      var value = this.props.value;
	
	
	      if (!value && fallback) {
	        return _react2.default.createElement(
	          'span',
	          { className: 'price' },
	          fallback
	        );
	      }
	
	      value = value || 0;
	
	      var price = [numberFormatting(value, locale, decimalPlaces)];
	
	      if (['en-us', 'en'].includes(locale)) {
	        price.unshift(currencyTag);
	      } else {
	        price.push(currencyTag);
	      }
	
	      return _react2.default.createElement(
	        'span',
	        { className: 'price' },
	        price
	      );
	    }
	  }]);
	
	  return Price;
	}(_react2.default.Component);
	
	Price.propTypes = {
	  value: _react.PropTypes.number,
	  currency: _react.PropTypes.oneOf(['EUR', 'USD']),
	  locale: _react.PropTypes.oneOf(['en', 'de', 'en-us']).isRequired,
	  decimalPlaces: _react.PropTypes.number,
	  /**
	   * gets displayed when value is falsy (0, undefined, null)
	   */
	  fallback: _react.PropTypes.string
	};
	Price.defaultProps = {
	  decimalPlaces: 0,
	  currency: 'EUR',
	  locale: 'en'
	};
	exports.default = Price;
	
	
	function numberFormatting(number, locale, decimalPlaces) {
	  return _react2.default.createElement(
	    'span',
	    { key: 'number' },
	    format(number, locale, decimalPlaces)
	  );
	}
	
	function format(n) {
	  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
	  var decimalPlaces = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	
	  var fractionalCapacity = Math.pow(10, decimalPlaces);
	  var rounded = Math.round(n * fractionalCapacity) / fractionalCapacity;
	  var roundedAsString = String(parseFloat(rounded).toFixed(decimalPlaces));
	  var currenctSeparator = roundedAsString.indexOf('.') > -1 ? '.' : ',';
	
	  var _String$split = String(roundedAsString).split(currenctSeparator),
	      _String$split2 = _slicedToArray(_String$split, 2),
	      integer = _String$split2[0],
	      fractional = _String$split2[1];
	
	  var result = formatThousands(integer, locale);
	
	  if (fractional) {
	    var separator = ['en-us', 'en'].indexOf(locale) > -1 ? '.' : ',';
	    result = result.concat(separator, fractional);
	  }
	  return result;
	}
	
	function formatThousands(value, locale) {
	  var sep = '$1.';
	  if (['en-us', 'en'].indexOf(locale) !== -1) {
	    sep = '$1,';
	  }
	  return String(Math.floor(value)).replace(/(\d)(?=(\d{3})+$)/g, sep);
	}
	module.exports = exports['default'];

/***/ },

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["Price"] = __webpack_require__(185);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 372:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(162);


/***/ }

},[372]);