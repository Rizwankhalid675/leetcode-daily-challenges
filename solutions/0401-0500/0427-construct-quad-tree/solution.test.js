const test = require('node:test');
const assert = require('node:assert');
// LeetCode provides _Node globally for this problem.
function _Node(val, isLeaf, topLeft, topRight, bottomLeft, bottomRight) {
  this.val = val;
  this.isLeaf = isLeaf;
  this.topLeft = topLeft;
  this.topRight = topRight;
  this.bottomLeft = bottomLeft;
  this.bottomRight = bottomRight;
}
global._Node = _Node;
const { construct } = require('./solution');

// LeetCode's output format: level order, each node emits 4 child slots (null for leaves),
// trailing nulls trimmed. Internal nodes' val may be anything, so it is normalised to 1.
function serialize(root) {
  const out = [];
  const queue = [root];
  for (let i = 0; i < queue.length; i++) {
    const node = queue[i];
    if (node === null) { out.push(null); continue; }
    out.push([node.isLeaf ? 1 : 0, node.isLeaf ? (node.val ? 1 : 0) : 1]);
    if (node.isLeaf) queue.push(null, null, null, null);
    else queue.push(node.topLeft, node.topRight, node.bottomLeft, node.bottomRight);
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}

function paint(node, r, c, size, grid) {
  if (node.isLeaf) {
    assert.strictEqual(typeof node.val, 'boolean');
    for (let i = r; i < r + size; i++) for (let j = c; j < c + size; j++) grid[i][j] = node.val ? 1 : 0;
    return;
  }
  const h = size / 2;
  // An internal node whose children are all equal leaves should have been merged.
  const kids = [node.topLeft, node.topRight, node.bottomLeft, node.bottomRight];
  assert.ok(!(kids.every((k) => k.isLeaf) && kids.every((k) => k.val === kids[0].val)), 'not minimal');
  paint(node.topLeft, r, c, h, grid);
  paint(node.topRight, r, c + h, h, grid);
  paint(node.bottomLeft, r + h, c, h, grid);
  paint(node.bottomRight, r + h, c + h, h, grid);
}

test('official examples', () => {
  assert.deepStrictEqual(serialize(construct([[0, 1], [1, 0]])), [[0, 1], [1, 0], [1, 1], [1, 1], [1, 0]]);
  const g = [
    [1, 1, 1, 1, 0, 0, 0, 0], [1, 1, 1, 1, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0], [1, 1, 1, 1, 0, 0, 0, 0], [1, 1, 1, 1, 0, 0, 0, 0], [1, 1, 1, 1, 0, 0, 0, 0],
  ];
  assert.deepStrictEqual(serialize(construct(g)),
    [[0, 1], [1, 1], [0, 1], [1, 1], [1, 0], null, null, null, null, [1, 0], [1, 0], [1, 1], [1, 1]]);
});

test('uniform grids give a single leaf', () => {
  assert.deepStrictEqual(serialize(construct([[1]])), [[1, 1]]);
  assert.deepStrictEqual(serialize(construct(Array.from({ length: 64 }, () => new Array(64).fill(0)))), [[1, 0]]);
});

test('random grids: tree repaints the grid and is minimal', () => {
  for (let t = 0; t < 300; t++) {
    const n = 2 ** Math.floor(Math.random() * 7); // 1..64
    const block = 2 ** Math.floor(Math.random() * (Math.log2(n) + 1)); // encourage merges
    const g = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let r = 0; r < n; r += block) for (let c = 0; c < n; c += block) {
      const v = Math.random() < 0.5 ? 1 : 0;
      for (let i = r; i < r + block; i++) for (let j = c; j < c + block; j++) g[i][j] = v;
    }
    const out = Array.from({ length: n }, () => new Array(n).fill(-1));
    paint(construct(g), 0, 0, n, out);
    assert.deepStrictEqual(out, g);
  }
});
