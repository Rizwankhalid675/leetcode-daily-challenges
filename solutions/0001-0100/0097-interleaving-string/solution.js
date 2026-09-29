/**
 * 97. Interleaving String
 * https://leetcode.com/problems/interleaving-string/
 * dp[i][j] = can the first i chars of s1 and first j chars of s2 form the first i+j chars of s3. Rolled into one row of length |s2|+1.
 */
var isInterleave = function (s1, s2, s3) {
  const m = s1.length;
  const n = s2.length;
  if (m + n !== s3.length) return false;
  const dp = new Array(n + 1).fill(false);
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 && j === 0) {
        dp[j] = true;
        continue;
      }
      const k = i + j - 1;
      const fromS1 = i > 0 && dp[j] && s1[i - 1] === s3[k]; // dp[j] still holds row i-1
      const fromS2 = j > 0 && dp[j - 1] && s2[j - 1] === s3[k];
      dp[j] = fromS1 || fromS2;
    }
  }
  return dp[n];
};

module.exports = { isInterleave };
