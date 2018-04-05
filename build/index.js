'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PLACEHOLDER_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
var IGNORED_PROPS = ['sources', 'breakpoints'];
var LOADED_CLASS = 'b-loaded';

var LazyResponsiveImage = function (_Component) {
  _inherits(LazyResponsiveImage, _Component);

  function LazyResponsiveImage(props) {
    _classCallCheck(this, LazyResponsiveImage);

    var _this = _possibleConstructorReturn(this, (LazyResponsiveImage.__proto__ || Object.getPrototypeOf(LazyResponsiveImage)).call(this, props));

    _this.loadImage = _this.loadImage.bind(_this);
    _this.state = { loaded: false };
    return _this;
  }

  _createClass(LazyResponsiveImage, [{
    key: 'getMediaSources',
    value: function getMediaSources() {
      var _this2 = this;

      return Object.keys(this.props.sources).reduce(function (result, k) {
        result[(0, _helpers.sourceProp)(k)] = _this2.props.sources[k];
        return result;
      }, {});
    }
  }, {
    key: 'loadImage',
    value: function loadImage() {
      var _this3 = this;

      var config = {
        breakpoints: Object.keys(this.props.breakpoints).filter(function (k) {
          return _this3.props.sources[k];
        }).map(function (k) {
          return {
            width: _this3.props.breakpoints[k],
            src: (0, _helpers.sourceProp)(k)
          };
        })
      };

      var blazy = _helpers.BlazyWrapper.getInstance(config);

      setTimeout(function () {
        blazy.load(_this3.refs.image);
        _this3.setState({ loaded: true });
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadImage();
    }
  }, {
    key: 'render',
    value: function render() {
      var sources = this.getMediaSources();
      var injectingProps = (0, _helpers.omit)(this.props, IGNORED_PROPS);
      var loadedClass = this.state.loaded ? LOADED_CLASS : '';
      return _react2.default.createElement('img', _extends({}, injectingProps, sources, {
        className: 'b-lazy ' + this.props.className + ' ' + loadedClass,
        ref: 'image',
        src: PLACEHOLDER_IMAGE,
        'data-src': this.props.src
      }));
    }
  }]);

  return LazyResponsiveImage;
}(_react.Component);

var DEFAULT_BREAKPOINTS = {
  small: 600,
  medium: 900,
  large: 1200,
  huge: 1800
};

LazyResponsiveImage.defaultProps = {
  src: '',
  className: '',
  sources: {},
  breakpoints: DEFAULT_BREAKPOINTS
};

LazyResponsiveImage.propTypes = _defineProperty({
  src: _propTypes2.default.string.isRequired,
  sources: _propTypes2.default.instanceOf(Object),
  breakpoints: _propTypes2.default.instanceOf(Object)
}, 'src', _propTypes2.default.string);

exports.default = LazyResponsiveImage;