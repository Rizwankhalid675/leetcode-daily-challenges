const test = require('node:test');
const assert = require('node:assert');
const { isHappy } = require('./solution');

// Reference: follow the sequence with a visited Set.
function reference(n) {
  const seen = new Set();
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = [...String(n)].reduce((s, d) => s + d * d, 0);
  }
  return n === 1;
}

test('official examples', () => {
  assert.strictEqual(isHappy(19), true);
  assert.strictEqual(isHappy(2), false);
});

test('matches Set-based reference for 1..5000 and the maximum', () => {
  for (let n = 1; n <= 5000; n++) assert.strictEqual(isHappy(n), reference(n), String(n));
  assert.strictEqual(isHappy(2 ** 31 - 1), reference(2 ** 31 - 1));
});
