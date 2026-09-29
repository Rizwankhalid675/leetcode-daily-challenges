/**
 * 389. Find the Difference
 * https://leetcode.com/problems/find-the-difference/
 * XOR all character codes of both strings: every paired letter cancels, leaving the added one.
 */
var findTheDifference = function (s, t) {
  let x = 0;
  for (let i = 0; i < s.length; i++) x ^= s.charCodeAt(i);
  for (let i = 0; i < t.length; i++) x ^= t.charCodeAt(i);
  return String.fromCharCode(x);
};

module.exports = { findTheDifference };
