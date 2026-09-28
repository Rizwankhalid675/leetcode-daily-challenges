const test = require('node:test');
const assert = require('node:assert');
const { groupAnagrams } = require('./solution');

// Normalize: sort within groups and sort groups, since any order is accepted.
const norm = (groups) => groups.map((g) => [...g].sort()).sort((a, b) => a.join().localeCompare(b.join()));

test('official examples', () => {
  assert.deepStrictEqual(norm(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])), norm([['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']]));
  assert.deepStrictEqual(groupAnagrams(['']), [['']]);
  assert.deepStrictEqual(groupAnagrams(['a']), [['a']]);
});

test('matches sorted-key grouping', () => {
  for (let t = 0; t < 500; t++) {
    const strs = Array.from({ length: 1 + Math.floor(Math.random() * 8) }, () => Array.from({ length: Math.floor(Math.random() * 4) }, () => 'ab'[Math.floor(Math.random() * 2)]).join(''));
    const ref = new Map();
    for (const s of strs) {
      const k = [...s].sort().join('');
      if (!ref.has(k)) ref.set(k, []);
      ref.get(k).push(s);
    }
    assert.deepStrictEqual(norm(groupAnagrams(strs)), norm([...ref.values()]));
  }
});
