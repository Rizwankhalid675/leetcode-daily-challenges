const test = require('node:test');
const assert = require('node:assert');
const { findDisappearedNumbers } = require('./solution');

const brute = (a) => { const s = new Set(a); const out = []; for (let v = 1; v <= a.length; v++) if (!s.has(v)) out.push(v); return out; };

test('official examples', () => {
  assert.deepStrictEqual(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]), [5, 6]);
  assert.deepStrictEqual(findDisappearedNumbers([1, 1]), [2]);
});

test('matches Set-based reference', () => {
  for (let t = 0; t < 500; t++) {
    const n = 1 + Math.floor(Math.random() * 12);
    const a = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * n));
    assert.deepStrictEqual(findDisappearedNumbers([...a]), brute(a));
  }
});
