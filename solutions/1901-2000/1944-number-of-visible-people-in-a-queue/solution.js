/**
 * 1944. Number of Visible People in a Queue
 * https://leetcode.com/problems/number-of-visible-people-in-a-queue/
 * Right-to-left monotonic stack (decreasing heights). Each shorter person popped is visible to
 * the current one; if someone taller remains on the stack, they are visible too.
 */
var canSeePersonsCount = function (heights) {
  const n = heights.length;
  const ans = new Array(n).fill(0);
  const stack = [];
  for (let i = n - 1; i >= 0; i--) {
    let seen = 0;
    while (stack.length && stack[stack.length - 1] < heights[i]) {
      stack.pop();
      seen++;
    }
    if (stack.length) seen++;
    ans[i] = seen;
    stack.push(heights[i]);
  }
  return ans;
};

module.exports = { canSeePersonsCount };
