const test = require('node:test');
const assert = require('node:assert');
const { addBinary } = require('./solution');

test('official examples', () => {
  assert.strictEqual(addBinary('11', '1'), '100');
  assert.strictEqual(addBinary('1010', '1011'), '10101');
});

test('zeros and carries', () => {
  assert.strictEqual(addBinary('0', '0'), '0');
  assert.strictEqual(addBinary('0', '1'), '1');
  assert.strictEqual(addBinary('1111', '1'), '10000');
});

test('random long strings match BigInt', () => {
  const rb = (len) => '1' + Array.from({ length: len - 1 }, () => (Math.random() < 0.5 ? '0' : '1')).join('');
  for (let t = 0; t < 300; t++) {
    const a = Math.random() < 0.05 ? '0' : rb(1 + Math.floor(Math.random() * 200));
    const b = rb(1 + Math.floor(Math.random() * 200));
    assert.strictEqual(addBinary(a, b), (BigInt('0b' + a) + BigInt('0b' + b)).toString(2));
  }
  const a = rb(10000), b = rb(10000);
  assert.strictEqual(addBinary(a, b), (BigInt('0b' + a) + BigInt('0b' + b)).toString(2));
});
