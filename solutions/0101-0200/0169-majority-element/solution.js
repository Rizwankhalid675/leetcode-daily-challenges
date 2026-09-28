/**
 * 169. Majority Element
 * https://leetcode.com/problems/majority-element/
 *
 * Boyer-Moore voting: keep a candidate and a counter; matching elements vote for it,
 * others vote against. Pairing each non-majority vote with a majority vote can never
 * exhaust the majority (it has more than n/2 votes), so the surviving candidate wins.
 *
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let candidate = null;
  let count = 0;
  for (const x of nums) {
    if (count === 0) candidate = x;
    count += x === candidate ? 1 : -1;
  }
  return candidate;
};

module.exports = { majorityElement };
