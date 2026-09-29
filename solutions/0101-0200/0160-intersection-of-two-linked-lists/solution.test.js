const test = require('node:test');
const assert = require('node:assert');
const { ListNode, buildList, listToArray } = require('../../../tests/helpers/list');
global.ListNode = ListNode; // LeetCode provides ListNode globally
const { getIntersectionNode } = require('./solution');

function make(aOnly, bOnly, shared) {
  const common = buildList(shared);
  const attach = (vals) => {
    if (vals.length === 0) return common;
    const h = buildList(vals);
    let t = h;
    while (t.next) t = t.next;
    t.next = common;
    return h;
  };
  return { headA: attach(aOnly), headB: attach(bOnly), common };
}

test('official examples', () => {
  let { headA, headB, common } = make([4, 1], [5, 6, 1], [8, 4, 5]);
  assert.strictEqual(getIntersectionNode(headA, headB), common);
  ({ headA, headB, common } = make([1, 9, 1], [3], [2, 4]));
  assert.strictEqual(getIntersectionNode(headA, headB), common);
  assert.strictEqual(getIntersectionNode(buildList([2, 6, 4]), buildList([1, 5])), null);
});

test('same values but separate nodes do not count', () => {
  assert.strictEqual(getIntersectionNode(buildList([1, 2, 3]), buildList([1, 2, 3])), null);
});

test('random shapes, including intersection at a head', () => {
  const r = (k) => Array.from({ length: Math.floor(Math.random() * k) }, () => 1 + Math.floor(Math.random() * 5));
  for (let t = 0; t < 500; t++) {
    const shared = r(6);
    let aOnly = r(8), bOnly = r(8);
    if (shared.length === 0) { aOnly.push(1); bOnly.push(1); }
    const { headA, headB, common } = make(aOnly, bOnly, shared);
    assert.strictEqual(getIntersectionNode(headA, headB), common);
  }
});

test('max size lists', () => {
  const { headA, headB, common } = make(new Array(30000).fill(1), new Array(1).fill(2), new Array(29999).fill(3));
  assert.strictEqual(getIntersectionNode(headA, headB), common);
  assert.strictEqual(getIntersectionNode(buildList(new Array(30000).fill(1)), buildList(new Array(29999).fill(1))), null);
});
