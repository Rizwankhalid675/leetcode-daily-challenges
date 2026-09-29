const test = require('node:test');
const assert = require('node:assert');
const { hammingWeight } = require('./solution');

const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

const viaString = (n) => (n >>> 0).toString(2).split('').filter((c) => c === '1').length;

test('official examples', () => {
  assert.strictEqual(hammingWeight(11), 3);
  assert.strictEqual(hammingWeight(128), 1);
  assert.strictEqual(hammingWeight(2147483645), 30);
});

test('unsigned inputs from the older version of the problem', () => {
  assert.strictEqual(hammingWeight(4294967293), 31); // 0b111...1101
  assert.strictEqual(hammingWeight(4294967295), 32);
  assert.strictEqual(hammingWeight(2147483648), 1);
  assert.strictEqual(hammingWeight(-1), 32);
  assert.strictEqual(hammingWeight(0), 0);
});

test('matches binary string count', () => {
  for (let t = 0; t < 5000; t++) {
    const n = rint(0, 4294967295);
    assert.strictEqual(hammingWeight(n), viaString(n), 'n=' + n);
  }
});
