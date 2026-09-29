const test = require('node:test');
const assert = require('node:assert');
const { findAnagrams } = require('./solution');

function brute(s, p) {
  const key = [...p].sort().join('');
  const out = [];
  for (let i = 0; i + p.length <= s.length; i++) if ([...s.slice(i, i + p.length)].sort().join('') === key) out.push(i);
  return out;
}

test('official examples', () => {
  assert.deepStrictEqual(findAnagrams('cbaebabacd', 'abc'), [0, 6]);
  assert.deepStrictEqual(findAnagrams('abab', 'ab'), [0, 1, 2]);
});

test('p longer than s', () => {
  assert.deepStrictEqual(findAnagrams('a', 'ab'), []);
});

test('matches sort-based brute force', () => {
  for (let t = 0; t < 1000; t++) {
    const gen = (k) => Array.from({ length: 1 + Math.floor(Math.random() * k) }, () => 'abc'[Math.floor(Math.random() * 3)]).join('');
    const s = gen(15), p = gen(4);
    assert.deepStrictEqual(findAnagrams(s, p), brute(s, p));
  }
});

test('max size runs fast', () => {
  const s = 'a'.repeat(30000);
  const t0 = Date.now();
  assert.strictEqual(findAnagrams(s, 'a'.repeat(15000)).length, 15001);
  assert.ok(Date.now() - t0 < 1000);
});
