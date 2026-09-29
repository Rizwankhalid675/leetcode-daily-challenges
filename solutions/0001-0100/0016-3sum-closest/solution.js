/**
 * 16. 3Sum Closest
 * https://leetcode.com/problems/3sum-closest/
 * Sort, fix the first element, then close in with two pointers on the rest, keeping the sum
 * nearest to target. Exact hit returns immediately.
 */
var threeSumClosest = function (nums, target) {
  const a = [...nums].sort((x, y) => x - y);
  const n = a.length;
  let best = a[0] + a[1] + a[2];
  for (let i = 0; i < n - 2; i++) {
    if (i > 0 && a[i] === a[i - 1]) continue;
    let lo = i + 1, hi = n - 1;
    while (lo < hi) {
      const sum = a[i] + a[lo] + a[hi];
      if (Math.abs(sum - target) < Math.abs(best - target)) best = sum;
      if (sum === target) return sum;
      if (sum < target) lo++;
      else hi--;
    }
  }
  return best;
};

module.exports = { threeSumClosest };
