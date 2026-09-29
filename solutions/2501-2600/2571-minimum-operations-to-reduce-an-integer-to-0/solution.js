/**
 * 2571. Minimum Operations to Reduce an Integer to 0
 * https://leetcode.com/problems/minimum-operations-to-reduce-an-integer-to-0/
 * Greedy on the lowest set bit: a lone 1-bit is removed by subtracting it (one op). A run of 1-bits
 * is turned into a single higher bit by adding the lowest one (one op). Stop at 0.
 */
var minOperations = function (n) {
  let ops = 0;
  while (n > 0) {
    if ((n & 3) === 3) {
      n += 1; // a run of ones: carry it upward
      ops++;
    } else {
      if (n & 1) ops++; // an isolated one: subtract it
      n >>= 1;
    }
  }
  return ops;
};

module.exports = { minOperations };
