/**
 * 983. Minimum Cost For Tickets
 * https://leetcode.com/problems/minimum-cost-for-tickets/
 * DP over calendar days 1..last: a non-travel day costs nothing extra; a travel day is covered by the cheapest of a 1-, 7- or 30-day pass ending there.
 */
var mincostTickets = function (days, costs) {
  const last = days[days.length - 1];
  const travel = new Uint8Array(last + 1);
  for (const d of days) travel[d] = 1;
  const dp = new Array(last + 1).fill(0);
  for (let d = 1; d <= last; d++) {
    if (!travel[d]) { dp[d] = dp[d - 1]; continue; }
    dp[d] = Math.min(
      dp[d - 1] + costs[0],
      dp[Math.max(0, d - 7)] + costs[1],
      dp[Math.max(0, d - 30)] + costs[2],
    );
  }
  return dp[last];
};

module.exports = { mincostTickets };
