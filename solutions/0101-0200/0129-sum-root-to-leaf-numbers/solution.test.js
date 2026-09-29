const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { sumNumbers } = require('./solution');

function toArr(root) {
  const out = [], q = [root];
  for (let h = 0; h < q.length; h++) {
    const nd = q[h];
    if (nd) { out.push(nd.val); q.push(nd.left, nd.right); } else out.push(null);
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}
function randomTree(n, val) {
  let root = null;
  for (let i = 0; i < n; i++) {
    const nd = new TreeNode(val(i));
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
const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
function oracle(root) {
  let total = 0;
  const go = (nd, s) => {
    s += String(nd.val);
    if (!nd.left && !nd.right) total += Number(s);
    if (nd.left) go(nd.left, s);
    if (nd.right) go(nd.right, s);
  };
  go(root, '');
  return total;
}

test('official examples', () => {
  assert.strictEqual(sumNumbers(buildTree([1, 2, 3])), 25);
  assert.strictEqual(sumNumbers(buildTree([4, 9, 0, 5, 1])), 1026);
});

test('leading zeros and single node', () => {
  assert.strictEqual(sumNumbers(buildTree([0])), 0);
  assert.strictEqual(sumNumbers(buildTree([0, 1, 2])), 3);
});

test('matches string-concatenation oracle', () => {
  for (let t = 0; t < 1000; t++) {
    const root = randomTree(rint(1, 25), () => rint(0, 9));
    assert.strictEqual(sumNumbers(root), oracle(root));
  }
});
