const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { generateTrees } = require('./solution');

// LeetCode level-order serialization with trailing nulls trimmed.
function serialize(root) {
  const out = [];
  const q = [root];
  for (let i = 0; i < q.length; i++) {
    const x = q[i];
    if (x === null) { out.push(null); continue; }
    out.push(x.val);
    q.push(x.left, x.right);
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return JSON.stringify(out);
}
function inorder(root, acc = []) {
  if (root) { inorder(root.left, acc); acc.push(root.val); inorder(root.right, acc); }
  return acc;
}
// Oracle: insert every permutation of 1..n into a BST and collect distinct serializations.
function bruteSet(n) {
  const set = new Set();
  const perm = (arr, used) => {
    if (arr.length === n) {
      let root = null;
      for (const v of arr) {
        if (!root) { root = new TreeNode(v); continue; }
        let x = root;
        for (;;) {
          if (v < x.val) { if (!x.left) { x.left = new TreeNode(v); break; } x = x.left; }
          else { if (!x.right) { x.right = new TreeNode(v); break; } x = x.right; }
        }
      }
      set.add(serialize(root));
      return;
    }
    for (let v = 1; v <= n; v++) if (!used[v]) { used[v] = true; arr.push(v); perm(arr, used); arr.pop(); used[v] = false; }
  };
  perm([], []);
  return set;
}

test('official examples', () => {
  const got = generateTrees(3).map(serialize).sort();
  const want = ['[1,null,2,null,3]', '[1,null,3,2]', '[2,1,3]', '[3,1,null,null,2]', '[3,2,null,1]']
    .map((s) => JSON.stringify(JSON.parse(s))).sort();
  assert.deepStrictEqual(got, want);
  assert.deepStrictEqual(generateTrees(1).map(serialize), ['[1]']);
});

test('matches the set of BSTs from all permutations (n <= 7)', () => {
  for (let n = 1; n <= 7; n++) {
    const got = generateTrees(n).map(serialize);
    assert.strictEqual(new Set(got).size, got.length, 'no duplicates');
    assert.deepStrictEqual(new Set(got), bruteSet(n));
  }
});

test('n = 8: Catalan(8) distinct valid BSTs over 1..8', () => {
  const trees = generateTrees(8);
  assert.strictEqual(trees.length, 1430);
  assert.strictEqual(new Set(trees.map(serialize)).size, 1430);
  for (const t of trees) assert.deepStrictEqual(inorder(t), [1, 2, 3, 4, 5, 6, 7, 8]);
});
