const test = require('node:test');
const assert = require('node:assert');
const { nextPermutation } = require('./solution');

function allPerms(arr) {
  const out = new Set();
  const go = (cur, rest) => {
    if (!rest.length) { out.add(cur.join(',')); return; }
    for (let i = 0; i < rest.length; i++) go(cur.concat(rest[i]), rest.slice(0, i).concat(rest.slice(i + 1)));
  };
  go([], arr);
  return [...out].map((s) => s.split(',').map(Number)).sort((a, b) => {
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return a[i] - b[i];
    return 0;
  });
}
const run = (a) => {
  const c = a.slice();
  assert.strictEqual(nextPermutation(c), undefined);
  return c;
};

test('official examples (mutates in place)', () => {
  assert.deepStrictEqual(run([1, 2, 3]), [1, 3, 2]);
  assert.deepStrictEqual(run([3, 2, 1]), [1, 2, 3]);
  assert.deepStrictEqual(run([1, 1, 5]), [1, 5, 1]);
  assert.deepStrictEqual(run([7]), [7]);
});

test('matches the sorted list of distinct permutations (with duplicates, multi-digit values)', () => {
  for (let t = 0; t < 200; t++) {
    const n = 1 + Math.floor(Math.random() * 6);
    const a = Array.from({ length: n }, () => [0, 1, 2, 10, 100][Math.floor(Math.random() * 5)]);
    const perms = allPerms(a);
    const key = a.join(',');
    const idx = perms.findIndex((p) => p.join(',') === key);
    assert.deepStrictEqual(run(a), perms[(idx + 1) % perms.length]);
  }
});
