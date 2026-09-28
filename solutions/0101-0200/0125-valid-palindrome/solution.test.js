const test = require('node:test');
const assert = require('node:assert');
const { isPalindrome } = require('./solution');

const reference = (s) => {
  const t = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return t === [...t].reverse().join('');
};

test('official examples', () => {
  assert.strictEqual(isPalindrome('A man, a plan, a canal: Panama'), true);
  assert.strictEqual(isPalindrome('race a car'), false);
  assert.strictEqual(isPalindrome(' '), true); // empty after filtering
});

test('digits matter; random comparison', () => {
  assert.strictEqual(isPalindrome('0P'), false); // '0' vs 'p' differ
  assert.strictEqual(isPalindrome('1a1'), true);
  for (let t = 0; t < 2000; t++) {
    const s = Array.from({ length: Math.floor(Math.random() * 10) }, () => 'aA1 ,.bB'[Math.floor(Math.random() * 8)]).join('');
    assert.strictEqual(isPalindrome(s), reference(s), JSON.stringify(s));
  }
});
