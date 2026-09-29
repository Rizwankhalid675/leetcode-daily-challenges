/**
 * 316. Remove Duplicate Letters
 * https://leetcode.com/problems/remove-duplicate-letters/
 * Greedy monotonic stack: pop a larger letter from the stack when it appears again later, so a smaller letter can come first.
 */
var removeDuplicateLetters = function (s) {
  const last = {};
  for (let i = 0; i < s.length; i++) last[s[i]] = i;
  const stack = [];
  const inStack = new Set();
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inStack.has(c)) continue;
    while (stack.length && stack[stack.length - 1] > c && last[stack[stack.length - 1]] > i) {
      inStack.delete(stack.pop());
    }
    stack.push(c);
    inStack.add(c);
  }
  return stack.join('');
};

module.exports = { removeDuplicateLetters };
