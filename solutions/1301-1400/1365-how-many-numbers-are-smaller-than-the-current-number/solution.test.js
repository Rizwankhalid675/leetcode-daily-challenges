const test = require('node:test');
const assert = require('node:assert');
const { smallerNumbersThanCurrent } = require('./solution');

const brute = (a) => a.map((x) => a.filter((y) => y < x).length);

test('official examples', () => {
  assert.deepStrictEqual(smallerNumbersThanCurrent([8, 1, 2, 2, 3]), [4, 0, 1, 1, 3]);
  assert.deepStrictEqual(smallerNumbersThanCurrent([6, 5, 4, 8]), [2, 1, 0, 3]);
  assert.deepStrictEqual(smallerNumbersThanCurrent([7, 7, 7, 7]), [0, 0, 0, 0]);
});

test('matches brute force', () => {
  for (let t = 0; t < 500; t++) {
    const a = Array.from({ length: 2 + Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 101));
    assert.deepStrictEqual(smallerNumbersThanCurrent(a), brute(a));
  }
});
