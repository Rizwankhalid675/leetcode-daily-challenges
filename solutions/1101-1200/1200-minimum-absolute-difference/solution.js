/**
 * 1200. Minimum Absolute Difference
 * https://leetcode.com/problems/minimum-absolute-difference/
 * Sort numerically; the minimum difference only occurs between neighbours. One pass finds it, a second collects the pairs in order.
 */
var minimumAbsDifference = function (arr) {
  arr.sort((a, b) => a - b);
  let best = Infinity;
  for (let i = 1; i < arr.length; i++) best = Math.min(best, arr[i] - arr[i - 1]);
  const res = [];
  for (let i = 1; i < arr.length; i++) if (arr[i] - arr[i - 1] === best) res.push([arr[i - 1], arr[i]]);
  return res;
};

module.exports = { minimumAbsDifference };
