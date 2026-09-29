const test = require('node:test');
const assert = require('node:assert');
const { reverseBits } = require('./solution');

const viaString = (n) => parseInt((n >>> 0).toString(2).padStart(32, '0').split('').reverse().join(''), 2);

test('official examples', () => {
  assert.strictEqual(reverseBits(43261596), 964176192);
  assert.strictEqual(reverseBits(2147483644), 1073741822);
});

test('result is unsigned', () => {
  assert.strictEqual(reverseBits(1), 2147483648);
  assert.strictEqual(reverseBits(0), 0);
  assert.strictEqual(reverseBits(4294967293), 3221225471); // unsigned input with bit 31 set
});

test('matches string reversal on random values', () => {
  for (let t = 0; t < 2000; t++) {
    const n = Math.floor(Math.random() * 2 ** 32);
    const got = reverseBits(n);
    assert.ok(got >= 0);
    assert.strictEqual(got, viaString(n));
  }
});
