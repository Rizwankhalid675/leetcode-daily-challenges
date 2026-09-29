/**
 * 371. Sum of Two Integers
 * https://leetcode.com/problems/sum-of-two-integers/
 * Adder loop: XOR gives the sum without carries, (a & b) << 1 gives the carries; repeat until no carry. JS 32-bit ops make negatives terminate (the carry shifts out after 32 steps).
 */
var getSum = function (a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
};

module.exports = { getSum };
