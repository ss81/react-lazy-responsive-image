'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sourceProp = exports.transformCase = exports.omit = exports.BlazyWrapper = undefined;

var _blazy = require('blazy');

var _blazy2 = _interopRequireDefault(_blazy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* Blazy Singleton
*/
var BlazyWrapper = exports.BlazyWrapper = function () {
  var instance = null;
  var getInstance = function getInstance(config) {
    var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    if (!instance) {
      instance = new _blazy2.default(Object.assign({}, config, { success: success }));
    } else {
      success();
    }
    return instance;
  };

  return { getInstance: getInstance };
}();

/**
* Extracts all the props except the ones in the a blacklist collection.
*
* @param {Object} source the target object
* @param {Array<string>} ignoredProps properties to be ignored.
*
* @return {Object} a subset of the object with the allowed properties
*/
var omit = exports.omit = function omit(source, ignoredProps) {
  return Object.keys(source).reduce(function (result, prop) {
    if (ignoredProps.indexOf(prop) < 0) {
      result[prop] = source[prop];
    }
    return result;
  }, {});
};

/**
* Transforms the case from camelcase to a dash case
*
* @param {string} str target string
*
* @return {string} the string after being transformed
*/
var transformCase = exports.transformCase = function transformCase(str) {
  return str;
};

/**
* Constructs the name of the data source properties for Blazy
*
* @param {string} key name of the breakpoint
*
* @return {string} the constructed data source property
*/
var sourceProp = exports.sourceProp = function sourceProp(key) {
  return 'data-src-' + transformCase(key);
};

exports.default = {
  BlazyWrapper: BlazyWrapper,
  omit: omit,
  transformCase: transformCase,
  sourceProp: sourceProp
};