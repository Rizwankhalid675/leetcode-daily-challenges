const test = require('node:test');
const assert = require('node:assert');
const { TreeNode } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { buildTree } = require('./solution');

const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
function toArr(root) {
  const out = [], q = [root];
  for (let h = 0; h < q.length; h++) {
    const nd = q[h];
    if (nd) { out.push(nd.val); q.push(nd.left, nd.right); } else out.push(null);
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}
function randomUniqueTree(n) {
  const vals = new Set();
  while (vals.size < n) vals.add(rint(-3000, 3000));
  let root = null;
  for (const v of vals) {
    const nd = new TreeNode(v);
    if (!root) { root = nd; continue; }
    let cur = root;
    for (;;) {
      const side = Math.random() < 0.5 ? 'left' : 'right';
      if (!cur[side]) { cur[side] = nd; break; }
      cur = cur[side];
    }
  }
  return root;
}
function traversals(root) {
  const pre = [], ino = [], st = [];
  const s2 = root ? [root] : [];
  while (s2.length) {
    const nd = s2.pop();
    pre.push(nd.val);
    if (nd.right) s2.push(nd.right);
    if (nd.left) s2.push(nd.left);
  }
  let cur = root;
  while (cur || st.length) {
    while (cur) { st.push(cur); cur = cur.left; }
    cur = st.pop();
    ino.push(cur.val);
    cur = cur.right;
  }
  return [pre, ino];
}

test('official examples', () => {
  assert.deepStrictEqual(toArr(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])), [3, 9, 20, null, null, 15, 7]);
  assert.deepStrictEqual(toArr(buildTree([-1], [-1])), [-1]);
});

test('round-trips random trees', () => {
  for (let t = 0; t < 1000; t++) {
    const tree = randomUniqueTree(rint(1, 30));
    const [pre, ino] = traversals(tree);
    assert.deepStrictEqual(toArr(buildTree(pre, ino)), toArr(tree));
  }
});

test('3000-node chains (left and right) without recursion issues', () => {
  const n = 3000;
  const vals = Array.from({ length: n }, (_, i) => i);
  const left = buildTree(vals, [...vals].reverse());
  let depth = 0;
  for (let nd = left; nd; nd = nd.left) depth++;
  assert.strictEqual(depth, n);
  const right = buildTree(vals, vals);
  depth = 0;
  for (let nd = right; nd; nd = nd.right) depth++;
  assert.strictEqual(depth, n);
});
