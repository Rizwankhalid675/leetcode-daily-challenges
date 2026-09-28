/**
 * 790. Domino and Tromino Tiling
 * https://leetcode.com/problems/domino-and-tromino-tiling/
 *
 * Let f(n) = number of tilings of a full 2 x n board. Derivation (see NOTES):
 *   f(n) = 2 f(n-1) + f(n-3),  with f(0) = 1, f(1) = 1, f(2) = 2.
 * Computed iteratively modulo 1e9+7 (all intermediate values stay far below 2^53).
 *
 * @param {number} n
 * @return {number}
 */
var numTilings = function (n) {
  const MOD = 1_000_000_007;
  const f = [1, 1, 2];
  for (let i = 3; i <= n; i++) f[i] = (2 * f[i - 1] + f[i - 3]) % MOD;
  return f[n];
};

module.exports = { numTilings };
