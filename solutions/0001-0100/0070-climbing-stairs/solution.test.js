const test = require('node:test');
const assert = require('node:assert');
const { climbStairs } = require('./solution');

function brute(n) {
  if (n <= 1) return 1;
  return brute(n - 1) + brute(n - 2);
}

test('official examples', () => {
  assert.strictEqual(climbStairs(2), 2);
  assert.strictEqual(climbStairs(3), 3);
});

test('matches plain recursion for small n', () => {
  for (let n = 1; n <= 25; n++) assert.strictEqual(climbStairs(n), brute(n));
});

test('boundaries', () => {
  assert.strictEqual(climbStairs(1), 1);
  assert.strictEqual(climbStairs(45), 1836311903);
});
