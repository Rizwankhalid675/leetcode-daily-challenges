const test = require('node:test');
const assert = require('node:assert');
const { countDigitOne } = require('./solution');

const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

test('official examples', () => {
  assert.strictEqual(countDigitOne(13), 6);
  assert.strictEqual(countDigitOne(0), 0);
});

test('matches running count for n <= 30000', () => {
  let running = 0;
  for (let n = 0; n <= 30000; n++) {
    if (n > 0) for (const c of String(n)) if (c === '1') running++;
    assert.strictEqual(countDigitOne(n), running, 'n=' + n);
  }
});

test('large values', () => {
  assert.strictEqual(countDigitOne(999999999), 900000000); // 9 positions * 10^8
  assert.strictEqual(countDigitOne(1000000000), 900000001);
  assert.strictEqual(countDigitOne(99), 20);
  assert.strictEqual(countDigitOne(111), 36);
});
