/**
 * 14. Longest Common Prefix
 * https://leetcode.com/problems/longest-common-prefix/
 *
 * Vertical scan: compare character i of every string; stop at the first mismatch or at
 * the end of any string.
 *
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  const first = strs[0];
  for (let i = 0; i < first.length; i++) {
    for (let k = 1; k < strs.length; k++) {
      if (i >= strs[k].length || strs[k][i] !== first[i]) return first.slice(0, i);
    }
  }
  return first;
};

module.exports = { longestCommonPrefix };
