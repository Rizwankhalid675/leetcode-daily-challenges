/**
 * 1545. Find Kth Bit in Nth Binary String
 * https://leetcode.com/problems/find-kth-bit-in-nth-binary-string/
 * S_n = S_{n-1} + "1" + reverse(invert(S_{n-1})). Walk down the levels: the middle is "1", the left
 * half recurses unchanged, the right half mirrors to position len+1-k with a flip.
 */
var findKthBit = function (n, k) {
  let flip = 0;
  let len = (1 << n) - 1;
  while (len > 1) {
    const mid = (len + 1) >> 1;
    if (k === mid) return flip ? '0' : '1';
    if (k > mid) {
      k = len + 1 - k;
      flip ^= 1;
    }
    len = mid - 1;
  }
  return flip ? '1' : '0';
};

module.exports = { findKthBit };
