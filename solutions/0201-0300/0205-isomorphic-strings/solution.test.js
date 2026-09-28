const test = require('node:test');
const assert = require('node:assert');
const { isIsomorphic } = require('./solution');

// Reference: two strings are isomorphic iff their "first-occurrence index" signatures match.
const signature = (s) => [...s].map((c) => s.indexOf(c)).join(',');

test('official examples', () => {
  assert.strictEqual(isIsomorphic('egg', 'add'), true);
  assert.strictEqual(isIsomorphic('foo', 'bar'), false);
  assert.strictEqual(isIsomorphic('paper', 'title'), true);
});

test('both directions matter; random comparison', () => {
  assert.strictEqual(isIsomorphic('badc', 'baba'), false); // b->b, d->b would collide
  assert.strictEqual(isIsomorphic('ab', 'aa'), false);
  for (let t = 0; t < 2000; t++) {
    const n = 1 + Math.floor(Math.random() * 6);
    const r = () => Array.from({ length: n }, () => 'abc'[Math.floor(Math.random() * 3)]).join('');
    const s = r();
    const u = r();
    assert.strictEqual(isIsomorphic(s, u), signature(s) === signature(u), JSON.stringify([s, u]));
  }
});
