const test = require('node:test');
const assert = require('node:assert');
const { coinChange } = require('./solution');

// Independent oracle: BFS on amounts (each edge = one coin).
function bfs(coins, amount) {
  const dist = new Map([[0, 0]]);
  const q = [0];
  for (let i = 0; i < q.length; i++) {
    const s = q[i];
    if (s === amount) return dist.get(s);
    for (const c of coins) {
      const t = s + c;
      if (t <= amount && !dist.has(t)) { dist.set(t, dist.get(s) + 1); q.push(t); }
    }
  }
  return -1;
}

test('official examples', () => {
  assert.strictEqual(coinChange([1, 2, 5], 11), 3);
  assert.strictEqual(coinChange([2], 3), -1);
  assert.strictEqual(coinChange([1], 0), 0);
});

test('huge coin values are skipped safely', () => {
  assert.strictEqual(coinChange([2147483647], 2), -1);
  assert.strictEqual(coinChange([2147483647, 1], 3), 3);
});

test('matches BFS oracle', () => {
  for (let t = 0; t < 500; t++) {
    const set = new Set(Array.from({ length: 1 + Math.floor(Math.random() * 4) }, () => 1 + Math.floor(Math.random() * 15)));
    const coins = [...set];
    const amount = Math.floor(Math.random() * 80);
    assert.strictEqual(coinChange(coins, amount), bfs(coins, amount));
  }
});

test('12 coins, amount 10^4 is fast', () => {
  const coins = [3, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43];
  const t0 = Date.now();
  assert.strictEqual(coinChange(coins, 10000), bfs(coins, 10000));
  assert.ok(Date.now() - t0 < 1000);
});
