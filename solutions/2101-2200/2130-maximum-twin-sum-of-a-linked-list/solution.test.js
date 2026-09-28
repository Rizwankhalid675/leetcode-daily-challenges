const test = require('node:test');
const assert = require('node:assert');
const { pairSum } = require('./solution');
const { buildList } = require('../../../tests/helpers/list');

const brute = (a) => Math.max(...a.slice(0, a.length / 2).map((v, i) => v + a[a.length - 1 - i]));

test('official examples', () => {
  assert.strictEqual(pairSum(buildList([5, 4, 2, 1])), 6);
  assert.strictEqual(pairSum(buildList([4, 2, 2, 3])), 7);
  assert.strictEqual(pairSum(buildList([1, 100000])), 100001);
});

test('matches array reference on random even-length lists', () => {
  for (let t = 0; t < 500; t++) {
    const n = 2 * (1 + Math.floor(Math.random() * 8));
    const a = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 100));
    assert.strictEqual(pairSum(buildList(a)), brute(a), JSON.stringify(a));
  }
});
