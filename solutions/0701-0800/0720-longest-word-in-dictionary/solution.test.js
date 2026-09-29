const test = require('node:test');
const assert = require('node:assert');
const { longestWord } = require('./solution');

function brute(words) {
  const set = new Set(words);
  let best = '';
  for (const w of words) {
    let ok = true;
    for (let i = 1; i < w.length; i++) if (!set.has(w.slice(0, i))) { ok = false; break; }
    if (ok && (w.length > best.length || (w.length === best.length && w < best))) best = w;
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(longestWord(['w', 'wo', 'wor', 'worl', 'world']), 'world');
  assert.strictEqual(longestWord(['a', 'banana', 'app', 'appl', 'ap', 'apply', 'apple']), 'apple');
});

test('no buildable word and duplicates', () => {
  assert.strictEqual(longestWord(['ab', 'bc']), '');
  assert.strictEqual(longestWord(['b', 'a', 'a']), 'a');
  assert.strictEqual(longestWord(['yo', 'ew', 'fc', 'zrc', 'yodn', 'fcm', 'qm', 'qmo', 'fcmz', 'z', 'ewq', 'yod', 'ewqz', 'y']), 'yodn');
});

test('matches prefix-set brute force', () => {
  for (let t = 0; t < 1000; t++) {
    const n = 1 + Math.floor(Math.random() * 15);
    const words = Array.from({ length: n }, () => {
      const len = 1 + Math.floor(Math.random() * 4);
      let s = '';
      for (let i = 0; i < len; i++) s += 'abc'[Math.floor(Math.random() * 3)];
      return s;
    });
    assert.strictEqual(longestWord(words), brute(words));
  }
});
