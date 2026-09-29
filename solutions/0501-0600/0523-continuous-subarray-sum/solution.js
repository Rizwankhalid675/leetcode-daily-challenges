/**
 * 523. Continuous Subarray Sum
 * https://leetcode.com/problems/continuous-subarray-sum/
 * Two prefix sums with the same remainder mod k bound a multiple-of-k subarray. Record the first index of each remainder and require a gap of at least 2.
 */
var checkSubarraySum = function (nums, k) {
  const first = new Map([[0, -1]]);
  let rem = 0;
  for (let i = 0; i < nums.length; i++) {
    rem = (rem + nums[i]) % k;
    if (first.has(rem)) {
      if (i - first.get(rem) >= 2) return true;
    } else {
      first.set(rem, i);
    }
  }
  return false;
};

module.exports = { checkSubarraySum };
