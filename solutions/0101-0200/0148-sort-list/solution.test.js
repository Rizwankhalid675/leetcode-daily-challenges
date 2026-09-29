const test = require('node:test');
const assert = require('node:assert');
const { ListNode, buildList, listToArray } = require('../../../tests/helpers/list');
global.ListNode = ListNode; // LeetCode provides ListNode globally
const { sortList } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(listToArray(sortList(buildList([4, 2, 1, 3]))), [1, 2, 3, 4]);
  assert.deepStrictEqual(listToArray(sortList(buildList([-1, 5, 3, 4, 0]))), [-1, 0, 3, 4, 5]);
  assert.deepStrictEqual(listToArray(sortList(buildList([]))), []);
});

test('random lists match Array sort (and reuse the same nodes)', () => {
  for (let t = 0; t < 500; t++) {
    const a = Array.from({ length: Math.floor(Math.random() * 40) }, () => Math.floor(Math.random() * 21) - 10);
    const head = buildList(a);
    const nodes = new Set();
    for (let p = head; p; p = p.next) nodes.add(p);
    const sorted = sortList(head);
    for (let p = sorted; p; p = p.next) assert.ok(nodes.has(p));
    assert.deepStrictEqual(listToArray(sorted), [...a].sort((x, y) => x - y));
  }
});

test('5*10^4 nodes (sorted, reversed, random) without deep recursion', () => {
  const n = 50000;
  const inputs = [
    Array.from({ length: n }, (_, i) => i),
    Array.from({ length: n }, (_, i) => n - i),
    Array.from({ length: n }, () => Math.floor(Math.random() * 2e5) - 1e5),
  ];
  const t0 = Date.now();
  for (const a of inputs) assert.deepStrictEqual(listToArray(sortList(buildList(a))), [...a].sort((x, y) => x - y));
  assert.ok(Date.now() - t0 < 1000);
});
