/**
 * 452. Minimum Number of Arrows to Burst Balloons
 * https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/
 *
 * Sort balloons by right edge. Shoot an arrow at the right edge of the first balloon not
 * yet burst; it bursts every balloon starting at or before that x (edges are inclusive).
 *
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function (points) {
  const sorted = [...points].sort((a, b) => a[1] - b[1]); // JS numbers: no int overflow in a - b
  let arrows = 0;
  let arrowX = -Infinity;
  for (const [start, end] of sorted) {
    if (start > arrowX) {
      arrows++;
      arrowX = end;
    }
  }
  return arrows;
};

module.exports = { findMinArrowShots };
