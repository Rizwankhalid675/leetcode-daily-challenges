/**
 * 5. Longest Palindromic Substring
 * https://leetcode.com/problems/longest-palindromic-substring/
 * Expand around each of the 2n - 1 centres (letters and gaps between them), keeping the widest
 * palindrome found. O(n^2) time, O(1) extra space.
 */
var longestPalindrome = function (s) {
  const n = s.length;
  let start = 0, len = 1;
  for (let c = 0; c < 2 * n - 1; c++) {
    let l = c >> 1, r = l + (c & 1);
    while (l >= 0 && r < n && s[l] === s[r]) { l--; r++; }
    if (r - l - 1 > len) { len = r - l - 1; start = l + 1; }
  }
  return s.substr(start, len);
};

module.exports = { longestPalindrome };
