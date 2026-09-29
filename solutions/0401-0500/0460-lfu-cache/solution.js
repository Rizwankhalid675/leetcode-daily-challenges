/**
 * 460. LFU Cache
 * https://leetcode.com/problems/lfu-cache/
 * Frequency buckets: freq -> insertion-ordered Set of keys (LRU order within a frequency), plus the current minimum frequency. Touching a key moves it to the next bucket.
 */
var LFUCache = function (capacity) {
  this.cap = capacity;
  this.nodes = new Map(); // key -> [value, freq]
  this.buckets = new Map(); // freq -> Set of keys, least recent first
  this.minFreq = 0;
};
LFUCache.prototype._touch = function (key, node) {
  const f = node[1];
  const b = this.buckets.get(f);
  b.delete(key);
  if (b.size === 0) {
    this.buckets.delete(f);
    if (this.minFreq === f) this.minFreq = f + 1;
  }
  node[1] = f + 1;
  let nb = this.buckets.get(f + 1);
  if (!nb) {
    nb = new Set();
    this.buckets.set(f + 1, nb);
  }
  nb.add(key);
};
LFUCache.prototype.get = function (key) {
  const node = this.nodes.get(key);
  if (!node) return -1;
  this._touch(key, node);
  return node[0];
};
LFUCache.prototype.put = function (key, value) {
  if (this.cap === 0) return;
  const node = this.nodes.get(key);
  if (node) {
    node[0] = value;
    this._touch(key, node);
    return;
  }
  if (this.nodes.size === this.cap) {
    const b = this.buckets.get(this.minFreq);
    const victim = b.values().next().value;
    b.delete(victim);
    if (b.size === 0) this.buckets.delete(this.minFreq);
    this.nodes.delete(victim);
  }
  this.nodes.set(key, [value, 1]);
  let b1 = this.buckets.get(1);
  if (!b1) {
    b1 = new Set();
    this.buckets.set(1, b1);
  }
  b1.add(key);
  this.minFreq = 1;
};

module.exports = { LFUCache };
