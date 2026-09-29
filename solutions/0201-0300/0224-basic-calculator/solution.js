/**
 * 224. Basic Calculator
 * https://leetcode.com/problems/basic-calculator/
 *
 * Only + and - (plus unary minus) with parentheses, so every number contributes
 * (+/-)number to the total. Track the running result and the sign in effect; on '(' save
 * (result, sign) on a stack and start fresh; on ')' fold the inner result back in.
 *
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  let result = 0;
  let sign = 1;
  let num = 0;
  const stack = [];
  for (const ch of s) {
    if (ch >= '0' && ch <= '9') {
      num = num * 10 + (ch.charCodeAt(0) - 48);
    } else if (ch === '+' || ch === '-') {
      result += sign * num;
      num = 0;
      sign = ch === '+' ? 1 : -1;
    } else if (ch === '(') {
      stack.push(result, sign);
      result = 0;
      sign = 1;
    } else if (ch === ')') {
      result += sign * num;
      num = 0;
      const outerSign = stack.pop();
      const outerResult = stack.pop();
      result = outerResult + outerSign * result;
    }
    // spaces are ignored
  }
  return result + sign * num;
};

module.exports = { calculate };
