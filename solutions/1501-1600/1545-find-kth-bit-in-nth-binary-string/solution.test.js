const test = require('node:test');
const assert = require('node:assert');
const { findKthBit } = require('./solution');

function build(n) {
  let s = '0';
  for (let i = 2; i <= n; i++) {
    const inv = [...s].map((c) => (c === '0' ? '1' : '0')).reverse().join('');
    s = s + '1' + inv;
  }
  return s;
}

test('official examples', () => {
  assert.strictEqual(findKthBit(3, 1), '0');
  assert.strictEqual(findKthBit(4, 11), '1');
});

test('every position for n = 1..12 matches the built string', () => {
  for (let n = 1; n <= 12; n++) {
    const s = build(n);
    for (let k = 1; k <= s.length; k++) assert.strictEqual(findKthBit(n, k), s[k - 1]);
  }
});

test('n = 20 boundaries', () => {
  const s = build(20);
  for (const k of [1, 2, 524287, 524288, 524289, 1048574, 1048575]) assert.strictEqual(findKthBit(20, k), s[k - 1]);
});
