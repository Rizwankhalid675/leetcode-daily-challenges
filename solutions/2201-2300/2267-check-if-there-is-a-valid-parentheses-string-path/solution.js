/**
 * 2267. Check if There Is a Valid Parentheses String Path
 * https://leetcode.com/problems/check-if-there-is-a-valid-parentheses-string-path/
 *
 * DP over cells with the SET of reachable balances (# of '(' minus # of ')') after the
 * cell. A balance may never go negative, and it must be <= the number of cells still to
 * come (otherwise it can't be closed). Answer: balance 0 reachable at the last cell.
 * Row-rolling Uint8Array sets keep memory at O(n * maxBalance).
 *
 * @param {character[][]} grid
 * @return {boolean}
 */
var hasValidPath = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const len = m + n - 1;
  if (len % 2 === 1 || grid[0][0] === ')' || grid[m - 1][n - 1] === '(') return false;
  const B = (len >> 1) + 1; // balances 0..len/2
  let prev = Array.from({ length: n }, () => new Uint8Array(B));
  for (let r = 0; r < m; r++) {
    const curr = Array.from({ length: n }, () => new Uint8Array(B));
    for (let c = 0; c < n; c++) {
      const delta = grid[r][c] === '(' ? 1 : -1;
      const remaining = m - 1 - r + (n - 1 - c); // cells after this one
      const cell = curr[c];
      const apply = (from) => {
        for (let b = 0; b < B; b++) {
          if (!from[b]) continue;
          const nb = b + delta;
          if (nb >= 0 && nb < B && nb <= remaining) cell[nb] = 1;
        }
      };
      if (r === 0 && c === 0) {
        if (delta === 1 && 1 <= remaining) cell[1] = 1;
        continue;
      }
      if (r > 0) apply(prev[c]);
      if (c > 0) apply(curr[c - 1]);
    }
    prev = curr;
  }
  return prev[n - 1][0] === 1;
};

module.exports = { hasValidPath };
