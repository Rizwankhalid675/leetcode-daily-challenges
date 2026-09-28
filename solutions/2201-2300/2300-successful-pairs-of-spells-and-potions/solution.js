/**
 * 2300. Successful Pairs of Spells and Potions
 * https://leetcode.com/problems/successful-pairs-of-spells-and-potions/
 *
 * Sort potions once. For each spell, binary search the first potion with
 * spell * potion >= success; every potion from there on also succeeds.
 *
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
var successfulPairs = function (spells, potions, success) {
  const sorted = [...potions].sort((a, b) => a - b);
  const m = sorted.length;
  return spells.map((spell) => {
    let lo = 0;
    let hi = m; // first index where spell * sorted[i] >= success
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (spell * sorted[mid] >= success) hi = mid;
      else lo = mid + 1;
    }
    return m - lo;
  });
};

module.exports = { successfulPairs };
