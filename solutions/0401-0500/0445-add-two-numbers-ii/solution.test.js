const test = require('node:test');
const assert = require('node:assert');
const { ListNode, buildList, listToArray } = require('../../../tests/helpers/list');
global.ListNode = ListNode; // LeetCode provides ListNode globally
const { addTwoNumbers } = require('./solution');

const digits = (len) => {
  const a = [1 + Math.floor(Math.random() * 9)];
  for (let i = 1; i < len; i++) a.push(Math.floor(Math.random() * 10));
  return a;
};

test('official examples', () => {
  assert.deepStrictEqual(listToArray(addTwoNumbers(buildList([7, 2, 4, 3]), buildList([5, 6, 4]))), [7, 8, 0, 7]);
  assert.deepStrictEqual(listToArray(addTwoNumbers(buildList([2, 4, 3]), buildList([5, 6, 4]))), [8, 0, 7]);
  assert.deepStrictEqual(listToArray(addTwoNumbers(buildList([0]), buildList([0]))), [0]);
});

test('final carry creates a new leading node', () => {
  assert.deepStrictEqual(listToArray(addTwoNumbers(buildList([9, 9, 9]), buildList([1]))), [1, 0, 0, 0]);
  assert.deepStrictEqual(listToArray(addTwoNumbers(buildList([5]), buildList([5]))), [1, 0]);
});

test('matches BigInt on 100-digit numbers and leaves inputs unchanged', () => {
  for (let t = 0; t < 500; t++) {
    const a = Math.random() < 0.05 ? [0] : digits(1 + Math.floor(Math.random() * 100));
    const b = digits(1 + Math.floor(Math.random() * 100));
    const l1 = buildList(a), l2 = buildList(b);
    const want = (BigInt(a.join('')) + BigInt(b.join(''))).toString().split('').map(Number);
    assert.deepStrictEqual(listToArray(addTwoNumbers(l1, l2)), want);
    assert.deepStrictEqual(listToArray(l1), a);
    assert.deepStrictEqual(listToArray(l2), b);
  }
});
