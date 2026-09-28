/**
 * 392. Is Subsequence
 * https://leetcode.com/problems/is-subsequence/
 *
 * Greedy: scan t once, advancing a pointer into s whenever the characters match.
 * Matching each character of s at its earliest possible position in t never hurts.
 *
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  let i = 0;
  for (let j = 0; j < t.length && i < s.length; j++) {
    if (s[i] === t[j]) i++;
  }
  return i === s.length;
};

module.exports = { isSubsequence };
