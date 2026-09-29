/**
 * 200. Number of Islands
 * https://leetcode.com/problems/number-of-islands/
 * Scan every cell; each unvisited land cell starts a new island, flooded with an explicit stack
 * (iterative, so a 300x300 all-land grid cannot overflow the call stack).
 */
var numIslands = function (grid) {
  const m = grid.length, n = grid[0].length;
  const seen = new Uint8Array(m * n);
  const stack = [];
  let islands = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] !== '1' || seen[r * n + c]) continue;
      islands++;
      seen[r * n + c] = 1;
      stack.push(r * n + c);
      while (stack.length) {
        const id = stack.pop();
        const x = (id / n) | 0, y = id % n;
        if (x > 0 && grid[x - 1][y] === '1' && !seen[id - n]) { seen[id - n] = 1; stack.push(id - n); }
        if (x < m - 1 && grid[x + 1][y] === '1' && !seen[id + n]) { seen[id + n] = 1; stack.push(id + n); }
        if (y > 0 && grid[x][y - 1] === '1' && !seen[id - 1]) { seen[id - 1] = 1; stack.push(id - 1); }
        if (y < n - 1 && grid[x][y + 1] === '1' && !seen[id + 1]) { seen[id + 1] = 1; stack.push(id + 1); }
      }
    }
  }
  return islands;
};

module.exports = { numIslands };
