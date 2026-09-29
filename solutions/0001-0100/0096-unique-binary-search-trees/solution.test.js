const test = require('node:test');
const assert = require('node:assert');
const { numTrees } = require('./solution');

// Count distinct shapes produced by inserting every permutation of 1..n into a BST.
function bruteCount(n) {
  const shapes = new Set();
  const perm = (arr, used) => {
    if (arr.length === n) {
      const root = {};
      const ins = (node, v) => {
        if (node.v === undefined) { node.v = v; return; }
        const side = v < node.v ? 'l' : 'r';
        node[side] = node[side] || {};
        ins(node[side], v);
      };
      for (const v of arr) ins(root, v);
      const ser = (x) => (x ? '(' + ser(x.l) + x.v + ser(x.r) + ')' : '.');
      shapes.add(ser(root));
      return;
    }
    for (let v = 1; v <= n; v++) if (!used[v]) { used[v] = true; arr.push(v); perm(arr, used); arr.pop(); used[v] = false; }
  };
  perm([], []);
  return shapes.size;
}

test('official examples', () => {
  assert.strictEqual(numTrees(3), 5);
  assert.strictEqual(numTrees(1), 1);
});

test('matches BSTs built from all permutations (n <= 7)', () => {
  for (let n = 1; n <= 7; n++) assert.strictEqual(numTrees(n), bruteCount(n));
});

test('upper bound n = 19 (Catalan number, exact)', () => {
  assert.strictEqual(numTrees(19), 1767263190);
});
