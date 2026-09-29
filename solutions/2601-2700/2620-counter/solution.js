/**
 * 2620. Counter
 * https://leetcode.com/problems/counter/
 * Keep the next value in a closure variable and post-increment it on every call.
 */
/**
 * @param {number} n
 * @return {Function} counter
 */
var createCounter = function (n) {
  return function () {
    return n++;
  };
};

/**
 * const counter = createCounter(10)
 * counter() // 10
 * counter() // 11
 * counter() // 12
 */

module.exports = { createCounter };
