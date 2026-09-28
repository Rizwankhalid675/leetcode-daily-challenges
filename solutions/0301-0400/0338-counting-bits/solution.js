/**
 * 338. Counting Bits
 * https://leetcode.com/problems/counting-bits/
 *
 * i >> 1 drops the lowest bit of i, and i & 1 is that bit, so
 * bits(i) = bits(i >> 1) + (i & 1): one pass, O(1) per number, no built-in popcount.
 *
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  const ans = new Array(n + 1);
  ans[0] = 0;
  for (let i = 1; i <= n; i++) ans[i] = ans[i >> 1] + (i & 1);
  return ans;
};

module.exports = { countBits };
