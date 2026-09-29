const test = require('node:test');
const assert = require('node:assert');
const { createCounter } = require('./solution');

test('official examples', () => {
  const c = createCounter(10);
  assert.deepStrictEqual([c(), c(), c()], [10, 11, 12]);
  const d = createCounter(-2);
  assert.deepStrictEqual([d(), d(), d(), d(), d()], [-2, -1, 0, 1, 2]);
});

test('counters do not share state', () => {
  const a = createCounter(0);
  const b = createCounter(100);
  a(); a();
  assert.strictEqual(b(), 100);
  assert.strictEqual(a(), 2);
});
