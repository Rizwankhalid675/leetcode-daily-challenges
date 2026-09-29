/**
 * 448. Find All Numbers Disappeared in an Array
 * https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/
 * In-place marking: for each value v, negate nums[v-1]; indices still positive were never seen.
 */
var findDisappearedNumbers = function (nums) {
  for (const x of nums) {
    const i = Math.abs(x) - 1;
    if (nums[i] > 0) nums[i] = -nums[i];
  }
  const out = [];
  for (let i = 0; i < nums.length; i++) if (nums[i] > 0) out.push(i + 1);
  return out;
};

module.exports = { findDisappearedNumbers };
