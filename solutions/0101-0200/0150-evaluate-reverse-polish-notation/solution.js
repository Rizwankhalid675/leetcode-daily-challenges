/**
 * 150. Evaluate Reverse Polish Notation
 * https://leetcode.com/problems/evaluate-reverse-polish-notation/
 *
 * Operand stack: numbers are pushed; an operator pops its right then left operand and
 * pushes the result. Division truncates toward zero: `(a / b) | 0` does that for 32-bit
 * values and never produces -0 (Math.trunc(-1 / 5) would be -0).
 *
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  const stack = [];
  for (const tok of tokens) {
    if (tok === '+' || tok === '-' || tok === '*' || tok === '/') {
      const b = stack.pop();
      const a = stack.pop();
      if (tok === '+') stack.push(a + b);
      else if (tok === '-') stack.push(a - b);
      else if (tok === '*') stack.push(a * b);
      else stack.push((a / b) | 0);
    } else {
      stack.push(Number(tok));
    }
  }
  return stack.pop() + 0; // multiplication can also yield -0 (e.g. -12 * 0); normalize it
};

module.exports = { evalRPN };
