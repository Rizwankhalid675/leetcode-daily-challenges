/**
 * 45. Jump Game II
 * https://leetcode.com/problems/jump-game-ii/
 *
 * Implicit BFS by layers: indices reachable with j jumps form a contiguous range
 * [start, end]. The next layer ends at the farthest index reachable from that range.
 * Count layers until the range covers the last index.
 *
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let jumps = 0;
  let layerEnd = 0; // last index reachable with `jumps` jumps
  let farthest = 0; // farthest index reachable with `jumps + 1` jumps
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === layerEnd) {
      jumps++;
      layerEnd = farthest;
    }
  }
  return jumps;
};

module.exports = { jump };
