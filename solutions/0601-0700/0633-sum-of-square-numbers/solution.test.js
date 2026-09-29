const test = require('node:test');
const assert = require('node:assert');
const { judgeSquareSum } = require('./solution');

function brute(c) {
  for (let a = 0; a * a <= c; a++) {
    const b = Math.round(Math.sqrt(c - a * a));
    if (a * a + b * b === c) return true;
  }
  return false;
}

test('official examples', () => {
  assert.strictEqual(judgeSquareSum(5), true);
  assert.strictEqual(judgeSquareSum(3), false);
});

test('edge cases', () => {
  assert.strictEqual(judgeSquareSum(0), true);
  assert.strictEqual(judgeSquareSum(1), true);
  assert.strictEqual(judgeSquareSum(2), true);
  assert.strictEqual(judgeSquareSum(2147483647), false); // 2^31 - 1 ≡ 3 (mod 4)
  assert.strictEqual(judgeSquareSum(2147395600), true); // 46340^2
  assert.strictEqual(judgeSquareSum(2147483646), brute(2147483646));
});

test('matches brute force for c < 3000', () => {
  for (let c = 0; c < 3000; c++) assert.strictEqual(judgeSquareSum(c), brute(c), 'c=' + c);
});

test('large c runs fast', () => {
  const t0 = Date.now();
  for (let c = 2147483647; c > 2147483647 - 20; c--) assert.strictEqual(judgeSquareSum(c), brute(c));
  assert.ok(Date.now() - t0 < 1000);
});
