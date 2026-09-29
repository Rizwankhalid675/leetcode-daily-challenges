/**
 * 731. My Calendar II
 * https://leetcode.com/problems/my-calendar-ii/
 * Dynamic (lazily created) segment tree over [0, 10^9) storing, per node, the maximum number of overlapping bookings plus a pending add. A booking is accepted if the range maximum is below 2, then 1 is added to the range.
 */
var MyCalendarTwo = function () {
  this.maxv = [0];
  this.lazy = [0];
  this.left = [0];
  this.right = [0];
};
MyCalendarTwo.prototype._child = function (node, isRight) {
  const arr = isRight ? this.right : this.left;
  if (arr[node] === 0) {
    arr[node] = this.maxv.length;
    this.maxv.push(0); this.lazy.push(0); this.left.push(0); this.right.push(0);
  }
  return arr[node];
};
MyCalendarTwo.prototype._query = function (node, lo, hi, l, r) {
  if (r < lo || hi < l) return 0;
  if (l <= lo && hi <= r) return this.maxv[node];
  const mid = Math.floor((lo + hi) / 2);
  const a = this.left[node] ? this._query(this.left[node], lo, mid, l, r) : 0;
  const b = this.right[node] ? this._query(this.right[node], mid + 1, hi, l, r) : 0;
  return this.lazy[node] + Math.max(a, b);
};
MyCalendarTwo.prototype._add = function (node, lo, hi, l, r) {
  if (r < lo || hi < l) return;
  if (l <= lo && hi <= r) { this.maxv[node]++; this.lazy[node]++; return; }
  const mid = Math.floor((lo + hi) / 2);
  const lc = this._child(node, false);
  const rc = this._child(node, true);
  this._add(lc, lo, mid, l, r);
  this._add(rc, mid + 1, hi, l, r);
  this.maxv[node] = this.lazy[node] + Math.max(this.maxv[lc], this.maxv[rc]);
};
MyCalendarTwo.prototype.book = function (startTime, endTime) {
  const HI = 1e9 - 1;
  if (this._query(0, 0, HI, startTime, endTime - 1) >= 2) return false;
  this._add(0, 0, HI, startTime, endTime - 1);
  return true;
};

module.exports = { MyCalendarTwo };
