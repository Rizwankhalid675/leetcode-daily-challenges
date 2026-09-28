const test = require('node:test');
const assert = require('node:assert');
const { countCommas } = require('./solution');

test('official examples', () => {
  assert.strictEqual(countCommas(1002), 3);
  assert.strictEqual(countCommas(998), 0);
});

test('edge cases', () => {
  assert.strictEqual(countCommas(1), 0);
  assert.strictEqual(countCommas(999), 0);
  assert.strictEqual(countCommas(1000), 1); // first number with a comma
  assert.strictEqual(countCommas(100000), 99001); // every number from 1,000 to 100,000 has one comma
});

test('matches Intl formatting on the whole range', () => {
  const fmt = new Intl.NumberFormat('en-US');
  let expected = 0;
  for (let x = 1; x <= 20000; x++) expected += (fmt.format(x).match(/,/g) || []).length;
  assert.strictEqual(countCommas(20000), expected);
});
