/**
 * 78. Subsets
 * https://leetcode.com/problems/subsets/
 * Every subset corresponds to a bitmask from 0 to 2^n − 1; bit i says whether nums[i] is included.
 */
var subsets = function (nums) {
  const n = nums.length;
  const res = [];
  for (let mask = 0; mask < 1 << n; mask++) {
    const s = [];
    for (let i = 0; i < n; i++) if ((mask >> i) & 1) s.push(nums[i]);
    res.push(s);
  }
  return res;
};

module.exports = { subsets };
