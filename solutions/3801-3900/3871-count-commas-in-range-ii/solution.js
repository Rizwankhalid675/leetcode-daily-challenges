/**
 * 3871. Count Commas in Range II
 * https://leetcode.com/problems/count-commas-in-range-ii/
 *
 * Flip the counting around: instead of asking "how many commas does x have", ask "how
 * many numbers in [1, n] have at least c commas". A number has at least c commas exactly
 * when it is >= 10^(3c), so each threshold contributes max(0, n - 10^(3c) + 1).
 * Summing over c = 1, 2, ... counts every comma exactly once.
 *
 * n <= 1e15 < 2^53, so every value here is an exactly representable JS number.
 *
 * @param {number} n
 * @return {number}
 */
var countCommas = function (n) {
  let total = 0;
  for (let threshold = 1000; threshold <= n; threshold *= 1000) {
    total += n - threshold + 1;
  }
  return total;
};

module.exports = { countCommas };
