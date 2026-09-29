const test = require('node:test');
const assert = require('node:assert');
const { kthFactor } = require('./solution');

function brute(n, k) {
  for (let d = 1; d <= n; d++) if (n % d === 0 && --k === 0) return d;
  return -1;
}

test('official examples', () => {
  assert.strictEqual(kthFactor(12, 3), 3);
  assert.strictEqual(kthFactor(7, 2), 7);
  assert.strictEqual(kthFactor(4, 4), -1);
});

test('matches linear scan for every n, k up to 1000', () => {
  for (let n = 1; n <= 1000; n++) {
    for (let k = 1; k <= n; k++) assert.strictEqual(kthFactor(n, k), brute(n, k), n + ',' + k);
  }
});
