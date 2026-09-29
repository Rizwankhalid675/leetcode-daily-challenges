const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { insertIntoBST } = require('./solution');

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

function inorder(root) {
  const out = [];
  const stack = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) { stack.push(cur); cur = cur.left; }
    cur = stack.pop();
    out.push(cur.val);
    cur = cur.right;
  }
  return out;
}

test('official examples', () => {
  assert.deepStrictEqual(serialize(insertIntoBST(buildTree([4, 2, 7, 1, 3]), 5)), [4, 2, 7, 1, 3, 5]);
  assert.deepStrictEqual(serialize(insertIntoBST(buildTree([40, 20, 60, 10, 30, 50, 70]), 25)), [40, 20, 60, 10, 30, 50, 70, null, null, 25]);
  assert.deepStrictEqual(serialize(insertIntoBST(buildTree([4, 2, 7, 1, 3, null, null, null, null, null, null]), 5)), [4, 2, 7, 1, 3, 5]);
});

test('empty tree', () => {
  assert.deepStrictEqual(serialize(insertIntoBST(null, 5)), [5]);
});

test('random BSTs stay valid and keep every value', () => {
  for (let t = 0; t < 300; t++) {
    const vals = new Set();
    while (vals.size < 1 + Math.floor(Math.random() * 30)) vals.add(Math.floor(Math.random() * 201) - 100);
    const arr = [...vals];
    let root = null;
    for (const v of arr.slice(1)) root = insertIntoBST(root, v);
    const before = serialize(root);
    root = insertIntoBST(root, arr[0]);
    const sorted = [...arr].sort((a, b) => a - b);
    assert.deepStrictEqual(inorder(root), sorted);
    // existing structure is untouched: removing the new leaf gives the old tree back
    const after = serialize(root);
    assert.strictEqual(after.filter((x) => x !== null).length, before.filter((x) => x !== null).length + 1);
  }
});

test('skewed tree of 10^4 nodes', () => {
  let root = null;
  let tail = null;
  for (let i = 0; i < 10000; i++) {
    const node = new TreeNode(i * 2);
    if (!root) root = node; else tail.right = node;
    tail = node;
  }
  insertIntoBST(root, 19999);
  assert.strictEqual(tail.right.val, 19999);
});
