/**
 * 22. Generate Parentheses
 * https://leetcode.com/problems/generate-parentheses/
 * Backtracking: add "(" while fewer than n are open, add ")" while it would not close more than were opened.
 */
var generateParenthesis = function (n) {
  const out = [];
  const buf = [];
  const go = (open, close) => {
    if (buf.length === 2 * n) { out.push(buf.join('')); return; }
    if (open < n) { buf.push('('); go(open + 1, close); buf.pop(); }
    if (close < open) { buf.push(')'); go(open, close + 1); buf.pop(); }
  };
  go(0, 0);
  return out;
};

module.exports = { generateParenthesis };
