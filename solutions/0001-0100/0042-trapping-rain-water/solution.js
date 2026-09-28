/**
 * 42. Trapping Rain Water
 * https://leetcode.com/problems/trapping-rain-water/
 *
 * Water above bar i = min(maxLeft(i), maxRight(i)) - height[i]. Two pointers: the side
 * with the smaller running max is bounded by that max (the other side has something at
 * least as tall), so its water is known exactly; process that side and move inward.
 *
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let lo = 0;
  let hi = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;
  while (lo < hi) {
    leftMax = Math.max(leftMax, height[lo]);
    rightMax = Math.max(rightMax, height[hi]);
    if (leftMax <= rightMax) {
      water += leftMax - height[lo];
      lo++;
    } else {
      water += rightMax - height[hi];
      hi--;
    }
  }
  return water;
};

module.exports = { trap };
