const test = require('node:test');
const assert = require('node:assert');
const { AllOne } = require('./solution');

test('official example', () => {
  const a = new AllOne();
  a.inc('hello');
  a.inc('hello');
  assert.strictEqual(a.getMaxKey(), 'hello');
  assert.strictEqual(a.getMinKey(), 'hello');
  a.inc('leet');
  assert.strictEqual(a.getMaxKey(), 'hello');
  assert.strictEqual(a.getMinKey(), 'leet');
});

test('empty structure returns empty strings', () => {
  const a = new AllOne();
  assert.strictEqual(a.getMaxKey(), '');
  assert.strictEqual(a.getMinKey(), '');
  a.inc('x');
  a.dec('x');
  assert.strictEqual(a.getMaxKey(), '');
  assert.strictEqual(a.getMinKey(), '');
});

test('matches a count map under random operations', () => {
  const keys = ['a', 'b', 'c', 'd', 'e'];
  for (let t = 0; t < 300; t++) {
    const a = new AllOne();
    const ref = new Map();
    for (let op = 0; op < 100; op++) {
      const r = Math.random();
      if (r < 0.55 || ref.size === 0) {
        const k = keys[Math.floor(Math.random() * keys.length)];
        a.inc(k);
        ref.set(k, (ref.get(k) || 0) + 1);
      } else {
        const present = [...ref.keys()];
        const k = present[Math.floor(Math.random() * present.length)];
        a.dec(k);
        if (ref.get(k) === 1) ref.delete(k); else ref.set(k, ref.get(k) - 1);
      }
      if (ref.size === 0) {
        assert.strictEqual(a.getMaxKey(), '');
        assert.strictEqual(a.getMinKey(), '');
      } else {
        const vals = [...ref.values()];
        assert.strictEqual(ref.get(a.getMaxKey()), Math.max(...vals));
        assert.strictEqual(ref.get(a.getMinKey()), Math.min(...vals));
      }
    }
  }
});

test('5e4 operations run fast', () => {
  const a = new AllOne();
  const counts = new Map();
  const start = Date.now();
  for (let i = 0; i < 50000; i++) {
    const k = 'k' + Math.floor(Math.random() * 1000);
    if (counts.get(k) && Math.random() < 0.4) { a.dec(k); counts.set(k, counts.get(k) - 1); }
    else { a.inc(k); counts.set(k, (counts.get(k) || 0) + 1); }
    a.getMaxKey();
    a.getMinKey();
  }
  assert.ok(Date.now() - start < 1000);
});
