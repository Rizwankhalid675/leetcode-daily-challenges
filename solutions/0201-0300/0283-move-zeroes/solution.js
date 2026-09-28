/**
 * 283. Move Zeroes
 * https://leetcode.com/problems/move-zeroes/
 *
 * Write pointer: copy every non-zero forward in order, then fill the tail with zeros.
 * Each element is written at most once, which minimizes writes compared with swapping.
 *
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let write = 0;
  for (const x of nums) {
    if (x !== 0) nums[write++] = x;
  }
  while (write < nums.length) nums[write++] = 0;
};

module.exports = { moveZeroes };
