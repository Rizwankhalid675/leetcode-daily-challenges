const test = require('node:test');
const assert = require('node:assert');
const { makeLargestSpecial } = require('./solution');

function isSpecial(t) {
  let bal = 0;
  for (const c of t) { bal += c === '1' ? 1 : -1; if (bal < 0) return false; }
  return bal === 0;
}
function bfs(s) {
  const seen = new Set([s]);
  const q = [s];
  let best = s;
  for (let h = 0; h < q.length; h++) {
    const cur = q[h];
    if (cur > best) best = cur;
    const n = cur.length;
    for (let i = 0; i < n; i++) for (let j = i + 2; j < n; j += 2) {
      if (!isSpecial(cur.slice(i, j))) continue;
      for (let k = j + 2; k <= n; k += 2) {
        if (!isSpecial(cur.slice(j, k))) continue;
        const nx = cur.slice(0, i) + cur.slice(j, k) + cur.slice(i, j) + cur.slice(k);
        if (!seen.has(nx)) { seen.add(nx); q.push(nx); }
      }
    }
  }
  return best;
}
function randomSpecial(pairs) {
  let s = '', open = 0, left = pairs;
  while (left > 0 || open > 0) {
    if (left > 0 && (open === 0 || Math.random() < 0.5)) { s += '1'; open++; left--; } else { s += '0'; open--; }
  }
  return s;
}

test('official examples', () => {
  assert.strictEqual(makeLargestSpecial('11011000'), '11100100');
  assert.strictEqual(makeLargestSpecial('10'), '10');
});

test('matches BFS over all reachable strings', () => {
  for (let t = 0; t < 300; t++) {
    const s = randomSpecial(1 + Math.floor(Math.random() * 6));
    assert.strictEqual(makeLargestSpecial(s), bfs(s), s);
  }
});

test('max length stays special and is a fixed point', () => {
  const s = randomSpecial(25);
  const r = makeLargestSpecial(s);
  assert.ok(isSpecial(r));
  assert.strictEqual(r.length, 50);
  assert.strictEqual(makeLargestSpecial(r), r);
});
