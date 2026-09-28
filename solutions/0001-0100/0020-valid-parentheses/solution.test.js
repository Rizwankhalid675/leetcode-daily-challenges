const test = require('node:test');
const assert = require('node:assert');
const { isValid } = require('./solution');

// Reference: repeatedly delete innermost matched pairs.
function reference(s) {
  let prev;
  do {
    prev = s;
    s = s.replace(/\(\)|\[\]|\{\}/g, '');
  } while (s !== prev);
  return s === '';
}

test('official examples', () => {
  assert.strictEqual(isValid('()'), true);
  assert.strictEqual(isValid('()[]{}'), true);
  assert.strictEqual(isValid('(]'), false);
  assert.strictEqual(isValid('([])'), true);
  assert.strictEqual(isValid('([)]'), false);
});

test('unbalanced and random', () => {
  assert.strictEqual(isValid('('), false); // leftover opener
  assert.strictEqual(isValid(')'), false); // closer on empty stack
  for (let t = 0; t < 2000; t++) {
    const s = Array.from({ length: 1 + Math.floor(Math.random() * 8) }, () => '()[]{}'[Math.floor(Math.random() * 6)]).join('');
    assert.strictEqual(isValid(s), reference(s), s);
  }
});
