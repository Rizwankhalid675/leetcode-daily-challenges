/**
 * 131. Palindrome Partitioning
 * https://leetcode.com/problems/palindrome-partitioning/
 * Precompute pal[i][j] (is s[i..j] a palindrome) with interval DP, then backtrack over the end of each next piece.
 */
var partition = function (s) {
  const n = s.length;
  const pal = Array.from({ length: n }, () => new Array(n).fill(false));
  for (let i = n - 1; i >= 0; i--)
    for (let j = i; j < n; j++)
      pal[i][j] = s[i] === s[j] && (j - i < 2 || pal[i + 1][j - 1]);
  const res = [];
  const cur = [];
  const go = (start) => {
    if (start === n) {
      res.push(cur.slice());
      return;
    }
    for (let end = start; end < n; end++) {
      if (!pal[start][end]) continue;
      cur.push(s.slice(start, end + 1));
      go(end + 1);
      cur.pop();
    }
  };
  go(0);
  return res;
};

module.exports = { partition };
