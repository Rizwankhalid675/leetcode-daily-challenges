const test = require('node:test');
const assert = require('node:assert');
const { ArrayWrapper } = require('./solution');

test('official examples', () => {
  assert.strictEqual(new ArrayWrapper([1, 2]) + new ArrayWrapper([3, 4]), 10);
  assert.strictEqual(String(new ArrayWrapper([23, 98, 42, 70])), '[23,98,42,70]');
  assert.strictEqual(new ArrayWrapper([]) + new ArrayWrapper([]), 0);
});

test('empty toString and string concatenation', () => {
  assert.strictEqual(String(new ArrayWrapper([])), '[]');
  assert.strictEqual('' + String(new ArrayWrapper([0, 1000])), '[0,1000]');
});

test('random sums', () => {
  for (let t = 0; t < 100; t++) {
    const a = Array.from({ length: Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 1001));
    const b = Array.from({ length: Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 1001));
    const sum = [...a, ...b].reduce((x, y) => x + y, 0);
    assert.strictEqual(new ArrayWrapper(a) + new ArrayWrapper(b), sum);
    assert.strictEqual(String(new ArrayWrapper(a)), '[' + a.join(',') + ']');
  }
});
