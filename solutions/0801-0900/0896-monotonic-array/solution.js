/**
 * 896. Monotonic Array
 * https://leetcode.com/problems/monotonic-array/
 * One pass tracking whether any increase and any decrease occurred; monotonic unless both did.
 */
var isMonotonic = function (nums) {
  let up = false, down = false;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) up = true;
    else if (nums[i] < nums[i - 1]) down = true;
    if (up && down) return false;
  }
  return true;
};

module.exports = { isMonotonic };
