/**
 * 289. Game of Life
 * https://leetcode.com/problems/game-of-life/
 *
 * In place with two bits per cell: bit 0 = current state, bit 1 = next state.
 * Neighbour counts read only bit 0, so updates don't disturb later cells; a final pass
 * shifts every cell right by one.
 *
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function (board) {
  const m = board.length;
  const n = board[0].length;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      let live = 0;
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < m && nc >= 0 && nc < n) live += board[nr][nc] & 1;
        }
      const alive = board[r][c] & 1;
      if ((alive && (live === 2 || live === 3)) || (!alive && live === 3)) board[r][c] |= 2;
    }
  }
  for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) board[r][c] >>= 1;
};

module.exports = { gameOfLife };
