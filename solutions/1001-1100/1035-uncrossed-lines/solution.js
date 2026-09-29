/**
 * 1035. Uncrossed Lines
 * https://leetcode.com/problems/uncrossed-lines/
 * Non-crossing matching lines are exactly a common subsequence, so this is LCS with two rolling rows.
 */
var maxUncrossedLines = function (nums1, nums2) {
  const m = nums1.length, n = nums2.length;
  let prev = new Int32Array(n + 1), cur = new Int32Array(n + 1);
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      cur[j] = nums1[i - 1] === nums2[j - 1] ? prev[j - 1] + 1 : Math.max(prev[j], cur[j - 1]);
    }
    [prev, cur] = [cur, prev];
  }
  return prev[n];
};

module.exports = { maxUncrossedLines };
