const test = require('node:test');
const assert = require('node:assert');
const { longestValidParentheses } = require('./solution');

function brute(s) {
  let best = 0;
  for (let i = 0; i < s.length; i++) {
    let bal = 0;
    for (let j = i; j < s.length; j++) {
      bal += s[j] === '(' ? 1 : -1;
      if (bal < 0) break;
      if (bal === 0) best = Math.max(best, j - i + 1);
    }
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(longestValidParentheses('(()'), 2);
  assert.strictEqual(longestValidParentheses(')()())'), 4);
  assert.strictEqual(longestValidParentheses(''), 0);
});

test('hand-checked cases', () => {
  assert.strictEqual(longestValidParentheses('()(())'), 6);
  assert.strictEqual(longestValidParentheses('()(()'), 2);
  assert.strictEqual(longestValidParentheses('))(('), 0);
});

test('matches O(n^2) brute force', () => {
  for (let t = 0; t < 1000; t++) {
    const n = Math.floor(Math.random() * 16);
    const s = Array.from({ length: n }, () => '()'[Math.floor(Math.random() * 2)]).join('');
    assert.strictEqual(longestValidParentheses(s), brute(s));
  }
});

test('max size runs fast', () => {
  const t0 = Date.now();
  assert.strictEqual(longestValidParentheses('('.repeat(15000) + ')'.repeat(15000)), 30000);
  assert.strictEqual(longestValidParentheses(')'.repeat(15000) + '('.repeat(15000)), 0);
  assert.strictEqual(longestValidParentheses('()'.repeat(15000)), 30000);
  assert.ok(Date.now() - t0 < 1000);
});
