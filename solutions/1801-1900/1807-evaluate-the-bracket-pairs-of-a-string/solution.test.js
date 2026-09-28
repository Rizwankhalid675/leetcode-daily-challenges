const test = require('node:test');
const assert = require('node:assert');
const { evaluate } = require('./solution');

test('official examples', () => {
  assert.strictEqual(evaluate('(name)is(age)yearsold', [['name', 'bob'], ['age', 'two']]), 'bobistwoyearsold');
  assert.strictEqual(evaluate('hi(name)', [['a', 'b']]), 'hi?');
  assert.strictEqual(evaluate('(a)(a)(a)aaa', [['a', 'yes']]), 'yesyesyesaaa');
});

test('edge cases', () => {
  assert.strictEqual(evaluate('abc', []), 'abc'); // no brackets, no knowledge
  assert.strictEqual(evaluate('(x)', []), '?');
  assert.strictEqual(evaluate('(ab)(a)', [['a', 'z']]), '?z'); // keys match exactly, not by prefix
  // values are not re-evaluated even if they look like keys
  assert.strictEqual(evaluate('(k)', [['k', 'k']]), 'k');
});

test('large input', () => {
  const s = '(k)'.repeat(33333);
  const t0 = Date.now();
  assert.strictEqual(evaluate(s, [['k', 'v']]), 'v'.repeat(33333));
  assert.ok(Date.now() - t0 < 500);
});
