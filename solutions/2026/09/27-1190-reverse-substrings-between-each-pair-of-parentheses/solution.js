/**
 * 1190. Reverse Substrings Between Each Pair of Parentheses
 * https://leetcode.com/problems/reverse-substrings-between-each-pair-of-parentheses/
 *
 * O(n) "wormhole" walk. First match every bracket with its partner using a stack. Then walk
 * the string: on a letter, output it; on a bracket, jump to its partner and reverse the
 * walking direction. Entering a pair flips direction once (the inside is read reversed) and
 * leaving it flips back, which reproduces the effect of nested reversals without ever
 * reversing anything.
 *
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function (s) {
  const n = s.length;
  const partner = new Int32Array(n);
  const stack = [];
  for (let i = 0; i < n; i++) {
    if (s[i] === '(') stack.push(i);
    else if (s[i] === ')') {
      const j = stack.pop();
      partner[i] = j;
      partner[j] = i;
    }
  }

  const out = [];
  for (let i = 0, dir = 1; i < n; i += dir) {
    if (s[i] === '(' || s[i] === ')') {
      i = partner[i];
      dir = -dir;
    } else {
      out.push(s[i]);
    }
  }
  return out.join('');
};

module.exports = { reverseParentheses };
