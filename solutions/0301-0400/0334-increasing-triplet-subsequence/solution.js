/**
 * 334. Increasing Triplet Subsequence
 * https://leetcode.com/problems/increasing-triplet-subsequence/
 *
 * Keep first = smallest value seen, second = smallest value that has something smaller
 * before it. Any value greater than second completes a triplet.
 *
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function (nums) {
  let first = Infinity;
  let second = Infinity;
  for (const x of nums) {
    if (x <= first) first = x;
    else if (x <= second) second = x;
    else return true; // x > second > (some earlier value)
  }
  return false;
};

module.exports = { increasingTriplet };
