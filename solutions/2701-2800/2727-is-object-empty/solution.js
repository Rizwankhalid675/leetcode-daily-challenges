/**
 * 2727. Is Object Empty
 * https://leetcode.com/problems/is-object-empty/
 * for...in stops at the first own key (or array index): any iteration means non-empty. That is O(1) instead of building Object.keys.
 */
/**
 * @param {Object|Array} obj
 * @return {boolean}
 */
var isEmpty = function (obj) {
  for (const _ in obj) return false;
  return true;
};

module.exports = { isEmpty };
