const test = require('node:test');
const assert = require('node:assert');
const { createHelloWorld } = require('./solution');

test('official examples', () => {
  assert.strictEqual(createHelloWorld()(), 'Hello World');
  assert.strictEqual(createHelloWorld()({}, null, 42), 'Hello World');
});

test('each call gives a fresh, independent function', () => {
  const f = createHelloWorld();
  const g = createHelloWorld();
  assert.notStrictEqual(f, g);
  assert.strictEqual(f(1, 2, 3), g());
});
