/**
 * 2073. Time Needed to Buy Tickets
 * https://leetcode.com/problems/time-needed-to-buy-tickets/
 * Closed form: people at or before k buy min(t[i], t[k]) tickets before k finishes; people after k buy min(t[i], t[k] - 1).
 */
var timeRequiredToBuy = function (tickets, k) {
  let time = 0;
  for (let i = 0; i < tickets.length; i++) {
    time += Math.min(tickets[i], i <= k ? tickets[k] : tickets[k] - 1);
  }
  return time;
};

module.exports = { timeRequiredToBuy };
