/**
 * 436. Find Right Interval
 * https://leetcode.com/problems/find-right-interval/
 * Sort interval indices by start; for each interval binary-search the first start >= its end and report that original index (or -1).
 */
var findRightInterval = function (intervals) {
  const n = intervals.length;
  const order = Array.from({ length: n }, (_, i) => i).sort((a, b) => intervals[a][0] - intervals[b][0]);
  const res = new Array(n);
  for (let i = 0; i < n; i++) {
    const end = intervals[i][1];
    let lo = 0;
    let hi = n;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (intervals[order[mid]][0] >= end) hi = mid;
      else lo = mid + 1;
    }
    res[i] = lo === n ? -1 : order[lo];
  }
  return res;
};

module.exports = { findRightInterval };
