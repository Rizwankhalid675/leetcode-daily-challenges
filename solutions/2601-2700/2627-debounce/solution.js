/**
 * 2627. Debounce
 * https://leetcode.com/problems/debounce/
 * Each call clears the pending timer and schedules a new one for t ms later with the latest arguments.
 */
/**
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function}
 */
var debounce = function (fn, t) {
  let id;
  return function (...args) {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), t);
  };
};

/**
 * const log = debounce(console.log, 100);
 * log('Hello'); // cancelled
 * log('Hello'); // cancelled
 * log('Hello'); // Logged at t=100ms
 */

module.exports = { debounce };
