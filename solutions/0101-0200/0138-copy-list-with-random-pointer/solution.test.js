const test = require('node:test');
const assert = require('node:assert');

function _Node(val, next, random) {
  this.val = val;
  this.next = next;
  this.random = random;
}
global._Node = _Node; // LeetCode provides this constructor globally
const { copyRandomList } = require('./solution');

// Build from LeetCode's [[val, randomIndex], ...] format and serialize back.
function build(spec) {
  const nodes = spec.map(([v]) => new _Node(v, null, null));
  nodes.forEach((n, i) => {
    n.next = nodes[i + 1] ?? null;
    n.random = spec[i][1] === null ? null : nodes[spec[i][1]];
  });
  return nodes[0] ?? null;
}
function serialize(head) {
  const nodes = [];
  for (let n = head; n; n = n.next) nodes.push(n);
  return nodes.map((n) => [n.val, n.random === null ? null : nodes.indexOf(n.random)]);
}
function originals(head) {
  const s = new Set();
  for (let n = head; n; n = n.next) s.add(n);
  return s;
}

test('official examples: same structure, all-new nodes', () => {
  for (const spec of [[[7, null], [13, 0], [11, 4], [10, 2], [1, 0]], [[1, 1], [2, 1]], [[3, null], [3, 0], [3, null]], []]) {
    const head = build(spec);
    const copy = copyRandomList(head);
    assert.deepStrictEqual(serialize(copy), spec);
    const old = originals(head);
    for (let n = copy; n; n = n.next) {
      assert.ok(!old.has(n), 'copy must not reuse original nodes');
      assert.ok(n.random === null || !old.has(n.random), 'random must point into the copy');
    }
  }
});

test('random structures', () => {
  for (let t = 0; t < 300; t++) {
    const n = Math.floor(Math.random() * 10);
    const spec = Array.from({ length: n }, () => [Math.floor(Math.random() * 5), Math.random() < 0.3 ? null : Math.floor(Math.random() * n)]);
    assert.deepStrictEqual(serialize(copyRandomList(build(spec))), spec);
  }
});
