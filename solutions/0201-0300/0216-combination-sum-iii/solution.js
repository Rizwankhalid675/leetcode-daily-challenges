/**
 * 216. Combination Sum III
 * https://leetcode.com/problems/combination-sum-iii/
 *
 * Backtracking over digits 1..9 in increasing order (so each combination appears once),
 * pruning when the remaining sum becomes negative or too many numbers are chosen.
 *
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  const result = [];
  const path = [];
  const backtrack = (start, remaining) => {
    if (path.length === k) {
      if (remaining === 0) result.push([...path]);
      return;
    }
    for (let d = start; d <= 9 && d <= remaining; d++) {
      path.push(d);
      backtrack(d + 1, remaining - d);
      path.pop();
    }
  };
  backtrack(1, n);
  return result;
};

module.exports = { combinationSum3 };
