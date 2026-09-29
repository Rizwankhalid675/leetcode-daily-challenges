/**
 * 352. Data Stream as Disjoint Intervals
 * https://leetcode.com/problems/data-stream-as-disjoint-intervals/
 * Keep a sorted list of disjoint, non-touching intervals. Binary-search the value, then either ignore it, extend the left or right neighbour, bridge both, or insert a new single-point interval.
 */
var SummaryRanges = function () {
  this.iv = []; // sorted, disjoint, never adjacent: [start, end]
};
SummaryRanges.prototype.addNum = function (value) {
  const iv = this.iv;
  let lo = 0;
  let hi = iv.length;
  while (lo < hi) {
    const m = (lo + hi) >> 1;
    if (iv[m][0] <= value) lo = m + 1;
    else hi = m;
  }
  // lo = first interval starting after value; lo - 1 = last one starting at or before it
  const i = lo - 1;
  if (i >= 0 && iv[i][1] >= value) return;
  const joinLeft = i >= 0 && iv[i][1] === value - 1;
  const joinRight = lo < iv.length && iv[lo][0] === value + 1;
  if (joinLeft && joinRight) {
    iv[i][1] = iv[lo][1];
    iv.splice(lo, 1);
  } else if (joinLeft) iv[i][1] = value;
  else if (joinRight) iv[lo][0] = value;
  else iv.splice(lo, 0, [value, value]);
};
SummaryRanges.prototype.getIntervals = function () {
  return this.iv.map((p) => [p[0], p[1]]);
};

module.exports = { SummaryRanges };
