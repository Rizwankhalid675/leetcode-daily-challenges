const test = require('node:test');
const assert = require('node:assert');
const { expect } = require('./solution');

test('official examples', () => {
  assert.strictEqual(expect(5).toBe(5), true);
  assert.throws(() => expect(5).toBe(null), { message: 'Not Equal' });
  assert.strictEqual(expect(5).notToBe(null), true);
});

test('uses strict equality', () => {
  assert.throws(() => expect(5).notToBe(5), { message: 'Equal' });
  assert.throws(() => expect(1).toBe('1'), { message: 'Not Equal' });
  assert.strictEqual(expect(0).notToBe(false), true);
  assert.throws(() => expect({}).toBe({}), { message: 'Not Equal' });
});
