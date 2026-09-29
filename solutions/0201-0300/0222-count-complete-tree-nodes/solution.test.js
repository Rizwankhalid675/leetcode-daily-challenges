const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { countNodes } = require('./solution');

function complete(n) {
  return buildTree(Array.from({ length: n }, (_, i) => i + 1));
}

test('official examples', () => {
  assert.strictEqual(countNodes(buildTree([1, 2, 3, 4, 5, 6])), 6);
  assert.strictEqual(countNodes(buildTree([])), 0);
  assert.strictEqual(countNodes(buildTree([1])), 1);
});

test('every size from 0 to 1100', () => {
  for (let n = 0; n <= 1100; n++) assert.strictEqual(countNodes(complete(n)), n);
});

test('max size, 1000 calls, stays fast', () => {
  const root = complete(5e4);
  const t0 = Date.now();
  for (let r = 0; r < 1000; r++) assert.strictEqual(countNodes(root), 5e4);
  assert.ok(Date.now() - t0 < 500);
});
