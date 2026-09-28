const test = require('node:test');
const assert = require('node:assert');
const { RecentCounter } = require('./solution');

test('official example', () => {
  const rc = new RecentCounter();
  assert.deepStrictEqual([1, 100, 3001, 3002].map((t) => rc.ping(t)), [1, 2, 3, 3]);
});

test('boundary: exactly 3000 ms older is still counted', () => {
  const rc = new RecentCounter();
  rc.ping(1000);
  assert.strictEqual(rc.ping(4000), 2);
  assert.strictEqual(rc.ping(4001), 2); // 1000 now drops out
});

test('matches a filter-based reference', () => {
  const rc = new RecentCounter();
  const seen = [];
  let t = 0;
  for (let i = 0; i < 2000; i++) {
    t += 1 + Math.floor(Math.random() * 800);
    seen.push(t);
    assert.strictEqual(rc.ping(t), seen.filter((x) => x >= t - 3000).length);
  }
});
