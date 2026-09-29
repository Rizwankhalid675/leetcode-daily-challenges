const test = require('node:test');
const assert = require('node:assert');
const { LFUCache } = require('./solution');

class RefLFU {
  constructor(cap) { this.cap = cap; this.items = new Map(); this.clock = 0; } // key -> {v, f, last}
  get(k) {
    const e = this.items.get(k);
    if (!e) return -1;
    e.f++; e.last = this.clock++;
    return e.v;
  }
  put(k, v) {
    const e = this.items.get(k);
    if (e) { e.v = v; e.f++; e.last = this.clock++; return; }
    if (this.items.size === this.cap) {
      let worst = null;
      for (const [key, x] of this.items) {
        if (!worst || x.f < worst[1].f || (x.f === worst[1].f && x.last < worst[1].last)) worst = [key, x];
      }
      this.items.delete(worst[0]);
    }
    this.items.set(k, { v, f: 1, last: this.clock++ });
  }
}

test('official example', () => {
  const c = new LFUCache(2);
  c.put(1, 1);
  c.put(2, 2);
  assert.strictEqual(c.get(1), 1);
  c.put(3, 3);
  assert.strictEqual(c.get(2), -1);
  assert.strictEqual(c.get(3), 3);
  c.put(4, 4);
  assert.strictEqual(c.get(1), -1);
  assert.strictEqual(c.get(3), 3);
  assert.strictEqual(c.get(4), 4);
});

test('matches a brute-force scan under random operations', () => {
  for (let t = 0; t < 300; t++) {
    const cap = 1 + Math.floor(Math.random() * 4);
    const c = new LFUCache(cap);
    const ref = new RefLFU(cap);
    for (let op = 0; op < 200; op++) {
      const k = Math.floor(Math.random() * 7);
      if (Math.random() < 0.5) assert.strictEqual(c.get(k), ref.get(k));
      else { const v = Math.floor(Math.random() * 100); c.put(k, v); ref.put(k, v); }
    }
  }
});

test('2e5 operations at capacity 1e4 run fast', () => {
  const c = new LFUCache(10000);
  const start = Date.now();
  for (let i = 0; i < 200000; i++) {
    if (i & 1) c.get(Math.floor(Math.random() * 100001));
    else c.put(Math.floor(Math.random() * 100001), i);
  }
  assert.ok(Date.now() - start < 1000);
});
