const test = require('node:test');
const assert = require('node:assert');
const { argumentsLength } = require('./solution');

test('official examples', () => {
  assert.strictEqual(argumentsLength(5), 1);
  assert.strictEqual(argumentsLength({}, null, '3'), 3);
});

test('counts explicit undefined and zero arguments', () => {
  assert.strictEqual(argumentsLength(), 0);
  assert.strictEqual(argumentsLength(undefined, undefined), 2);
  assert.strictEqual(argumentsLength(...new Array(100).fill(0)), 100);
});
