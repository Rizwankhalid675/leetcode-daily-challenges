/**
 * 1614. Maximum Nesting Depth of the Parentheses
 * https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/
 *
 * Single pass with a depth counter: '(' goes one level deeper, ')' comes back up.
 * The answer is the deepest level reached at any point.
 *
 * @param {string} s
 * @return {number}
 */
var maxDepth = function (s) {
  let depth = 0;
  let best = 0;
  for (const ch of s) {
    if (ch === '(') {
      depth++;
      if (depth > best) best = depth;
    } else if (ch === ')') {
      depth--;
    }
  }
  return best;
};

module.exports = { maxDepth };
