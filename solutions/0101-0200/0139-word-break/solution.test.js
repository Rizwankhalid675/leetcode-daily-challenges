const test = require('node:test');
const assert = require('node:assert');
const { wordBreak } = require('./solution');

// Oracle: plain recursion, trying every word as the next piece.
function brute(s, dict) {
  const go = (i) => i === s.length || dict.some((w) => s.startsWith(w, i) && go(i + w.length));
  return go(0);
}

test('official examples', () => {
  assert.strictEqual(wordBreak('leetcode', ['leet', 'code']), true);
  assert.strictEqual(wordBreak('applepenapple', ['apple', 'pen']), true);
  assert.strictEqual(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']), false);
});

test('matches recursion on random inputs', () => {
  for (let t = 0; t < 2000; t++) {
    const dict = [...new Set(Array.from({ length: 1 + Math.floor(Math.random() * 4) }, () =>
      Array.from({ length: 1 + Math.floor(Math.random() * 3) }, () => 'ab'[Math.floor(Math.random() * 2)]).join('')))];
    const s = Array.from({ length: 1 + Math.floor(Math.random() * 12) }, () => 'ab'[Math.floor(Math.random() * 2)]).join('');
    assert.strictEqual(wordBreak(s, dict), brute(s, dict), JSON.stringify([s, dict]));
  }
});

test('worst case: many overlapping words, unsplittable tail', () => {
  const dict = Array.from({ length: 20 }, (_, i) => 'a'.repeat(i + 1));
  const t0 = Date.now();
  assert.strictEqual(wordBreak('a'.repeat(299) + 'b', dict), false);
  assert.strictEqual(wordBreak('a'.repeat(300), dict), true);
  assert.ok(Date.now() - t0 < 1000);
});
