const test = require('node:test');
const assert = require('node:assert');
const { MinStack } = require('./solution');

test('official example', () => {
  const s = new MinStack();
  s.push(-2);
  s.push(0);
  s.push(-3);
  assert.strictEqual(s.getMin(), -3);
  s.pop();
  assert.strictEqual(s.top(), 0);
  assert.strictEqual(s.getMin(), -2);
});

test('matches an array reference under random operations (with duplicate minimums)', () => {
  const s = new MinStack();
  const ref = [];
  for (let op = 0; op < 20000; op++) {
    if (ref.length === 0 || Math.random() < 0.55) {
      const v = Math.floor(Math.random() * 10) - 5;
      s.push(v);
      ref.push(v);
    } else {
      s.pop();
      ref.pop();
    }
    if (ref.length) {
      assert.strictEqual(s.top(), ref[ref.length - 1]);
      assert.strictEqual(s.getMin(), Math.min(...ref));
    }
  }
});
