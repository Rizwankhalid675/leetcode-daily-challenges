const test = require('node:test');
const assert = require('node:assert');
const { reduce } = require('./solution');

test('official examples', () => {
  assert.strictEqual(reduce([1, 2, 3, 4], (acc, x) => acc + x, 0), 10);
  assert.strictEqual(reduce([1, 2, 3, 4], (acc, x) => acc + x * x, 100), 130);
  assert.strictEqual(reduce([], () => 0, 25), 25);
});

test('matches the built-in on random inputs (order-sensitive fn)', () => {
  for (let t = 0; t < 200; t++) {
    const a = Array.from({ length: Math.floor(Math.random() * 20) }, () => Math.floor(Math.random() * 21) - 10);
    const init = Math.floor(Math.random() * 100);
    const f = (acc, x) => (acc * 7 + x) % 1000003;
    assert.strictEqual(reduce(a, f, init), a.reduce(f, init));
  }
});

test('does not call Array.prototype.reduce', () => {
  const orig = Array.prototype.reduce;
  Array.prototype.reduce = () => { throw new Error('used built-in reduce'); };
  try {
    assert.strictEqual(reduce([1, 2, 3], (a, b) => a + b, 0), 6);
  } finally {
    Array.prototype.reduce = orig;
  }
});
