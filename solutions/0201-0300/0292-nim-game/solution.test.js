const test = require('node:test');
const assert = require('node:assert');
const { canWinNim } = require('./solution');

// Oracle: win/lose DP over heap sizes.
function table(max) {
  const win = [false];
  for (let n = 1; n <= max; n++) win[n] = [1, 2, 3].some((t) => t <= n && !win[n - t]);
  return win;
}

test('official examples', () => {
  assert.strictEqual(canWinNim(4), false);
  assert.strictEqual(canWinNim(1), true);
  assert.strictEqual(canWinNim(2), true);
});

test('matches game DP for n up to 500', () => {
  const win = table(500);
  for (let n = 1; n <= 500; n++) assert.strictEqual(canWinNim(n), win[n]);
});

test('largest input', () => {
  assert.strictEqual(canWinNim(2147483647), true);
  assert.strictEqual(canWinNim(2147483644), false);
});
