/**
 * 374. Guess Number Higher or Lower
 * https://leetcode.com/problems/guess-number-higher-or-lower/
 *
 * Binary search on [1, n] using the provided guess() API.
 * guess(num): -1 if num > pick, 1 if num < pick, 0 if equal. (Defined by LeetCode globally.)
 *
 * @param {number} n
 * @return {number}
 */
var guessNumber = function (n) {
  let lo = 1;
  let hi = n;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2); // n can be 2^31 - 1; avoid >> on large sums
    const res = guess(mid);
    if (res === 0) return mid;
    if (res < 0) hi = mid - 1;
    else lo = mid + 1;
  }
  return -1; // unreachable for valid input
};

module.exports = { guessNumber };
