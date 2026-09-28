const test = require('node:test');
const assert = require('node:assert');
const { tribonacci } = require('./solution');

test('official examples', () => {
  assert.strictEqual(tribonacci(4), 4);
  assert.strictEqual(tribonacci(25), 1389537);
});

test('base cases and the whole range match the definition', () => {
  const t = [0, 1, 1];
  for (let i = 3; i <= 37; i++) t.push(t[i - 1] + t[i - 2] + t[i - 3]);
  for (let n = 0; n <= 37; n++) assert.strictEqual(tribonacci(n), t[n], `n=${n}`);
  assert.ok(tribonacci(37) <= 2 ** 31 - 1);
});
