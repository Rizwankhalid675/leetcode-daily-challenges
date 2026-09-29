/**
 * 1191. K-Concatenation Maximum Sum
 * https://leetcode.com/problems/k-concatenation-maximum-sum/
 * Kadane (empty subarray allowed) on one copy if k = 1, else on two copies; if the array total is positive, the best span also covers the k-2 middle copies whole, adding (k-2)*total. All sums stay below 2^53, so reduce mod 1e9+7 only at the end.
 */
var kConcatenationMaxSum = function (arr, k) {
  const MOD = 1e9 + 7;
  const n = arr.length;
  const copies = k === 1 ? 1 : 2;
  let best = 0;
  let cur = 0;
  let total = 0;
  for (const x of arr) total += x;
  for (let i = 0; i < n * copies; i++) {
    cur = Math.max(0, cur) + arr[i % n];
    if (cur > best) best = cur;
  }
  if (k > 1 && total > 0) best += (k - 2) * total; // <= 2e9 + 1e5 * 1e9, exact in doubles
  return best % MOD;
};

module.exports = { kConcatenationMaxSum };
