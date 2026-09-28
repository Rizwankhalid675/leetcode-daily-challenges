const test = require('node:test');
const assert = require('node:assert');
const { suggestedProducts } = require('./solution');

const brute = (products, word) =>
  [...word].map((_, i) => products.filter((p) => p.startsWith(word.slice(0, i + 1))).sort().slice(0, 3));

test('official examples', () => {
  assert.deepStrictEqual(suggestedProducts(['mobile', 'mouse', 'moneypot', 'monitor', 'mousepad'], 'mouse'), [
    ['mobile', 'moneypot', 'monitor'],
    ['mobile', 'moneypot', 'monitor'],
    ['mouse', 'mousepad'],
    ['mouse', 'mousepad'],
    ['mouse', 'mousepad'],
  ]);
  assert.deepStrictEqual(suggestedProducts(['havana'], 'havana'), Array(6).fill(['havana']));
});

test('matches filter-and-sort reference', () => {
  for (let t = 0; t < 400; t++) {
    const r = (n) => Array.from({ length: n }, () => 'ab'[Math.floor(Math.random() * 2)]).join('');
    const products = [...new Set(Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => r(1 + Math.floor(Math.random() * 4))))];
    const word = r(1 + Math.floor(Math.random() * 5));
    assert.deepStrictEqual(suggestedProducts(products, word), brute(products, word), JSON.stringify([products, word]));
  }
});
