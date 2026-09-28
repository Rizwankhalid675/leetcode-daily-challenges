/**
 * 1926. Nearest Exit from Entrance in Maze
 * https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/
 *
 * BFS from the entrance over empty cells; the first border cell reached (other than the
 * entrance itself) is the nearest exit. BFS explores in order of distance.
 *
 * @param {character[][]} maze
 * @param {number[]} entrance
 * @return {number}
 */
var nearestExit = function (maze, entrance) {
  const m = maze.length;
  const n = maze[0].length;
  const [sr, sc] = entrance;
  const seen = Array.from({ length: m }, () => new Array(n).fill(false));
  seen[sr][sc] = true;
  let frontier = [[sr, sc]];
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  for (let steps = 1; frontier.length > 0; steps++) {
    const next = [];
    for (const [r, c] of frontier) {
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr < 0 || nr >= m || nc < 0 || nc >= n || seen[nr][nc] || maze[nr][nc] === '+') continue;
        if (nr === 0 || nr === m - 1 || nc === 0 || nc === n - 1) return steps;
        seen[nr][nc] = true;
        next.push([nr, nc]);
      }
    }
    frontier = next;
  }
  return -1;
};

module.exports = { nearestExit };
