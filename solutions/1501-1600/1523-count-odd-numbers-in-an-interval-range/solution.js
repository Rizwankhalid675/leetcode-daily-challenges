/**
 * 1523. Count Odd Numbers in an Interval Range
 * https://leetcode.com/problems/count-odd-numbers-in-an-interval-range/
 * Odd numbers in [0, x] number floor((x + 1) / 2); the answer is that count for high minus the count below low.
 */
var countOdds = function (low, high) {
  return Math.floor((high + 1) / 2) - Math.floor(low / 2);
};

module.exports = { countOdds };
