/**
 * 712. Minimum ASCII Delete Sum for Two Strings
 * https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/
 * Keep the common subsequence with the largest ASCII sum (weighted LCS); the answer is the total ASCII of both strings minus twice that.
 */
var minimumDeleteSum = function (s1, s2) {
  const m = s1.length, n = s2.length;
  const a = Array.from(s1, (c) => c.charCodeAt(0));
  const b = Array.from(s2, (c) => c.charCodeAt(0));
  let prev = new Int32Array(n + 1), cur = new Int32Array(n + 1);
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      cur[j] = a[i - 1] === b[j - 1] ? prev[j - 1] + a[i - 1] : Math.max(prev[j], cur[j - 1]);
    }
    [prev, cur] = [cur, prev];
  }
  let total = 0;
  for (const x of a) total += x;
  for (const x of b) total += x;
  return total - 2 * prev[n];
};

module.exports = { minimumDeleteSum };
