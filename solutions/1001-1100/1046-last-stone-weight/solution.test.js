const test = require('node:test');
const assert = require('node:assert');
const { lastStoneWeight } = require('./solution');

function bySort(stones) {
  const s = [...stones];
  while (s.length > 1) { s.sort((a, b) => a - b); const y = s.pop(), x = s.pop(); if (y !== x) s.push(y - x); }
  return s[0] ?? 0;
}

test('official examples', () => {
  assert.strictEqual(lastStoneWeight([2, 7, 4, 1, 8, 1]), 1);
  assert.strictEqual(lastStoneWeight([1]), 1);
});

test('matches sort-based simulation', () => {
  for (let t = 0; t < 1000; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => 1 + Math.floor(Math.random() * 20));
    assert.strictEqual(lastStoneWeight(a), bySort(a));
  }
});
