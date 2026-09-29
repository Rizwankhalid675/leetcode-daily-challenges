const test = require('node:test');
const assert = require('node:assert');
const { flat } = require('./solution');

const ex = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]];

test('official examples', () => {
  assert.deepStrictEqual(flat(ex, 0), ex);
  assert.deepStrictEqual(flat(ex, 1), [1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]);
  assert.deepStrictEqual(flat([[1, 2, 3], [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], 2),
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
});

function randNested(d) {
  return Array.from({ length: Math.floor(Math.random() * 4) }, () =>
    d > 0 && Math.random() < 0.4 ? randNested(d - 1) : Math.floor(Math.random() * 100));
}

test('matches the built-in flat on random nested arrays', () => {
  for (let t = 0; t < 300; t++) {
    const a = randNested(5);
    const n = Math.floor(Math.random() * 7);
    assert.deepStrictEqual(flat(a, n), a.flat(n));
  }
});

test('does not call Array.prototype.flat; handles depth 1000', () => {
  let deep = [42];
  for (let i = 0; i < 1000; i++) deep = [deep];
  const orig = Array.prototype.flat;
  Array.prototype.flat = () => { throw new Error('used built-in flat'); };
  try {
    assert.deepStrictEqual(flat(deep, 1000), [42]);
    assert.deepStrictEqual(flat([[1], 2], 1), [1, 2]);
  } finally {
    Array.prototype.flat = orig;
  }
});

test('max-size timing (1e5 numbers in 1e5 subarrays)', () => {
  const a = Array.from({ length: 1e5 }, (_, i) => [i]);
  const t0 = Date.now();
  assert.strictEqual(flat(a, 1).length, 1e5);
  assert.ok(Date.now() - t0 < 1000);
});
