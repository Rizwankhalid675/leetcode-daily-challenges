/**
 * 883. Projection Area of 3D Shapes
 * https://leetcode.com/problems/projection-area-of-3d-shapes/
 * Top view counts nonzero cells, front view sums each row maximum, side view sums each column maximum.
 */
var projectionArea = function (grid) {
  const n = grid.length;
  let area = 0;
  for (let i = 0; i < n; i++) {
    let rowMax = 0;
    let colMax = 0;
    for (let j = 0; j < n; j++) {
      if (grid[i][j] > 0) area++;
      rowMax = Math.max(rowMax, grid[i][j]);
      colMax = Math.max(colMax, grid[j][i]);
    }
    area += rowMax + colMax;
  }
  return area;
};

module.exports = { projectionArea };
