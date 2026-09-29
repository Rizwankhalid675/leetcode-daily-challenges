const test = require('node:test');
const assert = require('node:assert');
const { KthLargest } = require('./solution');

test('official examples', () => {
  const a = new KthLargest(3, [4, 5, 8, 2]);
  assert.deepStrictEqual([3, 5, 10, 9, 4].map((v) => a.add(v)), [4, 5, 5, 8, 8]);
  const b = new KthLargest(4, [7, 7, 7, 7, 8, 3]);
  assert.deepStrictEqual([2, 10, 9, 9].map((v) => b.add(v)), [7, 7, 7, 8]);
});

test('empty initial stream with k = 1', () => {
  const a = new KthLargest(1, []);
  assert.strictEqual(a.add(-3), -3);
  assert.strictEqual(a.add(-5), -3);
  assert.strictEqual(a.add(10), 10);
});

test('matches sorting the whole stream', () => {
  for (let t = 0; t < 300; t++) {
    const n = Math.floor(Math.random() * 8);
    const nums = Array.from({ length: n }, () => Math.floor(Math.random() * 21) - 10);
    const k = 1 + Math.floor(Math.random() * (n + 1));
    const kl = new KthLargest(k, nums);
    const all = [...nums];
    for (let op = 0; op < 30; op++) {
      const v = Math.floor(Math.random() * 21) - 10;
      all.push(v);
      const sorted = [...all].sort((x, y) => y - x);
      assert.strictEqual(kl.add(v), sorted[k - 1]);
    }
  }
});
