const test = require('node:test');
const assert = require('node:assert');
const { braceExpansionII } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(braceExpansionII('{a,b}{c,{d,e}}'), ['ac', 'ad', 'ae', 'bc', 'bd', 'be']);
  assert.deepStrictEqual(braceExpansionII('{{a,z},a{b,c},{ab,z}}'), ['a', 'ab', 'ac', 'z']);
});

test('grammar examples from the statement', () => {
  assert.deepStrictEqual(braceExpansionII('a'), ['a']);
  assert.deepStrictEqual(braceExpansionII('{a,b,c}'), ['a', 'b', 'c']);
  assert.deepStrictEqual(braceExpansionII('{{a,b},{b,c}}'), ['a', 'b', 'c']);
  assert.deepStrictEqual(braceExpansionII('{a,b}{c,d}'), ['ac', 'ad', 'bc', 'bd']);
  assert.deepStrictEqual(braceExpansionII('a{b,c}{d,e}f{g,h}'), [
    'abdfg', 'abdfh', 'abefg', 'abefh', 'acdfg', 'acdfh', 'acefg', 'acefh',
  ]);
});

test('edge cases', () => {
  assert.deepStrictEqual(braceExpansionII('abc'), ['abc']); // plain concatenation of letters
  assert.deepStrictEqual(braceExpansionII('{a,a}{a,a}'), ['aa']); // duplicates collapse
  assert.deepStrictEqual(braceExpansionII('{{{a}}}'), ['a']); // deep nesting
  assert.deepStrictEqual(braceExpansionII('{a,b}c{d,e}'), ['acd', 'ace', 'bcd', 'bce']);
  assert.deepStrictEqual(braceExpansionII('{b,a}'), ['a', 'b']); // output sorted
});
