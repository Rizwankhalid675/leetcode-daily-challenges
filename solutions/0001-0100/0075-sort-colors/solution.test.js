const test = require('node:test');
const assert = require('node:assert');
const { sortColors } = require('./solution');

const run = (a) => {
  const c = a.slice();
  assert.strictEqual(sortColors(c), undefined);
  return c;
};

test('official examples (mutates in place)', () => {
  assert.deepStrictEqual(run([2, 0, 2, 1, 1, 0]), [0, 0, 1, 1, 2, 2]);
  assert.deepStrictEqual(run([2, 0, 1]), [0, 1, 2]);
});

test('matches numeric sort on random arrays', () => {
  for (let t = 0; t < 1000; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 20) }, () => Math.floor(Math.random() * 3));
    assert.deepStrictEqual(run(a), a.slice().sort((x, y) => x - y));
  }
});
