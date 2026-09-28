/**
 * 994. Rotting Oranges
 * https://leetcode.com/problems/rotting-oranges/
 *
 * Multi-source BFS: all initially rotten oranges form the first frontier; each minute the
 * frontier rots its fresh neighbours. Count fresh oranges to detect unreachable ones.
 *
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const g = grid.map((row) => [...row]); // don't mutate the input
  let fresh = 0;
  let frontier = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (g[r][c] === 1) fresh++;
      else if (g[r][c] === 2) frontier.push([r, c]);
    }
  }
  let minutes = 0;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (fresh > 0 && frontier.length > 0) {
    const next = [];
    for (const [r, c] of frontier) {
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr < 0 || nr >= m || nc < 0 || nc >= n || g[nr][nc] !== 1) continue;
        g[nr][nc] = 2;
        fresh--;
        next.push([nr, nc]);
      }
    }
    frontier = next;
    minutes++;
  }
  return fresh === 0 ? minutes : -1;
};

module.exports = { orangesRotting };
