const test = require('node:test');
const assert = require('node:assert');
const { ListNode, buildList, listToArray } = require('../../../tests/helpers/list');

global.ListNode = ListNode; // LeetCode provides ListNode globally
const { addTwoNumbers } = require('./solution');

const run = (a, b) => listToArray(addTwoNumbers(buildList(a), buildList(b)));
// Reference: BigInt arithmetic on the reversed digit strings (numbers can have 100 digits).
const big = (digits) => BigInt([...digits].reverse().join(''));
const toDigits = (n) => [...n.toString()].reverse().map(Number);

test('official examples', () => {
  assert.deepStrictEqual(run([2, 4, 3], [5, 6, 4]), [7, 0, 8]);
  assert.deepStrictEqual(run([0], [0]), [0]);
  assert.deepStrictEqual(run([9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]), [8, 9, 9, 9, 0, 0, 0, 1]);
});

test('matches BigInt addition for random numbers up to 100 digits', () => {
  for (let t = 0; t < 500; t++) {
    const mk = () => {
      const len = 1 + Math.floor(Math.random() * 100);
      const d = Array.from({ length: len }, () => Math.floor(Math.random() * 10));
      if (len > 1 && d[len - 1] === 0) d[len - 1] = 1; // no leading zero
      return d;
    };
    const a = mk();
    const b = mk();
    assert.deepStrictEqual(run(a, b), toDigits(big(a) + big(b)));
  }
});
