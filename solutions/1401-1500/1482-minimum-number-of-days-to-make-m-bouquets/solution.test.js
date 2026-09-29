const test = require('node:test');
const assert = require('node:assert');
const { minDays } = require('./solution');

function brute(b, m, k) {
  const days = [...new Set(b)].sort((x, y) => x - y);
  for (const d of days) {
    let made = 0, run = 0;
    for (const x of b) { if (x <= d) { if (++run === k) { made++; run = 0; } } else run = 0; }
    if (made >= m) return d;
  }
  return -1;
}

test('official examples', () => {
  assert.strictEqual(minDays([1, 10, 3, 10, 2], 3, 1), 3);
  assert.strictEqual(minDays([1, 10, 3, 10, 2], 3, 2), -1);
  assert.strictEqual(minDays([7, 7, 7, 7, 12, 7, 7], 2, 3), 12);
});

test('huge m * k and huge days', () => {
  assert.strictEqual(minDays([1, 2], 1e6, 1e5), -1);
  assert.strictEqual(minDays([1e9, 1e9], 1, 2), 1e9);
  assert.strictEqual(minDays([1e9, 1], 2, 1), 1e9);
});

test('matches brute force', () => {
  for (let t = 0; t < 2000; t++) {
    const b = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => 1 + Math.floor(Math.random() * 12));
    const m = 1 + Math.floor(Math.random() * 4), k = 1 + Math.floor(Math.random() * 4);
    assert.strictEqual(minDays(b, m, k), brute(b, m, k));
  }
});

test('max size runs fast', () => {
  const n = 1e5;
  const b = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 1e9));
  const t0 = Date.now();
  minDays(b, 300, 300);
  assert.ok(Date.now() - t0 < 1000);
});
