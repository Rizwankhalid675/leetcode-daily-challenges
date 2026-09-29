const test = require('node:test');
const assert = require('node:assert');
const { chunk } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(chunk([1, 2, 3, 4, 5], 1), [[1], [2], [3], [4], [5]]);
  assert.deepStrictEqual(chunk([1, 9, 6, 3, 2], 3), [[1, 9, 6], [3, 2]]);
  assert.deepStrictEqual(chunk([8, 5, 3, 2, 6], 6), [[8, 5, 3, 2, 6]]);
  assert.deepStrictEqual(chunk([], 1), []);
});

test('flattening the chunks gives back the input; sizes are right', () => {
  for (let t = 0; t < 300; t++) {
    const n = Math.floor(Math.random() * 20);
    const a = Array.from({ length: n }, (_, i) => i * 7);
    const size = 1 + Math.floor(Math.random() * (n + 1));
    const c = chunk(a, size);
    assert.deepStrictEqual([].concat(...c), a);
    assert.strictEqual(c.length, Math.ceil(n / size));
    c.forEach((part, i) => assert.ok(part.length === size || (i === c.length - 1 && part.length > 0)));
  }
});
