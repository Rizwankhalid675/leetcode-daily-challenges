/**
 * 2637. Promise Time Limit
 * https://leetcode.com/problems/promise-time-limit/
 * Race fn(...args) against a timer that rejects with "Time Limit Exceeded"; settle with whichever comes first and clear the timer.
 */
/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var timeLimit = function (fn, t) {
  return async function (...args) {
    return new Promise((resolve, reject) => {
      const id = setTimeout(() => reject('Time Limit Exceeded'), t);
      fn(...args)
        .then(resolve, reject)
        .finally(() => clearTimeout(id));
    });
  };
};

/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */

module.exports = { timeLimit };
