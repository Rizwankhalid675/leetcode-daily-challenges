const test = require('node:test');
const assert = require('node:assert');
const { filter } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(filter([0, 10, 20, 30], (n) => n > 10), [20, 30]);
  assert.deepStrictEqual(filter([1, 2, 3], (n, i) => i === 0), [1]);
  assert.deepStrictEqual(filter([-2, -1, 0, 1, 2], (n) => n + 1), [-2, 0, 1, 2]);
});

test('matches the built-in on random inputs', () => {
  for (let t = 0; t < 200; t++) {
    const a = Array.from({ length: Math.floor(Math.random() * 30) }, () => Math.floor(Math.random() * 21) - 10);
    const f = (x, i) => (x + i) % 3; // truthy/falsy numbers, not booleans
    assert.deepStrictEqual(filter(a, f), a.filter(f));
  }
});

test('does not call Array.prototype.filter', () => {
  const orig = Array.prototype.filter;
  Array.prototype.filter = () => { throw new Error('used built-in filter'); };
  try {
    assert.deepStrictEqual(filter([1, 2, 3], (x) => x & 1), [1, 3]);
  } finally {
    Array.prototype.filter = orig;
  }
});
