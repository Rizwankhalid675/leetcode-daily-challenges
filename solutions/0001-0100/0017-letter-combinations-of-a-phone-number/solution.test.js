const test = require('node:test');
const assert = require('node:assert');
const { letterCombinations } = require('./solution');

test('official examples (any order accepted)', () => {
  assert.deepStrictEqual(letterCombinations('23').sort(), ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']);
  assert.deepStrictEqual(letterCombinations('2').sort(), ['a', 'b', 'c']);
});

test('counts and uniqueness', () => {
  assert.strictEqual(letterCombinations('79').length, 16); // 4 * 4
  assert.strictEqual(letterCombinations('7979').length, 256); // maximum size
  const all = letterCombinations('234');
  assert.strictEqual(new Set(all).size, all.length);
  assert.deepStrictEqual(letterCombinations(''), []); // defensive
});
