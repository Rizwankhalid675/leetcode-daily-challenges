/**
 * 836. Rectangle Overlap
 * https://leetcode.com/problems/rectangle-overlap/
 *
 * Two axis-aligned rectangles overlap with positive area exactly when their projections
 * overlap with positive length on BOTH axes. On one axis, [a1, a2] and [b1, b2] overlap
 * with positive length iff max(a1, b1) < min(a2, b2).
 *
 * @param {number[]} rec1
 * @param {number[]} rec2
 * @return {boolean}
 */
var isRectangleOverlap = function (rec1, rec2) {
  const [ax1, ay1, ax2, ay2] = rec1;
  const [bx1, by1, bx2, by2] = rec2;
  const xOverlap = Math.max(ax1, bx1) < Math.min(ax2, bx2);
  const yOverlap = Math.max(ay1, by1) < Math.min(ay2, by2);
  return xOverlap && yOverlap;
};

module.exports = { isRectangleOverlap };
