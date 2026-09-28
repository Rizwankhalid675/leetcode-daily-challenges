/**
 * 1318. Minimum Flips to Make a OR b Equal to c
 * https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/
 *
 * Bits are independent. For each bit position:
 *   c bit = 1: need at least one of a, b set -> 1 flip if both are 0, else 0.
 *   c bit = 0: both must be 0 -> flip each one that is set (0, 1 or 2 flips).
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var minFlips = function (a, b, c) {
  let flips = 0;
  while (a > 0 || b > 0 || c > 0) {
    const x = a & 1;
    const y = b & 1;
    const z = c & 1;
    if (z === 1) flips += x | y ? 0 : 1;
    else flips += x + y;
    a >>= 1;
    b >>= 1;
    c >>= 1;
  }
  return flips;
};

module.exports = { minFlips };
