/**
 * 2080. Range Frequency Queries
 * https://leetcode.com/problems/range-frequency-queries/
 * Store the sorted list of positions for each value. A query is the number of positions in [left, right], found with two lower-bound binary searches.
 */
var RangeFreqQuery = function (arr) {
  this.pos = new Map(); // value -> increasing indices
  for (let i = 0; i < arr.length; i++) {
    let a = this.pos.get(arr[i]);
    if (!a) {
      a = [];
      this.pos.set(arr[i], a);
    }
    a.push(i);
  }
};
function lowerBound(a, x) {
  let lo = 0;
  let hi = a.length;
  while (lo < hi) {
    const m = (lo + hi) >> 1;
    if (a[m] < x) lo = m + 1;
    else hi = m;
  }
  return lo;
}
RangeFreqQuery.prototype.query = function (left, right, value) {
  const a = this.pos.get(value);
  if (!a) return 0;
  return lowerBound(a, right + 1) - lowerBound(a, left);
};

module.exports = { RangeFreqQuery };
