/**
 * 673. Number of Longest Increasing Subsequence
 * https://leetcode.com/problems/number-of-longest-increasing-subsequence/
 * O(n²) DP keeping, for each index, the LIS length ending there and how many such subsequences exist; sum counts at the global max length.
 */
var findNumberOfLIS = function (nums) {
  const n = nums.length;
  const len = new Array(n).fill(1);
  const cnt = new Array(n).fill(1);
  let best = 0, total = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] >= nums[i]) continue;
      if (len[j] + 1 > len[i]) { len[i] = len[j] + 1; cnt[i] = cnt[j]; }
      else if (len[j] + 1 === len[i]) cnt[i] += cnt[j];
    }
    if (len[i] > best) { best = len[i]; total = cnt[i]; }
    else if (len[i] === best) total += cnt[i];
  }
  return total;
};

module.exports = { findNumberOfLIS };
