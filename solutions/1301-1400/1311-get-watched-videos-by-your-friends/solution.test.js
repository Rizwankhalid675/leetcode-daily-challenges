const test = require('node:test');
const assert = require('node:assert');
const { watchedVideosByFriends } = require('./solution');

const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
function brute(W, F, id, level) {
  const n = F.length;
  const D = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 0 : Infinity)));
  F.forEach((fs, i) => fs.forEach((j) => { D[i][j] = 1; }));
  for (let k = 0; k < n; k++) for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) D[i][j] = Math.min(D[i][j], D[i][k] + D[k][j]);
  const cnt = {};
  for (let p = 0; p < n; p++) if (D[id][p] === level) for (const v of W[p]) cnt[v] = (cnt[v] || 0) + 1;
  const keys = Object.keys(cnt);
  keys.sort();
  keys.sort((a, b) => cnt[a] - cnt[b]); // stable, so ties keep alphabetical order
  return keys;
}

test('official examples', () => {
  const W = [['A', 'B'], ['C'], ['B', 'C'], ['D']];
  const F = [[1, 2], [0, 3], [0, 3], [1, 2]];
  assert.deepStrictEqual(watchedVideosByFriends(W, F, 0, 1), ['B', 'C']);
  assert.deepStrictEqual(watchedVideosByFriends(W, F, 0, 2), ['D']);
});

test('ordering is by code unit, not locale (uppercase before lowercase)', () => {
  const W = [['x'], ['b', 'B', 'a']];
  assert.deepStrictEqual(watchedVideosByFriends(W, [[1], [0]], 0, 1), ['B', 'a', 'b']);
});

test('level beyond reach gives empty list', () => {
  assert.deepStrictEqual(watchedVideosByFriends([['a'], ['b'], ['c']], [[1], [0], []], 0, 2), []);
});

test('matches Floyd-distance oracle on random friend graphs', () => {
  const pool = ['a', 'b', 'c', 'd', 'aa', 'ab', 'B', 'Z'];
  for (let t = 0; t < 400; t++) {
    const n = ri(2, 9);
    const F = Array.from({ length: n }, () => []);
    for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) if (Math.random() < 0.3) { F[a].push(b); F[b].push(a); }
    const W = Array.from({ length: n }, () => [...new Set(Array.from({ length: ri(1, 4) }, () => pool[ri(0, pool.length - 1)]))]);
    const id = ri(0, n - 1), level = ri(1, n - 1);
    assert.deepStrictEqual(watchedVideosByFriends(W, F, id, level), brute(W, F, id, level));
  }
});
