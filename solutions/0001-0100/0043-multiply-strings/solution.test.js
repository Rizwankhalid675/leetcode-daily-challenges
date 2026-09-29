const test = require('node:test');
const assert = require('node:assert');
const { multiply } = require('./solution');

const randNum = (len) => {
  let s = String(1 + Math.floor(Math.random() * 9));
  for (let i = 1; i < len; i++) s += Math.floor(Math.random() * 10);
  return s;
};

test('official examples', () => {
  assert.strictEqual(multiply('2', '3'), '6');
  assert.strictEqual(multiply('123', '456'), '56088');
});

test('zeros and carries', () => {
  assert.strictEqual(multiply('0', '52'), '0');
  assert.strictEqual(multiply('9133', '0'), '0');
  assert.strictEqual(multiply('999', '999'), '998001');
  assert.strictEqual(multiply('1', '1'), '1');
});

test('matches BigInt, up to 200 digits', () => {
  for (let t = 0; t < 500; t++) {
    const a = Math.random() < 0.05 ? '0' : randNum(1 + Math.floor(Math.random() * 200));
    const b = randNum(1 + Math.floor(Math.random() * 200));
    assert.strictEqual(multiply(a, b), (BigInt(a) * BigInt(b)).toString());
  }
});
