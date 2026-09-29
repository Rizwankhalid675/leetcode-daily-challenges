const test = require('node:test');
const assert = require('node:assert');
const { isPossible } = require('./solution');

// Reference: forward BFS from all-ones (tiny values only).
function bfs(target) {
  const goal = target.join(',');
  const max = Math.max(...target);
  const start = target.map(() => 1);
  const seen = new Set([start.join(',')]);
  const q = [start];
  while (q.length) {
    const cur = q.shift();
    if (cur.join(',') === goal) return true;
    const sum = cur.reduce((a, b) => a + b, 0);
    if (sum > max) continue;
    for (let i = 0; i < cur.length; i++) {
      const nxt = [...cur];
      nxt[i] = sum;
      const key = nxt.join(',');
      if (!seen.has(key)) seen.add(key), q.push(nxt);
    }
  }
  return false;
}

test('official examples', () => {
  assert.strictEqual(isPossible([9, 3, 5]), true);
  assert.strictEqual(isPossible([1, 1, 1, 2]), false);
  assert.strictEqual(isPossible([8, 5]), true);
});

test('edge cases', () => {
  assert.strictEqual(isPossible([1]), true);
  assert.strictEqual(isPossible([2]), false);
  assert.strictEqual(isPossible([1, 1000000000]), true); // needs the modulo shortcut
  assert.strictEqual(isPossible([2, 900000001]), true);
});

test('matches forward BFS on small targets', () => {
  for (let t = 0; t < 400; t++) {
    const n = 1 + Math.floor(Math.random() * 3);
    const target = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 12));
    assert.strictEqual(isPossible(target), bfs(target), JSON.stringify(target));
  }
});
