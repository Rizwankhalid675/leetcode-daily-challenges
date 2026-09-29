/**
 * 2223. Sum of Scores of Built Strings
 * https://leetcode.com/problems/sum-of-scores-of-built-strings/
 * Score of each suffix = its longest common prefix with s, which is exactly the Z-function.
 * Sum z[i] over all i with z[0] = n.
 */
var sumScores = function (s) {
  const n = s.length;
  const z = new Int32Array(n);
  let total = n;
  for (let i = 1, l = 0, r = 0; i < n; i++) {
    let k = 0;
    if (i < r) k = Math.min(r - i, z[i - l]);
    while (i + k < n && s.charCodeAt(k) === s.charCodeAt(i + k)) k++;
    z[i] = k;
    if (i + k > r) { l = i; r = i + k; }
    total += k;
  }
  return total;
};

module.exports = { sumScores };
