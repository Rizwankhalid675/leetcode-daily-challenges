const test = require('node:test');
const assert = require('node:assert');
const { reverseVowels } = require('./solution');

// Reference: pull the vowels out, reverse them, put them back.
function reference(s) {
  const isV = (c) => 'aeiouAEIOU'.includes(c);
  const vs = [...s].filter(isV).reverse();
  let k = 0;
  return [...s].map((c) => (isV(c) ? vs[k++] : c)).join('');
}

test('official examples', () => {
  assert.strictEqual(reverseVowels('IceCreAm'), 'AceCreIm');
  assert.strictEqual(reverseVowels('leetcode'), 'leotcede');
});

test('edge cases', () => {
  assert.strictEqual(reverseVowels('bcd'), 'bcd'); // no vowels
  assert.strictEqual(reverseVowels('a'), 'a');
  assert.strictEqual(reverseVowels('aA'), 'Aa'); // case preserved per character
  assert.strictEqual(reverseVowels(' .,!?'), ' .,!?'); // printable ASCII
});

test('matches reference on random ASCII strings', () => {
  for (let t = 0; t < 1000; t++) {
    const s = Array.from({ length: Math.floor(Math.random() * 15) + 1 }, () => 'aEibxO .uZ'[Math.floor(Math.random() * 10)]).join('');
    assert.strictEqual(reverseVowels(s), reference(s), s);
  }
});
