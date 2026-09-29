/**
 * 1275. Find Winner on a Tic Tac Toe Game
 * https://leetcode.com/problems/find-winner-on-a-tic-tac-toe-game/
 * Signed counters per row, column and both diagonals (+1 for A, −1 for B); reaching ±3 declares a winner, else Draw at 9 moves or Pending.
 */
var tictactoe = function (moves) {
  const rows = [0, 0, 0], cols = [0, 0, 0];
  let diag = 0, anti = 0;
  for (let i = 0; i < moves.length; i++) {
    const [r, c] = moves[i];
    const v = i % 2 === 0 ? 1 : -1;
    rows[r] += v;
    cols[c] += v;
    if (r === c) diag += v;
    if (r + c === 2) anti += v;
    if (Math.abs(rows[r]) === 3 || Math.abs(cols[c]) === 3 || Math.abs(diag) === 3 || Math.abs(anti) === 3) return v === 1 ? 'A' : 'B';
  }
  return moves.length === 9 ? 'Draw' : 'Pending';
};

module.exports = { tictactoe };
