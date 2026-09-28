const test = require('node:test');
const assert = require('node:assert');
const { longestZigZag } = require('./solution');
const { buildTree } = require('../../../tests/helpers/tree');

// Reference: from every node, try starting left and starting right, and follow the zigzag.
function brute(root) {
  let best = 0;
  const walk = (node, goLeft) => {
    let len = 0;
    for (let n = goLeft ? node.left : node.right; n; n = goLeft ? n.right : n.left, goLeft = !goLeft) len++;
    return len;
  };
  const each = (n) => {
    if (!n) return;
    best = Math.max(best, walk(n, true), walk(n, false));
    each(n.left);
    each(n.right);
  };
  each(root);
  return best;
}

test('official examples', () => {
  assert.strictEqual(longestZigZag(buildTree([1, null, 1, 1, 1, null, null, 1, 1, null, 1, null, null, null, 1])), 3);
  assert.strictEqual(longestZigZag(buildTree([1, 1, 1, null, 1, null, null, 1, 1, null, 1])), 4);
  assert.strictEqual(longestZigZag(buildTree([1])), 0);
});

test('5*10^4-node straight chain is handled iteratively', () => {
  const chain = buildTree([1, ...Array.from({ length: 49999 }, () => [null, 1]).flat()]);
  assert.strictEqual(longestZigZag(chain), 1);
});

test('matches brute force on random trees', () => {
  for (let t = 0; t < 500; t++) {
    const vals = Array.from({ length: 1 + Math.floor(Math.random() * 25) }, (_, i) => (i > 0 && Math.random() < 0.35 ? null : 1));
    const root = buildTree(vals);
    assert.strictEqual(longestZigZag(root), brute(root), JSON.stringify(vals));
  }
});
