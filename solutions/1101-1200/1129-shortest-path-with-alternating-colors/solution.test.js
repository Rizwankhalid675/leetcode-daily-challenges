const test = require('node:test');
const assert = require('node:assert');
const { shortestAlternatingPaths } = require('./solution');

const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
// oracle: grow the set of (node, lastColour) reachable with exactly L edges
function brute(n, red, blue) {
  const res = new Array(n).fill(-1);
  res[0] = 0;
  let cur = new Set(['0,r', '0,b']);
  for (let L = 1; L <= 2 * n + 2; L++) {
    const nxt = new Set();
    for (const s of cur) {
      const [u, c] = s.split(',');
      const use = c === 'r' ? blue : red;
      for (const [a, b] of use) if (String(a) === u) nxt.add(b + ',' + (c === 'r' ? 'b' : 'r'));
    }
    for (const s of nxt) { const v = +s.split(',')[0]; if (res[v] === -1) res[v] = L; }
    cur = nxt;
  }
  return res;
}

test('official examples', () => {
  assert.deepStrictEqual(shortestAlternatingPaths(3, [[0, 1], [1, 2]], []), [0, 1, -1]);
  assert.deepStrictEqual(shortestAlternatingPaths(3, [[0, 1]], [[2, 1]]), [0, 1, -1]);
});

test('self-loops and parallel edges', () => {
  // 0 -r-> 0 (self), 0 -b-> 1 : 0 then 1 via blue directly
  assert.deepStrictEqual(shortestAlternatingPaths(2, [[0, 0]], [[0, 1]]), [0, 1]);
  // must alternate: 0 -r-> 1 -r-> 2 invalid, but 1 -b-> 1 self-loop enables 0 r 1 b 1 r 2
  assert.deepStrictEqual(shortestAlternatingPaths(3, [[0, 1], [1, 2]], [[1, 1]]), [0, 1, 3]);
});

test('matches layered reachability on random multigraphs', () => {
  for (let t = 0; t < 400; t++) {
    const n = ri(1, 7);
    const mk = () => Array.from({ length: ri(0, 12) }, () => [ri(0, n - 1), ri(0, n - 1)]);
    const red = mk(), blue = mk();
    assert.deepStrictEqual(shortestAlternatingPaths(n, red, blue), brute(n, red, blue));
  }
});
