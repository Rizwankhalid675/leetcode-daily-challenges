const test = require('node:test');
const assert = require('node:assert');
const { catMouseGame } = require('./solution');

// Independent oracle: sweep every state applying the win/lose rules until nothing changes
// (Kleene fixpoint iteration, no queue or counters). States left undecided are draws.
function fixpoint(graph) {
  const n = graph.length;
  const val = new Map();
  const key = (m, c, t) => (m * n + c) * 2 + t;
  const get = (m, c, t) => {
    if (m === 0) return 1;
    if (m === c) return 2;
    return val.get(key(m, c, t)) || 0;
  };
  let changed = true;
  while (changed) {
    changed = false;
    for (let m = 1; m < n; m++) {
      for (let c = 1; c < n; c++) {
        if (m === c) continue;
        for (let t = 0; t < 2; t++) {
          if (get(m, c, t)) continue;
          const kids = t === 0
            ? graph[m].map((x) => get(x, c, 1))
            : graph[c].filter((x) => x !== 0).map((x) => get(m, x, 0));
          const me = t === 0 ? 1 : 2;
          const other = 3 - me;
          let v = 0;
          if (kids.includes(me)) v = me;
          else if (kids.every((k) => k === other)) v = other;
          if (v) {
            val.set(key(m, c, t), v);
            changed = true;
          }
        }
      }
    }
  }
  return get(1, 2, 0);
}

function randomGraph(n, p) {
  for (;;) {
    const adj = Array.from({ length: n }, () => new Set());
    for (let a = 0; a < n; a++)
      for (let b = a + 1; b < n; b++)
        if (Math.random() < p) {
          adj[a].add(b);
          adj[b].add(a);
        }
    const g = adj.map((s) => [...s]);
    // Both players must always be able to move (the cat excluding the hole).
    if (g.every((nb, v) => nb.length > 0 && (v === 0 || nb.some((x) => x !== 0)))) return g;
  }
}

test('official examples', () => {
  assert.strictEqual(catMouseGame([[2, 5], [3], [0, 4, 5], [1, 4, 5], [2, 3], [0, 2, 3]]), 0);
  assert.strictEqual(catMouseGame([[1, 3], [0], [3], [0, 2]]), 1);
});

test('hand-checked small graphs', () => {
  // Mouse is adjacent to the hole: immediate win.
  assert.strictEqual(catMouseGame([[1], [0, 2], [1]]), 1);
  // Path 0-2-1 (hole, cat, mouse): the mouse's only move lands on the cat.
  assert.strictEqual(catMouseGame([[2], [2], [0, 1]]), 2);
  // Mouse at 1 can go to 2 (cat) or 3; the cat at 2 is adjacent to 3 and catches it there.
  assert.strictEqual(catMouseGame([[3], [2, 3], [1, 3], [0, 1, 2]]), 2);
});

test('known tricky cases for turn-limited memo DFS', () => {
  const g1 = [[3, 4], [3, 5], [3, 6], [0, 1, 2], [0, 5, 6], [1, 4], [2, 4]];
  assert.strictEqual(catMouseGame(g1), fixpoint(g1));
  assert.strictEqual(catMouseGame(g1), 0);
  const g2 = [[6], [4], [9], [5], [1, 5], [3, 4, 6], [0, 5, 10], [8, 9, 10], [7], [2, 7], [6, 7]];
  assert.strictEqual(catMouseGame(g2), fixpoint(g2));
  assert.strictEqual(catMouseGame(g2), 1); // mouse needs a long path 1-4-5-6-0
});

test('matches fixpoint iteration on random graphs', () => {
  const seen = [0, 0, 0];
  for (let t = 0; t < 1500; t++) {
    const n = 3 + Math.floor(Math.random() * 7);
    const g = randomGraph(n, 0.2 + Math.random() * 0.4);
    const got = catMouseGame(g);
    assert.strictEqual(got, fixpoint(g), JSON.stringify(g));
    seen[got]++;
  }
  assert.ok(seen.every((c) => c > 0), 'all three outcomes exercised: ' + seen);
});

test('max size graphs are fast', () => {
  const n = 50;
  const full = Array.from({ length: n }, (_, v) => Array.from({ length: n }, (_, u) => u).filter((u) => u !== v));
  const t0 = Date.now();
  assert.strictEqual(catMouseGame(full), 1); // mouse at 1 steps straight into the hole
  for (let r = 0; r < 20; r++) {
    const g = randomGraph(n, 0.1 + Math.random() * 0.3);
    catMouseGame(g);
  }
  assert.ok(Date.now() - t0 < 1000);
});
