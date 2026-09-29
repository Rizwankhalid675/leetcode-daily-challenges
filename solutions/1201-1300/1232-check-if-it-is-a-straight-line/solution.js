/**
 * 1232. Check If It Is a Straight Line
 * https://leetcode.com/problems/check-if-it-is-a-straight-line/
 * Every point must be collinear with the first two: the cross product (p1 − p0) × (pi − p0) must be 0. Integer arithmetic, no division.
 */
var checkStraightLine = function (coordinates) {
  const [x0, y0] = coordinates[0];
  const dx = coordinates[1][0] - x0, dy = coordinates[1][1] - y0;
  for (let i = 2; i < coordinates.length; i++) {
    const [x, y] = coordinates[i];
    if (dx * (y - y0) !== dy * (x - x0)) return false;
  }
  return true;
};

module.exports = { checkStraightLine };
