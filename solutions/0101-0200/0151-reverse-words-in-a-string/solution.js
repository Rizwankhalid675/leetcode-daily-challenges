/**
 * 151. Reverse Words in a String
 * https://leetcode.com/problems/reverse-words-in-a-string/
 *
 * Trim, split on runs of whitespace, reverse the word list, join with single spaces.
 *
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  return s.trim().split(/\s+/).reverse().join(' ');
};

module.exports = { reverseWords };
