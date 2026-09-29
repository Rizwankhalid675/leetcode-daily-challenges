/**
 * 223. Rectangle Area
 * https://leetcode.com/problems/rectangle-area/
 * Inclusion-exclusion: area A + area B minus the overlap, whose width and height are clamped at 0.
 */
var computeArea = function (ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  const areaA = (ax2 - ax1) * (ay2 - ay1);
  const areaB = (bx2 - bx1) * (by2 - by1);
  const w = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1));
  const h = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1));
  return areaA + areaB - w * h;
};

module.exports = { computeArea };
