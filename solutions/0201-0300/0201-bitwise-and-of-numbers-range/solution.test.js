const test = require('node:test');
const assert = require('node:assert');
const { rangeBitwiseAnd } = require('./solution');

function brute(l, r) { let x = l; for (let v = l + 1; v <= r; v++) x &= v; return x; }

test('official examples', () => {
  assert.strictEqual(rangeBitwiseAnd(5, 7), 4);
  assert.strictEqual(rangeBitwiseAnd(0, 0), 0);
  assert.strictEqual(rangeBitwiseAnd(1, 2147483647), 0);
});

test('extremes', () => {
  assert.strictEqual(rangeBitwiseAnd(2147483647, 2147483647), 2147483647);
  assert.strictEqual(rangeBitwiseAnd(2147483646, 2147483647), 2147483646);
  assert.strictEqual(rangeBitwiseAnd(1073741824, 2147483647), 1073741824);
});

test('matches loop AND on random ranges', () => {
  for (let t = 0; t < 2000; t++) {
    const l = Math.floor(Math.random() * 3000);
    const r = l + Math.floor(Math.random() * 300);
    assert.strictEqual(rangeBitwiseAnd(l, r), brute(l, r));
  }
  for (let t = 0; t < 200; t++) {
    const l = 2147483647 - Math.floor(Math.random() * 500);
    const r = l + Math.floor(Math.random() * (2147483647 - l + 1));
    assert.strictEqual(rangeBitwiseAnd(l, r), brute(l, r));
  }
});
