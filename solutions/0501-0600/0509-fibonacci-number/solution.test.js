const test = require('node:test');
const assert = require('node:assert');
const { fib } = require('./solution');

function naive(n) {
  return n < 2 ? n : naive(n - 1) + naive(n - 2);
}

test('official examples', () => {
  assert.strictEqual(fib(2), 1);
  assert.strictEqual(fib(3), 2);
  assert.strictEqual(fib(4), 3);
});

test('matches naive recursion for n = 0..25, and F(30)', () => {
  for (let n = 0; n <= 25; n++) assert.strictEqual(fib(n), naive(n));
  assert.strictEqual(fib(30), 832040);
});
