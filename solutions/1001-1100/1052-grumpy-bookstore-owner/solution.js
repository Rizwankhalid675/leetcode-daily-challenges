/**
 * 1052. Grumpy Bookstore Owner
 * https://leetcode.com/problems/grumpy-bookstore-owner/
 * Base = customers already satisfied (not grumpy). Slide a window of length `minutes` to find the
 * largest extra gain from grumpy minutes covered by the technique.
 */
var maxSatisfied = function (customers, grumpy, minutes) {
  let base = 0, gain = 0, bestGain = 0;
  for (let i = 0; i < customers.length; i++) {
    if (grumpy[i] === 0) base += customers[i];
    else gain += customers[i];
    if (i >= minutes && grumpy[i - minutes] === 1) gain -= customers[i - minutes];
    if (gain > bestGain) bestGain = gain;
  }
  return base + bestGain;
};

module.exports = { maxSatisfied };
