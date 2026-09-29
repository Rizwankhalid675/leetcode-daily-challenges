/**
 * 459. Repeated Substring Pattern
 * https://leetcode.com/problems/repeated-substring-pattern/
 * s is a repetition of a proper substring iff s occurs in (s + s) with the first and last characters removed.
 */
var repeatedSubstringPattern = function (s) {
  return (s + s).slice(1, -1).includes(s);
};

module.exports = { repeatedSubstringPattern };
