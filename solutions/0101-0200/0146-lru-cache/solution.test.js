const test = require('node:test');
const assert = require('node:assert');
const { LRUCache } = require('./solution');

class RefLRU {
  constructor(cap) { this.cap = cap; this.items = []; } // [key, value], most recent last
  get(k) {
    const i = this.items.findIndex((e) => e[0] === k);
    if (i < 0) return -1;
    const [e] = this.items.splice(i, 1);
    this.items.push(e);
    return e[1];
  }
  put(k, v) {
    const i = this.items.findIndex((e) => e[0] === k);
    if (i >= 0) this.items.splice(i, 1);
    this.items.push([k, v]);
    if (this.items.length > this.cap) this.items.shift();
  }
}

test('official example', () => {
  const c = new LRUCache(2);
  c.put(1, 1);
  c.put(2, 2);
  assert.strictEqual(c.get(1), 1);
  c.put(3, 3);
  assert.strictEqual(c.get(2), -1);
  c.put(4, 4);
  assert.strictEqual(c.get(1), -1);
  assert.strictEqual(c.get(3), 3);
  assert.strictEqual(c.get(4), 4);
});

test('matches a brute-force list under random operations', () => {
  for (let t = 0; t < 200; t++) {
    const cap = 1 + Math.floor(Math.random() * 4);
    const c = new LRUCache(cap);
    const ref = new RefLRU(cap);
    for (let op = 0; op < 200; op++) {
      const k = Math.floor(Math.random() * 7);
      if (Math.random() < 0.5) assert.strictEqual(c.get(k), ref.get(k));
      else { const v = Math.floor(Math.random() * 100); c.put(k, v); ref.put(k, v); }
    }
  }
});

test('2e5 operations at capacity 3000 run fast', () => {
  const c = new LRUCache(3000);
  const start = Date.now();
  for (let i = 0; i < 200000; i++) {
    if (i & 1) c.get(Math.floor(Math.random() * 10001));
    else c.put(Math.floor(Math.random() * 10001), i);
  }
  assert.ok(Date.now() - start < 1000);
});
