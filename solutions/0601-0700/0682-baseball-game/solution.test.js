const test = require('node:test');
const assert = require('node:assert');
const { calPoints } = require('./solution');

test('official examples', () => {
  assert.strictEqual(calPoints(['5', '2', 'C', 'D', '+']), 30);
  assert.strictEqual(calPoints(['5', '-2', '4', 'C', 'D', '9', '+', '+']), 27);
  assert.strictEqual(calPoints(['1', 'C']), 0);
});

test('negative numbers and chained doubles', () => {
  assert.strictEqual(calPoints(['-30000', 'D', 'D']), -30000 - 60000 - 120000);
  assert.strictEqual(calPoints(['3', '4', '+', 'C', 'C', 'C']), 0);
});
