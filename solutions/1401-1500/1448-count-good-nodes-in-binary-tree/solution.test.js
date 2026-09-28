const test = require('node:test');
const assert = require('node:assert');
const { goodNodes } = require('./solution');
const { buildTree } = require('../../../tests/helpers/tree');

const recursive = (n, max = -Infinity) =>
  n ? (n.val >= max ? 1 : 0) + recursive(n.left, Math.max(max, n.val)) + recursive(n.right, Math.max(max, n.val)) : 0;

test('official examples', () => {
  assert.strictEqual(goodNodes(buildTree([3, 1, 4, 3, null, 1, 5])), 4);
  assert.strictEqual(goodNodes(buildTree([3, 3, null, 4, 2])), 3);
  assert.strictEqual(goodNodes(buildTree([1])), 1);
});

test('10^5-node chain does not overflow the stack', () => {
  const chain = buildTree([0, ...Array.from({ length: 99999 }, () => [null, 0]).flat()]);
  assert.strictEqual(goodNodes(chain), 100000); // equal values count as good
});

test('matches recursive definition on random trees', () => {
  for (let t = 0; t < 500; t++) {
    const vals = Array.from({ length: 1 + Math.floor(Math.random() * 20) }, (_, i) => (i > 0 && Math.random() < 0.25 ? null : Math.floor(Math.random() * 9) - 4));
    const root = buildTree(vals);
    assert.strictEqual(goodNodes(root), recursive(root), JSON.stringify(vals));
  }
});
