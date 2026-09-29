const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { checkTree } = require('./solution');

test('official examples', () => {
  assert.strictEqual(checkTree(buildTree([10, 4, 6])), true);
  assert.strictEqual(checkTree(buildTree([5, 3, 1])), false);
});

test('negative values and zeros', () => {
  assert.strictEqual(checkTree(buildTree([-100, -50, -50])), true);
  assert.strictEqual(checkTree(buildTree([0, 0, 0])), true);
  assert.strictEqual(checkTree(buildTree([0, 1, 1])), false);
  assert.strictEqual(checkTree(buildTree([1, -100, 100])), false);
});
