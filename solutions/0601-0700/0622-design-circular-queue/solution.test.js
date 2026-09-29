const test = require('node:test');
const assert = require('node:assert');
const { MyCircularQueue } = require('./solution');

test('official example', () => {
  const q = new MyCircularQueue(3);
  assert.deepStrictEqual([q.enQueue(1), q.enQueue(2), q.enQueue(3), q.enQueue(4), q.Rear(), q.isFull(), q.deQueue(), q.enQueue(4), q.Rear()], [true, true, true, false, 3, true, true, true, 4]);
});

test('matches a bounded array queue', () => {
  for (let run = 0; run < 50; run++) {
    const k = 1 + Math.floor(Math.random() * 5);
    const q = new MyCircularQueue(k);
    const ref = [];
    for (let op = 0; op < 200; op++) {
      const r = Math.random();
      if (r < 0.4) { const v = Math.floor(Math.random() * 100); assert.strictEqual(q.enQueue(v), ref.length < k); if (ref.length < k) ref.push(v); }
      else if (r < 0.7) { assert.strictEqual(q.deQueue(), ref.length > 0); ref.shift(); }
      assert.strictEqual(q.Front(), ref.length ? ref[0] : -1);
      assert.strictEqual(q.Rear(), ref.length ? ref[ref.length - 1] : -1);
      assert.strictEqual(q.isEmpty(), ref.length === 0);
      assert.strictEqual(q.isFull(), ref.length === k);
    }
  }
});
