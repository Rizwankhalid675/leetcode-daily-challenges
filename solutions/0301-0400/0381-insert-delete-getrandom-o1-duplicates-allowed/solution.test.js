const test = require('node:test');
const assert = require('node:assert');
const { RandomizedCollection } = require('./solution');

function checkInvariant(rc, ref) {
  const counts = new Map();
  for (const v of rc.vals) counts.set(v, (counts.get(v) || 0) + 1);
  assert.deepStrictEqual([...counts].sort((a, b) => a[0] - b[0]), [...ref].sort((a, b) => a[0] - b[0]));
  for (const [v, s] of rc.pos) for (const i of s) assert.strictEqual(rc.vals[i], v);
}

test('official example', () => {
  const rc = new RandomizedCollection();
  assert.strictEqual(rc.insert(1), true);
  assert.strictEqual(rc.insert(1), false);
  assert.strictEqual(rc.insert(2), true);
  assert.ok([1, 2].includes(rc.getRandom()));
  assert.strictEqual(rc.remove(1), true);
  assert.ok([1, 2].includes(rc.getRandom()));
});

test('matches a count map under random operations', () => {
  for (let t = 0; t < 200; t++) {
    const rc = new RandomizedCollection();
    const ref = new Map();
    for (let op = 0; op < 100; op++) {
      const v = Math.floor(Math.random() * 5) - 2;
      const r = Math.random();
      if (r < 0.45) {
        assert.strictEqual(rc.insert(v), !ref.has(v));
        ref.set(v, (ref.get(v) || 0) + 1);
      } else if (r < 0.9) {
        assert.strictEqual(rc.remove(v), ref.has(v));
        if (ref.has(v)) { if (ref.get(v) === 1) ref.delete(v); else ref.set(v, ref.get(v) - 1); }
      } else if (ref.size) {
        assert.ok(ref.has(rc.getRandom()));
      }
      checkInvariant(rc, ref);
    }
  }
});

test('getRandom is roughly proportional to multiplicity', () => {
  const rc = new RandomizedCollection();
  rc.insert(1); rc.insert(1); rc.insert(2);
  let ones = 0;
  const N = 30000;
  for (let i = 0; i < N; i++) if (rc.getRandom() === 1) ones++;
  assert.ok(ones / N > 0.6 && ones / N < 0.73, String(ones / N));
});

test('2e5 operations run fast', () => {
  const rc = new RandomizedCollection();
  const start = Date.now();
  for (let i = 0; i < 200000; i++) {
    const v = Math.floor(Math.random() * 100);
    if (i % 3 === 0) rc.remove(v); else if (i % 3 === 1) rc.insert(v); else if (rc.vals.length) rc.getRandom();
  }
  assert.ok(Date.now() - start < 1000);
});
