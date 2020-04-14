let numbers = require('numbers');

const getNumberInRange = function(tuple) {
    if(typeof tuple !== "object" || tuple.length !== 2){
        return tuple; //ignore
    }
    return numbers.random.sample(tuple[0], tuple[1], 1)[0];
};

/**
 * Mapping function for object. Applies provided function for each property.
 * func is responsible for checking the right type.
 * @param {Object} object
 * @param {Function} func
 * @returns {Object}
 */
const mapFuncToObjProps = function(func, object){
  for(e in object){
      if(object[e]){
          object[e] = func(object[e]);
      }
      //else skip
  }
  return object;
};

module.exports = {
    getNumberInRange: getNumberInRange,
    mapFuncToObjProps: mapFuncToObjProps
};