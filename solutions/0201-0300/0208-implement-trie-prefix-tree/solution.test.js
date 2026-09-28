const test = require('node:test');
const assert = require('node:assert');
const { Trie } = require('./solution');

test('official example', () => {
  const t = new Trie();
  t.insert('apple');
  assert.strictEqual(t.search('apple'), true);
  assert.strictEqual(t.search('app'), false); // prefix of a word is not a word
  assert.strictEqual(t.startsWith('app'), true);
  t.insert('app');
  assert.strictEqual(t.search('app'), true);
});

test('matches a Set-based reference under random operations', () => {
  for (let run = 0; run < 100; run++) {
    const t = new Trie();
    const words = new Set();
    for (let op = 0; op < 200; op++) {
      const w = Array.from({ length: 1 + Math.floor(Math.random() * 4) }, () => 'ab'[Math.floor(Math.random() * 2)]).join('');
      const kind = Math.floor(Math.random() * 3);
      if (kind === 0) {
        t.insert(w);
        words.add(w);
      } else if (kind === 1) {
        assert.strictEqual(t.search(w), words.has(w));
      } else {
        assert.strictEqual(t.startsWith(w), [...words].some((x) => x.startsWith(w)));
      }
    }
  }
});
