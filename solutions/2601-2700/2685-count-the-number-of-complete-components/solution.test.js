const test = require('node:test');
const assert = require('node:assert');
const { countCompleteComponents } = require('./solution');

const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
function brute(n, edges) {
  const A = Array.from({ length: n }, () => new Array(n).fill(false));
  for (const [a, b] of edges) A[a][b] = A[b][a] = true;
  // reachability via Warshall
  const R = A.map((row, i) => row.map((x, j) => x || i === j));
  for (let k = 0; k < n; k++) for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (R[i][k] && R[k][j]) R[i][j] = true;
  const done = new Array(n).fill(false);
  let c = 0;
  for (let i = 0; i < n; i++) {
    if (done[i]) continue;
    const comp = [];
    for (let j = 0; j < n; j++) if (R[i][j]) { comp.push(j); done[j] = true; }
    let ok = true;
    for (const x of comp) for (const y of comp) if (x !== y && !A[x][y]) ok = false;
    if (ok) c++;
  }
  return c;
}

test('official examples', () => {
  assert.strictEqual(countCompleteComponents(6, [[0, 1], [0, 2], [1, 2], [3, 4]]), 3);
  assert.strictEqual(countCompleteComponents(6, [[0, 1], [0, 2], [1, 2], [3, 4], [3, 5]]), 1);
});

test('isolated vertices are complete', () => {
  assert.strictEqual(countCompleteComponents(1, []), 1);
  assert.strictEqual(countCompleteComponents(4, []), 4);
});

test('matches pairwise check on random graphs', () => {
  for (let t = 0; t < 500; t++) {
    const n = ri(1, 10);
    const p = Math.random();
    const edges = [];
    for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) if (Math.random() < p) edges.push([a, b]);
    assert.strictEqual(countCompleteComponents(n, edges), brute(n, edges));
  }
});
