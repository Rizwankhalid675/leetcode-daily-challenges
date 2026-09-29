/**
 * 307. Range Sum Query - Mutable
 * https://leetcode.com/problems/range-sum-query-mutable/
 * Fenwick (binary indexed) tree over the array: point updates add the difference, and a range sum is the difference of two prefix sums. Both are O(log n).
 */
var NumArray = function (nums) {
  const n = nums.length;
  this.n = n;
  this.nums = nums.slice();
  this.tree = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    this.tree[i] += nums[i - 1];
    const parent = i + (i & -i);
    if (parent <= n) this.tree[parent] += this.tree[i];
  }
};
NumArray.prototype.update = function (index, val) {
  const delta = val - this.nums[index];
  this.nums[index] = val;
  for (let i = index + 1; i <= this.n; i += i & -i) this.tree[i] += delta;
};
NumArray.prototype._prefix = function (count) {
  let sum = 0;
  for (let i = count; i > 0; i -= i & -i) sum += this.tree[i];
  return sum;
};
NumArray.prototype.sumRange = function (left, right) {
  return this._prefix(right + 1) - this._prefix(left);
};

module.exports = { NumArray };
