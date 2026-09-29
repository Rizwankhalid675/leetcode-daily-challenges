const test = require('node:test');
const assert = require('node:assert');
const { map } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(map([1, 2, 3], (n) => n + 1), [2, 3, 4]);
  assert.deepStrictEqual(map([1, 2, 3], (n, i) => n + i), [1, 3, 5]);
  assert.deepStrictEqual(map([10, 20, 30], () => 42), [42, 42, 42]);
});

test('matches the built-in on random inputs and does not mutate input', () => {
  for (let t = 0; t < 200; t++) {
    const a = Array.from({ length: Math.floor(Math.random() * 30) }, () => Math.floor(Math.random() * 2001) - 1000);
    const copy = [...a];
    const f = (x, i) => x * 3 - i;
    assert.deepStrictEqual(map(a, f), a.map(f));
    assert.deepStrictEqual(a, copy);
  }
});

test('does not call Array.prototype.map', () => {
  const orig = Array.prototype.map;
  Array.prototype.map = () => { throw new Error('used built-in map'); };
  try {
    assert.deepStrictEqual(map([1, 2], (x) => x * 2), [2, 4]);
  } finally {
    Array.prototype.map = orig;
  }
});
