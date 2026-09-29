/**
 * 39. Combination Sum
 * https://leetcode.com/problems/combination-sum/
 * Backtracking over sorted candidates with a start index (so each multiset is built in
 * non-decreasing order exactly once); stop a branch as soon as a candidate exceeds the remainder.
 */
var combinationSum = function (candidates, target) {
  const nums = [...candidates].sort((a, b) => a - b);
  const out = [], cur = [];
  const go = (start, remain) => {
    if (remain === 0) {
      out.push(cur.slice());
      return;
    }
    for (let i = start; i < nums.length && nums[i] <= remain; i++) {
      cur.push(nums[i]);
      go(i, remain - nums[i]);
      cur.pop();
    }
  };
  go(0, target);
  return out;
};

module.exports = { combinationSum };
