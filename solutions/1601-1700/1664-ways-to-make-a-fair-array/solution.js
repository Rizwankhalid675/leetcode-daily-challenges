/**
 * 1664. Ways to Make a Fair Array
 * https://leetcode.com/problems/ways-to-make-a-fair-array/
 * Removing index i flips the parity of everything after it. Keep even/odd sums of the prefix and suffix; i works when prefixEven + suffixOdd === prefixOdd + suffixEven.
 */
var waysToMakeFair = function (nums) {
  let sufEven = 0;
  let sufOdd = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i % 2 === 0) sufEven += nums[i];
    else sufOdd += nums[i];
  }
  let preEven = 0;
  let preOdd = 0;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i % 2 === 0) sufEven -= nums[i];
    else sufOdd -= nums[i];
    if (preEven + sufOdd === preOdd + sufEven) count++;
    if (i % 2 === 0) preEven += nums[i];
    else preOdd += nums[i];
  }
  return count;
};

module.exports = { waysToMakeFair };
