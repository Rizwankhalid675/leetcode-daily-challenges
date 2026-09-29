/**
 * 146. LRU Cache
 * https://leetcode.com/problems/lru-cache/
 * A JS Map keeps insertion order, so it doubles as the recency list: re-insert a key on every access and evict the first key when over capacity.
 */
var LRUCache = function (capacity) {
  this.cap = capacity;
  this.map = new Map(); // iteration order = least recent first
};
LRUCache.prototype.get = function (key) {
  if (!this.map.has(key)) return -1;
  const v = this.map.get(key);
  this.map.delete(key);
  this.map.set(key, v);
  return v;
};
LRUCache.prototype.put = function (key, value) {
  if (this.map.has(key)) this.map.delete(key);
  this.map.set(key, value);
  if (this.map.size > this.cap) this.map.delete(this.map.keys().next().value);
};

module.exports = { LRUCache };
