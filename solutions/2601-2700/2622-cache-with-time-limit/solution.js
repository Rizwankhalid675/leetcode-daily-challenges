/**
 * 2622. Cache With Time Limit
 * https://leetcode.com/problems/cache-with-time-limit/
 * Map key -> {value, timer}; each set replaces the entry and (re)arms a setTimeout that deletes it on expiry, so get/count just read the Map.
 */
var TimeLimitedCache = function () {
  this.cache = new Map();
};

/**
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
  const prev = this.cache.get(key);
  if (prev) clearTimeout(prev.timer);
  const timer = setTimeout(() => this.cache.delete(key), duration);
  this.cache.set(key, { value, timer });
  return prev !== undefined;
};

/**
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
  const e = this.cache.get(key);
  return e ? e.value : -1;
};

/**
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
  return this.cache.size;
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */

module.exports = { TimeLimitedCache };
