/**
 * 57. Insert Interval
 * https://leetcode.com/problems/insert-interval/
 *
 * Intervals are sorted and disjoint. Three phases: copy those ending before the new one
 * starts; merge every interval overlapping it (sharing a point counts); copy the rest.
 *
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  const out = [];
  let [start, end] = newInterval;
  let i = 0;
  const n = intervals.length;
  while (i < n && intervals[i][1] < start) out.push(intervals[i++]);
  while (i < n && intervals[i][0] <= end) {
    start = Math.min(start, intervals[i][0]);
    end = Math.max(end, intervals[i][1]);
    i++;
  }
  out.push([start, end]);
  while (i < n) out.push(intervals[i++]);
  return out;
};

module.exports = { insert };
