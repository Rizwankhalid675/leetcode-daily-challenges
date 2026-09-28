const test = require('node:test');
const assert = require('node:assert');
const { closeStrings } = require('./solution');

// Reference: BFS over sorted-string states using both operations (tiny strings only).
function brute(w1, w2) {
  const norm = (s) => [...s].sort().join(''); // operation 1 makes order irrelevant
  const target = norm(w2);
  const seen = new Set([norm(w1)]);
  const queue = [norm(w1)];
  while (queue.length) {
    const s = queue.shift();
    if (s === target) return true;
    const letters = [...new Set(s)];
    for (const x of letters)
      for (const y of letters) {
        if (x >= y) continue;
        const next = norm([...s].map((c) => (c === x ? y : c === y ? x : c)).join(''));
        if (!seen.has(next)) seen.add(next), queue.push(next);
      }
  }
  return false;
}

test('official examples', () => {
  assert.strictEqual(closeStrings('abc', 'bca'), true);
  assert.strictEqual(closeStrings('a', 'aa'), false);
  assert.strictEqual(closeStrings('cabbba', 'abbccc'), true);
});

test('edge cases', () => {
  assert.strictEqual(closeStrings('ab', 'ac'), false); // same counts, different letter sets
  assert.strictEqual(closeStrings('aab', 'bba'), true); // swap roles of a and b
  assert.strictEqual(closeStrings('uau', 'ssx'), false);
});

test('matches BFS over operations', () => {
  for (let t = 0; t < 600; t++) {
    const r = () => Array.from({ length: 1 + Math.floor(Math.random() * 6) }, () => 'abc'[Math.floor(Math.random() * 3)]).join('');
    const a = r();
    const b = r();
    assert.strictEqual(closeStrings(a, b), brute(a, b), JSON.stringify([a, b]));
  }
});
