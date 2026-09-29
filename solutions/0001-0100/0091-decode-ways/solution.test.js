const test = require('node:test');
const assert = require('node:assert');
const { numDecodings } = require('./solution');

const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => ri(lo, hi));
function brute(s) {
  if (s.length === 0) return 1;
  let ways = 0;
  for (let k = 1; k <= 2 && k <= s.length; k++) {
    const part = s.slice(0, k);
    if (part[0] !== '0' && Number(part) >= 1 && Number(part) <= 26) ways += brute(s.slice(k));
  }
  return ways;
}

test('official examples', () => {
  assert.strictEqual(numDecodings('12'), 2);
  assert.strictEqual(numDecodings('226'), 3);
  assert.strictEqual(numDecodings('06'), 0);
});

test('zeros', () => {
  assert.strictEqual(numDecodings('0'), 0);
  assert.strictEqual(numDecodings('10'), 1);
  assert.strictEqual(numDecodings('100'), 0);
  assert.strictEqual(numDecodings('2101'), 1);
  assert.strictEqual(numDecodings('27'), 1);
  assert.strictEqual(numDecodings('11106'), 2);
});

test('matches recursive enumeration', () => {
  for (let t = 0; t < 1000; t++) {
    const s = Array.from({ length: ri(1, 14) }, () => '0126789'[ri(0, 6)]).join('');
    assert.strictEqual(numDecodings(s), brute(s));
  }
});
