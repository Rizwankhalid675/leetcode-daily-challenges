/**
 * 2631. Group By
 * https://leetcode.com/problems/group-by/
 * Extend Array.prototype: one pass, bucket each item under fn(item) in a plain object, creating the bucket on first sight.
 */
/**
 * @param {Function} fn
 * @return {Object}
 */
Array.prototype.groupBy = function (fn) {
  const res = {};
  for (const item of this) {
    const key = fn(item);
    if (Object.prototype.hasOwnProperty.call(res, key)) res[key].push(item);
    else res[key] = [item];
  }
  return res;
};

/**
 * [1,2,3].groupBy(String) // {"1":[1],"2":[2],"3":[3]}
 */

module.exports = { Array };
