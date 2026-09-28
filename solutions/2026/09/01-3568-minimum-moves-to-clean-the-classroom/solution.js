/**
 * 3568. Minimum Moves to Clean the Classroom
 * https://leetcode.com/problems/minimum-moves-to-clean-the-classroom/
 *
 * BFS over states (cell, collected-litter bitmask, energy left). BFS explores states in
 * order of moves, so the first time the mask is full we have the minimum. A state is
 * dominated if the same (cell, mask) was already reached with at least as much energy.
 *
 * @param {string[]} classroom
 * @param {number} energy
 * @return {number}
 */
var minMoves = function (classroom, energy) {
  const m = classroom.length;
  const n = classroom[0].length;
  const litterId = new Int32Array(m * n).fill(-1);
  let litterCount = 0;
  let start = -1;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      const ch = classroom[r][c];
      if (ch === 'L') litterId[r * n + c] = litterCount++;
      else if (ch === 'S') start = r * n + c;
    }
  }
  const full = (1 << litterCount) - 1;
  if (full === 0) return 0;

  const masks = 1 << litterCount;
  // bestEnergy[cell * masks + mask] = most energy seen on arrival, -1 = unseen
  const bestEnergy = new Int8Array(m * n * masks).fill(-1);
  bestEnergy[start * masks] = energy;

  let queue = [[start, 0, energy]];
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];
  for (let moves = 1; queue.length > 0; moves++) {
    const next = [];
    for (const [cell, mask, e] of queue) {
      if (e === 0) continue; // out of energy and not on a reset cell
      const r = (cell / n) | 0;
      const c = cell % n;
      for (let d = 0; d < 4; d++) {
        const nr = r + dr[d];
        const nc = c + dc[d];
        if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
        const ch = classroom[nr][nc];
        if (ch === 'X') continue;
        const ncell = nr * n + nc;
        const ne = ch === 'R' ? energy : e - 1;
        const nmask = litterId[ncell] >= 0 ? mask | (1 << litterId[ncell]) : mask;
        if (nmask === full) return moves;
        const key = ncell * masks + nmask;
        if (bestEnergy[key] >= ne) continue;
        bestEnergy[key] = ne;
        next.push([ncell, nmask, ne]);
      }
    }
    queue = next;
  }
  return -1;
};

module.exports = { minMoves };
