/**
 * 2722. Join Two Arrays by ID
 * https://leetcode.com/problems/join-two-arrays-by-id/
 * Map id -> merged object (arr1 first, then arr2 spread over it, so arr2 wins); output the values sorted by id.
 */
/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function (arr1, arr2) {
  const byId = new Map();
  for (const o of arr1) byId.set(o.id, o);
  for (const o of arr2) {
    const prev = byId.get(o.id);
    byId.set(o.id, prev ? { ...prev, ...o } : o);
  }
  return [...byId.values()].sort((a, b) => a.id - b.id);
};

module.exports = { join };
