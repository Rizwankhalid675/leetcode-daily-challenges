const test = require('node:test');
const assert = require('node:assert');
const { findArray } = require('./solution');

const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

test('official examples', () => {
  assert.deepStrictEqual(findArray([5, 2, 0, 3, 1]), [5, 7, 2, 3, 2]);
  assert.deepStrictEqual(findArray([13]), [13]);
});

test('round trip: prefix XOR of the answer gives pref back', () => {
  for (let t = 0; t < 500; t++) {
    const arr = Array.from({ length: rint(1, 20) }, () => rint(0, 1000000));
    const pref = [];
    let x = 0;
    for (const v of arr) pref.push((x ^= v));
    assert.deepStrictEqual(findArray(pref), arr);
  }
});

test('max size runs fast', () => {
  const pref = Array.from({ length: 100000 }, () => rint(0, 1000000));
  const t0 = Date.now();
  const arr = findArray(pref);
  let x = 0;
  for (let i = 0; i < arr.length; i++) assert.strictEqual((x ^= arr[i]), pref[i]);
  assert.ok(Date.now() - t0 < 1000);
});
