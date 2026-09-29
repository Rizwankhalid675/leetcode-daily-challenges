const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { createBinaryTree } = require('./solution');

function serialize(root) {
  const out = [];
  const q = [root];
  for (let h = 0; h < q.length; h++) {
    const node = q[h];
    if (node === null) { out.push(null); continue; }
    out.push(node.val);
    q.push(node.left, node.right);
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}

test('official examples', () => {
  assert.deepStrictEqual(serialize(createBinaryTree([[20, 15, 1], [20, 17, 0], [50, 20, 1], [50, 80, 0], [80, 19, 1]])), [50, 20, 80, 15, 17, 19]);
  assert.deepStrictEqual(serialize(createBinaryTree([[1, 2, 1], [2, 3, 0], [3, 4, 1]])), [1, 2, null, null, 3, 4]);
});

function randomTree(n) {
  // random tree over distinct values; returns descriptions (shuffled) and expected level order
  const vals = [];
  const used = new Set();
  while (vals.length < n) { const v = 1 + Math.floor(Math.random() * 100000); if (!used.has(v)) { used.add(v); vals.push(v); } }
  const root = new TreeNode(vals[0]);
  const free = [[root, 'left'], [root, 'right']];
  const desc = [];
  for (let i = 1; i < n; i++) {
    const k = Math.floor(Math.random() * free.length);
    const [parent, side] = free[k];
    free.splice(k, 1);
    const child = new TreeNode(vals[i]);
    parent[side] = child;
    desc.push([parent.val, child.val, side === 'left' ? 1 : 0]);
    free.push([child, 'left'], [child, 'right']);
  }
  for (let i = desc.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [desc[i], desc[j]] = [desc[j], desc[i]]; }
  return { desc, expected: serialize(root) };
}

test('rebuilds random trees from shuffled descriptions', () => {
  for (let t = 0; t < 300; t++) {
    const { desc, expected } = randomTree(2 + Math.floor(Math.random() * 30));
    assert.deepStrictEqual(serialize(createBinaryTree(desc)), expected);
  }
});

test('deep skewed chain of 10^4 edges', () => {
  const desc = [];
  for (let i = 1; i <= 10000; i++) desc.push([i, i + 1, i % 2]);
  const root = createBinaryTree(desc.reverse());
  assert.strictEqual(root.val, 1);
});
