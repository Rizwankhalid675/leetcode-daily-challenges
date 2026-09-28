const test = require('node:test');
const assert = require('node:assert');
const { lengthOfLastWord } = require('./solution');

const reference = (s) => s.trim().split(/ +/).pop().length;

test('official examples', () => {
  assert.strictEqual(lengthOfLastWord('Hello World'), 5);
  assert.strictEqual(lengthOfLastWord('   fly me   to   the moon  '), 4);
  assert.strictEqual(lengthOfLastWord('luffy is still joyboy'), 6);
});

test('edge cases and random', () => {
  assert.strictEqual(lengthOfLastWord('a'), 1);
  assert.strictEqual(lengthOfLastWord('a   '), 1);
  for (let t = 0; t < 1000; t++) {
    let s = Array.from({ length: 1 + Math.floor(Math.random() * 12) }, () => 'ab '[Math.floor(Math.random() * 3)]).join('');
    if (!/[ab]/.test(s)) s += 'a';
    assert.strictEqual(lengthOfLastWord(s), reference(s), JSON.stringify(s));
  }
});
