/**
 * 128. Longest Consecutive Sequence
 * https://leetcode.com/problems/longest-consecutive-sequence/
 *
 * Put everything in a Set. Only start counting from values that begin a run (x - 1 not
 * present); each run is then walked exactly once, giving O(n) overall.
 *
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  const set = new Set(nums);
  let best = 0;
  for (const x of set) {
    if (set.has(x - 1)) continue; // not the start of a run
    let len = 1;
    while (set.has(x + len)) len++;
    if (len > best) best = len;
  }
  return best;
};

module.exports = { longestConsecutive };
