const test = require('node:test');
const assert = require('node:assert');
const { rightSideView } = require('./solution');
const { buildTree } = require('../../../tests/helpers/tree');

test('official examples', () => {
  assert.deepStrictEqual(rightSideView(buildTree([1, 2, 3, null, 5, null, 4])), [1, 3, 4]);
  assert.deepStrictEqual(rightSideView(buildTree([1, 2, 3, 4, null, null, null, 5])), [1, 3, 4, 5]); // left-only deep branch is visible
  assert.deepStrictEqual(rightSideView(buildTree([1, null, 3])), [1, 3]);
  assert.deepStrictEqual(rightSideView(buildTree([])), []);
});
