/**
 * 56. Merge Intervals
 * https://leetcode.com/problems/merge-intervals/
 *
 * Sort by start; extend the last merged interval while the next one starts at or before
 * its end (touching intervals merge), otherwise start a new one.
 *
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const out = [];
  for (const [start, end] of sorted) {
    const last = out[out.length - 1];
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else out.push([start, end]);
  }
  return out;
};

module.exports = { merge };
