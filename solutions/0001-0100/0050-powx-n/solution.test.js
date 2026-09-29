const test = require('node:test');
const assert = require('node:assert');
const { myPow } = require('./solution');

const close = (a, b) => (b === 0 ? Math.abs(a) < 1e-12 : Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(b)));

test('official examples', () => {
  assert.ok(close(myPow(2, 10), 1024));
  assert.ok(close(myPow(2.1, 3), 9.261));
  assert.ok(close(myPow(2, -2), 0.25));
});

test('n = -2^31 and other extremes', () => {
  assert.strictEqual(myPow(1, -2147483648), 1);
  assert.strictEqual(myPow(-1, -2147483648), 1);
  assert.strictEqual(myPow(-1, 2147483647), -1);
  assert.strictEqual(myPow(2, -2147483648), 0);
  assert.strictEqual(myPow(0.00001, 2147483647), 0);
  assert.strictEqual(myPow(5, 0), 1);
  assert.strictEqual(myPow(0, 5), 0);
  assert.ok(close(myPow(1.0000001, -2147483648), Math.pow(1.0000001, -2147483648)));
});

test('matches Math.pow on random inputs within the output bound', () => {
  let checked = 0;
  while (checked < 3000) {
    const x = Math.round((Math.random() * 200 - 100)) / 100 * (Math.random() < 0.2 ? 5 : 1);
    const n = Math.floor(Math.random() * 61) - 30;
    const want = Math.pow(x, n);
    if (x === 0 && n <= 0) continue;
    if (!Number.isFinite(want) || Math.abs(want) > 1e4) continue;
    assert.ok(close(myPow(x, n), want), x + '^' + n);
    checked++;
  }
});
