/**
 * 1458. Max Dot Product of Two Subsequences
 * https://leetcode.com/problems/max-dot-product-of-two-subsequences/
 * LCS-style DP: best[i][j] = max(skip a[i], skip b[j], pair a[i]*b[j] plus max(0, best[i-1][j-1])). The pair term forces a non-empty choice.
 */
var maxDotProduct = function (nums1, nums2) {
  const m = nums1.length, n = nums2.length;
  let prev = new Float64Array(n + 1).fill(-Infinity);
  let cur = new Float64Array(n + 1);
  for (let i = 1; i <= m; i++) {
    cur[0] = -Infinity;
    const a = nums1[i - 1];
    for (let j = 1; j <= n; j++) {
      const pair = a * nums2[j - 1] + Math.max(0, prev[j - 1]);
      cur[j] = Math.max(pair, prev[j], cur[j - 1]);
    }
    [prev, cur] = [cur, prev];
  }
  return prev[n];
};

module.exports = { maxDotProduct };
