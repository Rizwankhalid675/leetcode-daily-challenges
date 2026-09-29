const test = require('node:test');
const assert = require('node:assert');
const { licenseKeyFormatting } = require('./solution');

test('official examples', () => {
  assert.strictEqual(licenseKeyFormatting('5F3Z-2e-9-w', 4), '5F3Z-2E9W');
  assert.strictEqual(licenseKeyFormatting('2-5g-3-J', 2), '2-5G-3J');
});

test('edge cases', () => {
  assert.strictEqual(licenseKeyFormatting('---', 3), ''); // only dashes
  assert.strictEqual(licenseKeyFormatting('a', 2), 'A');
  assert.strictEqual(licenseKeyFormatting('abcd', 2), 'AB-CD');
});
