/**
 * 1249. Minimum Remove to Make Valid Parentheses
 * https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/
 * Stack of open-paren indices: a ")" with an empty stack is dropped; any "(" still on the stack at the end is dropped. Rebuild from the survivors.
 */
var minRemoveToMakeValid = function (s) {
  const n = s.length;
  const drop = new Uint8Array(n);
  const st = new Int32Array(n);
  let top = 0;
  for (let i = 0; i < n; i++) {
    const c = s[i];
    if (c === '(') st[top++] = i;
    else if (c === ')') {
      if (top > 0) top--;
      else drop[i] = 1;
    }
  }
  while (top > 0) drop[st[--top]] = 1;
  const out = [];
  for (let i = 0; i < n; i++) if (!drop[i]) out.push(s[i]);
  return out.join('');
};

module.exports = { minRemoveToMakeValid };
