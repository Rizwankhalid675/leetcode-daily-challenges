const test = require('node:test');
const assert = require('node:assert');
const { isPalindrome } = require('./solution');

const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

const viaString = (x) => String(x) === String(x).split('').reverse().join('');

test('official examples', () => {
  assert.strictEqual(isPalindrome(121), true);
  assert.strictEqual(isPalindrome(-121), false);
  assert.strictEqual(isPalindrome(10), false);
});

test('edge cases', () => {
  assert.strictEqual(isPalindrome(0), true);
  assert.strictEqual(isPalindrome(7), true);
  assert.strictEqual(isPalindrome(11), true);
  assert.strictEqual(isPalindrome(1001), true);
  assert.strictEqual(isPalindrome(1000021), false);
  assert.strictEqual(isPalindrome(2147483647), false);
  assert.strictEqual(isPalindrome(-2147483648), false);
  assert.strictEqual(isPalindrome(2147447412), true);
});

test('matches string reversal', () => {
  for (let x = -50; x <= 20000; x++) assert.strictEqual(isPalindrome(x), viaString(x), 'x=' + x);
  for (let t = 0; t < 2000; t++) {
    const x = rint(-2147483648, 2147483647);
    assert.strictEqual(isPalindrome(x), viaString(x), 'x=' + x);
  }
});
