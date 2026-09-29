const test = require('node:test');
const assert = require('node:assert');
const { findErrorNums } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(findErrorNums([1, 2, 2, 4]), [2, 3]);
  assert.deepStrictEqual(findErrorNums([1, 1]), [1, 2]);
});

test('random permutations with one value replaced', () => {
  for (let t = 0; t < 500; t++) {
    const n = 2 + Math.floor(Math.random() * 10);
    const a = Array.from({ length: n }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    const missing = 1 + Math.floor(Math.random() * n);
    let dup = 1 + Math.floor(Math.random() * n);
    if (dup === missing) dup = (missing % n) + 1;
    a[a.indexOf(missing)] = dup;
    assert.deepStrictEqual(findErrorNums(a), [dup, missing]);
  }
});
