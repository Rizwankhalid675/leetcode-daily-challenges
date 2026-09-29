const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { BSTIterator } = require('./solution');

function randomBST(n, maxVal) {
  const vals = new Set();
  while (vals.size < n) vals.add(Math.floor(Math.random() * (maxVal + 1)));
  let root = null;
  for (const v of vals) {
    const nd = new TreeNode(v);
    if (!root) { root = nd; continue; }
    let cur = root;
    for (;;) {
      const side = v < cur.val ? 'left' : 'right';
      if (!cur[side]) { cur[side] = nd; break; }
      cur = cur[side];
    }
  }
  return { root, sorted: [...vals].sort((a, b) => a - b) };
}
function chain(vals, side) {
  let root = null;
  for (let i = vals.length - 1; i >= 0; i--) {
    const nd = new TreeNode(vals[i]);
    nd[side] = root;
    root = nd;
  }
  return root;
}
const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

test('official example', () => {
  const it = new BSTIterator(buildTree([7, 3, 15, null, null, 9, 20]));
  const got = [it.next(), it.next(), it.hasNext(), it.next(), it.hasNext(), it.next(), it.hasNext(), it.next(), it.hasNext()];
  assert.deepStrictEqual(got, [3, 7, true, 9, true, 15, true, 20, false]);
});

test('yields sorted order on random BSTs with interleaved hasNext', () => {
  for (let t = 0; t < 500; t++) {
    const { root, sorted } = randomBST(rint(1, 40), 1000);
    const it = new BSTIterator(root);
    const got = [];
    while (it.hasNext()) {
      if (Math.random() < 0.5) assert.strictEqual(it.hasNext(), true);
      got.push(it.next());
    }
    assert.deepStrictEqual(got, sorted);
  }
});

test('10^5-node chains', () => {
  const vals = Array.from({ length: 1e5 }, (_, i) => i);
  for (const [tree, side] of [[chain([...vals].reverse(), 'left'), 'left'], [chain(vals, 'right'), 'right']]) {
    const it = new BSTIterator(tree);
    let k = 0;
    while (it.hasNext()) assert.strictEqual(it.next(), k++, side);
    assert.strictEqual(k, 1e5);
  }
});
