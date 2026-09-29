/**
 * 84. Largest Rectangle in Histogram
 * https://leetcode.com/problems/largest-rectangle-in-histogram/
 * Monotonic increasing stack of bar indices. When a bar is popped, the current index is its right boundary and the new stack top its left boundary, which fixes the widest rectangle using that bar's height.
 */
var largestRectangleArea = function (heights) {
  const stack = []; // indices with increasing heights
  let best = 0;
  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i]; // sentinel flushes the stack
    while (stack.length && heights[stack[stack.length - 1]] >= h) {
      const height = heights[stack.pop()];
      const left = stack.length ? stack[stack.length - 1] : -1;
      best = Math.max(best, height * (i - left - 1));
    }
    stack.push(i);
  }
  return best;
};

module.exports = { largestRectangleArea };
