/**
 * 1679. Max Number of K-Sum Pairs
 * https://leetcode.com/problems/max-number-of-k-sum-pairs/
 *
 * One pass with a count map of unmatched values: if the complement k - x is waiting,
 * pair them; otherwise leave x waiting.
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function (nums, k) {
  const waiting = new Map();
  let ops = 0;
  for (const x of nums) {
    const need = k - x;
    const count = waiting.get(need) ?? 0;
    if (count > 0) {
      waiting.set(need, count - 1);
      ops++;
    } else {
      waiting.set(x, (waiting.get(x) ?? 0) + 1);
    }
  }
  return ops;
};

module.exports = { maxOperations };
