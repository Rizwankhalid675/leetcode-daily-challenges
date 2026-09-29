/**
 * 715. Range Module
 * https://leetcode.com/problems/range-module/
 * Sorted list of disjoint, non-touching half-open intervals. Binary search finds the block of intervals an operation overlaps; add replaces it with one merged interval, remove with at most two leftover pieces, query checks a single interval.
 */
var RangeModule = function () {
  this.iv = []; // sorted, disjoint, non-touching [left, right)
};
// first index whose interval satisfies pred (pred is monotone over the list)
RangeModule.prototype._first = function (pred) {
  let lo = 0;
  let hi = this.iv.length;
  while (lo < hi) {
    const m = (lo + hi) >> 1;
    if (pred(this.iv[m])) hi = m;
    else lo = m + 1;
  }
  return lo;
};
RangeModule.prototype.addRange = function (left, right) {
  const iv = this.iv;
  const i = this._first((p) => p[1] >= left); // overlaps or touches on the left
  const j = this._first((p) => p[0] > right); // entirely after (not touching)
  if (i < j) {
    left = Math.min(left, iv[i][0]);
    right = Math.max(right, iv[j - 1][1]);
  }
  iv.splice(i, j - i, [left, right]);
};
RangeModule.prototype.queryRange = function (left, right) {
  const k = this._first((p) => p[0] > left) - 1;
  return k >= 0 && this.iv[k][1] >= right;
};
RangeModule.prototype.removeRange = function (left, right) {
  const iv = this.iv;
  const i = this._first((p) => p[1] > left);
  const j = this._first((p) => p[0] >= right);
  if (i >= j) return;
  const pieces = [];
  if (iv[i][0] < left) pieces.push([iv[i][0], left]);
  if (iv[j - 1][1] > right) pieces.push([right, iv[j - 1][1]]);
  iv.splice(i, j - i, ...pieces);
};

module.exports = { RangeModule };
