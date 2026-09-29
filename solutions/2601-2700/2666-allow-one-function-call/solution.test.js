const test = require('node:test');
const assert = require('node:assert');
const { once } = require('./solution');

test('official examples', () => {
  const f1 = once((a, b, c) => a + b + c);
  assert.deepStrictEqual([f1(1, 2, 3), f1(2, 3, 6)], [6, undefined]);
  const f2 = once((a, b, c) => a * b * c);
  assert.deepStrictEqual([f2(5, 7, 4), f2(2, 3, 6), f2(4, 6, 8)], [140, undefined, undefined]);
});

test('fn is invoked exactly once, even if it returns undefined', () => {
  let calls = 0;
  const f = once(() => { calls++; });
  f(); f(); f();
  assert.strictEqual(calls, 1);
});
