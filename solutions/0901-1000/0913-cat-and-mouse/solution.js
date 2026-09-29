/**
 * 913. Cat and Mouse
 * https://leetcode.com/problems/cat-and-mouse/
 * Retrograde analysis over states (mouse, cat, whose turn). Seed known results (mouse in hole = mouse win, same node = cat win) and propagate backwards with a BFS: a parent is a win for its mover if any child is, and a loss once all of its children are losses (tracked with an out-degree counter). States never decided are draws.
 */
var catMouseGame = function (graph) {
  const n = graph.length;
  const MOUSE = 0;
  const CAT = 1;
  const DRAW = 0;
  const MOUSE_WIN = 1;
  const CAT_WIN = 2;
  const id = (m, c, t) => (m * n + c) * 2 + t;
  const result = new Uint8Array(n * n * 2); // 0 = undecided (draw)
  const degree = new Int32Array(n * n * 2); // moves not yet known to lose for the mover
  for (let m = 0; m < n; m++) {
    for (let c = 1; c < n; c++) {
      degree[id(m, c, MOUSE)] = graph[m].length;
      let d = 0;
      for (const x of graph[c]) if (x !== 0) d++;
      degree[id(m, c, CAT)] = d;
    }
  }
  const queue = [];
  for (let c = 1; c < n; c++) {
    for (let t = 0; t < 2; t++) {
      result[id(0, c, t)] = MOUSE_WIN;
      queue.push(0, c, t);
      result[id(c, c, t)] = CAT_WIN;
      queue.push(c, c, t);
    }
  }
  for (let head = 0; head < queue.length; head += 3) {
    const m = queue[head];
    const c = queue[head + 1];
    const t = queue[head + 2];
    const r = result[id(m, c, t)];
    // Parents: states where the other player just moved into (m, c, t).
    const pt = 1 - t;
    const moverWins = pt === MOUSE ? MOUSE_WIN : CAT_WIN;
    const from = pt === MOUSE ? graph[m] : graph[c];
    for (const prev of from) {
      if (pt === CAT && prev === 0) continue; // the cat can never stand on the hole
      const pm = pt === MOUSE ? prev : m;
      const pc = pt === MOUSE ? c : prev;
      const p = id(pm, pc, pt);
      if (result[p] !== DRAW) continue;
      if (r === moverWins) {
        result[p] = r; // the mover picks this winning move
        queue.push(pm, pc, pt);
      } else if (--degree[p] === 0) {
        result[p] = r; // every move loses for the mover
        queue.push(pm, pc, pt);
      }
    }
  }
  return result[id(1, 2, MOUSE)];
};

module.exports = { catMouseGame };
