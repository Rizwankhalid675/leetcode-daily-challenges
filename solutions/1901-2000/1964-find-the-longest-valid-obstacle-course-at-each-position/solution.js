/**
 * 1964. Find the Longest Valid Obstacle Course at Each Position
 * https://leetcode.com/problems/find-the-longest-valid-obstacle-course-at-each-position/
 * Longest non-decreasing subsequence ending at each index via patience tails: upper-bound binary search for the first tail strictly greater than the height; its position + 1 is the answer.
 */
var longestObstacleCourseAtEachPosition = function (obstacles) {
  const n = obstacles.length;
  const tails = [];
  const ans = new Array(n);
  for (let i = 0; i < n; i++) {
    const h = obstacles[i];
    let lo = 0, hi = tails.length; // first tail > h
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] <= h) lo = mid + 1; else hi = mid;
    }
    tails[lo] = h;
    ans[i] = lo + 1;
  }
  return ans;
};

module.exports = { longestObstacleCourseAtEachPosition };
