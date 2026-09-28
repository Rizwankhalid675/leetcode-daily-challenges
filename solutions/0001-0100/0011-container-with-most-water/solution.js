/**
 * 11. Container With Most Water
 * https://leetcode.com/problems/container-with-most-water/
 *
 * Two pointers from both ends. The area is limited by the shorter line, so moving the
 * taller line inward can never help (width shrinks, height stays capped). Always move
 * the shorter one.
 *
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let lo = 0;
  let hi = height.length - 1;
  let best = 0;
  while (lo < hi) {
    const area = (hi - lo) * Math.min(height[lo], height[hi]);
    if (area > best) best = area;
    if (height[lo] < height[hi]) lo++;
    else hi--;
  }
  return best;
};

module.exports = { maxArea };
