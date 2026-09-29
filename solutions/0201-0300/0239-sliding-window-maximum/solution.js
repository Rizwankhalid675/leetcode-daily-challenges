/**
 * 239. Sliding Window Maximum
 * https://leetcode.com/problems/sliding-window-maximum/
 * Monotonic deque of indices (values decreasing) stored in a typed array with head/tail pointers: pop smaller values from the tail, expire the head when it leaves the window; the head is the window max.
 */
var maxSlidingWindow = function (nums, k) {
  const n = nums.length;
  const dq = new Int32Array(n);
  const res = new Array(n - k + 1);
  let head = 0, tail = 0;
  for (let i = 0; i < n; i++) {
    while (tail > head && nums[dq[tail - 1]] <= nums[i]) tail--;
    dq[tail++] = i;
    if (dq[head] <= i - k) head++;
    if (i >= k - 1) res[i - k + 1] = nums[dq[head]];
  }
  return res;
};

module.exports = { maxSlidingWindow };
