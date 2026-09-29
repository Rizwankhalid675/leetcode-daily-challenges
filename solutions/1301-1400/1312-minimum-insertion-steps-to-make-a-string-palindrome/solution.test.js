const test = require('node:test');
const assert = require('node:assert');
const { minInsertions } = require('./solution');

const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => ri(lo, hi));
// BFS over actual insertions (inserting only letters that occur in s is enough).
function bfs(s) {
  const isPal = (t) => t === [...t].reverse().join('');
  const letters = [...new Set(s)];
  let frontier = [s], seen = new Set([s]);
  for (let steps = 0; ; steps++) {
    if (frontier.some(isPal)) return steps;
    const next = [];
    for (const t of frontier) for (let p = 0; p <= t.length; p++) for (const c of letters) {
      const u = t.slice(0, p) + c + t.slice(p);
      if (!seen.has(u)) { seen.add(u); next.push(u); }
    }
    frontier = next;
  }
}
const rstr = (n, k) => Array.from({ length: n }, () => 'abc'[ri(0, k - 1)]).join('');

test('official examples', () => {
  assert.strictEqual(minInsertions('zzazz'), 0);
  assert.strictEqual(minInsertions('mbadm'), 2);
  assert.strictEqual(minInsertions('leetcode'), 5);
});

test('matches BFS over insertions', () => {
  for (let t = 0; t < 200; t++) {
    const s = rstr(ri(1, 6), ri(1, 3));
    assert.strictEqual(minInsertions(s), bfs(s));
  }
});

test('max size runs fast', () => {
  const t0 = Date.now();
  minInsertions(rstr(500, 3));
  assert.ok(Date.now() - t0 < 1000);
  assert.strictEqual(minInsertions('ab'.repeat(250)), 1);
});
