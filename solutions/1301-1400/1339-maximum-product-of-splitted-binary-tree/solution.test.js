const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { maxProduct } = require('./solution');

// Oracle: recursive subtree sums, exact BigInt products, max, then mod.
function bruteForce(root) {
  const sums = [];
  const dfs = (n) => { if (!n) return 0; const s = n.val + dfs(n.left) + dfs(n.right); sums.push(s); return s; };
  const total = dfs(root);
  let best = 0n;
  for (const s of sums) { const p = BigInt(s) * BigInt(total - s); if (p > best) best = p; }
  return Number(best % 1000000007n);
}

function randomTree(n, maxVal) {
  const nodes = Array.from({ length: n }, () => new TreeNode(1 + Math.floor(Math.random() * maxVal)));
  for (let i = 1; i < n; i++) {
    for (;;) {
      const p = nodes[Math.floor(Math.random() * i)];
      if (!p.left && Math.random() < 0.5) { p.left = nodes[i]; break; }
      if (!p.right) { p.right = nodes[i]; break; }
    }
  }
  return nodes[0];
}

test('official examples', () => {
  assert.strictEqual(maxProduct(buildTree([1, 2, 3, 4, 5, 6])), 110);
  assert.strictEqual(maxProduct(buildTree([1, null, 2, 3, 4, null, null, 5, 6])), 90);
});

test('two nodes', () => {
  assert.strictEqual(maxProduct(buildTree([1, 1])), 1);
});

test('matches BigInt brute force on random trees', () => {
  for (let t = 0; t < 500; t++) {
    const root = randomTree(2 + Math.floor(Math.random() * 12), Math.random() < 0.5 ? 5 : 10000);
    assert.strictEqual(maxProduct(root), bruteForce(root));
  }
});

test('max-size chain: product above 2^53 is maximised before the mod', () => {
  // 5e4 nodes of value 1e4: total 5e8, best split 2.5e8 * 2.5e8 = 6.25e16 > 2^53.
  const n = 50000;
  const nodes = Array.from({ length: n }, () => new TreeNode(10000));
  for (let i = 0; i + 1 < n; i++) nodes[i].left = nodes[i + 1];
  const t0 = Date.now();
  assert.strictEqual(maxProduct(nodes[0]), Number((250000000n * 250000000n) % 1000000007n));
  assert.ok(Date.now() - t0 < 1000);
});

test('large random tree agrees with brute force', () => {
  const root = randomTree(3000, 10000);
  assert.strictEqual(maxProduct(root), bruteForce(root));
});
