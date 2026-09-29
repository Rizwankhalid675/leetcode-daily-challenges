const test = require('node:test');
const assert = require('node:assert');
const { reverse } = require('./solution');

const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

function viaBigInt(x) {
  const s = String(Math.abs(x)).split('').reverse().join('');
  let v = BigInt(s) * (x < 0 ? -1n : 1n);
  if (v > 2147483647n || v < -2147483648n) return 0;
  return Number(v);
}

test('official examples', () => {
  assert.strictEqual(reverse(123), 321);
  assert.strictEqual(reverse(-123), -321);
  assert.strictEqual(reverse(120), 21);
});

test('overflow boundaries', () => {
  assert.strictEqual(reverse(0), 0);
  assert.strictEqual(reverse(-10), -1);
  assert.strictEqual(reverse(2147483647), 0); // 7463847412 overflows
  assert.strictEqual(reverse(-2147483648), 0);
  assert.strictEqual(reverse(1463847412), 2147483641);
  assert.strictEqual(reverse(-1463847412), -2147483641);
  assert.strictEqual(reverse(1534236469), 0);
  assert.ok(Object.is(reverse(-100), -1));
});

test('matches BigInt reference on random 32-bit inputs', () => {
  for (let t = 0; t < 5000; t++) {
    const x = rint(-2147483648, 2147483647);
    assert.strictEqual(reverse(x), viaBigInt(x), 'x=' + x);
  }
  for (let x = -3000; x <= 3000; x++) assert.strictEqual(reverse(x), viaBigInt(x));
});
