/**
 * 1015. Smallest Integer Divisible by K
 * https://leetcode.com/problems/smallest-integer-divisible-by-k/
 * Track only the remainder of 11...1 mod k (r = (10r + 1) mod k). Multiples of 2 or 5 never work; otherwise a zero remainder appears within k steps (pigeonhole).
 */
var smallestRepunitDivByK = function (k) {
  if (k % 2 === 0 || k % 5 === 0) return -1;
  let r = 0;
  for (let len = 1; len <= k; len++) {
    r = (r * 10 + 1) % k;
    if (r === 0) return len;
  }
  return -1;
};

module.exports = { smallestRepunitDivByK };
