const test = require('node:test');
const assert = require('node:assert');
const { finalPrices } = require('./solution');

const brute = (a) => a.map((p, i) => { for (let j = i + 1; j < a.length; j++) if (a[j] <= p) return p - a[j]; return p; });

test('official examples', () => {
  assert.deepStrictEqual(finalPrices([8, 4, 6, 2, 3]), [4, 2, 4, 2, 3]);
  assert.deepStrictEqual(finalPrices([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
  assert.deepStrictEqual(finalPrices([10, 1, 1, 6]), [9, 0, 1, 6]);
});

test('matches brute force', () => {
  for (let t = 0; t < 500; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => 1 + Math.floor(Math.random() * 6));
    assert.deepStrictEqual(finalPrices(a), brute(a));
  }
});
