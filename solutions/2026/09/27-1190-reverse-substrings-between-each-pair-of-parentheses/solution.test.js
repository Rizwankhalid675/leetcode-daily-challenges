const test = require('node:test');
const assert = require('node:assert');
const { reverseParentheses } = require('./solution');

// Reference: the literal O(n^2) approach, a stack of partial strings reversed on each ')'.
function reference(s) {
  const stack = [''];
  for (const ch of s) {
    if (ch === '(') stack.push('');
    else if (ch === ')') {
      const inner = stack.pop().split('').reverse().join('');
      stack[stack.length - 1] += inner;
    } else stack[stack.length - 1] += ch;
  }
  return stack[0];
}

function randomBalanced(len) {
  let s = '';
  let open = 0;
  for (let i = 0; i < len; i++) {
    const r = Math.random();
    if (r < 0.2) { s += '('; open++; }
    else if (r < 0.4 && open > 0) { s += ')'; open--; }
    else s += 'abc'[Math.floor(Math.random() * 3)];
  }
  return s + ')'.repeat(open);
}

test('official examples', () => {
  assert.strictEqual(reverseParentheses('(abcd)'), 'dcba');
  assert.strictEqual(reverseParentheses('(u(love)i)'), 'iloveu');
  assert.strictEqual(reverseParentheses('(ed(et(oc))el)'), 'leetcode');
});

test('edge cases', () => {
  assert.strictEqual(reverseParentheses('abc'), 'abc');
  assert.strictEqual(reverseParentheses('()'), '');
  assert.strictEqual(reverseParentheses('a()b'), 'ab');
  assert.strictEqual(reverseParentheses('((ab))'), 'ab'); // double reversal cancels
  assert.strictEqual(reverseParentheses('(ab)(cd)'), 'badc');
});

test('matches the stack-reversal reference on random balanced strings', () => {
  for (let t = 0; t < 1000; t++) {
    const s = randomBalanced(1 + Math.floor(Math.random() * 20));
    assert.strictEqual(reverseParentheses(s), reference(s), s);
  }
});
