const test = require('node:test');
const assert = require('node:assert');
const { summaryRanges } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(summaryRanges([0, 1, 2, 4, 5, 7]), ['0->2', '4->5', '7']);
  assert.deepStrictEqual(summaryRanges([0, 2, 3, 4, 6, 8, 9]), ['0', '2->4', '6', '8->9']);
});

test('edge cases', () => {
  assert.deepStrictEqual(summaryRanges([]), []);
  assert.deepStrictEqual(summaryRanges([-1]), ['-1']);
  assert.deepStrictEqual(summaryRanges([-(2 ** 31), 2 ** 31 - 1]), [`${-(2 ** 31)}`, `${2 ** 31 - 1}`]);
  assert.deepStrictEqual(summaryRanges([-3, -2, -1]), ['-3->-1']);
});
