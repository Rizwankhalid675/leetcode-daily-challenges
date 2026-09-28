/**
 * 3870. Count Commas in Range
 * https://leetcode.com/problems/count-commas-in-range/
 *
 * A number with d digits is written with floor((d - 1) / 3) commas. With n <= 1e5 we can
 * simply add that up for every number in [1, n].
 *
 * @param {number} n
 * @return {number}
 */
var countCommas = function (n) {
  let total = 0;
  for (let x = 1; x <= n; x++) {
    const digits = String(x).length;
    total += Math.floor((digits - 1) / 3);
  }
  return total;
};

module.exports = { countCommas };
