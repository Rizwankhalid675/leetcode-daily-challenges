/**
 * 58. Length of Last Word
 * https://leetcode.com/problems/length-of-last-word/
 *
 * Scan from the end: skip trailing spaces, then count characters until the next space.
 *
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  let i = s.length - 1;
  while (i >= 0 && s[i] === ' ') i--;
  let len = 0;
  while (i >= 0 && s[i] !== ' ') {
    len++;
    i--;
  }
  return len;
};

module.exports = { lengthOfLastWord };
