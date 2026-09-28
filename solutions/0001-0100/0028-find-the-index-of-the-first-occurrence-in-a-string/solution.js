/**
 * 28. Find the Index of the First Occurrence in a String
 * https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/
 *
 * Knuth-Morris-Pratt. lps[i] = length of the longest proper prefix of needle[0..i] that is
 * also a suffix of it. On a mismatch, fall back to lps[matched - 1] instead of restarting,
 * so the haystack pointer never moves backwards: O(n + m).
 *
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  const m = needle.length;
  const lps = new Array(m).fill(0);
  for (let i = 1, len = 0; i < m; ) {
    if (needle[i] === needle[len]) lps[i++] = ++len;
    else if (len > 0) len = lps[len - 1];
    else lps[i++] = 0;
  }
  for (let i = 0, j = 0; i < haystack.length; ) {
    if (haystack[i] === needle[j]) {
      i++;
      j++;
      if (j === m) return i - m;
    } else if (j > 0) {
      j = lps[j - 1];
    } else {
      i++;
    }
  }
  return -1;
};

module.exports = { strStr };
