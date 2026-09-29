const test = require('node:test');
const assert = require('node:assert');
const { trailingZeroes } = require('./solution');

function brute(n) {
  let f = 1n;
  for (let i = 2n; i <= BigInt(n); i++) f *= i;
  const s = f.toString();
  return s.length - s.replace(/0+$/, '').length;
}

test('official examples', () => {
  assert.strictEqual(trailingZeroes(3), 0);
  assert.strictEqual(trailingZeroes(5), 1);
  assert.strictEqual(trailingZeroes(0), 0);
});

test('matches BigInt factorial for n <= 400', () => {
  for (let n = 0; n <= 400; n++) assert.strictEqual(trailingZeroes(n), brute(n), 'n=' + n);
});

test('max input', () => {
  assert.strictEqual(trailingZeroes(10000), 2499); // 2000 + 400 + 80 + 16 + 3
});
