/**
 * 380. Insert Delete GetRandom O(1)
 * https://leetcode.com/problems/insert-delete-getrandom-o1/
 *
 * Array of values (for O(1) uniform random access) + Map value -> index (for O(1) lookup).
 * Remove swaps the target with the last element and pops, fixing the moved element's index.
 */
var RandomizedSet = function () {
  this.values = [];
  this.index = new Map();
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  if (this.index.has(val)) return false;
  this.index.set(val, this.values.length);
  this.values.push(val);
  return true;
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  const i = this.index.get(val);
  if (i === undefined) return false;
  const last = this.values[this.values.length - 1];
  this.values[i] = last; // move the last element into the hole
  this.index.set(last, i);
  this.values.pop();
  this.index.delete(val); // after set(last, ...) so removing the last element itself works
  return true;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  return this.values[Math.floor(Math.random() * this.values.length)];
};

module.exports = { RandomizedSet };
