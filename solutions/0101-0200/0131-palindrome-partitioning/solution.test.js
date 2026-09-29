const test = require('node:test');
const assert = require('node:assert');
const { partition } = require('./solution');

function brute(s) {
  const out = [];
  const n = s.length;
  for (let mask = 0; mask < 1 << (n - 1); mask++) {
    const parts = [];
    let start = 0;
    for (let i = 0; i < n; i++) {
      if (i === n - 1 || ((mask >> i) & 1)) {
        parts.push(s.slice(start, i + 1));
        start = i + 1;
      }
    }
    if (parts.every((p) => p === [...p].reverse().join(''))) out.push(parts);
  }
  return out;
}
const norm = (ps) => ps.map((p) => p.join('|')).sort();

test('official examples', () => {
  assert.deepStrictEqual(norm(partition('aab')), norm([['a', 'a', 'b'], ['aa', 'b']]));
  assert.deepStrictEqual(partition('a'), [['a']]);
});

test('matches brute force over all cut positions', () => {
  for (let t = 0; t < 300; t++) {
    const n = 1 + Math.floor(Math.random() * 10);
    const s = Array.from({ length: n }, () => 'ab'[Math.floor(Math.random() * 2)]).join('');
    assert.deepStrictEqual(norm(partition(s)), norm(brute(s)));
  }
});

test('worst case (16 equal letters) gives 2^15 partitions quickly', () => {
  const t0 = Date.now();
  assert.strictEqual(partition('a'.repeat(16)).length, 1 << 15);
  assert.ok(Date.now() - t0 < 1000);
});
