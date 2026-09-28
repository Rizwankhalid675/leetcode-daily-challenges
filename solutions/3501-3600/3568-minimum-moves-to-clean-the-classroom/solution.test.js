const test = require('node:test');
const assert = require('node:assert');
const { minMoves } = require('./solution');

test('official examples', () => {
  assert.strictEqual(minMoves(['S.', 'XL'], 2), 2);
  assert.strictEqual(minMoves(['LS', 'RL'], 4), 3);
  assert.strictEqual(minMoves(['L.S', 'RXL'], 3), -1);
});

test('edge cases', () => {
  assert.strictEqual(minMoves(['S'], 1), 0); // no litter
  assert.strictEqual(minMoves(['SL'], 1), 1); // arriving with 0 energy still collects
  assert.strictEqual(minMoves(['S.L'], 1), -1); // runs out one cell short
  assert.strictEqual(minMoves(['SRL'], 1), 2); // reset cell refills energy
  assert.strictEqual(minMoves(['SXL'], 50), -1); // walled off
  // a less-direct route that passes a reset cell is the only feasible one
  assert.strictEqual(minMoves(['S..L', 'R...'], 2), -1);
  assert.strictEqual(minMoves(['S.L', 'R..'], 1), -1);
});

test('stress: 20x20 grid, 10 litter, energy 50', () => {
  const rows = [];
  for (let r = 0; r < 20; r++) rows.push(Array(20).fill('.'));
  rows[0][0] = 'S';
  const spots = [[19, 19], [0, 19], [19, 0], [10, 10], [5, 15], [15, 5], [3, 3], [17, 12], [8, 1], [1, 8]];
  for (const [r, c] of spots) rows[r][c] = 'L';
  const grid = rows.map((x) => x.join(''));

  // Without reset cells, energy 50 is not enough to sweep the whole room.
  assert.strictEqual(minMoves(grid, 50), -1);

  // Scatter reset cells so the sweep becomes feasible at the maximum grid/litter/energy size.
  const t0 = Date.now();
  const withResets = grid.map((row, r) =>
    row.split('').map((ch, c) => (ch === '.' && r % 4 === 2 && c % 4 === 2 ? 'R' : ch)).join(''),
  );
  const ans2 = minMoves(withResets, 50);
  assert.ok(ans2 > 0, 'resets make it feasible');
  assert.ok(Date.now() - t0 < 3000, 'too slow');
});

// Independent reference: plain BFS over full (cell, mask, energy) states, without the
// energy-dominance pruning used in the solution.
function reference(classroom, energy) {
  const m = classroom.length, n = classroom[0].length;
  const ids = new Map();
  let s = null;
  for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) {
    if (classroom[r][c] === 'L') ids.set(r * n + c, ids.size);
    if (classroom[r][c] === 'S') s = [r, c];
  }
  const full = (1 << ids.size) - 1;
  if (full === 0) return 0;
  const seen = new Set([`${s[0]},${s[1]},0,${energy}`]);
  let q = [[s[0], s[1], 0, energy]];
  for (let d = 1; q.length; d++) {
    const nq = [];
    for (const [r, c, mask, e] of q) {
      if (e === 0) continue;
      for (const [a, b] of [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]) {
        if (a < 0 || a >= m || b < 0 || b >= n || classroom[a][b] === 'X') continue;
        const ne = classroom[a][b] === 'R' ? energy : e - 1;
        const nm = ids.has(a * n + b) ? mask | (1 << ids.get(a * n + b)) : mask;
        if (nm === full) return d;
        const k = `${a},${b},${nm},${ne}`;
        if (!seen.has(k)) { seen.add(k); nq.push([a, b, nm, ne]); }
      }
    }
    q = nq;
  }
  return -1;
}

test('matches unpruned reference on random small grids', () => {
  const cells = ['.', '.', '.', 'X', 'L', 'R'];
  for (let t = 0; t < 400; t++) {
    const m = 1 + Math.floor(Math.random() * 4), n = 1 + Math.floor(Math.random() * 4);
    const g = [];
    for (let r = 0; r < m; r++) g.push(Array.from({ length: n }, () => cells[Math.floor(Math.random() * cells.length)]));
    g[Math.floor(Math.random() * m)][Math.floor(Math.random() * n)] = 'S';
    const grid = g.map((row) => row.join(''));
    const energy = 1 + Math.floor(Math.random() * 5);
    assert.strictEqual(minMoves(grid, energy), reference(grid, energy), JSON.stringify([grid, energy]));
  }
});
