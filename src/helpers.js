import Blazy from 'blazy';

/*
* Blazy Singleton
*/
export const BlazyWrapper = (()=> {
  let instance = null;
  const getInstance = (config, success = (() => {})) => {
    if (!instance) {
      instance = new Blazy(Object.assign(
        {},
        config,
        { success }
      ));
    } else {
      success();
    }
    return instance;
  };

  return { getInstance };
})();

/**
* Extracts all the props except the ones in the a blacklist collection.
*
* @param {Object} source the target object
* @param {Array<string>} ignoredProps properties to be ignored.
*
* @return {Object} a subset of the object with the allowed properties
*/
export const omit = (source, ignoredProps) => {
  return Object.keys(source).reduce((result, prop) => {
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
export const transformCase = (str) => str;

/**
* Constructs the name of the data source properties for Blazy
*
* @param {string} key name of the breakpoint
*
* @return {string} the constructed data source property
*/
export const sourceProp = key => `data-src-${transformCase(key)}`;

export default {
  BlazyWrapper,
  omit,
  transformCase,
  sourceProp,
};
