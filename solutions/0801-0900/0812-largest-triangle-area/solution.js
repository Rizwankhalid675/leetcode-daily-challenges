/**
 * 812. Largest Triangle Area
 * https://leetcode.com/problems/largest-triangle-area/
 * Try every triple (n <= 50) and take the largest shoelace area |cross product| / 2.
 */
var largestTriangleArea = function (points) {
  const n = points.length;
  let best = 0;
  for (let i = 0; i < n; i++) {
    const [x1, y1] = points[i];
    for (let j = i + 1; j < n; j++) {
      const [x2, y2] = points[j];
      for (let k = j + 1; k < n; k++) {
        const [x3, y3] = points[k];
        const twice = Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));
        if (twice > best) best = twice;
      }
    }
  }
  return best / 2;
};

module.exports = { largestTriangleArea };
