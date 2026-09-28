/**
 * 435. Non-overlapping Intervals
 * https://leetcode.com/problems/non-overlapping-intervals/
 *
 * Keep the maximum number of non-overlapping intervals (classic activity selection:
 * sort by end, greedily keep each interval that starts at or after the last kept end);
 * removals = total - kept. Touching endpoints do not overlap here.
 *
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
  const sorted = [...intervals].sort((a, b) => a[1] - b[1]);
  let kept = 0;
  let lastEnd = -Infinity;
  for (const [start, end] of sorted) {
    if (start >= lastEnd) {
      kept++;
      lastEnd = end;
    }
  }
  return intervals.length - kept;
};

module.exports = { eraseOverlapIntervals };
