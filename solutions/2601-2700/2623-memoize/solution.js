/**
 * 2623. Memoize
 * https://leetcode.com/problems/memoize/
 * Cache results in a Map keyed by the argument list (length-prefixed, comma-joined numbers); only cache misses call fn.
 */
/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = args.length + ':' + args.join(',');
    if (cache.has(key)) return cache.get(key);
    const val = fn(...args);
    cache.set(key, val);
    return val;
  };
}

/**
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1
 */

module.exports = { memoize };
