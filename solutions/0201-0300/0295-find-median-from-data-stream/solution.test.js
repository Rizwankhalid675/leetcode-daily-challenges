const test = require('node:test');
const assert = require('node:assert');
const { MedianFinder } = require('./solution');

test('official example', () => {
  const mf = new MedianFinder();
  mf.addNum(1);
  mf.addNum(2);
  assert.strictEqual(mf.findMedian(), 1.5);
  mf.addNum(3);
  assert.strictEqual(mf.findMedian(), 2);
});

test('negative numbers and zero', () => {
  const mf = new MedianFinder();
  mf.addNum(-1);
  assert.strictEqual(mf.findMedian(), -1);
  mf.addNum(0);
  assert.strictEqual(mf.findMedian(), -0.5);
  mf.addNum(0);
  assert.ok(Object.is(mf.findMedian(), 0));
});

test('matches sort-based median on random streams', () => {
  for (let t = 0; t < 200; t++) {
    const mf = new MedianFinder();
    const seen = [];
    for (let i = 0; i < 60; i++) {
      const x = Math.floor(Math.random() * 21) - 10;
      mf.addNum(x);
      seen.push(x);
      const s = [...seen].sort((a, b) => a - b);
      const n = s.length;
      const want = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
      assert.strictEqual(mf.findMedian(), want);
    }
  }
});

test('5*10^4 adds and queries is fast', () => {
  const mf = new MedianFinder();
  const t0 = Date.now();
  for (let i = 0; i < 50000; i++) {
    mf.addNum(Math.floor(Math.random() * 2e5) - 1e5);
    mf.findMedian();
  }
  assert.ok(Date.now() - t0 < 1000);
});
