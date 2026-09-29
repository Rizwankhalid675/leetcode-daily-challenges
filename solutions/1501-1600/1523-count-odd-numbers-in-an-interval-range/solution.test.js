const test = require('node:test');
const assert = require('node:assert');
const { countOdds } = require('./solution');

test('official examples', () => {
  assert.strictEqual(countOdds(3, 7), 3);
  assert.strictEqual(countOdds(8, 10), 1);
});

test('matches direct counting', () => {
  for (let low = 0; low <= 40; low++)
    for (let high = low; high <= 40; high++) {
      let c = 0;
      for (let x = low; x <= high; x++) if (x % 2) c++;
      assert.strictEqual(countOdds(low, high), c);
    }
});

test('extremes', () => {
  assert.strictEqual(countOdds(0, 0), 0);
  assert.strictEqual(countOdds(0, 1e9), 5e8);
  assert.strictEqual(countOdds(1e9, 1e9), 0);
  assert.strictEqual(countOdds(999999999, 1e9), 1);
});
