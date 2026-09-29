const test = require('node:test');
const assert = require('node:assert');
const { WordDictionary } = require('./solution');

test('official example', () => {
  const d = new WordDictionary();
  d.addWord('bad');
  d.addWord('dad');
  d.addWord('mad');
  assert.strictEqual(d.search('pad'), false);
  assert.strictEqual(d.search('bad'), true);
  assert.strictEqual(d.search('.ad'), true);
  assert.strictEqual(d.search('b..'), true);
});

test('prefixes are not words; dots must match exactly one letter', () => {
  const d = new WordDictionary();
  d.addWord('abc');
  assert.strictEqual(d.search('ab'), false);
  assert.strictEqual(d.search('ab.'), true);
  assert.strictEqual(d.search('abc.'), false);
  assert.strictEqual(d.search('...'), true);
  assert.strictEqual(d.search('.'), false);
});

test('matches a regex oracle on random operations', () => {
  for (let t = 0; t < 100; t++) {
    const d = new WordDictionary();
    const words = [];
    for (let op = 0; op < 60; op++) {
      const len = 1 + Math.floor(Math.random() * 4);
      if (Math.random() < 0.4) {
        const w = Array.from({ length: len }, () => 'abc'[Math.floor(Math.random() * 3)]).join('');
        d.addWord(w);
        words.push(w);
      } else {
        const q = Array.from({ length: len }, () => 'abc.'[Math.floor(Math.random() * 4)]).join('');
        const re = new RegExp('^' + q + '$');
        assert.strictEqual(d.search(q), words.some((w) => re.test(w)), q);
      }
    }
  }
});
