/**
 * 198. House Robber
 * https://leetcode.com/problems/house-robber/
 *
 * best(i) = max(best(i-1), best(i-2) + nums[i]): either skip house i, or rob it and add the
 * best result that ends two houses back. Two rolling variables.
 *
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  let skipPrev = 0; // best(i-2)
  let prev = 0; // best(i-1)
  for (const money of nums) {
    const here = Math.max(prev, skipPrev + money);
    skipPrev = prev;
    prev = here;
  }
  return prev;
};

module.exports = { rob };
