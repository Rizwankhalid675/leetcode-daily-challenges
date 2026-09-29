const test = require('node:test');
const assert = require('node:assert');
const { sortArray } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(sortArray([5, 2, 3, 1]), [1, 2, 3, 5]);
  assert.deepStrictEqual(sortArray([5, 1, 1, 2, 0, 0]), [0, 0, 1, 1, 2, 5]);
});

test('edge cases', () => {
  assert.deepStrictEqual(sortArray([7]), [7]);
  assert.deepStrictEqual(sortArray([-50000, 50000, 0, -1, 10]), [-50000, -1, 0, 10, 50000]);
});

test('matches numeric sort on random arrays', () => {
  for (let t = 0; t < 500; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 40) }, () => Math.floor(Math.random() * 21) - 10);
    const expected = [...a].sort((x, y) => x - y);
    assert.deepStrictEqual(sortArray([...a]), expected);
  }
});

test('max size (5e4, random and all equal) runs fast', () => {
  const n = 5e4;
  const a = Array.from({ length: n }, () => Math.floor(Math.random() * 1e5) - 5e4);
  const expected = [...a].sort((x, y) => x - y);
  const t0 = Date.now();
  const got = sortArray([...a]);
  const same = sortArray(new Array(n).fill(3));
  assert.ok(Date.now() - t0 < 1000);
  assert.deepStrictEqual(got, expected);
  assert.deepStrictEqual(same, new Array(n).fill(3));
});
