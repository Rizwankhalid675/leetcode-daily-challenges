const test = require('node:test');
const assert = require('node:assert');
const { ListNode, buildList, listToArray } = require('../../../tests/helpers/list');
global.ListNode = ListNode; // LeetCode provides ListNode globally
const { nextLargerNodes } = require('./solution');

function brute(a) {
  return a.map((x, i) => {
    for (let j = i + 1; j < a.length; j++) if (a[j] > x) return a[j];
    return 0;
  });
}

test('official examples', () => {
  assert.deepStrictEqual(nextLargerNodes(buildList([2, 1, 5])), [5, 5, 0]);
  assert.deepStrictEqual(nextLargerNodes(buildList([2, 7, 4, 3, 5])), [7, 0, 5, 5, 0]);
});

test('equal values are not larger', () => {
  assert.deepStrictEqual(nextLargerNodes(buildList([3, 3, 3])), [0, 0, 0]);
});

test('matches brute force', () => {
  for (let t = 0; t < 1000; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => 1 + Math.floor(Math.random() * 6));
    assert.deepStrictEqual(nextLargerNodes(buildList(a)), brute(a));
  }
});
