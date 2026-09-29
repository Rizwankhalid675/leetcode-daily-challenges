/**
 * 2665. Counter II
 * https://leetcode.com/problems/counter-ii/
 * Close over the current value; increment/decrement mutate it and reset restores the initial value.
 */
/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function (init) {
  let cur = init;
  return {
    increment: () => ++cur,
    decrement: () => --cur,
    reset: () => (cur = init),
  };
};

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */

module.exports = { createCounter };
