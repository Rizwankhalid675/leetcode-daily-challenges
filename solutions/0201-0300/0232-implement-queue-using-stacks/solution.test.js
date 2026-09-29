const test = require('node:test');
const assert = require('node:assert');
const { MyQueue } = require('./solution');

test('official example', () => {
  const q = new MyQueue();
  q.push(1);
  q.push(2);
  assert.strictEqual(q.peek(), 1);
  assert.strictEqual(q.pop(), 1);
  assert.strictEqual(q.empty(), false);
});

test('matches an array queue under random operations', () => {
  const q = new MyQueue();
  const ref = [];
  for (let op = 0; op < 5000; op++) {
    if (!ref.length || Math.random() < 0.5) { const x = Math.floor(Math.random() * 9) + 1; q.push(x); ref.push(x); }
    else if (Math.random() < 0.5) assert.strictEqual(q.pop(), ref.shift());
    else assert.strictEqual(q.peek(), ref[0]);
    assert.strictEqual(q.empty(), ref.length === 0);
  }
});
