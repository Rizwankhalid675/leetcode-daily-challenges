const test = require('node:test');
const assert = require('node:assert');
const { firstMissingPositive } = require('./solution');

function brute(a) {
  const s = new Set(a);
  let x = 1;
  while (s.has(x)) x++;
  return x;
}

test('official examples', () => {
  assert.strictEqual(firstMissingPositive([1, 2, 0]), 3);
  assert.strictEqual(firstMissingPositive([3, 4, -1, 1]), 2);
  assert.strictEqual(firstMissingPositive([7, 8, 9, 11, 12]), 1);
});

test('edge cases', () => {
  assert.strictEqual(firstMissingPositive([1]), 2);
  assert.strictEqual(firstMissingPositive([2]), 1);
  assert.strictEqual(firstMissingPositive([1, 1]), 2);
  assert.strictEqual(firstMissingPositive([-2147483648, 2147483647]), 1);
});

test('matches set-based brute force', () => {
  for (let t = 0; t < 2000; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 14) - 3);
    assert.strictEqual(firstMissingPositive([...a]), brute(a));
  }
});

test('max size runs fast', () => {
  const n = 1e5;
  const a = Array.from({ length: n }, (_, i) => n - i);
  const t0 = Date.now();
  assert.strictEqual(firstMissingPositive(a), n + 1);
  assert.ok(Date.now() - t0 < 1000);
});
