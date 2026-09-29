/**
 * 292. Nim Game
 * https://leetcode.com/problems/nim-game/
 * Positions that are multiples of 4 are losing: whatever you take (1–3), the opponent restores a multiple of 4. So you win iff n % 4 != 0.
 */
var canWinNim = function (n) {
  return n % 4 !== 0;
};

module.exports = { canWinNim };
