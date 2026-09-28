/**
 * 72. Edit Distance
 * https://leetcode.com/problems/edit-distance/
 *
 * dp[i][j] = edits to turn word1[0..i) into word2[0..j).
 * Same last char: dp[i-1][j-1]. Otherwise 1 + min(replace dp[i-1][j-1], delete dp[i-1][j],
 * insert dp[i][j-1]). Base: dp[i][0] = i, dp[0][j] = j. Two rolling rows.
 *
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const m = word1.length;
  const n = word2.length;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  let curr = new Array(n + 1);
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      curr[j] =
        word1[i - 1] === word2[j - 1]
          ? prev[j - 1]
          : 1 + Math.min(prev[j - 1], prev[j], curr[j - 1]);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
};

module.exports = { minDistance };
