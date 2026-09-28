const test = require('node:test');
const assert = require('node:assert');
const { RandomizedSet } = require('./solution');

test('official example', () => {
  const s = new RandomizedSet();
  assert.strictEqual(s.insert(1), true);
  assert.strictEqual(s.remove(2), false);
  assert.strictEqual(s.insert(2), true);
  assert.ok([1, 2].includes(s.getRandom()));
  assert.strictEqual(s.remove(1), true);
  assert.strictEqual(s.insert(2), false);
  assert.strictEqual(s.getRandom(), 2);
});

test('matches a Set under random operations; removing the last element works', () => {
  const s = new RandomizedSet();
  const ref = new Set();
  for (let op = 0; op < 20000; op++) {
    const v = Math.floor(Math.random() * 20) - 10;
    if (Math.random() < 0.5) assert.strictEqual(s.insert(v), !ref.has(v)), ref.add(v);
    else assert.strictEqual(s.remove(v), ref.has(v)), ref.delete(v);
    if (ref.size > 0) assert.ok(ref.has(s.getRandom()));
  }
});

test('getRandom is roughly uniform', () => {
  const s = new RandomizedSet();
  [1, 2, 3, 4].forEach((v) => s.insert(v));
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
  for (let i = 0; i < 40000; i++) counts[s.getRandom()]++;
  for (const c of Object.values(counts)) assert.ok(c > 9000 && c < 11000, JSON.stringify(counts));
});
