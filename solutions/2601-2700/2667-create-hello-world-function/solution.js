/**
 * 2667. Create Hello World Function
 * https://leetcode.com/problems/create-hello-world-function/
 * Return a closure that ignores its arguments and always yields the string "Hello World".
 */
/**
 * @return {Function}
 */
var createHelloWorld = function () {
  return function (...args) {
    return 'Hello World';
  };
};

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */

module.exports = { createHelloWorld };
