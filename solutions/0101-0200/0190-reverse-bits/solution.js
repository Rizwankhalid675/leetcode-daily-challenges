/**
 * 190. Reverse Bits
 * https://leetcode.com/problems/reverse-bits/
 * Shift 32 times: move the lowest bit of n onto the result and shift n right (unsigned). Return
 * result >>> 0 so bit 31 set still gives a non-negative number.
 */
var reverseBits = function (n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n >>>= 1;
  }
  return result >>> 0;
};

module.exports = { reverseBits };
