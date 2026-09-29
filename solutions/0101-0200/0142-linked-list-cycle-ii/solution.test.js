const test = require('node:test');
const assert = require('node:assert');
const { ListNode, buildList, listToArray } = require('../../../tests/helpers/list');
global.ListNode = ListNode; // LeetCode provides ListNode globally
const { detectCycle } = require('./solution');

function build(arr, pos) {
  const head = buildList(arr);
  const nodes = [];
  for (let n = head; n; n = n.next) nodes.push(n);
  if (pos >= 0) nodes[nodes.length - 1].next = nodes[pos];
  return { head, nodes };
}

test('official examples', () => {
  let { head, nodes } = build([3, 2, 0, -4], 1);
  assert.strictEqual(detectCycle(head), nodes[1]);
  ({ head, nodes } = build([1, 2], 0));
  assert.strictEqual(detectCycle(head), nodes[0]);
  ({ head } = build([1], -1));
  assert.strictEqual(detectCycle(head), null);
});

test('empty list and self loop', () => {
  assert.strictEqual(detectCycle(null), null);
  const { head, nodes } = build([5], 0);
  assert.strictEqual(detectCycle(head), nodes[0]);
});

test('finds the entry node for random lists and positions', () => {
  for (let t = 0; t < 500; t++) {
    const n = 1 + Math.floor(Math.random() * 40);
    const pos = Math.floor(Math.random() * (n + 1)) - 1;
    const { head, nodes } = build(Array.from({ length: n }, () => 0), pos);
    assert.strictEqual(detectCycle(head), pos < 0 ? null : nodes[pos]);
  }
});

test('max size (10^4 nodes) is fine', () => {
  const { head, nodes } = build(Array.from({ length: 10000 }, (_, i) => i), 9998);
  assert.strictEqual(detectCycle(head), nodes[9998]);
});
