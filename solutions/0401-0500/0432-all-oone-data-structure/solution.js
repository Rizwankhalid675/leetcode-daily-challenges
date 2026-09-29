/**
 * 432. All O`one Data Structure
 * https://leetcode.com/problems/all-oone-data-structure/
 * Doubly linked list of count buckets in increasing order (each holds a Set of keys) plus key -> bucket. inc/dec move a key to the neighbouring bucket, creating or unlinking buckets as needed; min/max are the first/last bucket.
 */
var AllOne = function () {
  this.head = { count: 0, keys: null, prev: null, next: null };
  this.tail = { count: Infinity, keys: null, prev: this.head, next: null };
  this.head.next = this.tail;
  this.where = new Map(); // key -> bucket
};
AllOne.prototype._insertAfter = function (node, count) {
  const b = { count, keys: new Set(), prev: node, next: node.next };
  node.next.prev = b;
  node.next = b;
  return b;
};
AllOne.prototype._dropIfEmpty = function (b) {
  if (b.keys.size === 0) {
    b.prev.next = b.next;
    b.next.prev = b.prev;
  }
};
AllOne.prototype.inc = function (key) {
  const cur = this.where.get(key);
  const base = cur || this.head;
  const c = base.count + 1;
  let nb = base.next;
  if (nb.count !== c) nb = this._insertAfter(base, c);
  nb.keys.add(key);
  this.where.set(key, nb);
  if (cur) {
    cur.keys.delete(key);
    this._dropIfEmpty(cur);
  }
};
AllOne.prototype.dec = function (key) {
  const cur = this.where.get(key);
  if (cur.count === 1) this.where.delete(key);
  else {
    let pb = cur.prev;
    if (pb.count !== cur.count - 1) pb = this._insertAfter(pb, cur.count - 1);
    pb.keys.add(key);
    this.where.set(key, pb);
  }
  cur.keys.delete(key);
  this._dropIfEmpty(cur);
};
AllOne.prototype.getMaxKey = function () {
  const b = this.tail.prev;
  return b === this.head ? '' : b.keys.values().next().value;
};
AllOne.prototype.getMinKey = function () {
  const b = this.head.next;
  return b === this.tail ? '' : b.keys.values().next().value;
};

module.exports = { AllOne };
