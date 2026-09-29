const test = require('node:test');
const assert = require('node:assert');
const { numSquares } = require('./solution');

function dp(limit) {
  const f = new Array(limit + 1).fill(Infinity);
  f[0] = 0;
  for (let i = 1; i <= limit; i++)
    for (let j = 1; j * j <= i; j++) f[i] = Math.min(f[i], f[i - j * j] + 1);
  return f;
}

test('official examples', () => {
  assert.strictEqual(numSquares(12), 3);
  assert.strictEqual(numSquares(13), 2);
});

test('matches DP for every n up to 10^4', () => {
  const f = dp(10000);
  for (let n = 1; n <= 10000; n++) assert.strictEqual(numSquares(n), f[n], 'n=' + n);
});
