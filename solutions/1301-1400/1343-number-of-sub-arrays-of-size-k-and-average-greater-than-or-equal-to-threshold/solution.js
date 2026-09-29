/**
 * 1343. Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold
 * https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/
 * Fixed-size sliding window sum; compare it to k * threshold to stay in integers.
 */
var numOfSubarrays = function (arr, k, threshold) {
  const target = k * threshold;
  let sum = 0, count = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (i >= k) sum -= arr[i - k];
    if (i >= k - 1 && sum >= target) count++;
  }
  return count;
};

module.exports = { numOfSubarrays };
