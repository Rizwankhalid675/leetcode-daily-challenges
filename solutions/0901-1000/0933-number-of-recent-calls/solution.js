/**
 * 933. Number of Recent Calls
 * https://leetcode.com/problems/number-of-recent-calls/
 *
 * Pings arrive in increasing time order, so requests older than t - 3000 can be discarded
 * forever. An array plus a moving head index is an O(1)-amortized queue (Array.shift is O(n)).
 */
var RecentCounter = function () {
  this.times = [];
  this.head = 0;
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
  this.times.push(t);
  while (this.times[this.head] < t - 3000) this.head++;
  return this.times.length - this.head;
};

module.exports = { RecentCounter };
