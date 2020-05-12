(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = require('./lib/numbers.js');

},{"./lib/numbers.js":2}],2:[function(require,module,exports){
/**
 * numbers.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var numbers = exports;


// Expose methods
numbers.basic = require('./numbers/basic');
numbers.calculus = require('./numbers/calculus');
numbers.complex = require('./numbers/complex');
numbers.dsp = require('./numbers/dsp');
numbers.matrix = require('./numbers/matrix');
numbers.prime = require('./numbers/prime');
numbers.statistic = require('./numbers/statistic');
numbers.generate = require('./numbers/generators');
numbers.random = require('./numbers/random');

/**
 * @property {Number} EPSILON Epsilon (error bound) to be used
 * in calculations. Can be set and retrieved freely.
 *
 * Given the float-point handling by JavaScript, as well as
 * the numbersal proficiency of some methods, it is common
 * practice to include a bound by which discrepency between
 * the "true" answer and the returned value is acceptable.
 *
 * If no value is provided, 0.001 is default.
 */
numbers.EPSILON = 0.001;

},{"./numbers/basic":3,"./numbers/calculus":4,"./numbers/complex":5,"./numbers/dsp":6,"./numbers/generators":7,"./numbers/matrix":8,"./numbers/prime":9,"./numbers/random":10,"./numbers/statistic":11}],3:[function(require,module,exports){
/**
 * basic.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var basic = exports;

/**
 * Determine the summation of numbers in a given array.
 *
 * @param {Array} collection of numbers.
 * @return {Number} sum of numbers in array.
 */
basic.sum = function (arr) {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    var total = 0;
    for (var i = 0; i < arr.length; i++) {
      if (typeof (arr[i]) === 'number') {
        total = total + arr[i];
      } else {
        throw new Error('All elements in array must be numbers');
      }
    }
    return total;
  } else {
    throw new Error('Input must be of type Array');
  }
};

/**
 * Subtracts elements from one another in array.
 *
 * e.g [5,3,1,-1] -> 5 - 3 - 1 - (-1) = 2
 *
 * @param {Array} collection of numbers.
 * @return {Number} difference.
 */
basic.subtraction = function (arr) {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    var total = arr[0];
    if (typeof (total) !== 'number') {
      throw new Error('All elements in array must be numbers');
    }
    for (var i = 1, length = arr.length; i < length; i++) {
      if (typeof (arr[i]) === 'number') {
        total -= arr[i];
      } else {
        throw new Error('All elements in array must be numbers');
      }
    }
    return total;
  } else {
    throw new Error('Input must be of type Array');
  }
};

/**
 * Product of all elements in an array.
 *
 * @param {Array} collection of numbers.
 * @return {Number} product.
 */
basic.product = function (arr) {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    var total = arr[0];
    if (typeof (total) !== 'number') {
      throw new Error('All elements in array must be numbers');
    }
    for (var i = 1, length = arr.length; i < length; i++) {
      if (typeof (arr[i]) === 'number') {
        total = total * arr[i];
      } else {
        throw new Error('All elements in array must be numbers');
      }
    }
    return total;
  } else {
    throw new Error('Input must be of type Array');
  }
};

/**
 * Return the square of any value.
 *
 * @param {Number} number
 * @return {Number} square of number
 */
basic.square = function (num) {
  if (typeof (num) !== 'number') {
    throw new Error('Input must be a number.');
  } else {
    return num * num;
  }

};

/**
 * Calculate the binomial coefficient (n choose k)
 *
 * @param {Number} available choices
 * @param {Number} number chosen
 * @return {Number} number of possible choices
 */
basic.binomial = function (n, k) {

  var arr = [];

  function _binomial(n, k) {
    if (typeof (n) !== 'number' && typeof (k) !== 'number') {
      throw new Error('Input must be a number.');
    }
    if (n >= 0 && k === 0) return 1;
    if (n === 0 && k > 0) return 0;
    if (arr[n] && arr[n][k] > 0) return arr[n][k];
    if (!arr[n]) arr[n] = [];

    arr[n][k] = _binomial(n - 1, k - 1) + _binomial(n - 1, k);
    return arr[n][k];
  }

  return _binomial(n, k);
};

/**
 * Factorial for some integer.
 *
 * @param {Number} integer.
 * @return {Number} result.
 */
basic.factorial = function (num) {
  if (typeof (num) !== 'number') throw new Error("Input must be a number.");
  if (num < 0) throw new Error("Input must not be negative.");
  var i = 2,
    o = 1;

  while (i <= num) {
    o *= i++;
  }

  return o;
};

/**
 * Calculate the greastest common divisor amongst two integers.
 *
 * @param {Number} number A.
 * @param {Number} number B.
 * @return {Number} greatest common divisor for integers A, B.
 */
basic.gcd = function (a, b) {
  var c;
  a = +a;
  b = +b;
  // Same as isNaN() but faster
  if (a !== a || b !== b) {
    return NaN;
  }
  //Same as !isFinite() but faster
  if (a === Infinity || a === -Infinity || b === Infinity || b === -Infinity) {
    return Infinity;
  }
  // Checks if a or b are decimals
  if ((a % 1 !== 0) || (b % 1 !== 0)) {
    throw new Error("Can only operate on integers");
  }
  while (b) {
    c = a % b;
    a = b;
    b = c;
  }
  return (0 < a) ? a : -a;
};

/**
 * Calculate the least common multiple amongst two integers.
 *
 * @param {Number} number A.
 * @param {Number} number B.
 * @return {Number} least common multiple for integers A, B.
 */
basic.lcm = function (num1, num2) {
  return Math.abs(num1 * num2) / basic.gcd(num1, num2);
};

/**
 * Retrieve a specified quantity of elements from an array, at random.
 *
 * @param {Array} set of values to select from.
 * @param {Number} quantity of elements to retrieve.
 * @param {Boolean} allow the same number to be returned twice.
 * @return {Array} random elements.
 */
basic.random = function (arr, quant, allowDuplicates) {
  if (arr.length === 0) {
    throw new Error('Empty array');
  } else if (quant > arr.length && !allowDuplicates) {
    throw new Error('Quantity requested exceeds size of array');
  }

  if (allowDuplicates === true) {
    var result = [],
      i;
    for (i = 0; i < quant; i++) {
      result[i] = arr[Math.floor(Math.random() * arr.length)];
    }
    return result;
  } else {
    return basic.shuffle(arr).slice(0, quant);
  }
};

/**
 * Shuffle an array, in place.
 *
 * @param {Array} array to be shuffled.
 * @return {Array} shuffled array.
 */
basic.shuffle = function (array) {
  var m = array.length,
    t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

/**
 * Find maximum value in an array.
 *
 * @param {Array} array to be traversed.
 * @return {Number} maximum value in the array.
 */
basic.max = function (arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be of type Array");
  }
  var max = -Infinity,
    val;
  for (var i = 0, len = arr.length; i < len; i++) {
    val = +arr[i];
    if (max < val) {
      max = val;
    }
    // Math.max() returns NaN if one of the elements is not a number.
    if (val !== val) {
      return NaN;
    }
  }
  return max;
};

/**
 * Find minimum value in an array.
 *
 * @param {Array} array to be traversed.
 * @return {Number} minimum value in the array.
 */
basic.min = function (arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be of type Array");
  }
  var min = +Infinity,
    val;
  for (var i = 0, len = arr.length; i < len; i++) {
    val = +arr[i];
    if (val < min) {
      min = val;
    }
    // Math.min() returns NaN if one of the elements is not a number.
    if (val !== val) {
      return NaN;
    }
  }
  return min;
};


/**
 * Create a range of numbers.
 *
 * @param {Number} The start of the range.
 * @param {Number} The end of the range.
 * @return {Array} An array containing numbers within the range.
 */
basic.range = function (start, stop, step) {
  var array, i = 0,
    len;

  if (arguments.length <= 1) {
    stop = start || 0;
    start = 0;
  }

  step = step || 1;

  if (stop < start) {
    step = 0 - Math.abs(step);
  }

  len = Math.max(Math.ceil((stop - start) / step) + 1, 0);

  array = new Array(len);

  while (i < len) {
    array[i++] = start;
    start += step;
  }

  return array;
};

/**
 * Determine if the number is an integer.
 *
 * @param {Number} the number
 * @return {Boolean} true for int, false for not int.
 */
basic.isInt = function (n) {
  return n % 1 === 0;
};

/**
 * Calculate the divisor and modulus of two integers.
 *
 * @param {Number} int a.
 * @param {Number} int b.
 * @return {Array} [div, mod].
 */
basic.divMod = function (a, b) {
  if (b <= 0) throw new Error("b cannot be zero. Undefined.");
  if (!basic.isInt(a) || !basic.isInt(b)) throw new Error("A or B are not integers.");
  return [Math.floor(a / b), a % b];
};

/**
 * Calculate:
 * if b >= 1: a^b mod m.
 * if b = -1: modInverse(a, m).
 * if b < 1: finds a modular rth root of a such that b = 1/r.
 *
 * @param {Number} Number a.
 * @param {Number} Number b.
 * @param {Number} Modulo m.
 * @return {Number} see the above documentation for return values.
 */
basic.powerMod = function (a, b, m) {
  if (typeof (a) !== 'number' || typeof (b) !== 'number' || typeof (m) !== 'number') throw new Error("Inputs must be numbers.");
  // If b < -1 should be a small number, this method should work for now.
  if (b < -1) return Math.pow(a, b) % m;
  if (b === 0) return 1 % m;
  if (b >= 1) {
    var result = 1;
    while (b > 0) {
      if ((b % 2) === 1) {
        result = (result * a) % m;
      }

      a = (a * a) % m;
      b = b >> 1;
    }
    return result;
  }

  if (b === -1) return basic.modInverse(a, m);
  if (b < 1) {
    return basic.powerMod(a, Math.pow(b, -1), m);
  }
};

/**
 * Calculate the extended Euclid Algorithm or extended GCD.
 *
 * @param {Number} int a.
 * @param {Number} int b.
 * @return {Array} [a, x, y] a is the GCD. x and y are the values such that ax + by = gcd(a, b) .
 */
basic.egcd = function (a, b) {
  a = +a;
  b = +b;
  // Same as isNaN() but faster
  if (a !== a || b !== b) {
    return [NaN, NaN, NaN];
  }
  //Same as !isFinite() but faster
  if (a === Infinity || a === -Infinity || b === Infinity || b === -Infinity) {
    return [Infinity, Infinity, Infinity];
  }
  // Checks if a or b are decimals
  if ((a % 1 !== 0) || (b % 1 !== 0)) {
    throw new Error("Can only operate on integers");
  }
  var signX = (a < 0) ? -1 : 1,
    signY = (b < 0) ? -1 : 1,
    x = 0,
    y = 1,
    oldX = 1,
    oldY = 0,
    q, r, m, n;
  a = Math.abs(a);
  b = Math.abs(b);

  while (a !== 0) {
    q = Math.floor(b / a);
    r = b % a;
    m = x - oldX * q;
    n = y - oldY * q;
    b = a;
    a = r;
    x = oldX;
    y = oldY;
    oldX = m;
    oldY = n;
  }
  return [b, signX * x, signY * y];
};
/**
 * Calculate the modular inverse of a number.
 *
 * @param {Number} Number a.
 * @param {Number} Modulo m.
 * @return {Number} if true, return number, else throw error.
 */
basic.modInverse = function (a, m) {
  var r = basic.egcd(a, m);
  if (r[0] !== 1) throw new Error('No modular inverse exists');
  return r[1] % m;
};


/**
 * Determine is two numbers are equal within a given margin of precision.
 *
 * @param {Number} first number.
 * @param {Number} second number.
 * @param {Number} epsilon.
 */
basic.numbersEqual = function (first, second, epsilon) {
  if (typeof (first) !== 'number' || typeof (second) !== 'number' || typeof (epsilon) !== 'number') throw new Error("First and Second must be numbers.");
  return (first - second) < epsilon && (first - second) > -epsilon;
};

/**
 * Calculate the falling factorial of a number
 *
 * {@see http://mathworld.wolfram.com/FallingFactorial.html}
 *
 * @param {Number} Base
 * @param {Number} Steps to fall
 * @returns {Number} Result
 */
basic.fallingFactorial = function (n, k) {
  var i = (n - k + 1),
    r = 1;

  if (n < 0) {
    throw new Error("n cannot be negative.");
  }
  if (k > n) {
    throw new Error("k cannot be greater than n.");
  }

  while (i <= n) {
    r *= i++;
  }

  return r;
};

/**
 * Calculate the permutation (n choose k)
 *
 * @param {Number} available choices
 * @param {Number} number chosen
 * @return {Number} number of ordered variations
 */

basic.permutation = function (n, k) {
  if (n <= 0) {
    throw new Error("n cannot be less than or equal to 0.");
  }
  if (n < k) {
    throw new Error("k cannot be greater than k.");
  }
  var binomial = basic.binomial(n, k);
  var permutation = binomial * basic.factorial(k);
  return permutation;
};

},{}],4:[function(require,module,exports){
/**
 * calculus.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var numbers = require('../numbers');
var calculus = exports;

/**
 * Calculate point differential for a specified function at a
 * specified point.  For functions of one variable.
 *
 * @param {Function} math function to be evaluated.
 * @param {Number} point to be evaluated.
 * @return {Number} result.
 */
calculus.pointDiff = function (func, point) {
  var a = func(point - 0.001);
  var b = func(point + 0.001);

  return (b - a) / (0.002);
};

/**
 * Calculate riemann sum for a specified, one variable, function
 * from a starting point, to a finishing point, with n divisions.
 *
 * @param {Function} math function to be evaluated.
 * @param {Number} point to initiate evaluation.
 * @param {Number} point to complete evaluation.
 * @param {Number} quantity of divisions.
 * @param {Function} (Optional) Function that returns which value
 *   to sample on each interval; if none is provided, left endpoints
 *   will be used.
 * @return {Number} result.
 */
calculus.Riemann = function (func, start, finish, n, sampler) {
  var inc = (finish - start) / n;
  var totalHeight = 0;
  var i;

  if (typeof sampler === 'function') {
    for (i = start; i < finish; i += inc) {
      totalHeight += func(sampler(i, i + inc));
    }
  } else {
    for (i = start; i < finish; i += inc) {
      totalHeight += func(i);
    }
  }

  return totalHeight * inc;
};

/**
 * Helper function in calculating integral of a function
 * from a to b using simpson quadrature.
 *
 * @param {Function} math function to be evaluated.
 * @param {Number} point to initiate evaluation.
 * @param {Number} point to complete evaluation.
 * @return {Number} evaluation.
 */
function SimpsonDef(func, a, b) {
  var c = (a + b) / 2;
  var d = Math.abs(b - a) / 6;
  return d * (func(a) + 4 * func(c) + func(b));
}

/**
 * Helper function in calculating integral of a function
 * from a to b using simpson quadrature.  Manages recursive
 * investigation, handling evaluations within an error bound.
 *
 * @param {Function} math function to be evaluated.
 * @param {Number} point to initiate evaluation.
 * @param {Number} point to complete evaluation.
 * @param {Number} total value.
 * @param {Number} Error bound (epsilon).
 * @return {Number} recursive evaluation of left and right side.
 */
function SimpsonRecursive(func, a, b, whole, eps) {
  var c = a + b;
  var left = SimpsonDef(func, a, c);
  var right = SimpsonDef(func, c, b);

  if (Math.abs(left + right - whole) <= 15 * eps) {
    return left + right + (left + right - whole) / 15;
  } else {
    return SimpsonRecursive(func, a, c, eps / 2, left) + SimpsonRecursive(func, c, b, eps / 2, right);
  }
}

/**
 * Evaluate area under a curve using adaptive simpson quadrature.
 *
 * @param {Function} math function to be evaluated.
 * @param {Number} point to initiate evaluation.
 * @param {Number} point to complete evaluation.
 * @param {Number} Optional error bound (epsilon);
 *   global error bound will be used as a fallback.
 * @return {Number} area underneath curve.
 */
calculus.adaptiveSimpson = function (func, a, b, eps) {
  eps = (typeof eps === 'undefined') ? numbers.EPSILON : eps;

  return SimpsonRecursive(func, a, b, SimpsonDef(func, a, b), eps);
};

/**
 * Calculate limit of a function at a given point. Can approach from
 * left, middle, or right.
 *
 * @param {Function} math function to be evaluated.
 * @param {Number} point to evaluate.
 * @param {String} approach to limit.
 * @return {Number} limit.
 */
calculus.limit = function (func, point, approach) {
  if (approach === 'left') {
    return func(point - 1e-15);
  } else if (approach === 'right') {
    return func(point + 1e-15);
  } else if (approach === 'middle') {
    return (calculus.limit(func, point, 'left') + calculus.limit(func, point, 'right')) / 2;
  } else {
    throw new Error('Approach not provided');
  }
};

/**
 * Calculate Stirling approximation gamma.
 *
 * @param {Number} number to calculate.
 * @return {Number} gamma.
 */
calculus.StirlingGamma = function (num) {
  return Math.sqrt(2 * Math.PI / num) * Math.pow((num / Math.E), num);
};

/**
 * Calculate Lanczos approximation gamma.
 *
 * @param {Number} number to calculate.
 * @return {Number} gamma.
 */
calculus.LanczosGamma = function (num) {
  var p = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
  ];

  var i;
  var g = 7;

  if (num < 0.5) return Math.PI / (Math.sin(Math.PI * num) * calculus.LanczosGamma(1 - num));

  num -= 1;

  var a = p[0];
  var t = num + g + 0.5;

  for (i = 1; i < p.length; i++) {
    a += p[i] / (num + i);
  }

  return Math.sqrt(2 * Math.PI) * Math.pow(t, num + 0.5) * Math.exp(-t) * a;
};


/**
 * Calculate the integral of f(x1,x2,...) over intervals
 * [a1,b1], [a2,b2], ..., using the montecarlo method:
 *
 * integral of f(x,y) = (1/N)*(b2-a2)*(b1-a1)*sum(f)
 *
 * where N = number of points for f to be evaluated at.
 * The error for this method is about 1/root(N) and will
 * always converge.
 *
 * @param {Function} math function.
 * @param {Number} number of points
 * @param {Array(s)} intervals
 * @return {Number} approximation to integral
 */
calculus.MonteCarlo = function (func, N) {
  //takes an arbitrary number of arguments after N
  //all of the arguments must be arrays which are intervals
  if (arguments.length < 2) {
    throw new Error('Please enter at least one interval.');
  } else if (N <= 0) {
    throw new Error('Please use a positive integer for N.');
  }
  var L = [];
  N = Math.ceil(N);
  for (var i = 2; i < arguments.length; i++) {
    L.push(arguments[i]);
  }

  var coeff = L.map(function (l) { //subtract the endpoints
    return l[1] - l[0];
  }).reduce(function (a, b) { //multiply each endpoint difference
    return a * b;
  }) / N;

  var fvals = numbers.matrix.transpose(L.map(function (l) {
    //generate an array of arrays, each nested array being N
    //random values in each interval - N-by-3 array, and then
    //transpose it to get a 3-by-N array
    return numbers.statistic.randomSample(l[0], l[1], N);
  })).map(function (l) {
    //evaluate func at each set of points
    return func.apply(null, [l[0], l[1], l[2]]);
  });

  return coeff * fvals.reduce(function (a, b) {
    return a + b;
  });
};

},{"../numbers":2}],5:[function(require,module,exports){
/**
 * complex.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var numbers = require('../numbers');
var basic = numbers.basic;

var Complex = function (re, im) {
  this.re = re;
  this.im = im;
  this.r = this.magnitude();
  this.t = this.phase(); // theta = t = arg(z)
};

/**
 * Add a complex number to this one.
 *
 * @param {Complex} Number to add.
 * @return {Complex} New complex number (sum).
 */
Complex.prototype.add = function (addend) {
  return new Complex(this.re + addend.re, this.im + addend.im);
};

/**
 * Subtract a complex number from this one.
 *
 * @param {Complex} Number to subtract.
 * @return {Complex} New complex number (difference).
 */
Complex.prototype.subtract = function (subtrahend) {
  return new Complex(this.re - subtrahend.re, this.im - subtrahend.im);
};

/**
 * Multiply a complex number with this one.
 *
 * @param {Complex} Number to multiply by.
 * @return {Complex} New complex number (product).
 */
Complex.prototype.multiply = function (multiplier) {
  var re = this.re * multiplier.re - this.im * multiplier.im;
  var im = this.im * multiplier.re + this.re * multiplier.im;

  return new Complex(re, im);
};

/**
 * Divide this number with another complex number.
 *
 * @param {Complex} Divisor.
 * @return {Complex} New complex number (quotient).
 */
Complex.prototype.divide = function (divisor) {
  var denominator = divisor.re * divisor.re + divisor.im * divisor.im;
  var re = (this.re * divisor.re + this.im * divisor.im) / denominator;
  var im = (this.im * divisor.re - this.re * divisor.im) / denominator;

  return new Complex(re, im);
};

/**
 * Get the magnitude of this number.
 *
 * @return {Number} Magnitude.
 */
Complex.prototype.magnitude = function () {
  return Math.sqrt(this.re * this.re + this.im * this.im);
};

/**
 * Get the phase of this number.
 *
 * @return {Number} Phase.
 */
Complex.prototype.phase = function () {
  return Math.atan2(this.im, this.re);
};

/**
 * Conjugate the imaginary part
 *
 * @return {Complex} Conjugated number
 */
Complex.prototype.conjugate = function () {
  return new Complex(this.re, -1 * this.im);
};

/**
 * Raises this complex number to the nth power.
 *
 * @param {number} power to raise this complex number to.
 * @return {Complex} the nth power of this complex number.
 */
Complex.prototype.pow = function (n) {
  var constant = Math.pow(this.magnitude(), n);

  return new Complex(constant * Math.cos(n * this.phase()), constant * Math.sin(n * this.phase()));
};

/**
 * Raises this complex number to given complex power.
 *
 * @param complexN the complex number to raise this complex number to.
 * @return {Complex} this complex number raised to the given complex number.
 */
Complex.prototype.complexPow = function (complexN) {
  var realSqPlusImSq = Math.pow(this.re, 2) + Math.pow(this.im, 2);
  var multiplier = Math.pow(realSqPlusImSq, complexN.re / 2) * Math.pow(Math.E, -complexN.im * this.phase());
  var theta = complexN.re * this.phase() + 0.5 * complexN.im * Math.log(realSqPlusImSq);

  return new Complex(multiplier * Math.cos(theta), multiplier * Math.sin(theta));
};

/**
 * Find all the nth roots of this complex number.
 *
 * @param {Number} root of this complex number to take.
 * @return {Array} an array of size n with the roots of this complex number.
 */
Complex.prototype.roots = function (n) {
  var result = new Array(n);

  for (var i = 0; i < n; i++) {
    var theta = (this.phase() + 2 * Math.PI * i) / n;
    var radiusConstant = Math.pow(this.magnitude(), 1 / n);

    result[i] = (new Complex(radiusConstant * Math.cos(theta), radiusConstant * Math.sin(theta)));
  }

  return result;
};


/**
 * Returns the sine of this complex number.
 *
 * @return {Complex} the sine of this complex number.
 */
Complex.prototype.sin = function () {
  var E = new Complex(Math.E, 0);
  var i = new Complex(0, 1);
  var negativeI = new Complex(0, -1);
  var numerator = E.complexPow(i.multiply(this)).subtract(E.complexPow(negativeI.multiply(this)));

  return numerator.divide(new Complex(0, 2));
};

/**
 * Returns the cosine of this complex number.
 *
 * @return {Complex} the cosine of this complex number.
 */
Complex.prototype.cos = function () {
  var E = new Complex(Math.E, 0);
  var i = new Complex(0, 1);
  var negativeI = new Complex(0, -1);
  var numerator = E.complexPow(i.multiply(this)).add(E.complexPow(negativeI.multiply(this)));

  return numerator.divide(new Complex(2, 0));
};

/**
 * Returns the tangent of this complex number.
 *
 * @return {Complex} the tangent of this complex number.
 */
Complex.prototype.tan = function () {
  return this.sin().divide(this.cos());
};

/**
 * Checks for equality between this complex number and another
 * within a given range defined by epsilon.
 *
 * @param {Complex} complex number to check this number against.
 * @param {Number} epsilon
 * @return {boolean} true if equal within epsilon, false otherwise
 */
Complex.prototype.equals = function (complex, epsilon) {
  return basic.numbersEqual(this.re, complex.re, epsilon) &&
    basic.numbersEqual(this.im, complex.im, epsilon);
};

module.exports = Complex;

},{"../numbers":2}],6:[function(require,module,exports){
/**
 * dsp.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var numbers = require('../numbers');
var Complex = numbers.complex;
var dsp = exports;

/**
 * Returns an array composed of elements from arr, starting at index start
 * and counting by step.
 *
 * @param {Array} Input array.
 * @param {Number} Starting array index.
 * @param {Number} Step size.
 * @return {Array} Resulting sub-array.
 */
dsp.segment = function (arr, start, step) {
  var result = [];

  for (var i = start; i < arr.length; i += step) {
    result.push(arr[i]);
  }

  return result;
};

/**
 * Returns an array of complex numbers representing the frequency spectrum
 * of real valued time domain sequence x. (x.length must be integer power of 2)
 * Inspired by http://rosettacode.org/wiki/Fast_Fourier_transform#Python
 *
 * @param {Array} Real-valued series input, eg. time-series.
 * @return {Array} Array of complex numbers representing input signal in Fourier domain.
 */
dsp.fft = function (x) {
  var N = x.length;

  if (N <= 1) {
    return [new Complex(x[0], 0)];
  }

  if (Math.log(N) / Math.LN2 % 1 !== 0) {
    throw new Error('Array length must be integer power of 2');
  }

  var even = dsp.fft(dsp.segment(x, 0, 2));
  var odd = dsp.fft(dsp.segment(x, 1, 2));
  var res = [],
    Nby2 = N / 2;

  for (var k = 0; k < N; k++) {
    var tmpPhase = -2 * Math.PI * k / N;
    var phasor = new Complex(Math.cos(tmpPhase), Math.sin(tmpPhase));
    if (k < Nby2) {
      res[k] = even[k].add(phasor.multiply(odd[k]));
    } else {
      res[k] = even[k - Nby2].subtract(phasor.multiply(odd[k - Nby2]));
    }
  }

  return res;
};

},{"../numbers":2}],7:[function(require,module,exports){
/**
 * generators.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski, Kartik Talwar
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var generate = exports;

/**
 * Fast Fibonacci Implementation
 *
 * @param {number} The nth Fibonacci number to calculate
 * @return {number|undefined} The nth Fibonacci number
 */
generate.fibonacci = function (n) {
  // Adapted from
  // http://bosker.wordpress.com/2011/04/29/the-worst-algorithm-in-the-world/

  if (!isNaN(n)) {
    var bitSystem = function (n) {
      var bit, bits = [];

      while (n > 0) {
        bit = (n < 2) ? n : n % 2;
        n = Math.floor(n / 2);
        bits.unshift(bit);
      }

      return bits;
    };

    var a = 1;
    var b = 0;
    var c = 1;
    var system = bitSystem(n);
    var temp;

    for (var i = 0; i < system.length; i++) {
      var bit = system[i];
      if (bit) {
        temp = [(a + c) * b, (b * b) + (c * c)];
        a = temp[0];
        b = temp[1];
      } else {
        temp = [(a * a) + (b * b), (a + c) * b];
        a = temp[0];
        b = temp[1];
      }

      c = a + b;
    }

    return b;
  }
};

/**
 * Build an array of numbers in a Collatz sequence
 *
 * @param {number} The number for which to build a Collatz sequence
 * @return {Array|undefined} An array of numbers in a Collatz sequence
 */
generate.collatz = function (n) {
  if (!isNaN(n)) {
    var sequence = [];

    sequence.push(n);

    (function makeSequence(n) {
      if (n !== 1) {
        if (n % 2 === 0) {
          sequence.push(n / 2);
        } else {
          sequence.push(3 * n + 1);
        }
        makeSequence(sequence[sequence.length - 1]);
      }
    })(n);

    return sequence;
  }
};

},{}],8:[function(require,module,exports){
/**
 * matrix.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var matrix = exports;

var ERROR_MATRIX_NOT_SQUARE = 'Matrix must be square.',
  ERROR_VECTOR_NOT_2D = 'Only two dimensional operations are supported at this time.';

/**
 * Check to see if a point is 2D. Used in all 2D vector functions.
 * Throw error if it's not.
 *
 * @param {Array} point in question.
 * @return {undefined} nothing is returned.
 */
matrix._check2DVector = function (point) {
  if (point.length !== 2) {
    throw new Error(ERROR_VECTOR_NOT_2D);
  }
};

/**
 * Return a deep copy of the input matrix.
 *
 * @param {Array} matrix to copy.
 * @return {Array} copied matrix.
 */
matrix.deepCopy = function (arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be a matrix.');
  } else if (arr[0][0] === undefined) {
    throw new Error('Input cannot be a vector.');
  }
  var result = new Array(arr.length);

  for (var i = 0; i < arr.length; i++) {
    result[i] = arr[i].slice();
  }

  return result;
};

/**
 * Return true if matrix is square, false otherwise.
 *
 * @param {Array} arr
 * @return {Boolean}
 */
matrix.isSquare = function (arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be a matrix.');
  } else if (arr[0][0] === undefined) {
    throw new Error('Input cannot be a vector.');
  }
  var rows = arr.length;

  for (var i = 0; i < rows; i++) {
    if (arr[i].length !== rows) return false;
  }

  return true;
};

/**
 * Add two matrices together.  Matrices must be of same dimension.
 *
 * @param {Array} matrix A.
 * @param {Array} matrix B.
 * @return {Array} summed matrix.
 */
matrix.addition = function (arrA, arrB) {
  if (arrA.length !== arrB.length || arrA[0].length !== arrB[0].length) {
    throw new Error('Matrix mismatch');
  }

  var result = new Array(arrA.length),
    i;

  if (!arrA[0].length) {
    // The arrays are vectors.
    for (i = 0; i < arrA.length; i++) {
      result[i] = arrA[i] + arrB[i];
    }
  } else {
    for (i = 0; i < arrA.length; i++) {
      result[i] = new Array(arrA[i].length);

      for (var j = 0; j < arrA[i].length; j++) {
        result[i][j] = arrA[i][j] + arrB[i][j];
      }
    }
  }

  return result;
};

/**
 * Subtract one matrix from another (A - B).  Matrices must be of same dimension.
 *
 * @param {Array} matrix A.
 * @param {Array} matrix B.
 * @return {Array} subtracted matrix.
 */
matrix.subtraction = function (arrA, arrB) {
  if (arrA.length !== arrB.length || arrA[0].length !== arrB[0].length) {
    throw new Error("Matrix mismatch");
  }

  var result = new Array(arrA.length),
    i;

  if (!arrA[0].length) {
    // The arrays are vectors.
    for (i = 0; i < arrA.length; i++) {
      result[i] = arrA[i] - arrB[i];
    }
  } else {
    for (i = 0; i < arrA.length; i++) {
      result[i] = new Array(arrA[i].length);

      for (var j = 0; j < arrA[i].length; j++) {
        result[i][j] = arrA[i][j] - arrB[i][j];
      }
    }
  }

  return result;
};

/**
 * Scalar multiplication on an matrix.
 *
 * @param {Array} matrix.
 * @param {Number} scalar.
 * @return {Array} updated matrix.
 */
matrix.scalar = function (arr, val) {
  var result = matrix.deepCopy(arr);
  for (var i = 0; i < result.length; i++) {
    for (var j = 0; j < result[i].length; j++) {
      result[i][j] = val * arr[i][j];
    }
  }

  return result;
};

/**
 * Transpose a matrix.
 *
 * @param {Array} matrix.
 * @return {Array} transposed matrix.
 */
matrix.transpose = function (arr) {
  var result = new Array(arr[0].length);

  for (var i = 0; i < arr[0].length; i++) {
    result[i] = new Array(arr.length);

    for (var j = 0; j < arr.length; j++) {
      result[i][j] = arr[j][i];
    }
  }

  return result;
};

/**
 * Create an identity matrix of dimension n x n.
 *
 * @param {Number} dimension of the identity array to be returned.
 * @return {Array} n x n identity matrix.
 */
matrix.identity = function (n) {
  var result = new Array(n);

  for (var i = 0; i < n; i++) {
    result[i] = new Array(n);
    for (var j = 0; j < n; j++) {
      result[i][j] = (i === j) ? 1 : 0;
    }
  }

  return result;
};

/**
 * Evaluate dot product of two vectors.  Vectors must be of same length.
 *
 * @param {Array} vector.
 * @param {Array} vector.
 * @return {Array} dot product.
 */
matrix.dotproduct = function (vectorA, vectorB) {
  if (vectorA.length !== vectorB.length) {
    throw new Error("Vector mismatch");
  }

  var result = 0;
  for (var i = 0; i < vectorA.length; i++) {
    result += vectorA[i] * vectorB[i];
  }
  return result;
};

/**
 * Multiply two matrices. They must abide by standard matching.
 *
 * e.g. A x B = (m x n) x (n x m), where n, m are integers who define
 * the dimensions of matrices A, B.
 *
 * @param {Array} matrix.
 * @param {Array} matrix.
 * @return {Array} result of multiplied matrices.
 */
matrix.multiply = function (arrA, arrB) {
  if (arrA[0].length !== arrB.length) {
    throw new Error("Matrix mismatch");
  }

  var result = new Array(arrA.length);

  for (var x = 0; x < arrA.length; x++) {
    result[x] = new Array(arrB[0].length);
  }

  var arrB_T = matrix.transpose(arrB);

  for (var i = 0; i < result.length; i++) {
    for (var j = 0; j < result[i].length; j++) {
      result[i][j] = matrix.dotproduct(arrA[i], arrB_T[j]);
    }
  }
  return result;
};

/**
 * Evaluate determinate of matrix.  Expect speed
 * degradation for matrices over 4x4.
 *
 * @param {Array} matrix.
 * @return {Number} determinant.
 */
matrix.determinant = function (m) {
  var numRow = m.length;
  var numCol = m[0].length;
  var det = 0;
  var row, col;
  var diagLeft, diagRight;

  if (!matrix.isSquare(m)) {
    throw new Error(ERROR_MATRIX_NOT_SQUARE);
  }

  if (numRow === 1) {
    return m[0][0];
  } else if (numRow === 2) {
    return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  }

  for (col = 0; col < numCol; col++) {
    diagLeft = m[0][col];
    diagRight = m[0][col];

    for (row = 1; row < numRow; row++) {
      diagRight *= m[row][(((col + row) % numCol) + numCol) % numCol];
      diagLeft *= m[row][(((col - row) % numCol) + numCol) % numCol];
    }

    det += diagRight - diagLeft;
  }

  return det;
};

/**
 * Returns a LUP decomposition of the given matrix such that:
 *
 * A*P = L*U
 *
 * Where
 * A is the input matrix
 * P is a pivot matrix
 * L is a lower triangular matrix
 * U is a upper triangular matrix
 *
 * This method returns an array of three matrices such that:
 *
 * matrix.luDecomposition(array) = [L, U, P]
 *
 * @param {Array} arr
 * @return {Array} array of matrices [L, U, P]
 */
matrix.lupDecomposition = function (arr) {
  if (!matrix.isSquare(arr)) {
    throw new Error(ERROR_MATRIX_NOT_SQUARE);
  }

  var size = arr.length;

  var LU = matrix.deepCopy(arr);
  var P = matrix.transpose(matrix.identity(size));
  var currentRow;
  var currentColumn = new Array(size);

  this.getL = function (a) {
    var m = a[0].length;
    var L = matrix.identity(m);

    for (var i = 0; i < m; i++) {
      for (var j = 0; j < m; j++) {
        if (i > j) {
          L[i][j] = a[i][j];
        }
      }
    }

    return L;
  };

  this.getU = function (a) {
    var m = a[0].length;
    var U = matrix.identity(m);

    for (var i = 0; i < m; i++) {
      for (var j = 0; j < m; j++) {
        if (i <= j) {
          U[i][j] = a[i][j];
        }
      }
    }

    return U;
  };

  for (var j = 0; j < size; j++) {
    var i;
    for (i = 0; i < size; i++) {
      currentColumn[i] = LU[i][j];
    }

    for (i = 0; i < size; i++) {
      currentRow = LU[i];

      var minIndex = Math.min(i, j);
      var s = 0;

      for (var k = 0; k < minIndex; k++) {
        s += currentRow[k] * currentColumn[k];
      }

      currentRow[j] = currentColumn[i] -= s;
    }

    //Find pivot
    var pivot = j;
    for (i = j + 1; i < size; i++) {
      if (Math.abs(currentColumn[i]) > Math.abs(currentColumn[pivot])) {
        pivot = i;
      }
    }

    if (pivot !== j) {
      LU = matrix.rowSwitch(LU, pivot, j);
      P = matrix.rowSwitch(P, pivot, j);
    }

    if (j < size && LU[j][j] !== 0) {
      for (i = j + 1; i < size; i++) {
        LU[i][j] /= LU[j][j];
      }
    }
  }

  return [this.getL(LU), this.getU(LU), P];
};

/**
 * Rotate a two dimensional vector by degree.
 *
 * @param {Array} point.
 * @param {Number} degree.
 * @param {String} direction - clockwise or counterclockwise.
 * @return {Array} vector.
 */
matrix.rotate = function (point, degree, direction) {
  matrix._check2DVector(point);

  var negate = direction === 'clockwise' ? -1 : 1;
  var radians = degree * (Math.PI / 180);

  var transformation = [
    [Math.cos(radians), -1 * negate * Math.sin(radians)],
    [negate * Math.sin(radians), Math.cos(radians)]
  ];

  return matrix.multiply(transformation, point);
};

/**
 * Scale a two dimensional vector by scale factor x and scale factor y.
 *
 * @param {Array} point.
 * @param {Number} sx.
 * @param {Number} sy.
 * @return {Array} vector.
 */
matrix.scale = function (point, sx, sy) {
  matrix._check2DVector(point);

  var transformation = [
    [sx, 0],
    [0, sy]
  ];

  return matrix.multiply(transformation, point);
};

/**
 * Shear a two dimensional vector by shear factor k.
 *
 * @param {Array} point.
 * @param {Number} k.
 * @param {String} direction - xaxis or yaxis.
 * @return {Array} vector.
 */
matrix.shear = function (point, k, direction) {
  matrix._check2DVector(point);

  var xplaceholder = direction === 'xaxis' ? k : 0;
  var yplaceholder = direction === 'yaxis' ? k : 0;

  var transformation = [
    [1, xplaceholder],
    [yplaceholder, 1]
  ];

  return matrix.multiply(transformation, point);
};

/**
 * Perform an affine transformation on the given vector.
 *
 * @param {Array} point.
 * @param {Number} tx.
 * @param {Number} ty.
 * @return {Array} vector.
 */
matrix.affine = function (point, tx, ty) {
  matrix._check2DVector(point);
  var transformation = [
    [1, 0, tx],
    [0, 1, ty],
    [0, 0, 1]
  ];

  var newpoint = [
    [point[0][0]],
    [point[1][0]],
    [1]
  ];

  var transformed = matrix.multiply(transformation, newpoint);

  return [
    [transformed[0][0]],
    [transformed[1][0]]
  ];
};

/**
 * Scales a row of a matrix by a factor and returns the updated matrix.
 * Used in row reduction functions.
 *
 * @param {Array} matrix.
 * @param {Number} row.
 * @param {Number} scale.
 */
matrix.rowScale = function (m, row, scale) {
  var result = new Array(m.length);

  for (var i = 0; i < m.length; i++) {
    result[i] = new Array(m[i].length);

    for (var j = 0; j < m[i].length; j++) {
      if (i === row) {
        result[i][j] = scale * m[i][j];
      } else {
        result[i][j] = m[i][j];
      }
    }
  }

  return result;
};

/**
 * Swaps two rows of a matrix  and returns the updated matrix.
 * Used in row reduction functions.
 *
 * @param {Array} matrix.
 * @param {Number} row1.
 * @param {Number} row2.
 */
matrix.rowSwitch = function (m, row1, row2) {
  var result = new Array(m.length);

  for (var i = 0; i < m.length; i++) {
    result[i] = new Array(m[i].length);

    for (var j = 0; j < m[i].length; j++) {
      if (i === row1) {
        result[i][j] = m[row2][j];
      } else if (i === row2) {
        result[i][j] = m[row1][j];
      } else {
        result[i][j] = m[i][j];
      }
    }
  }
  return result;
};

/**
 * Adds a multiple of one row to another row
 * in a matrix and returns the updated matrix.
 * Used in row reduction functions.
 *
 * @param {Array} matrix.
 * @param {Number} row1.
 * @param {Number} row2.
 */
matrix.rowAddMultiple = function (m, from, to, scale) {
  var result = new Array(m.length);

  for (var i = 0; i < m.length; i++) {
    result[i] = new Array(m[i].length);

    for (var j = 0; j < m[i].length; j++) {
      if (i === to) {
        result[to][j] = m[to][j] + scale * m[from][j];
      } else {
        result[i][j] = m[i][j];
      }
    }
  }

  return result;
};

/**
 * Gauss-Jordan Elimination
 *
 * @param {Array} matrix.
 * @param {Number} epsilon.
 * @return {Array} RREF matrix.
 */
matrix.GaussJordanEliminate = function (m, epsilon) {
  // Translated from:
  // http://elonen.iki.fi/code/misc-notes/python-gaussj/index.html
  var eps = (typeof epsilon === 'undefined') ? 1e-10 : epsilon;

  var h = m.length;
  var w = m[0].length;
  var y = -1;
  var y2, x, c;

  while (++y < h) {
    // Pivot.
    var maxrow = y;
    y2 = y;
    while (++y2 < h) {
      if (Math.abs(m[y2][y]) > Math.abs(m[maxrow][y]))
        maxrow = y2;
    }
    var tmp = m[y];
    m[y] = m[maxrow];
    m[maxrow] = tmp;

    // Singular
    if (Math.abs(m[y][y]) <= eps) {
      return m;
    }

    // Eliminate column
    y2 = y;
    while (++y2 < h) {
      c = m[y2][y] / m[y][y];
      x = y - 1;
      while (++x < w) {
        m[y2][x] -= m[y][x] * c;
      }
    }
  }

  // Backsubstitute.
  y = h;
  while (--y >= 0) {
    c = m[y][y];
    y2 = -1;
    while (++y2 < y) {
      x = w;
      while (--x >= y) {
        m[y2][x] -= m[y][x] * m[y2][y] / c;
      }
    }
    m[y][y] /= c;

    // Normalize row
    x = h - 1;
    while (++x < w) {
      m[y][x] /= c;
    }
  }

  return m;
};

/**
 * Alias to Gauss-Jordan Elimination
 *
 * @param {Array} matrix.
 * @param {Number} epsilon.
 * @return {Array} RREF matrix.
 */
matrix.rowReduce = function (m, epsilon) {
  return matrix.GaussJordanEliminate(m, epsilon);
};

/**
 * nxn matrix inversion
 *
 * @param {Array} matrix.
 * @return {Array} inverted matrix.
 */
matrix.inverse = function (m) {
  if (!matrix.isSquare(m)) {
    throw new Error(ERROR_MATRIX_NOT_SQUARE);
  }

  var n = m.length,
    identity = matrix.identity(n),
    i;

  // AI
  for (i = 0; i < n; i++) {
    m[i] = m[i].concat(identity[i]);
  }

  // inv(IA)
  m = matrix.GaussJordanEliminate(m);

  // inv(A)
  for (i = 0; i < n; i++) {
    m[i] = m[i].slice(n);
  }

  return m;
};

/**
 * Get a column of a matrix as a vector.
 *
 * @param {Array} matrix
 * @param {Int} column number
 * @return {Array} column
 */
matrix.getCol = function (M, n) {
  var result = new Array(M.length);
  if (n < 0) {
    throw new Error('The specified column must be a positive integer.');
  } else if (n >= M[0].length) {
    throw new Error('The specified column must be between 0 and the number of columns - 1.');
  }
  for (var i = 0; i < M.length; i++) {
    result[i] = M[i][n];
  }
  return result;
};

/**
 * Reorder the rows of a matrix based off an array of numbers.
 *
 * @param {Array} matrix
 * @param {Array} desired re-ordering
 * @return {Array} reordered matrix
 */
matrix.reorderRows = function (M, L) {
  var result = [];
  if (L === undefined) {
    throw new Error('A reordering array must be entered.');
  } else if (L.length !== M.length) {
    throw new Error('The reordered matrix must have the same number of rows as the original matrix.');
  }
  for (var i = 0; i < L.length; i++) {
    if (L[i] < 0) {
      throw new Error('The desired order of the rows must be positive integers.');
    } else if (L[i] >= L.length) {
      throw new Error('The desired order of the rows must start at 0 and end at the number of rows - 1.');
    } else {
      result.push(M[L[i]]);
    }
  }
  return result;
};

/**
 * Reorder the columns of a matrix based off an array of numbers.
 *
 * @param {Array} matrix
 * @param {Array} desired re-ordering
 * @return {Array} reordered matrix
 */
matrix.reorderCols = function (M, L) {
  var result = [];
  if (L === undefined) {
    throw new Error('Please enter a desired reordering array.');
  } else if (L.length !== M[0].length) {
    throw new Error('The reordered matrix must have the same number of columns as the original matrix.');
  }
  for (var i = 0; i < L.length; i++) {
    if (L[i] < 0) {
      throw new Error('The desired order of the columns must be positive integers.');
    } else if (L[i] >= L.length) {
      throw new Error('The desired order of the columns must start at 0 and end at the number of columns - 1.');
    } else {
      result.push(matrix.getCol(M, L[i]));
    }
  }
  return matrix.transpose(result);
};

/**
 * Reverse the rows of a matrix.
 *
 * @param {Array} matrix
 * @return {Array} reversed matrix
 */
matrix.reverseRows = function (M) {
  var L = [];
  for (var i = M.length - 1; i > -1; i--) {
    L.push(i);
  }
  return matrix.reorderRows(M, L);
};

/**
 * Reverse the columns of a matrix.
 *
 * @param {Array} matrix
 * @return {Array} reversed matrix
 */
matrix.reverseCols = function (M) {
  var L = [];
  for (var i = M.length - 1; i > -1; i--) {
    L.push(i);
  }
  return matrix.reorderCols(M, L);
};

/**
 * Create a n x m matrix of zeros.
 *
 * @param {Int} number of rows
 * @param {Int} number of columns
 * @return {Array} matrix
 */
matrix.zeros = function (n, m) {
  var M = new Array(n);
  if (n < 1 || m < 1) {
    throw new Error('The matrix dimensions must be positive integers.');
  }
  n = Math.ceil(n);
  m = Math.ceil(m);
  for (var i = 0; i < n; i++) {
    var empty = new Array(m);
    for (var j = 0; j < m; j++) {
      empty[j] = 0;
    }
    M[i] = empty;
  }
  return M;
};

/**
 * Create a zigzag matrix. point represents the starting corner,
 * dir represents which direction to begin moving in. There are
 * 8 possible permutations for this. Rounds dimension upwards.
 *
 * @param {Int} size of (square) matrix
 * @param {String} corner (TL,TR,BL,BR)
 * @param {String} direction (V,H)
 * @return {Array} zigzag matrix.
 */
matrix.zigzag = function (n, point, dir) {
  if (n <= 1) {
    throw new Error('Matrix size must be at least 2x2.');
  }
  n = Math.ceil(n);
  var mat = matrix.zeros(n, n);

  //create one kind of permutation - all other permutations can be 
  //created from this particular permutation through transformations
  var BRH = function (M) { //starting at bottom right, moving horizontally
    var jump = false,
      tl = n * n,
      br = 1,
      inc = 1,
      row, col, val, i, j;
    M[0][0] = tl;
    M[n - 1][n - 1] = br;

    for (i = 1; i < n; i++) {
      //generate top/bottom row
      if (jump) {
        tl -= 4 * inc;
        br += 4 * inc;
        inc++;
      } else {
        tl--;
        br++;
      }

      M[0][i] = tl;
      M[n - 1][n - 1 - i] = br;
      jump = !jump;
    }

    var dec = true;
    for (i = 1; i < n; i++) {
      //iterate diagonally from top row
      row = 0;
      col = i;
      val = M[row][col];

      for (j = 1; j < i + 1; j++) {
        if (dec) {
          val -= 1;
        } else {
          val += 1;
        }
        row++;
        col--;
        M[row][col] = val;
      }
      dec = !dec;
    }

    if (n % 2 === 0) {
      dec = true;
    } else {
      dec = false;
    }
    for (i = 1; i < n - 1; i++) {
      //iterate diagonally from bottom row
      row = n - 1;
      col = i;
      val = M[row][col];

      for (j = 1; j < n - i; j++) {
        if (dec) {
          val--;
        } else {
          val++;
        }
        row--;
        col++;
        M[row][col] = val;
      }
      dec = !dec;
    }
    return M;
  };

  var BRV = function (M) { //starting at bottom right, moving vertically
    return matrix.transpose(BRH(M));
  };

  var BLH = function (M) { //starting at bottom left, moving horizontally
    return matrix.reverseCols(BRH(M));
  };

  var BLV = function (M) { //starting at bottom left, moving vertically
    return matrix.reverseRows(TLV(BLH(M)));
  };

  var TRH = function (M) { //starting at top right, moving horizontally
    return matrix.reverseRows(BRH(M));
  };

  var TRV = function (M) { //starting at top right, moving vertically
    return matrix.reverseRows(BRV(M));
  };

  var TLH = function (M) { //starting at top left, moving horizontally
    return matrix.reverseCols(matrix.reverseRows(BRH(M)));
  };

  var TLV = function (M) { //starting at top left, moving vertically
    return matrix.transpose(TLH(M));
  };

  if ((point === 'BR') && (dir === 'H')) {
    return (BRH(mat));
  } else if ((point === 'BR') && (dir === 'V')) {
    return (BRV(mat));
  } else if ((point === 'BL') && (dir === 'H')) {
    return (BLH(mat));
  } else if ((point === 'BL') && (dir === 'V')) {
    return (BLV(mat));
  } else if ((point === 'TR') && (dir === 'H')) {
    return (TRH(mat));
  } else if ((point === 'TR') && (dir === 'V')) {
    return (TRV(mat));
  } else if ((point === 'TL') && (dir === 'H')) {
    return (TLH(mat));
  } else if ((point === 'TL') && (dir === 'V')) {
    return (TLV(mat));
  } else {
    throw new Error('Enter the direction (V,H) and corner (BR,BL,TR,TL) correctly.');
  }
};

/**
 * Calculate the p-norm of a vector. Specific cases include:
 *   - Infinity (largest absolute entry)
 *   - -Infinity (smallest absolute entry)
 *
 * @param {Array} vector
 * @param {Number} the value of p (norm order)
 * @return {Number} the p-norm of v
 */
matrix.vectorNorm = function (v, p) {
  // calculate the p'th norm of a vector v
  if (!(Array.isArray(v)) || (v.length === 0)) {
    throw new Error('Vector must be an array of at least length 1.');
  } else if ((typeof p !== 'undefined') && (typeof p !== 'number')) {
    throw new Error('Norm order must be a number.');
  }

  p = (typeof p === 'undefined') ? 2 : p;
  var n = v.length,
    ans = 0,
    term, i;

  switch (p) {

    case Infinity:
      for (i = 0; i < n; i++) {
        term = Math.abs(v[i]);
        if (term > ans) {
          ans = term;
        }
      }
      break;

    case -Infinity:
      ans = Infinity;
      for (i = 0; i < n; i++) {
        term = Math.abs(v[i]);
        if (term < ans) {
          ans = term;
        }
      }
      break;

    default:
      for (i = 0; i < n; i++) {
        ans += Math.pow(Math.abs(v[i]), p);
      }
      ans = Math.pow(ans, 1 / p);
      break;
  }

  return ans;
};

/**
 * Calculate the p-norm of a matrix. Specific cases include:
 *   - Infinity (largest absolute row)
 *   - -Infinity (smallest absolute row)
 *   - 1 (largest absolute column)
 *   - -1 (smallest absolute column)
 *   - 2 (largest singular value)
 *   - -2 (smallest singular value)
 *   - null (Frobenius norm)
 *
 * @param {Array} vector
 * @param {Number} the value of p (norm order)
 * @return {Number} the p-norm of M
 */
matrix.matrixNorm = function (M, p) {
  if (!(Array.isArray(M)) || (M.length === 0) || !Array.isArray(M[0])) {
    throw new Error('Matrix must be an array of at least length 1.');
  } else if ((typeof p !== 'undefined') && (typeof p !== 'number') && (p !== null)) {
    throw new Error('Norm order must be a number or null.');
  }

  p = (typeof p === 'undefined') ? null : p;
  var m = M.length, //number of rows
    n = M[0].length, //number of cols
    ans = 0,
    term, i, j;

  switch (p) {

    // the largest value when absolute-ing and summing each row
    case Infinity:
      for (i = 0; i < m; i++) {
        term = 0;

        for (j = 0; j < n; j++) {
          term += Math.abs(M[i][j]);
        }

        if (term > ans) {
          ans = term;
        }
      }
      break;

      // the smallest value when absolute-ing and summing each row
    case -Infinity:
      ans = Infinity;
      for (i = 0; i < m; i++) {
        term = 0;

        for (j = 0; j < n; j++) {
          term += Math.abs(M[i][j]);
        }

        if (term < ans) {
          ans = term;
        }
      }
      break;

      // the largest value when absolute-ing and summing each column
    case 1:
      for (i = 0; i < n; i++) {
        term = 0;

        for (j = 0; j < m; j++) {
          term += Math.abs(M[j][i]);
        }

        if (term > ans) {
          ans = term;
        }
      }
      break;

      // the smallest value when absolute-ing and summing each column
    case -1:
      ans = Infinity;
      for (i = 0; i < n; i++) {
        term = 0;

        for (j = 0; j < m; j++) {
          term += Math.abs(M[j][i]);
        }

        if (term < ans) {
          ans = term;
        }
      }
      break;

      // the Frobenius norm
    case null:
      for (i = 0; i < m; i++) {
        for (j = 0; j < n; j++) {
          ans += Math.pow(M[i][j], 2);
        }
      }
      ans = Math.pow(ans, 0.5);
      break;

      // largest singular value
    case 2:
      throw new Error("Singular values are not yet supported in numbers.js.");

      // smallest singular value
    case -2:
      throw new Error("Singular values are not yet supported in numbers.js.");

      // entry-wise norm; analogous to that of the entry-wise vector norm.
    default:
      for (i = 0; i < m; i++) {
        for (j = 0; j < n; j++) {
          ans += Math.pow(Math.abs(M[i][j]), p);
        }
      }
      ans = Math.pow(ans, 1 / p);

  }

  return ans;
};

/**
 * Determines if a matrix has an upper bandwidth of q.
 *
 * @param {Array} matrix
 * @param {Number} upper bandwidth
 * @return {Boolean} true if upper bandwidth is q; false otherwise
 */
matrix.isUpperBand = function (M, q) {
  if (!Array.isArray(M) || !Array.isArray(M[0]) || M.length < 2) {
    throw new Error('Matrix must be an array of at least dimension 2.');
  } else if (typeof q !== 'number' || q < 0 || (q % 1) !== 0) {
    throw new Error('Upper bandwidth must be a nonzero integer.');
  }
  var result = true,
    n = M[0].length,
    cnt = 0;

  for (var i = q + 1; i < n; i++) {
    if (M[cnt][i] !== 0) {
      result = false;
      break;
    }
    cnt++;
  }
  return result;
};

/**
 * Determines if a matrix has an lower bandwidth of p.
 *
 * @param {Array} matrix
 * @param {Number} lower bandwidth
 * @return {Boolean} true if lower bandwidth is p; false otherwise
 */
matrix.isLowerBand = function (M, p) {
  if (!Array.isArray(M) || !Array.isArray(M[0]) || M.length < 2) {
    throw new Error('Matrix must be an array of at least dimension 2.');
  } else if (typeof p !== 'number' || p < 0 || (p % 1) !== 0) {
    throw new Error('Lower bandwidth must be a nonzero integer.');
  }
  var result = true,
    m = M.length,
    cnt = 0;

  for (var i = p + 1; i < m; i++) {
    if (M[i][cnt] !== 0) {
      result = false;
      break;
    }
    cnt++;
  }
  return result;
};

/**
 * Add all of the elements in an array together except for the i'th one.
 * This is a helper function for determining diagonal dominance, and it
 * should be noted that each element is passed to Math.abs() beforehand.
 *
 * @param {Array} array
 * @param {Int} index of element to ignore.
 * @return {Number} sum.
 */
var sumNondiagonalElements = function (arr, i) {
  var sum = 0,
    j;

  for (j = 0; j < i; j++) {
    sum += Math.abs(arr[j]);
  }
  for (j = i + 1; j < arr.length; j++) {
    sum += Math.abs(arr[j]);
  }
  return sum;
};

/**
 * Determines if a matrix is (weak) row diagonally-dominant.
 *
 * @param {Array} matrix
 * @return {Boolean} true if so, false otherwise.
 */
matrix.isRowDD = function (M) {
  var n = M.length;
  if (!matrix.isSquare(M)) {
    throw new Error(ERROR_MATRIX_NOT_SQUARE);
  }

  for (var i = 0; i < n; i++) {
    var row = M[i],
      diag = row[i],
      sum = sumNondiagonalElements(row, i);

    if (Math.abs(diag) < sum) {
      return false;
    }
  }
  return true;
};

/**
 * Determines if a matrix is strictly row diagonally-dominant.
 *
 * @param {Array} matrix
 * @return {Boolean} true if so, false otherwise.
 */
matrix.isStrictlyRowDD = function (M) {
  if (!matrix.isSquare(M)) {
    throw new Error(ERROR_MATRIX_NOT_SQUARE);
  }

  var n = M.length;

  for (var i = 0; i < n; i++) {
    var row = M[i],
      diag = row[i],
      sum = sumNondiagonalElements(row, i);

    if (Math.abs(diag) <= sum) {
      return false;
    }
  }
  return true;
};

/**
 * Determines if a matrix is (weak) column diagonally-dominant.
 *
 * @param {Array} matrix
 * @return {Boolean} true if so, false otherwise.
 */
matrix.isColumnDD = function (M) {
  if (!matrix.isSquare) {
    throw new Error(ERROR_MATRIX_NOT_SQUARE);
  }

  var n = M.length;

  for (var i = 0; i < n; i++) {
    var col = matrix.getCol(M, i),
      diag = col[i],
      sum = sumNondiagonalElements(col, i);

    if (Math.abs(diag) < sum) {
      return false;
    }
  }
  return true;
};

/**
 * Determines if a matrix is strictly column diagonally-dominant.
 *
 * @param {Array} matrix
 * @return {Boolean} true if so, false otherwise.
 */
matrix.isStrictlyColumnDD = function (M) {
  if (!matrix.isSquare(M)) {
    throw new Error(ERROR_MATRIX_NOT_SQUARE);
  }

  var n = M.length;

  for (var i = 0; i < n; i++) {
    var col = matrix.getCol(M, i),
      diag = col[i],
      sum = sumNondiagonalElements(col, i);

    if (Math.abs(diag) <= sum) {
      return false;
    }
  }
  return true;
};

/**
 * Applies a function to every element of a vector or matrix (i.e. map).
 * The function must take only one parameter.
 *
 * @param {Array} matrix
 * @param {Function} function to apply to each element
 * @return {Array} matrix operated on
 */
matrix.map = function (M, f) {
  // M is n-by-m (n rows, m columns)
  var n = M.length,
    m = M[0].length,
    i, j;

  var res = matrix.deepCopy(M);

  for (i = 0; i < n; i++) {
    for (j = 0; j < m; j++) {
      res[i][j] = f(M[i][j]);
    }
  }
  return res;
};

/**
 * Applies a function to every element of a vector or matrix (i.e. map).
 * Identical to matrix.map, except that the function passed can take an
 * arbitrary number of parameters (minimum of 1). Any extra arguments
 * passed will be * passed to the apply-er function.
 *
 * @param {Array} matrix
 * @param {Function} function to apply to each element
 * @return {Array} matrix operated on
 */
matrix.mapMulti = function (M, f) {
  // convert arguments object to an array, ignoring M and f
  // extraArgs is of the form [x, arg0, arg1, ...]
  var extraArgs = new Array(Object.keys(arguments).length - 1);
  for (var k = 1; k < extraArgs.length; k++) {
    extraArgs[k] = arguments[k + 1];
  }

  var n = M.length,
    m = M[0].length,
    i, j;

  var res = matrix.deepCopy(M);

  for (i = 0; i < n; i++) {
    for (j = 0; j < m; j++) {
      extraArgs[0] = M[i][j];
      res[i][j] = f.apply(null, extraArgs);
    }
  }
  return res;
};

},{}],9:[function(require,module,exports){
/**
 * prime.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var basic = require('./basic');
var prime = exports;

/**
 * Determine if number is prime.
 * Adopted from http://www.javascripter.net/faq/numberisprime.htm
 *
 * @param {Number} number to evaluate.
 * @return {Boolean} return true if value is prime. false otherwise.
 */
prime.simple = function (n) {
  if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) {
    return false;
  }
  if (n % 2 === 0) {
    return (n === 2);
  }
  if (n % 3 === 0) {
    return (n === 3);
  }
  for (var i = 5, m = Math.sqrt(n); i <= m; i += 6) {
    if ((n % i === 0) || (n % (i + 2) === 0)) {
      return false;
    }
  }
  return true;
};
/**
 * Returns the prime factors of a number.
 * More info (http://bateru.com/news/2012/05/code-of-the-day-javascript-prime-factors-of-a-number/)
 * Taken from Ratio.js
 *
 * @param {Number} num
 * @return {Array} an array of numbers
 * @example prime.factorization(20).join(',') === "2,2,5"
 **/
prime.factorization = function (num) {
  num = Math.floor(num);
  var root;
  var factors = [];
  var x;
  var sqrt = Math.sqrt;
  var doLoop = 1 < num && isFinite(num);

  while (doLoop) {
    root = sqrt(num);
    x = 2;
    if (num % x) {
      x = 3;
      while ((num % x) && ((x += 2) < root)) {
        continue;
      }
    }

    x = (root < x) ? num : x;
    factors.push(x);
    doLoop = (x !== num);
    num /= x;
  }

  return factors;
};

/**
 * Determine if a number is prime in Polynomial time, using a randomized algorithm.
 * http://en.wikipedia.org/wiki/Miller-Rabin_primality_test
 *
 * @param {Number} number to Evaluate.
 * @param {Number} number to Determine accuracy rate (number of trials) default value = 20.
 * @return {Boolean} return true if value is prime. false otherwise.
 */
prime.millerRabin = function (n, k) {
  if (arguments.length === 1) k = 20;
  if (n === 2) return true;
  if (!basic.isInt(n) || n <= 1 || n % 2 === 0) return false;

  var s = 0;
  var d = n - 1;

  while (true) {
    var dm = basic.divMod(d, 2);
    var quotient = dm[0];
    var remainder = dm[1];

    if (remainder === 1) break;

    s += 1;
    d = quotient;
  }

  var tryComposite = function (a) {
    if (basic.powerMod(a, d, n) === 1) return false;

    for (var i = 0; i < s; i++) {
      if (basic.powerMod(a, Math.pow(2, i) * d, n) === n - 1) return false;
    }

    return true;
  };

  for (var i = 0; i < k; i++) {
    var a = 2 + Math.floor(Math.random() * (n - 2 - 2));
    if (tryComposite(a)) return false;
  }

  return true;
};

/**
 * Return a list of prime numbers from 1...n, inclusive.
 *
 * @param {Number} upper limit of test n.
 * @return {Array} list of values that are prime up to n.
 */
prime.sieve = function (n) {
  if (n < 2) return [];
  var result = [2];
  var i, j;

  for (i = 3; i <= n; i++) {
    var notMultiple = false;

    for (j in result) {
      if (result.hasOwnProperty(j))
        notMultiple = notMultiple || (0 === i % result[j]);
    }

    if (!notMultiple) {
      result.push(i);
    }
  }

  return result;
};

/**
 * Determine if two numbers are coprime.
 *
 * @param {Number} number.
 * @param {Number} number.
 * @return {Boolean} whether the values are coprime or not.
 */
prime.coprime = function (a, b) {
  return basic.gcd(a, b) === 1;
};

/**
 * Determine if a number is a perfect power.
 * Please note that this method does not find the minimal value of k where
 * m^k = n
 * http://en.wikipedia.org/wiki/Perfect_power
 *
 * @param {Number} value in question
 * @return {Array|Boolean} [m, k] if it is a perfect power, false otherwise
 */
prime.getPerfectPower = function (n) {
  var test = prime.getPrimePower(n);
  if (test && test[1] > 1) return test;
  return false;
};

/**
 * Determine if a number is a prime power and return the prime and the power.
 * http://en.wikipedia.org/wiki/Prime_power
 *
 * @param {Number} value in question
 * @return {Array|Boolean}  if it is a prime power, return [prime, power].
 */
prime.getPrimePower = function (n) {
  if (n < 2) return false;
  if (prime.millerRabin(n)) return [n, 1];
  if (n % 2 === 0) return [2, n.toString(2).length - 1];

  var factors = prime.factorization(n);

  if (!factors) return false;

  var len = factors.length;

  for (var i = 0; i < len; i++) {
    var t = 0,
      p = 0;

    while (t <= n) {
      t = Math.pow(factors[i], p);
      if (t / n === 1) return [factors[i], p];
      p++;
    }
  }

  return false;
};

},{"./basic":3}],10:[function(require,module,exports){
var random = exports;

// random number generator.
var rGen = Math.random;

/**
 * Set the pseudo random number generator used by the random module.
 *
 * @param {Function} Random number generator
 */
random.setGenerator = function (fn) {
  if (typeof fn !== "function") {
    throw new Error("Must pass a function");
  }
  rGen = fn;
};
/**
 * Return a random sample of values over a set of bounds with
 * a specified quantity.
 *
 * @param {Number} lower bound.
 * @param {Number} upper bound.
 * @param {Number} quantity of elements in random sample.
 * @return {Array} random sample.
 */
random.sample = function (lower, upper, n) {
  var sample = [];
  sample.length = n;

  for (var i = 0; i < n; i++) {
    sample[i] = lower + (upper - lower) * rGen();
  }
  return sample;
};

/**
 * A pseudo-random number sampling method for generating pairs of independent,
 * standard, normally distributed (zero expectation, unit variance) random
 * numbers, given a source of uniformly distributed random numbers.
 * http://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
 *
 * @param {Number} mu or mean
 * @param {Number} sigma or standard deviation
 * @return {Number} a value that is part of a normal distribution.
 */
random.boxMullerTransform = function (mu, sigma) {
  if (arguments.length <= 1) sigma = 1;
  if (arguments.length === 0) mu = 0;
  var u = 0,
    v = 0,
    s;

  do {
    u = rGen() * 2 - 1;
    v = rGen() * 2 - 1;
    s = u * u + v * v;
  } while (s === 0 || s > 1);

  var c = Math.sqrt(-2 * Math.log(s) / s),
    x = u * c,
    y = v * c;
  x = mu + x * sigma;
  y = mu + y * sigma;
  return [x, y];
};

/**
 * A Random number that is along an irwin hall distribution.
 * http://en.wikipedia.org/wiki/Irwin-Hall_distribution
 *
 * @param {Number} max possible sum
 * @param {Number} number to subtract
 * @return {Number} random number along an irwin hall distribution.
 */
random.irwinHall = function (n, sub) {
  if (arguments.length === 1) sub = 0;
  var sum = 0;
  for (var i = 0; i < n; i++) sum += rGen();
  return sum - sub;
};

/**
 * Returns a random value along a bates distribution from [a, b] or [0, 1].
 * http://en.wikipedia.org/wiki/Bates_distribution
 *
 * @param {Number} number of times summing
 * @param {Number} random maximum value (default is 1)
 * @param {Number} random minimum value (default is 0)
 * @return {Number} random number along an bates distribution.
 */
random.bates = function (n, b, a) {
  if (arguments.length <= 2) a = 0;
  if (arguments.length === 1) b = 1;
  var sum = 0;
  for (var i = 0; i < n; i++) sum += (b - a) * rGen() + a;
  return sum / n;
};

random.distribution = {};

/**
 * Returns an array of size n that is an approximate normal distribution
 *
 * @param {Number} n size of returned array
 * @param {Number} mu or mean
 * @param {Number} sigma or standard deviation
 * @return {Array} array of size n of a normal distribution
 */
random.distribution.normal = function (n, mu, sigma) {
  if (arguments.length <= 2) sigma = 1;
  if (arguments.length === 1) mu = 0;

  return random.distribution.boxMuller(n, mu, sigma);
};

/**
 * Returns an array of size n that is an approximate log normal distribution
 *
 * @param {Number} n size of returned array
 * @param {Number} mu or mean
 * @param {Number} sigma or standard deviation
 * @return {Array} array of size n of a log normal distribution
 */
random.distribution.logNormal = function (n, mu, sigma) {
  if (arguments.length <= 2) sigma = 1;
  if (arguments.length === 1) mu = 0;

  var exponential = function (x) {
    return Math.exp(x);
  };

  return random.distribution.boxMuller(n, mu, sigma).map(exponential);
};

/**
 * Returns an array of size n that is a normal distribution
 * leveraging the Box Muller Transform
 * http://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
 *
 * @param {Number} n size of returned array
 * @param {Number} mu or mean
 * @param {Number} sigma or standard deviation
 * @param {Number} determine if the distribution will be polar coordinates.
 * @return {Array} array of size n of a normal distribution
 */
random.distribution.boxMuller = function (n, mu, sigma, rc) {
  if (arguments.length <= 3) rc = false;
  if (arguments.length <= 2) sigma = 1;
  if (arguments.length === 1) mu = 0;
  var results = [];

  for (var i = 0; i < n; i++) {
    var randomBMT = random.boxMullerTransform(mu, sigma);
    results.push((rc) ? randomBMT : randomBMT[0]);
  }

  return results;
};

/**
 * Returns an array of n that is an irwin hall distribution.
 * http://en.wikipedia.org/wiki/Irwin-Hall_distribution
 *
 * @param {Number} length of array
 * @param {Number} irwinHall max sum value (default is n)
 * @param {Number} irwinHall subtraction value (default is 0)
 * @return {Array} irwin hall distribution from [a, b]
 */
random.distribution.irwinHall = function (n, m, sub) {
  if (arguments.length <= 2) sub = 0;
  if (arguments.length === 1) m = n;
  var results = new Array(n);
  for (var i = 0; i < n; i++) {
    results[i] = random.irwinHall(m, sub);
  }

  return results;
};

/**
 * An approach to create a normal distribution,
 * that relies on the central limit theorem,
 * resulting in an approximately standard normal distribution
 * with bounds of (-6, 6)
 *
 * @param {Number} length of array
 * @return {Array} an array of an approximate normal distribution from [-6, 6] of length n.
 */
random.distribution.irwinHallNormal = function (n) {
  return random.distribution.irwinHall(n, 12, 6);
};

/**
 * Returns an array of n that is a bates distribution from
 * http://en.wikipedia.org/wiki/Bates_distribution
 *
 * @param {Number} length of array
 * @param {Number} max bates value (default is n)
 * @param {Number} minimum bound a (default is 0)
 * @return {Array} bates distribution from [a, b]
 */
random.distribution.bates = function (n, b, a) {
  if (arguments.length <= 2) a = 0;
  if (arguments.length === 1) b = n;

  var results = new Array(n);

  for (var i = 0; i < n; i++) {
    results[i] = random.bates(n, b, a);
  }

  return results;
};

},{}],11:[function(require,module,exports){
/**
 * statistic.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var basic = require('./basic');
var statistic = exports;

/**
 * Calculate the mean value of a set of numbers in array.
 *
 * @param {Array} set of values.
 * @return {Number} mean value.
 */
statistic.mean = function (arr) {
  var count = arr.length;
  var sum = basic.sum(arr);
  return sum / count;
};

/**
 * Calculate the median value of a set of numbers in array.
 *
 * @param {Array} set of values.
 * @return {Number} median value.
 */
statistic.median = function (arr) {
  return statistic.quantile(arr, 1, 2);
};

/**
 * Calculate the mode value of a set of numbers in array.
 *
 * @param {Array} set of values.
 * @return {Number} mode value.
 */
statistic.mode = function (arr) {
  var counts = {};
  for (var i = 0, n = arr.length; i < n; i++) {
    if (counts[arr[i]] === undefined) {
      counts[arr[i]] = 0;
    } else {
      counts[arr[i]]++;
    }
  }

  var highest;

  for (var number in counts) {
    if (counts.hasOwnProperty(number)) {
      if (highest === undefined || counts[number] > counts[highest]) {
        highest = number;
      }
    }
  }

  return Number(highest);
};

/**
 * Calculate the kth q-quantile of a set of numbers in an array.
 * As per http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population
 * Ex: Median is 1st 2-quantile
 * Ex: Upper quartile is 3rd 4-quantile
 *
 * @param {Array} set of values.
 * @param {Number} index of quantile.
 * @param {Number} number of quantiles.
 * @return {Number} kth q-quantile of values.
 */
statistic.quantile = function (arr, k, q) {
  var sorted, count, index;

  if (k === 0) return Math.min.apply(null, arr);

  if (k === q) return Math.max.apply(null, arr);

  sorted = arr.slice(0);
  sorted.sort(function (a, b) {
    return a - b;
  });
  count = sorted.length;
  index = count * k / q;

  if (index % 1 === 0) return 0.5 * sorted[index - 1] + 0.5 * sorted[index];

  return sorted[Math.floor(index)];
};


/**
 * Return a set of summary statistics provided an array.
 *
 * @return {Object} summary statistics.
 */
statistic.report = function (array) {
  return {
    mean: statistic.mean(array),
    firstQuartile: statistic.quantile(array, 1, 4),
    median: statistic.median(array),
    thirdQuartile: statistic.quantile(array, 3, 4),
    standardDev: statistic.standardDev(array)
  };
};

/**
 * Evaluate the standard deviation for a set of values.
 *
 * @param {Array} set of values.
 * @return {Number} standard deviation.
 */
statistic.standardDev = function (arr) {
  var count = arr.length;
  var mean = statistic.mean(arr);
  var squaredArr = [];

  for (var i = 0; i < arr.length; i++) {
    squaredArr[i] = Math.pow((arr[i] - mean), 2);
  }

  return Math.sqrt((1 / count) * basic.sum(squaredArr));
};

/**
 * Evaluate the correlation amongst a set of values.
 *
 * @param {Array} set of values.
 * @return {Number} correlation.
 */
statistic.correlation = function (arrX, arrY) {
  if (arrX.length === arrY.length) {
    var covarXY = statistic.covariance(arrX, arrY);
    var stdDevX = statistic.standardDev(arrX);
    var stdDevY = statistic.standardDev(arrY);

    return covarXY / (stdDevX * stdDevY);
  } else {
    throw new Error('Array mismatch');
  }
};

/**
 * Calculate the Coefficient of Determination of a dataset and regression line.
 *
 * @param {Array} Source data.
 * @param {Array} Regression data.
 * @return {Number} A number between 0 and 1.0 that represents how well the regression line fits the data.
 */
statistic.rSquared = function (source, regression) {
  var residualSumOfSquares = basic.sum(source.map(function (d, i) {
    return basic.square(d - regression[i]);
  }));

  var totalSumOfSquares = basic.sum(source.map(function (d) {
    return basic.square(d - statistic.mean(source));
  }));

  return 1 - (residualSumOfSquares / totalSumOfSquares);
};

/**
 * Create a function to calculate the exponential regression of a dataset.
 *
 * @param {Array} set of values.
 * @return {Function} function to accept X values and return corresponding regression Y values.
 */
statistic.exponentialRegression = function (arrY) {
  var n = arrY.length;
  var arrX = basic.range(1, n);

  var xSum = basic.sum(arrX);
  var yLog = arrY.map(function (d) {
    return Math.log(d);
  });
  var xSquared = arrX.map(function (d) {
    return d * d;
  });
  var xSquaredSum = basic.sum(xSquared);
  var yLogSum = basic.sum(yLog);
  var xyLog = arrX.map(function (d, i) {
    return d * yLog[i];
  });
  var xyLogSum = basic.sum(xyLog);

  var a = (yLogSum * xSquaredSum - xSum * xyLogSum) / (n * xSquaredSum - (xSum * xSum));
  var b = (n * xyLogSum - xSum * yLogSum) / (n * xSquaredSum - (xSum * xSum));

  var fn = function (x) {
    if (typeof x === 'number') {
      return Math.exp(a) * Math.exp(b * x);
    } else {
      return x.map(function (d) {
        return Math.exp(a) * Math.exp(b * d);
      });
    }
  };

  fn.rSquared = statistic.rSquared(arrY, arrX.map(fn));

  return fn;
};

/**
 * Create a function to calculate the linear regression of a dataset.
 *
 * @param {Array} X array.
 * @param {Array} Y array.
 * @return {Function} A function which given X or array of X values will return Y.
 */
statistic.linearRegression = function (arrX, arrY) {
  var n = arrX.length;
  var xSum = basic.sum(arrX);
  var ySum = basic.sum(arrY);
  var xySum = basic.sum(arrX.map(function (d, i) {
    return d * arrY[i];
  }));
  var xSquaredSum = basic.sum(arrX.map(function (d) {
    return d * d;
  }));
  var xMean = statistic.mean(arrX);
  var yMean = statistic.mean(arrY);
  var b = (xySum - 1 / n * xSum * ySum) / (xSquaredSum - 1 / n * (xSum * xSum));
  var a = yMean - b * xMean;

  return function (x) {
    if (typeof x === 'number') {
      return a + b * x;
    } else {
      return x.map(function (d) {
        return a + b * d;
      });
    }
  };
};

/**
 * Evaluate the covariance amongst 2 sets.
 *
 * @param {Array} set 1 of values.
 * @param {Array} set 2 of values.
 * @return {Number} covariance.
 */
statistic.covariance = function (set1, set2) {
  if (set1.length === set2.length) {
    var n = set1.length;
    var total = 0;
    var sum1 = basic.sum(set1);
    var sum2 = basic.sum(set2);

    for (var i = 0; i < n; i++) {
      total += set1[i] * set2[i];
    }

    return (total - sum1 * sum2 / n) / n;
  } else {
    throw new Error('Array mismatch');
  }
};

},{"./basic":3}],12:[function(require,module,exports){
/*
RainbowVis-JS 
Released under Eclipse Public License - v 1.0
*/

function Rainbow()
{
	"use strict";
	var gradients = null;
	var minNum = 0;
	var maxNum = 100;
	var colours = ['ff0000', 'ffff00', '00ff00', '0000ff']; 
	setColours(colours);
	
	function setColours (spectrum) 
	{
		if (spectrum.length < 2) {
			throw new Error('Rainbow must have two or more colours.');
		} else {
			var increment = (maxNum - minNum)/(spectrum.length - 1);
			var firstGradient = new ColourGradient();
			firstGradient.setGradient(spectrum[0], spectrum[1]);
			firstGradient.setNumberRange(minNum, minNum + increment);
			gradients = [ firstGradient ];
			
			for (var i = 1; i < spectrum.length - 1; i++) {
				var colourGradient = new ColourGradient();
				colourGradient.setGradient(spectrum[i], spectrum[i + 1]);
				colourGradient.setNumberRange(minNum + increment * i, minNum + increment * (i + 1)); 
				gradients[i] = colourGradient; 
			}

			colours = spectrum;
		}
	}

	this.setSpectrum = function () 
	{
		setColours(arguments);
		return this;
	}

	this.setSpectrumByArray = function (array)
	{
		setColours(array);
		return this;
	}

	this.colourAt = function (number)
	{
		if (isNaN(number)) {
			throw new TypeError(number + ' is not a number');
		} else if (gradients.length === 1) {
			return gradients[0].colourAt(number);
		} else {
			var segment = (maxNum - minNum)/(gradients.length);
			var index = Math.min(Math.floor((Math.max(number, minNum) - minNum)/segment), gradients.length - 1);
			return gradients[index].colourAt(number);
		}
	}

	this.colorAt = this.colourAt;

	this.setNumberRange = function (minNumber, maxNumber)
	{
		if (maxNumber > minNumber) {
			minNum = minNumber;
			maxNum = maxNumber;
			setColours(colours);
		} else {
			throw new RangeError('maxNumber (' + maxNumber + ') is not greater than minNumber (' + minNumber + ')');
		}
		return this;
	}
}

function ColourGradient() 
{
	"use strict";
	var startColour = 'ff0000';
	var endColour = '0000ff';
	var minNum = 0;
	var maxNum = 100;

	this.setGradient = function (colourStart, colourEnd)
	{
		startColour = getHexColour(colourStart);
		endColour = getHexColour(colourEnd);
	}

	this.setNumberRange = function (minNumber, maxNumber)
	{
		if (maxNumber > minNumber) {
			minNum = minNumber;
			maxNum = maxNumber;
		} else {
			throw new RangeError('maxNumber (' + maxNumber + ') is not greater than minNumber (' + minNumber + ')');
		}
	}

	this.colourAt = function (number)
	{
		return calcHex(number, startColour.substring(0,2), endColour.substring(0,2)) 
			+ calcHex(number, startColour.substring(2,4), endColour.substring(2,4)) 
			+ calcHex(number, startColour.substring(4,6), endColour.substring(4,6));
	}
	
	function calcHex(number, channelStart_Base16, channelEnd_Base16)
	{
		var num = number;
		if (num < minNum) {
			num = minNum;
		}
		if (num > maxNum) {
			num = maxNum;
		} 
		var numRange = maxNum - minNum;
		var cStart_Base10 = parseInt(channelStart_Base16, 16);
		var cEnd_Base10 = parseInt(channelEnd_Base16, 16); 
		var cPerUnit = (cEnd_Base10 - cStart_Base10)/numRange;
		var c_Base10 = Math.round(cPerUnit * (num - minNum) + cStart_Base10);
		return formatHex(c_Base10.toString(16));
	}

	function formatHex(hex) 
	{
		if (hex.length === 1) {
			return '0' + hex;
		} else {
			return hex;
		}
	} 
	
	function isHexColour(string)
	{
		var regex = /^#?[0-9a-fA-F]{6}$/i;
		return regex.test(string);
	}

	function getHexColour(string)
	{
		if (isHexColour(string)) {
			return string.substring(string.length - 6, string.length);
		} else {
			var name = string.toLowerCase();
			if (colourNames.hasOwnProperty(name)) {
				return colourNames[name];
			}
			throw new Error(string + ' is not a valid colour.');
		}
	}
	
	// Extended list of CSS colornames s taken from
	// http://www.w3.org/TR/css3-color/#svg-color
	var colourNames = {
		aliceblue: "F0F8FF",
		antiquewhite: "FAEBD7",
		aqua: "00FFFF",
		aquamarine: "7FFFD4",
		azure: "F0FFFF",
		beige: "F5F5DC",
		bisque: "FFE4C4",
		black: "000000",
		blanchedalmond: "FFEBCD",
		blue: "0000FF",
		blueviolet: "8A2BE2",
		brown: "A52A2A",
		burlywood: "DEB887",
		cadetblue: "5F9EA0",
		chartreuse: "7FFF00",
		chocolate: "D2691E",
		coral: "FF7F50",
		cornflowerblue: "6495ED",
		cornsilk: "FFF8DC",
		crimson: "DC143C",
		cyan: "00FFFF",
		darkblue: "00008B",
		darkcyan: "008B8B",
		darkgoldenrod: "B8860B",
		darkgray: "A9A9A9",
		darkgreen: "006400",
		darkgrey: "A9A9A9",
		darkkhaki: "BDB76B",
		darkmagenta: "8B008B",
		darkolivegreen: "556B2F",
		darkorange: "FF8C00",
		darkorchid: "9932CC",
		darkred: "8B0000",
		darksalmon: "E9967A",
		darkseagreen: "8FBC8F",
		darkslateblue: "483D8B",
		darkslategray: "2F4F4F",
		darkslategrey: "2F4F4F",
		darkturquoise: "00CED1",
		darkviolet: "9400D3",
		deeppink: "FF1493",
		deepskyblue: "00BFFF",
		dimgray: "696969",
		dimgrey: "696969",
		dodgerblue: "1E90FF",
		firebrick: "B22222",
		floralwhite: "FFFAF0",
		forestgreen: "228B22",
		fuchsia: "FF00FF",
		gainsboro: "DCDCDC",
		ghostwhite: "F8F8FF",
		gold: "FFD700",
		goldenrod: "DAA520",
		gray: "808080",
		green: "008000",
		greenyellow: "ADFF2F",
		grey: "808080",
		honeydew: "F0FFF0",
		hotpink: "FF69B4",
		indianred: "CD5C5C",
		indigo: "4B0082",
		ivory: "FFFFF0",
		khaki: "F0E68C",
		lavender: "E6E6FA",
		lavenderblush: "FFF0F5",
		lawngreen: "7CFC00",
		lemonchiffon: "FFFACD",
		lightblue: "ADD8E6",
		lightcoral: "F08080",
		lightcyan: "E0FFFF",
		lightgoldenrodyellow: "FAFAD2",
		lightgray: "D3D3D3",
		lightgreen: "90EE90",
		lightgrey: "D3D3D3",
		lightpink: "FFB6C1",
		lightsalmon: "FFA07A",
		lightseagreen: "20B2AA",
		lightskyblue: "87CEFA",
		lightslategray: "778899",
		lightslategrey: "778899",
		lightsteelblue: "B0C4DE",
		lightyellow: "FFFFE0",
		lime: "00FF00",
		limegreen: "32CD32",
		linen: "FAF0E6",
		magenta: "FF00FF",
		maroon: "800000",
		mediumaquamarine: "66CDAA",
		mediumblue: "0000CD",
		mediumorchid: "BA55D3",
		mediumpurple: "9370DB",
		mediumseagreen: "3CB371",
		mediumslateblue: "7B68EE",
		mediumspringgreen: "00FA9A",
		mediumturquoise: "48D1CC",
		mediumvioletred: "C71585",
		midnightblue: "191970",
		mintcream: "F5FFFA",
		mistyrose: "FFE4E1",
		moccasin: "FFE4B5",
		navajowhite: "FFDEAD",
		navy: "000080",
		oldlace: "FDF5E6",
		olive: "808000",
		olivedrab: "6B8E23",
		orange: "FFA500",
		orangered: "FF4500",
		orchid: "DA70D6",
		palegoldenrod: "EEE8AA",
		palegreen: "98FB98",
		paleturquoise: "AFEEEE",
		palevioletred: "DB7093",
		papayawhip: "FFEFD5",
		peachpuff: "FFDAB9",
		peru: "CD853F",
		pink: "FFC0CB",
		plum: "DDA0DD",
		powderblue: "B0E0E6",
		purple: "800080",
		red: "FF0000",
		rosybrown: "BC8F8F",
		royalblue: "4169E1",
		saddlebrown: "8B4513",
		salmon: "FA8072",
		sandybrown: "F4A460",
		seagreen: "2E8B57",
		seashell: "FFF5EE",
		sienna: "A0522D",
		silver: "C0C0C0",
		skyblue: "87CEEB",
		slateblue: "6A5ACD",
		slategray: "708090",
		slategrey: "708090",
		snow: "FFFAFA",
		springgreen: "00FF7F",
		steelblue: "4682B4",
		tan: "D2B48C",
		teal: "008080",
		thistle: "D8BFD8",
		tomato: "FF6347",
		turquoise: "40E0D0",
		violet: "EE82EE",
		wheat: "F5DEB3",
		white: "FFFFFF",
		whitesmoke: "F5F5F5",
		yellow: "FFFF00",
		yellowgreen: "9ACD32"
	}
}

if (typeof module !== 'undefined') {
  module.exports = Rainbow;
}

},{}],13:[function(require,module,exports){
//Namespace for combining canvases and creating egg texture.
module.exports = function(width, height){

let base = require('./patternLayers/base.js')();
let pepper_plot = require('./patternLayers/pepper-plot.js')();
let blotch = require('./patternLayers/blotch.js')();
let streaks = require('./patternLayers/streaks.js');
let test = require('./patternLayers/test.js')();



let module = {};
//setup Main texture.
let canvasTexture = document.createElement("canvas");
canvasTexture.width = width; canvasTexture.height = height;
let texture = new THREE.CanvasTexture(canvasTexture); //THREE js Canvas texture

module.initTextures = function() {
    base.draw();
    pepper_plot.draw();
    blotch.draw_small_blotch();
    streaks.draw();

};

module.redrawTexture = function(drawCallback){
    drawCallback();
    module.combineTextures();
};

module.combineTextures = function(){
    //1. create Texture canvas
    let textureCtx = canvasTexture.getContext("2d");

    //2. retrieve all texture layers. TODO: in what sequence are they retrieved?
    let canvases = document.getElementsByClassName("texture");
    //3. draw each layer onto the final canvas
    for(const canvas of canvases){
        textureCtx.drawImage(canvas, 0,0);
    }

    //4. return THREE CanvasTexture.
    texture.canvas = canvasTexture;
    texture.updateTexture = true;
    // texture = new THREE.CanvasTexture(textureCtx.canvas);
    console.log(texture.uuid);
};

module.getTexture = function() {return texture};

return module;

};


},{"./patternLayers/base.js":16,"./patternLayers/blotch.js":17,"./patternLayers/pepper-plot.js":18,"./patternLayers/streaks.js":19,"./patternLayers/test.js":20}],14:[function(require,module,exports){


const Stats = require('./Stats.js');
const EggTexture = require('./EggTexture.js')(256, 256);

let container;
let camera;
let controls;
let renderer;
let scene;
let texture;
function init() {

    container = document.querySelector( '#scene-container' );
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x8FBCD4 );

    createCamera();
    createControls();
    createLights();
    createRenderer();

    EggTexture.initTextures();
    EggTexture.combineTextures();
    texture = EggTexture.getTexture();

    console.log("MAIN: " + texture.uuid);
    loadEgg();


    renderer.setAnimationLoop( () => {
        update();
        render();
    } );

}

function createCamera() {
    camera = new THREE.PerspectiveCamera( 35, container.clientWidth / container.clientHeight, 0.1, 1000 );
    camera.position.set(0.6817724298342465, 0.6424984836519444,-0.024665450387858244);
}

function createControls() {
    controls = new THREE.OrbitControls( camera, container );
}

function createLights() {

    const ambientLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 5 );
    const mainLight = new THREE.DirectionalLight( 0xffffff, 1 );
    mainLight.position.set( 18, 18, 18 );

    scene.add( ambientLight, mainLight );

}


function createRenderer() {

    let ctx = document.getElementById("scene-canvas");
    renderer = new THREE.WebGLRenderer( { antialias: true, canvas: ctx } );
    renderer.setSize( container.clientWidth, container.clientHeight );

    renderer.setPixelRatio( window.devicePixelRatio );

    //TODO: fix gammaFactor
    renderer.gammaFactor = 2.2;
    renderer.gammaOutput = true;

    renderer.physicallyCorrectLights = true;

    container.appendChild( renderer.domElement );

}

function update() {
    // EggTexture.update();
    // console.log(texture.uuid);
}

function render() {
    renderer.render( scene, camera );
}

function onWindowResize() {

    // camera.aspect = container.clientWidth / container.clientHeight;
    // // update the camera's frustum
    // camera.updateProjectionMatrix();
    // renderer.setSize( container.clientWidth, container.clientHeight );
}

window.addEventListener( 'resize', onWindowResize );


// function eggTextureInit(){
//     Stats.plotNewVariogram();
//     let texture = new THREE.CanvasTexture(Stats.ctxVariogram);
//     texture.needsUpdate = true;
// }


function loadEgg() {

    const loader = new THREE.GLTFLoader();

    // A reusable function to set up the models. We're passing in a position parameter
    // so that they can be individually placed around the scene
    const onLoad = ( gltf, position ) => {

        let model = gltf.scene.children[ 0 ];
        const sc = 5;
        model.scale.set(sc, sc, sc);
        //TODO: change base material colours.
        // let texture = new THREE.TextureLoader().load("../images/UV-map.jpg");
        // let texture = EggTexture.getTexture();
        model.material = new THREE.MeshStandardMaterial({map: texture, flatShading: false});
        model.position.copy( position );

        scene.add( model );
        console.log(`model '${model.name}' loaded`);
    };

    // the loader will report the loading progress to this function
    const onProgress = () => {console.log("loading model..")};

    // the loader will send any error messages to this function, and we'll log
    // them to to console
    const onError = ( errorMessage ) => { console.log( errorMessage ); };

    // load the first model. Each model is loaded asynchronously,
    // so don't make any assumption about which one will finish loading first
    //egg dimensions: 0.101 x 0.0582 x 0.0286 m

    const eggPosition = new THREE.Vector3( 0, 0, 0 );
    loader.load( '/models/guillemot-egg.glb', //URL
        gltf => onLoad( gltf, eggPosition ), //onLoad callback
        onProgress, //onProgress callback
        onError ); //onError callback

}



init();

window.main = {scene, camera};
},{"./EggTexture.js":13,"./Stats.js":15}],15:[function(require,module,exports){
/**
* Plan:
* 1. Create an array of random points (Gaussian?)
*  1.1 t - height value at (x,y). At a random location, set a random height value.
* 2. Plot those points to visualise
* 3. Create semivariogram model using kriging.js
* 4. For each pixel on a canvas, predict its colour.
*  4.1. If prediction is lower than certain threshold, set it to 0.
*  4.2. TODO: further improvement: make it to look like a layer beneath.
*/

let numbers = require('numbers');
let utility = require('./utility.js');

//setup canvases---------------------------------
let width = 256, height = 256;

//texture parameters-----------------------------
let defaultParams = {
    mu: width /2,
    variance: width / 2,
    numPoints: 150,
    sigma2: 0.8,
    alpha: 2,
    range: 5,
    sill: 200,
    nugget: 20,
    coordinateStep: 1,
    drawRadius: 1,
    threshold: 1000
};

let variogram;

let variogramModel = "gaussian";

const MIN_MU = width / 10;
const MAX_MU = width * 2;
const MIN_VARIANCE = MIN_MU / 2;
const MAX_VARIANCE = MAX_MU / 2;
const MIN_HEIGHT = 0;
const MAX_HEIGHT = 100;

const MAX_SIGMA2 = 2;
const MAX_ALPHA = 10;
const MAX_POINTS = 300;
const MIN_RANGE = 0;
const MAX_RANGE = 100;
const MIN_SILL = 0;
const MAX_SILL = 2000;
const MIN_NUGGET = 1;
const MAX_NUGGET = 200;



//utilities--------------------------------------
let colourPicker = new Rainbow();
colourPicker.setNumberRange(0,100); //TODO: change to 0-1
colourPicker.setSpectrum("#373c3d","#4bdbb0");


const setVariogramModel= function (newModel){
    switch (newModel) {
        case 'gaussian': variogramModel = 'gaussian'; break;
        case 'exponential': variogramModel = 'exponential'; break;
        case 'spherical': variogramModel = 'spherical'; break;
    }
};

const setRange = function (newRange){
    if (variogram != null){
        params.range = newRange;
        variogram.range = newRange;
    }
    else
        console.log("setRange: variogram does not exist");
};

/**
 * Generates random values (heights) at random locations in a 2D area.
 * //1.
 * @param customParams {muX, muY, varianceX, varianceY, numPoints}
 */
function generateData(customParams = {}) {
    const x = numbers.random.distribution.normal(customParams.numPoints, customParams.muX, customParams.varianceX);
    const y = numbers.random.distribution.normal(customParams.numPoints, customParams.muY, customParams.varianceY);
    const t = numbers.random.distribution.normal(customParams.numPoints, MAX_HEIGHT / 2, MAX_HEIGHT / 4);
    return {x,y,t};
}

/**
 * //2.
 * TODO: plot points as on a sphere (or do coordinate transformation relative to the model path) (AvianBioRes15)
 */
const plotPoints = function(ctx, data, colourPicker = colourPicker){
    // ctx.fillStyle = "#ffffff";
    ctx.clearRect(0,0,width, height);
    // ctx.fillRect(0, 0, width, height);
    let x, y, h;
    const radius = 2;
    for(let i = 0; i < defaultParams.numPoints; i++){
        x = data.x[i];
        y = data.y[i];
        h = data.t[i];
        ctx.beginPath();
        if(!isNaN(h))
        try{
            ctx.fillStyle = "#" + colourPicker.colourAt(h);
        }
        catch(e){
            console.error(`plotPoints: '${h}', '${i}', length: ${data.length} `);
        }
        finally{
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

    }
};


/**
 * @param {CanvasRenderingContext2D} ctx canvas as 2D context to be drawn on.
 * @param params {range, sill, nugget, alpha, variogramModel, newVariogram}
 * @param {Rainbow} colourScheme
 * @param {Object} data 3D data: X, Y, Height
 */
const plotVariogram = function(ctx, width, height, data, params, colourScheme){
    if(ctx === undefined){
        console.error("plotVariogram: canvas is not provided");
        return;
    }
    variogramModel = params.variogramModel || variogramModel;
    if (params.newVariogram)
        variogram = kriging.train(data.t, data.x, data.y, variogramModel,
            (params.sigma2 || defaultParams.sigma2),(params.alpha || defaultParams.alpha));

    if(!params.useAlpha){
        variogram.range = params.range || defaultParams.range;
        variogram.sill = params.sill || defaultParams.sill;
        variogram.nugget = params.nugget || defaultParams.nugget;
    }

    const step = params.coordinateStep || defaultParams.coordinateStep;
    const threshold = params.threshold || defaultParams.threshold;
    const alpha = params.alpha || 1;
    let radius = params.drawRadius || defaultParams.drawRadius;
    console.log(`nugget: ${variogram.nugget.toFixed(3)}; range: ${variogram.range.toFixed(3)};
     sill: ${variogram.sill.toFixed(3)}; A: ${variogram.A.toFixed(3)}; model: ${variogramModel}`);

    let value = 0; //initialise kriging prediciton value

    ctx.globalAlpha = alpha;
    // const colourScheme = params.colourScheme || colourPicker;
    for(let x = 0; x < width; x += step){
        for(let y = 0; y < height; y += step){
            value = kriging.predict(x, y, variogram);
            if (value >= threshold){
                // if((x > 100 && x < 140) && (y > 100 && y < 140)){
                //     radius = 0.1;
                  // }
                ctx.beginPath();
                ctx.fillStyle = "#" + colourScheme.colourAt(value);
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            }
            // else{console.log(value)}
        }
    }
};

const octavePerlin = function(x, y, octaves, persistence) {
    let total = 0;
    let frequency = 3;
    let amplitude = 10;
    let maxValue = 0;  // Used for normalizing result to 0.0 - 1.0
    let n = new Noise(Math.random());
    for(let i=0; i<octaves; i++) {
        total += n.perlin2(x * frequency / 50, y * frequency / 40) * amplitude;

        maxValue += amplitude;

        amplitude *= persistence;
        frequency *= 2;
    }

    return total/maxValue;
}

const init = function(w, h){
    width = w || width;
    height = h || height;
};


//======================================================================================================================
//init phase
console.log("Stats: " + numbers.random.distribution.normal(4, 10, 3));

let Stats = {
    setVariogramModel: setVariogramModel,
    setRange: setRange,
    generateData: generateData,
    plotPoints: plotPoints,
    plotVariogram: plotVariogram,
    octavePerlin: octavePerlin,
    init: init,
    width: width,
    height: height,
    defaultParams: defaultParams,
    variogramModel: variogramModel,
    MIN_MU: MIN_MU,
    MAX_MU: MAX_MU,
    MIN_VARIANCE: MIN_VARIANCE,
    MAX_VARIANCE: MAX_VARIANCE,
    MAX_SIGMA2: MAX_SIGMA2,
    MAX_ALPHA: MAX_ALPHA,
    MAX_POINTS: MAX_POINTS,
    MIN_RANGE: MIN_RANGE,
    MAX_RANGE: MAX_RANGE,
    MIN_SILL: MIN_SILL,
    MAX_SILL: MAX_SILL,
    MIN_NUGGET: MIN_NUGGET,
    MAX_NUGGET: MAX_NUGGET,
    MIN_HEIGHT: MIN_HEIGHT,
    MAX_HEIGHT: MAX_HEIGHT

};

module.exports = Stats;

},{"./utility.js":21,"numbers":1}],16:[function(require,module,exports){
let utility = require('../utility.js');
let Stats = require('../Stats.js');

module.exports = function(){
let module = {};
//init -----------------------------------------------------
const CANVAS_ID = "base-layer";
let canvas = document.getElementById(CANVAS_ID);
let width = canvas.clientWidth;
let height = canvas.clientHeight;
let ctx = canvas.getContext("2d");

module.colourScheme = ["#6bbbbf"];

module.draw = function() {
  ctx.fillStyle = module.colourScheme[0];
  ctx.fillRect(0,0,width, height);
};

return module;
};

// module.COLOUR_SCHEME_1 = {
//     base: ["#6bbbbf", "#57b9bf"],
//     baseOverlay: ["#c0d282","#cdea6c"]
// };
//
// module.COLOUR_SCHEME_2 = {
//     base: ["#fcefdf"],
//     baseOverlay: ["#9a8f7e","#a29279"]
// };
//
// module.colourScheme = module.COLOUR_SCHEME_1["baseOverlay"];
//
// module.dataRangeParams = {
//     muX: [width / 8.5, width / 1.4 ],
//     muY: [height * 0.1, height * 0.5],
//     varianceX: [width / 2 * 0.1, width / 2 * 0.3],
//     varianceY: [height / 11 , height / 7],
//     numPoints: [140, 170]
// };
//
// module.variogramRangeParams = {
//     range: [40, 60],
//     sill: [200, 280],
//     nugget: [100, 105],
//     alpha: 0.05,
//     variogramModel: "gaussian",
//     newVariogram: true,
//     drawRadius: 2,
//     threshold: 80
// };
//
// module.dataParams = utility.mapFuncToObjProps(utility.getNumberInRange, module.dataRangeParams);
// //generate data from Stats
// module.data = Stats.generateData(module.dataParams);
//
// module.variogramParams = utility.mapFuncToObjProps(utility.getNumberInRange, module.variogramRangeParams);

},{"../Stats.js":15,"../utility.js":21}],17:[function(require,module,exports){
let utility = require('../utility.js');
let rainbow = require('rainbowvis.js');
let Stats = require('../Stats.js');

module.exports = function(){
let module = {};

//init-----------------------------------------------------
const CANVAS_ID_1 = "small-blotch";
let canvas = document.getElementById(CANVAS_ID_1);
let width = canvas.clientWidth;
let height = canvas.clientHeight;
let ctx = canvas.getContext("2d");


const COLOUR_SCHEME_1 = ["#1f302e", "#111414"];
const COLOUR_SCHEME_2 = ["#eaa28b", "#8e4312"];
module.colourScheme = COLOUR_SCHEME_1;

let colourPicker = new rainbow();
colourPicker.setNumberRange(-100, 100);
colourPicker.setSpectrum(module.colourScheme[0], module.colourScheme[1]);


module.dataRangeParams = {
    muX: [width / 8, width / 1.42],
    muY: [height / 8, height / 1.42],
    varianceX: [width / 7.3, width / 7.8],
    varianceY: [height / 7.3, height / 8],
    numPoints: [140, 180]
};

module.variogramRangeParams = {
    range: [50, 90],
    sill: [250, 330],
    nugget: [80, 90],
    alpha: 1,
    variogramModel: "gaussian",
    newVariogram: true,
    useAlpha: false,
    drawRadius: 3,
    threshold: 1
};



//v1 0 big blotches
// module.variogramParams = {
//     range: 20,
//     sill: 250,
//     nugget: 10,
//     alpha: 1,
//     variogramModel: "gaussian",
//     newVariogram: true,
//     useAlpha: false,
//     drawRadius: 2,
//     threshold: 80
// };

    module.variogramParams = {
        range: 10,
        sill: 250,
        nugget: 10,
        alpha: 1,
        variogramModel: "gaussian",
        newVariogram: true,
        useAlpha: false,
        drawRadius: 2,
        threshold: 80
    };

module.dataParams = utility.mapFuncToObjProps(utility.getNumberInRange, module.dataRangeParams);
// module.variogramParams = utility.mapFuncToObjProps(utility.getNumberInRange, module.variogramRangeParams);




module.draw_small_blotch = function() {
    ctx.clearRect(0,0,width, height);
    let data = Stats.generateData(module.dataParams);
    Stats.plotVariogram(ctx, width, height, data, module.variogramParams, colourPicker);
};


return module;
};

},{"../Stats.js":15,"../utility.js":21,"rainbowvis.js":12}],18:[function(require,module,exports){
let rainbow = require('rainbowvis.js');
let Stats = require('../Stats.js');
module.exports = function(){
let module = {};
console.log("pepper plot init");
//init -----------------------------------------------------
const CANVAS_ID = "pepper-plot";
let canvas = document.getElementById(CANVAS_ID);
let width = canvas.clientWidth;
let height = canvas.clientHeight;
let ctx = canvas.getContext("2d");


module.parameters = {
    numPoints: 160,
    muX: width / 2,
    muY: height / 2,
    varianceX: width / 5,
    varianceY: height / 4
};



module.colourScheme = ['#4b555e', '#222426'];

let colourPicker = new rainbow();
colourPicker.setNumberRange(0, 100);
colourPicker.setSpectrum(module.colourScheme[0], module.colourScheme[1]);


module.draw = function(){
    Stats.plotPoints(ctx, Stats.generateData(module.parameters), colourPicker );
};
window.draw = module.draw;




return module;
};
},{"../Stats.js":15,"rainbowvis.js":12}],19:[function(require,module,exports){
let Rainbow = require('rainbowvis.js');
let Stats = require('../Stats.js');
let numbers = require('numbers');
module.exports = {

//scrawl-----
CANVAS_ID_1: "scrawl",
canvas_scrawl : undefined ,
width_scrawl : undefined,
height_scrawl : undefined,
ctx_scrawl : undefined,

ui_params : {
    period_min: 0.01,
    period_max: 10,
    period_step: 0.01,
    thickness_min: 0.1,
    thickness_max: 20,
    thickness_step: 0.1
},

scrawl_params : { octave_1: {
    period_x: 1 / 30,
    period_y: 1 / 30
},
octave_2: {
    period_x: 1 / 25,
    period_y: 1 / 40
}
},
init: function(){
    //scrawl --
    this.canvas_scrawl = document.getElementById(this.CANVAS_ID_1);
    this.width_scrawl = this.canvas_scrawl.clientWidth;
    this.height_scrawl = this.canvas_scrawl.clientHeight;
    this.ctx_scrawl = this.canvas_scrawl.getContext("2d");

    this.canvas_shorthand = document.getElementById(this.CANVAS_ID_2);
    this.width_shorthand = this.canvas_shorthand.clientWidth;
    this.height_shorthand = this.canvas_shorthand.clientHeight;
    this.ctx_shorthand = this.canvas_shorthand.getContext("2d");

    this.initColourPicker();

    this.streaks_bounds1 = {
        top_left:     {x: 0, y: 0},
        bottom_left:  {x: 0, y: this.height_scrawl * 0.6},
        top_right:    {x: this.width_scrawl, y: 0},
        bottom_right: {x: this.width_scrawl, y: this.height_scrawl * 0.6 }
    };

    this.streak_bounds_default =  {
        top_left:     {x: 0, y: 0},
        bottom_left:  {x: 0, y: this.height_scrawl },
        top_right:    {x: this.width_scrawl, y: 0},
        bottom_right: {x: this.width_scrawl, y: this.height_scrawl }
    }
},


//shorthand-----
CANVAS_ID_2:"shorthand",
canvas_shorthand: undefined,
width_shorthand : undefined,
height_shorthand : undefined,
ctx_shorthand : undefined,

shorthand_params : {
    octave_1: {
        period_x: 1 / 10,
        period_y: 1 / 10
    },
    octave_2: {
        period_x: 1 / 25,
        period_y: 1 / 40
    }
},



colourScheme : ['#73739c', '#222426'],

colourPicker : new Rainbow(),
initColourPicker: function() {
    this.colourPicker.setNumberRange(-10, 10);
    this.colourPicker.setSpectrum(this.colourScheme[0], this.colourScheme[1]);
},






streaks_bounds1 : undefined,
streak_bounds_default : undefined,


/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {period_x, period_y} octave_1 used for scale
 * @param {period_x, period_y} octave_2 scale and "stretching" direction
 * @param thickness
 * @param seed
 */
drawStreaks : function(ctx, octave_1, octave_2, thickness=10, seed=Math.random()){
    let perlin_value;
    let o_1;
    let o_2;
    let n = new Noise(seed);
    let drawing_area = this.streak_bounds_default;
    let perlin_scalar = 210;

    for(let x = drawing_area.top_left.x; x < drawing_area.top_right.x; x++){

        for(let y = drawing_area.top_left.y; y < drawing_area.bottom_right.y; y++){

            o_1 = n.perlin2(x * octave_1.period_x, y * octave_1.period_y);
            o_2 = n.perlin2(x * octave_2.period_x, y * octave_2.period_y);

            perlin_value = Math.abs(o_1 + o_2) * perlin_scalar;

            if(perlin_value < thickness){
                ctx.beginPath();
                ctx.fillStyle = '#' + this.colourPicker.colourAt(perlin_value);
                ctx.arc(x,y,1,0, Math.PI * 2);
                ctx.fill();
            }
        }
}

},
//used for splitting perlin noise into separate streaks.
drawMask : function(ctx, width, height){
    let interval = [10, 20];
    let stripe_thickness = 7; //pixels
    let num_of_intervals = Math.floor(numbers.random.sample(interval[0], interval[1], 1)[0]);

    //y
    for(let y = 0; y < height; y += stripe_thickness + height / num_of_intervals){
        ctx.clearRect(0, y, width, stripe_thickness);
    }

    //x
    // for(let x = 0; x < width; x += stripe_thickness + width / num_of_intervals ){
    //     ctx.clearRect(x, 0, stripe_thickness, height );
    // }
},

drawShorthand : function(){
    this.ctx_shorthand.clearRect(0,0, this.width_shorthand, this.height_shorthand);
    this.drawStreaks(this.ctx_shorthand, this.shorthand_params.octave_1, this.shorthand_params.octave_2);
    this.drawMask(this.ctx_shorthand, this.width_shorthand, this.height_shorthand);

},
drawScrawl : function(){
    this.ctx_scrawl.clearRect(0,0, this.width_scrawl, this.height_scrawl);
    this.drawStreaks(this.ctx_scrawl, this.scrawl_params.octave_1, this.scrawl_params.octave_2);
    this.drawMask(this.ctx_scrawl, this.width_scrawl, this.height_scrawl);
},

draw : function(){
    this.drawScrawl();
    this.drawShorthand();
},

};

module.exports.init();

window.streaks = module.exports;

},{"../Stats.js":15,"numbers":1,"rainbowvis.js":12}],20:[function(require,module,exports){

module.exports = function(){
module = {};

let canvas = document.getElementById("test");
let width = canvas.width;
let height = canvas.height;
let ctx =  canvas.getContext("2d");

let corners = {
    top_left: {x: 0, y: 0},
    top_right: {x: width-10, y: 0},
    bottom_left: {x: 0, y: height-10},
    bottom_right: {x: width-10, y: height-10},
    center: {x: width / 2 - 10, y: height / 2 - 10},
    bottom_mid: {x: width / 2 - 10, y: height - 10},
    top_mid: {x: width / 2 - 10 , y: 0},
    cl: {x: width / 2 - 40, y: height / 2 - 10},
    cr: {x: width / 2 + 20, y: height / 2 - 10},
    ct: {x: width / 2 - 10, y: height / 2 - 50},
    cb: {x: width / 2 - 10, y: height / 2 + 30},
    mid_left: {x: 0, y: height / 2 - 10},
    mid_right: {x: width - 10, y: height / 2 - 10}

};


ctx.fillStyle = '#fc0388';

module.draw = function() {
    for(let c in corners){
        if(c === "cr")
            ctx.fillStyle = '#f5f542';
        else
            ctx.fillStyle = '#fc0388';
        ctx.fillRect(corners[c].x, corners[c].y, 10, 10);
    }
};

return module;
};
},{}],21:[function(require,module,exports){
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
},{"numbers":1}]},{},[14]);
