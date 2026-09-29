/**
 * 646. Maximum Length of Pair Chain
 * https://leetcode.com/problems/maximum-length-of-pair-chain/
 * Greedy by right endpoint (activity selection): sort by right end and take every pair whose left end is beyond the last taken right end.
 */
var findLongestChain = function (pairs) {
  const p = pairs.slice().sort((x, y) => x[1] - y[1]);
  let count = 0, end = -Infinity;
  for (const [l, r] of p) {
    if (l > end) { count++; end = r; }
  }
  return count;
};

module.exports = { findLongestChain };
