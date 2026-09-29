const test = require('node:test');
const assert = require('node:assert');
const { ladderLength } = require('./solution');

// Oracle: BFS over an explicit graph built by comparing every pair of words.
function bruteForce(begin, end, list) {
  const words = [begin, ...new Set(list)];
  const diff1 = (a, b) => { let d = 0; for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++; return d === 1; };
  const dist = new Map([[0, 1]]);
  const q = [0];
  for (let h = 0; h < q.length; h++) {
    const u = q[h];
    if (words[u] === end && u !== 0) return dist.get(u);
    for (let v = 1; v < words.length; v++) if (!dist.has(v) && diff1(words[u], words[v])) { dist.set(v, dist.get(u) + 1); q.push(v); }
  }
  return 0;
}

test('official examples', () => {
  assert.strictEqual(ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']), 5);
  assert.strictEqual(ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log']), 0);
});

test('edge cases', () => {
  assert.strictEqual(ladderLength('a', 'c', ['a', 'b', 'c']), 2);
  assert.strictEqual(ladderLength('hot', 'dog', ['hot', 'dog']), 0); // two letters differ
  assert.strictEqual(ladderLength('hot', 'dot', ['dot']), 2);
});

test('matches pairwise-graph BFS on random word lists', () => {
  for (let t = 0; t < 1000; t++) {
    const L = 1 + Math.floor(Math.random() * 3);
    const w = () => Array.from({ length: L }, () => 'abc'[Math.floor(Math.random() * 3)]).join('');
    const begin = w();
    let end = w();
    while (end === begin) end = w();
    const list = Array.from({ length: Math.floor(Math.random() * 10) }, w);
    if (Math.random() < 0.7) list.push(end);
    assert.strictEqual(ladderLength(begin, end, list), bruteForce(begin, end, list));
  }
});

test('5000 ten-letter words finish quickly', () => {
  const list = new Set();
  while (list.size < 5000) list.add(Array.from({ length: 10 }, () => 'abcd'[Math.floor(Math.random() * 4)]).join(''));
  const arr = [...list];
  const t0 = Date.now();
  ladderLength('aaaaaaaaaa', arr[arr.length - 1], arr);
  assert.ok(Date.now() - t0 < 1000);
});
