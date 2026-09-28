/**
 * 27. Remove Element
 * https://leetcode.com/problems/remove-element/
 *
 * Write pointer: copy every element != val forward; the write position is the new length.
 *
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let k = 0;
  for (const x of nums) if (x !== val) nums[k++] = x;
  return k;
};

module.exports = { removeElement };
