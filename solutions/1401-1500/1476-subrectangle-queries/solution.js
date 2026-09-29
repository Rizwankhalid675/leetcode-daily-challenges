/**
 * 1476. Subrectangle Queries
 * https://leetcode.com/problems/subrectangle-queries/
 * Record updates instead of applying them. getValue scans the update log from newest to oldest and returns the first update covering the cell, or the original value.
 */
var SubrectangleQueries = function (rectangle) {
  this.rect = rectangle;
  this.updates = []; // [row1, col1, row2, col2, value] in time order
};
SubrectangleQueries.prototype.updateSubrectangle = function (row1, col1, row2, col2, newValue) {
  this.updates.push([row1, col1, row2, col2, newValue]);
};
SubrectangleQueries.prototype.getValue = function (row, col) {
  for (let i = this.updates.length - 1; i >= 0; i--) {
    const u = this.updates[i];
    if (u[0] <= row && row <= u[2] && u[1] <= col && col <= u[3]) return u[4];
  }
  return this.rect[row][col];
};

module.exports = { SubrectangleQueries };
