/**
 * 976. Largest Perimeter Triangle
 * https://leetcode.com/problems/largest-perimeter-triangle/
 * Sort descending; the first three consecutive sides with a[i] < a[i+1] + a[i+2] give the largest perimeter.
 */
var largestPerimeter = function (nums) {
  const a = nums.slice().sort((x, y) => y - x);
  for (let i = 0; i + 2 < a.length; i++) {
    if (a[i] < a[i + 1] + a[i + 2]) return a[i] + a[i + 1] + a[i + 2];
  }
  return 0;
};

module.exports = { largestPerimeter };
