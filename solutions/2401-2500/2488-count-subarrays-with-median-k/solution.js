/**
 * 2488. Count Subarrays With Median K
 * https://leetcode.com/problems/count-subarrays-with-median-k/
 * Map values to +1 (> k) / -1 (< k). A subarray containing k has median k iff its sum is 0 or 1. Count left-side balances ending at k, then match each right-side balance b with left balances -b and 1-b.
 */
var countSubarrays = function (nums, k) {
  const n = nums.length;
  const p = nums.indexOf(k);
  const cnt = new Int32Array(2 * n + 3);
  const OFF = n + 1;
  let bal = 0;
  cnt[OFF]++;
  for (let i = p - 1; i >= 0; i--) {
    bal += nums[i] > k ? 1 : -1;
    cnt[bal + OFF]++;
  }
  let ans = 0;
  bal = 0;
  for (let j = p; j < n; j++) {
    if (j > p) bal += nums[j] > k ? 1 : -1;
    ans += cnt[-bal + OFF] + cnt[1 - bal + OFF];
  }
  return ans;
};

module.exports = { countSubarrays };
