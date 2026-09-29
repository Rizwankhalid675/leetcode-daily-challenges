/**
 * 909. Snakes and Ladders
 * https://leetcode.com/problems/snakes-and-ladders/
 * Flatten the boustrophedon board into jump[label], then BFS over squares 1..n^2 where each die roll
 * (1-6) moves forward and follows at most one snake or ladder at the landing square.
 */
var snakesAndLadders = function (board) {
  const n = board.length, target = n * n;
  const jump = new Int32Array(target + 1);
  let label = 1;
  for (let r = n - 1, leftToRight = true; r >= 0; r--, leftToRight = !leftToRight) {
    for (let k = 0; k < n; k++) jump[label++] = board[r][leftToRight ? k : n - 1 - k];
  }
  const dist = new Int32Array(target + 1).fill(-1);
  dist[1] = 0;
  const queue = [1];
  for (let head = 0; head < queue.length; head++) {
    const s = queue[head];
    if (s === target) return dist[s];
    for (let d = 1; d <= 6 && s + d <= target; d++) {
      let next = s + d;
      if (jump[next] !== -1) next = jump[next];
      if (dist[next] === -1) {
        dist[next] = dist[s] + 1;
        queue.push(next);
      }
    }
  }
  return -1;
};

module.exports = { snakesAndLadders };
