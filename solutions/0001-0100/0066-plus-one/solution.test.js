const test = require('node:test');
const assert = require('node:assert');
const { plusOne } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(plusOne([1, 2, 3]), [1, 2, 4]);
  assert.deepStrictEqual(plusOne([4, 3, 2, 1]), [4, 3, 2, 2]);
  assert.deepStrictEqual(plusOne([9]), [1, 0]);
});

test('matches BigInt on 100-digit numbers', () => {
  for (let t = 0; t < 300; t++) {
    const d = Array.from({ length: 1 + Math.floor(Math.random() * 100) }, () => (Math.random() < 0.5 ? 9 : Math.floor(Math.random() * 10)));
    if (d.length > 1 && d[0] === 0) d[0] = 1;
    assert.strictEqual(plusOne(d).join(''), (BigInt(d.join('')) + 1n).toString());
  }
});
