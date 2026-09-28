/**
 * 1401. Circle and Rectangle Overlapping
 * https://leetcode.com/problems/circle-and-rectangle-overlapping/
 *
 * The rectangle point closest to the circle's centre is found by clamping the centre into
 * the rectangle on each axis independently. The shapes share a point iff that closest point
 * is within the radius. Compare squared distances to stay in exact integer arithmetic.
 *
 * @param {number} radius
 * @param {number} xCenter
 * @param {number} yCenter
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @return {boolean}
 */
var checkOverlap = function (radius, xCenter, yCenter, x1, y1, x2, y2) {
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const dx = clamp(xCenter, x1, x2) - xCenter;
  const dy = clamp(yCenter, y1, y2) - yCenter;
  return dx * dx + dy * dy <= radius * radius;
};

module.exports = { checkOverlap };
