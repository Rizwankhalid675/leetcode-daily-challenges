/**
 * 796. Rotate String
 * https://leetcode.com/problems/rotate-string/
 * goal is a rotation of s iff lengths match and goal occurs in s + s.
 */
var rotateString = function (s, goal) {
  return s.length === goal.length && (s + s).includes(goal);
};

module.exports = { rotateString };
