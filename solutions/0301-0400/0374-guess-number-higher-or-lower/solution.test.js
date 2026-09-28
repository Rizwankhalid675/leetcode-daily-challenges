const test = require('node:test');
const assert = require('node:assert');
const { guessNumber } = require('./solution');

// LeetCode provides guess() as a global; emulate it and count calls.
const play = (n, pick) => {
  let calls = 0;
  global.guess = (num) => (calls++, num > pick ? -1 : num < pick ? 1 : 0);
  const got = guessNumber(n);
  delete global.guess;
  return { got, calls };
};

test('official examples', () => {
  assert.strictEqual(play(10, 6).got, 6);
  assert.strictEqual(play(1, 1).got, 1);
  assert.strictEqual(play(2, 1).got, 1);
});

test('extremes of the range, logarithmic number of guesses', () => {
  const n = 2 ** 31 - 1;
  for (const pick of [1, 2, n - 1, n, 123456789]) {
    const { got, calls } = play(n, pick);
    assert.strictEqual(got, pick);
    assert.ok(calls <= 32, `used ${calls} guesses`);
  }
});
