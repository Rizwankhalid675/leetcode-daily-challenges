/**
 * 381. Insert Delete GetRandom O(1) - Duplicates allowed
 * https://leetcode.com/problems/insert-delete-getrandom-o1-duplicates-allowed/
 * Array of values plus value -> Set of its indices. Remove by moving the last array element into the freed slot and fixing that element's index set; getRandom picks a uniform array index.
 */
var RandomizedCollection = function () {
  this.vals = [];
  this.pos = new Map(); // value -> Set of indices in vals
};
RandomizedCollection.prototype.insert = function (val) {
  let s = this.pos.get(val);
  const fresh = !s;
  if (fresh) {
    s = new Set();
    this.pos.set(val, s);
  }
  s.add(this.vals.length);
  this.vals.push(val);
  return fresh;
};
RandomizedCollection.prototype.remove = function (val) {
  const s = this.pos.get(val);
  if (!s) return false;
  const i = s.values().next().value;
  s.delete(i);
  const lastIdx = this.vals.length - 1;
  const last = this.vals.pop();
  if (i !== lastIdx) {
    this.vals[i] = last;
    const ls = this.pos.get(last);
    ls.delete(lastIdx);
    ls.add(i);
  }
  if (s.size === 0) this.pos.delete(val);
  return true;
};
RandomizedCollection.prototype.getRandom = function () {
  return this.vals[Math.floor(Math.random() * this.vals.length)];
};

module.exports = { RandomizedCollection };
