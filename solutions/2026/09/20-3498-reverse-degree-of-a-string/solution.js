/**
 * 3498. Reverse Degree of a String
 * https://leetcode.com/problems/reverse-degree-of-a-string/
 *
 * Direct simulation: 'a' is worth 26 ... 'z' is worth 1, multiplied by the 1-based position.
 *
 * @param {string} s
 * @return {number}
 */
var reverseDegree = function (s) {
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const reversedRank = 26 - (s.charCodeAt(i) - 97); // 'a' -> 26, 'z' -> 1
    total += reversedRank * (i + 1);
  }
  return total;
};

module.exports = { reverseDegree };
