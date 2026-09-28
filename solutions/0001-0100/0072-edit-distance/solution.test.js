const test = require('node:test');
const assert = require('node:assert');
const { minDistance } = require('./solution');

// Reference: BFS over strings using the three operations (tiny alphabet and lengths only).
function bfs(a, b) {
  const alphabet = [...new Set(a + b)];
  const seen = new Set([a]);
  let frontier = [a];
  for (let d = 0; ; d++) {
    if (frontier.includes(b)) return d;
    const next = [];
    for (const s of frontier) {
      const cands = [];
      for (let i = 0; i <= s.length; i++) for (const c of alphabet) cands.push(s.slice(0, i) + c + s.slice(i)); // insert
      for (let i = 0; i < s.length; i++) {
        cands.push(s.slice(0, i) + s.slice(i + 1)); // delete
        for (const c of alphabet) cands.push(s.slice(0, i) + c + s.slice(i + 1)); // replace
      }
      for (const t of cands) if (t.length <= Math.max(a.length, b.length) && !seen.has(t)) seen.add(t), next.push(t);
    }
    frontier = next;
  }
}

test('official examples', () => {
  assert.strictEqual(minDistance('horse', 'ros'), 3);
  assert.strictEqual(minDistance('intention', 'execution'), 5);
});

test('edge cases', () => {
  assert.strictEqual(minDistance('', ''), 0);
  assert.strictEqual(minDistance('', 'abc'), 3);
  assert.strictEqual(minDistance('abc', ''), 3);
  assert.strictEqual(minDistance('abc', 'abc'), 0);
});

test('matches BFS over edit operations on tiny strings', () => {
  for (let t = 0; t < 150; t++) {
    const r = () => Array.from({ length: Math.floor(Math.random() * 4) }, () => 'ab'[Math.floor(Math.random() * 2)]).join('');
    const a = r();
    const b = r();
    assert.strictEqual(minDistance(a, b), bfs(a, b), JSON.stringify([a, b]));
  }
});
