/**
 * 1415. The k-th Lexicographical String of All Happy Strings of Length n
 * https://leetcode.com/problems/the-k-th-lexicographical-string-of-all-happy-strings-of-length-n/
 * There are 3 * 2^(n-1) happy strings. Pick each character directly: the first letter splits the
 * list into thirds, and every later letter into halves among the two letters that differ from the previous one.
 */
var getHappyString = function (n, k) {
  let block = 1 << (n - 1);
  if (k > 3 * block) return '';
  k--; // 0-based rank
  let res = 'abc'[Math.floor(k / block)];
  k %= block;
  for (let i = 1; i < n; i++) {
    block >>= 1;
    const opts = 'abc'.replace(res[i - 1], '');
    res += opts[Math.floor(k / block)];
    k %= block;
  }
  return res;
};

module.exports = { getHappyString };
