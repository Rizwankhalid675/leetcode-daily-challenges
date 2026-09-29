const test = require('node:test');
const assert = require('node:assert');
const { friendRequests } = require('./solution');

const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
function brute(n, restrictions, requests) {
  const adj = Array.from({ length: n }, () => []);
  const comp = () => {
    const c = new Array(n).fill(-1);
    for (let s = 0; s < n; s++) {
      if (c[s] !== -1) continue;
      c[s] = s;
      const st = [s];
      while (st.length) { const u = st.pop(); for (const v of adj[u]) if (c[v] === -1) { c[v] = s; st.push(v); } }
    }
    return c;
  };
  return requests.map(([u, v]) => {
    adj[u].push(v); adj[v].push(u);
    const c = comp();
    if (restrictions.some(([x, y]) => c[x] === c[y])) { adj[u].pop(); adj[v].pop(); return false; }
    return true;
  });
}

test('official examples', () => {
  assert.deepStrictEqual(friendRequests(3, [[0, 1]], [[0, 2], [2, 1]]), [true, false]);
  assert.deepStrictEqual(friendRequests(3, [[0, 1]], [[1, 2], [0, 2]]), [true, false]);
  assert.deepStrictEqual(friendRequests(5, [[0, 1], [1, 2], [2, 3]], [[0, 4], [1, 2], [3, 1], [3, 4]]), [true, false, true, false]);
});

test('already-friends request succeeds; no restrictions accepts everything', () => {
  assert.deepStrictEqual(friendRequests(3, [[0, 2]], [[0, 1], [1, 0], [0, 1]]), [true, true, true]);
  assert.deepStrictEqual(friendRequests(4, [], [[0, 1], [2, 3], [1, 2]]), [true, true, true]);
});

test('matches component recomputation on random inputs', () => {
  for (let t = 0; t < 500; t++) {
    const n = ri(2, 8);
    const pair = () => { const a = ri(0, n - 1); let b = ri(0, n - 2); if (b >= a) b++; return [a, b]; };
    const restrictions = Array.from({ length: ri(0, 5) }, pair);
    const requests = Array.from({ length: ri(1, 12) }, pair);
    assert.deepStrictEqual(friendRequests(n, restrictions, requests), brute(n, restrictions, requests));
  }
});

test('max size runs fast', () => {
  const n = 1000;
  const restrictions = Array.from({ length: 1000 }, (_, i) => [i, (i + 500) % n]);
  const requests = Array.from({ length: 1000 }, (_, i) => [i, (i + 1) % n]);
  const t0 = Date.now();
  friendRequests(n, restrictions, requests);
  assert.ok(Date.now() - t0 < 1000);
});
