/**
 * 1207. Unique Number of Occurrences
 * https://leetcode.com/problems/unique-number-of-occurrences/
 *
 * Count each value, then check that no two values share a count: the number of distinct
 * counts must equal the number of distinct values.
 *
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function (arr) {
  const counts = new Map();
  for (const x of arr) counts.set(x, (counts.get(x) ?? 0) + 1);
  return new Set(counts.values()).size === counts.size;
};

module.exports = { uniqueOccurrences };
