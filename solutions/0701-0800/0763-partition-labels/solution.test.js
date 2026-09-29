const test = require('node:test');
const assert = require('node:assert');
const { partitionLabels } = require('./solution');

function brute(s) {
  const n = s.length;
  let best = null;
  for (let mask = 0; mask < 1 << (n - 1); mask++) {
    const parts = [];
    let st = 0;
    for (let i = 0; i < n; i++) if (i === n - 1 || ((mask >> i) & 1)) { parts.push(s.slice(st, i + 1)); st = i + 1; }
    const sets = parts.map((p) => new Set(p));
    let ok = true;
    for (let a = 0; a < sets.length && ok; a++)
      for (let b = a + 1; b < sets.length && ok; b++)
        for (const ch of sets[a]) if (sets[b].has(ch)) { ok = false; break; }
    if (ok && (!best || parts.length > best.length)) best = parts;
  }
  return best.map((p) => p.length);
}

test('official examples', () => {
  assert.deepStrictEqual(partitionLabels('ababcbacadefegdehijhklij'), [9, 7, 8]);
  assert.deepStrictEqual(partitionLabels('eccbbbbdec'), [10]);
});

test('matches brute force (most parts among valid cuttings)', () => {
  for (let t = 0; t < 400; t++) {
    const n = 1 + Math.floor(Math.random() * 11);
    const s = Array.from({ length: n }, () => 'abcde'[Math.floor(Math.random() * 5)]).join('');
    assert.deepStrictEqual(partitionLabels(s), brute(s));
  }
});
