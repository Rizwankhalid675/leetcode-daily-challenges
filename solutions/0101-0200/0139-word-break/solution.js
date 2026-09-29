/**
 * 139. Word Break
 * https://leetcode.com/problems/word-break/
 * ok[i] = the prefix s[0..i) can be segmented. For each i, try every dictionary word length L (at most 20 distinct) ending at i via a Set lookup.
 */
var wordBreak = function (s, wordDict) {
  const words = new Set(wordDict);
  const lens = [...new Set(wordDict.map((w) => w.length))];
  const n = s.length;
  const ok = new Array(n + 1).fill(false);
  ok[0] = true;
  for (let i = 1; i <= n; i++) {
    for (const L of lens) {
      if (L <= i && ok[i - L] && words.has(s.slice(i - L, i))) {
        ok[i] = true;
        break;
      }
    }
  }
  return ok[n];
};

module.exports = { wordBreak };
