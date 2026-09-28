const test = require('node:test');
const assert = require('node:assert');
const { countBits } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(countBits(2), [0, 1, 1]);
  assert.deepStrictEqual(countBits(5), [0, 1, 1, 2, 1, 2]);
});

test('matches binary-string popcount up to 1e5', () => {
  const ans = countBits(1e5);
  assert.strictEqual(ans.length, 1e5 + 1);
  for (let i = 0; i <= 1e5; i++) assert.strictEqual(ans[i], i.toString(2).split('1').length - 1);
  assert.deepStrictEqual(countBits(0), [0]);
});
