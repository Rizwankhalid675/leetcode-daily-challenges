/**
 * 485. Max Consecutive Ones
 * https://leetcode.com/problems/max-consecutive-ones/
 * Single pass counting the current run of ones and tracking the longest.
 */
var findMaxConsecutiveOnes = function (nums) {
  let run = 0;
  let best = 0;
  for (const x of nums) {
    run = x === 1 ? run + 1 : 0;
    if (run > best) best = run;
  }
  return best;
};

module.exports = { findMaxConsecutiveOnes };
