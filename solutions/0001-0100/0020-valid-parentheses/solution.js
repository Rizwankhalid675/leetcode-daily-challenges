/**
 * 20. Valid Parentheses
 * https://leetcode.com/problems/valid-parentheses/
 *
 * Stack of expected closers: push the matching closer for each opener; a closer must
 * equal the top. Valid iff every closer matched and the stack ends empty.
 *
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const CLOSER = { '(': ')', '[': ']', '{': '}' };
  const stack = [];
  for (const ch of s) {
    if (ch in CLOSER) stack.push(CLOSER[ch]);
    else if (stack.pop() !== ch) return false;
  }
  return stack.length === 0;
};

module.exports = { isValid };
