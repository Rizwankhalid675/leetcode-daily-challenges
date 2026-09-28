/**
 * 15. 3Sum
 * https://leetcode.com/problems/3sum/
 *
 * Sort, fix the smallest element nums[i], then find pairs summing to -nums[i] with
 * converging pointers on the rest. Skip equal values at every level to avoid duplicate
 * triplets.
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const a = [...nums].sort((x, y) => x - y);
  const n = a.length;
  const result = [];
  for (let i = 0; i < n - 2 && a[i] <= 0; i++) {
    if (i > 0 && a[i] === a[i - 1]) continue; // same first element already handled
    let lo = i + 1;
    let hi = n - 1;
    while (lo < hi) {
      const sum = a[i] + a[lo] + a[hi];
      if (sum < 0) lo++;
      else if (sum > 0) hi--;
      else {
        result.push([a[i], a[lo], a[hi]]);
        while (lo < hi && a[lo] === a[lo + 1]) lo++;
        while (lo < hi && a[hi] === a[hi - 1]) hi--;
        lo++;
        hi--;
      }
    }
  }
  return result;
};

module.exports = { threeSum };
