const test = require('node:test');
const assert = require('node:assert');
const { minOperations } = require('./solution');

// Oracle: BFS over integers in [0, 2^18), with steps of plus/minus 2^i.
const LIMIT = 1 << 18;
const dist = new Int32Array(LIMIT).fill(-1);
(function bfs() {
  dist[0] = 0;
  const q = [0];
  for (let h = 0; h < q.length; h++) {
    const u = q[h];
    for (let i = 0; i < 18; i++) for (const v of [u + (1 << i), u - (1 << i)]) {
      if (v >= 0 && v < LIMIT && dist[v] === -1) { dist[v] = dist[u] + 1; q.push(v); }
    }
  }
})();

test('official examples', () => {
  assert.strictEqual(minOperations(39), 3);
  assert.strictEqual(minOperations(54), 3);
});

test('edge cases', () => {
  assert.strictEqual(minOperations(1), 1);
  assert.strictEqual(minOperations(3), 2);
  assert.strictEqual(minOperations(7), 2);
  assert.strictEqual(minOperations(65536), 1);
});

test('matches BFS for every n in [1, 1e5]', () => {
  for (let n = 1; n <= 100000; n++) assert.strictEqual(minOperations(n), dist[n], 'n = ' + n);
});
