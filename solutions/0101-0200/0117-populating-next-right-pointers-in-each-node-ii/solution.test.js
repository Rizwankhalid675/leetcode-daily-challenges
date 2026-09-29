const test = require('node:test');
const assert = require('node:assert');
// LeetCode provides _Node globally for this problem.
function _Node(val, left, right, next) {
  this.val = val === undefined ? null : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
  this.next = next === undefined ? null : next;
}
global._Node = _Node;
const { connect } = require('./solution');

const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
function build(values) {
  if (!values.length || values[0] === null) return null;
  const root = new _Node(values[0]);
  const q = [root];
  let i = 1;
  for (let h = 0; h < q.length && i < values.length; h++) {
    const nd = q[h];
    if (i < values.length && values[i] !== null) q.push((nd.left = new _Node(values[i])));
    i++;
    if (i < values.length && values[i] !== null) q.push((nd.right = new _Node(values[i])));
    i++;
  }
  return root;
}
// LeetCode's output format: each level left to right via next, then '#'.
function serialize(root) {
  const out = [];
  for (let start = root; start; ) {
    for (let nd = start; nd; nd = nd.next) out.push(nd.val);
    out.push('#');
    let nextStart = null;
    for (let nd = start; nd && !nextStart; nd = nd.next) nextStart = nd.left || nd.right;
    start = nextStart;
  }
  return out;
}
function randomTree(n) {
  let root = null;
  for (let i = 0; i < n; i++) {
    const nd = new _Node(rint(-100, 100));
    if (!root) { root = nd; continue; }
    let cur = root;
    for (;;) {
      const side = Math.random() < 0.5 ? 'left' : 'right';
      if (!cur[side]) { cur[side] = nd; break; }
      cur = cur[side];
    }
  }
  return root;
}
// Oracle: BFS levels; every node's next must be the following node in its level (last: null).
function checkNext(root) {
  let level = root ? [root] : [];
  while (level.length) {
    for (let i = 0; i < level.length; i++) {
      if (level[i].next !== (i + 1 < level.length ? level[i + 1] : null)) return false;
    }
    level = level.flatMap((nd) => [nd.left, nd.right].filter(Boolean));
  }
  return true;
}

test('official examples', () => {
  assert.deepStrictEqual(serialize(connect(build([1, 2, 3, 4, 5, null, 7]))), [1, '#', 2, 3, '#', 4, 5, 7, '#']);
  assert.strictEqual(connect(build([])), null);
});

test('gaps across different parents', () => {
  assert.deepStrictEqual(serialize(connect(build([1, 2, 3, 4, null, null, 5]))), [1, '#', 2, 3, '#', 4, 5, '#']);
  assert.deepStrictEqual(serialize(connect(build([1, 2, 3, null, null, 4, 5, 6]))), [1, '#', 2, 3, '#', 4, 5, '#', 6, '#']);
});

test('matches BFS level lists on random trees', () => {
  for (let t = 0; t < 1000; t++) {
    const root = randomTree(rint(0, 40));
    assert.strictEqual(connect(root), root);
    assert.ok(checkNext(root));
  }
});

test('6000-node chain', () => {
  let root = null;
  for (let i = 0; i < 6000; i++) root = new _Node(i % 100, i % 2 ? root : null, i % 2 ? null : root);
  connect(root);
  assert.ok(checkNext(root));
});
