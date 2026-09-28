const test = require('node:test');
const assert = require('node:assert');
const { findCircleNum } = require('./solution');

// Reference: DFS component count.
function dfsCount(m) {
  const n = m.length;
  const seen = new Array(n).fill(false);
  let count = 0;
  for (let s = 0; s < n; s++) {
    if (seen[s]) continue;
    count++;
    const stack = [s];
    seen[s] = true;
    while (stack.length) {
      const u = stack.pop();
      for (let v = 0; v < n; v++) if (m[u][v] && !seen[v]) (seen[v] = true), stack.push(v);
    }
  }
  return count;
}

test('official examples', () => {
  assert.strictEqual(findCircleNum([[1, 1, 0], [1, 1, 0], [0, 0, 1]]), 2);
  assert.strictEqual(findCircleNum([[1, 0, 0], [0, 1, 0], [0, 0, 1]]), 3);
});

test('matches DFS on random symmetric matrices', () => {
  for (let t = 0; t < 500; t++) {
    const n = 1 + Math.floor(Math.random() * 10);
    const m = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
      m[i][i] = 1;
      for (let j = i + 1; j < n; j++) if (Math.random() < 0.15) m[i][j] = m[j][i] = 1;
    }
    assert.strictEqual(findCircleNum(m), dfsCount(m));
  }
});
