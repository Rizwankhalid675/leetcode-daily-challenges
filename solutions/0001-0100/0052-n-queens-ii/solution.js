/**
 * 52. N-Queens II
 * https://leetcode.com/problems/n-queens-ii/
 * Row-by-row backtracking with three bitmasks (columns, and the two diagonal directions shifted each
 * row); the free squares in a row are the zero bits of their OR.
 */
var totalNQueens = function (n) {
  const full = (1 << n) - 1;
  const go = (cols, diagL, diagR) => {
    if (cols === full) return 1;
    let count = 0;
    let free = full & ~(cols | diagL | diagR);
    while (free) {
      const bit = free & -free;
      free ^= bit;
      count += go(cols | bit, ((diagL | bit) << 1) & full, (diagR | bit) >> 1);
    }
    return count;
  };
  return go(0, 0, 0);
};

module.exports = { totalNQueens };
