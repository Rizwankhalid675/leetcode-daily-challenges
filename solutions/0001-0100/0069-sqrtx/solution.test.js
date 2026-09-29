const test = require('node:test');
const assert = require('node:assert');
const { mySqrt } = require('./solution');

test('official examples', () => {
  assert.strictEqual(mySqrt(4), 2);
  assert.strictEqual(mySqrt(8), 2);
});

test('edges', () => {
  assert.strictEqual(mySqrt(0), 0);
  assert.strictEqual(mySqrt(1), 1);
  assert.strictEqual(mySqrt(2), 1);
  assert.strictEqual(mySqrt(2147395600), 46340);
  assert.strictEqual(mySqrt(2147395599), 46339);
  assert.strictEqual(mySqrt(2147483647), 46340);
});

test('matches Math.sqrt-based reference', () => {
  for (let t = 0; t < 5000; t++) {
    const x = Math.random() < 0.5 ? Math.floor(Math.random() * 1000) : Math.floor(Math.random() * 2147483648);
    const r = mySqrt(x);
    assert.ok(r * r <= x && (r + 1) * (r + 1) > x, String(x));
    assert.strictEqual(r, Math.floor(Math.sqrt(x)));
  }
});
