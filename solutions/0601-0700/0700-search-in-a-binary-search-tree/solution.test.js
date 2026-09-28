const test = require('node:test');
const assert = require('node:assert');
const { searchBST } = require('./solution');
const { buildTree } = require('../../../tests/helpers/tree');

test('official examples', () => {
  const root = buildTree([4, 2, 7, 1, 3]);
  const hit = searchBST(root, 2);
  assert.deepStrictEqual([hit.val, hit.left.val, hit.right.val], [2, 1, 3]); // returns the subtree itself
  assert.strictEqual(searchBST(root, 5), null);
});

test('every value is found in a larger BST', () => {
  const root = buildTree([8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15]);
  for (let v = 1; v <= 15; v++) assert.strictEqual(searchBST(root, v).val, v);
  assert.strictEqual(searchBST(root, 16), null);
});
