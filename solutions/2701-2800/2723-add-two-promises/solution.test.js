const test = require('node:test');
const assert = require('node:assert');
const { addTwoPromises } = require('./solution');

const later = (v, ms) => new Promise((res) => setTimeout(() => res(v), ms));

test('official examples (scaled delays)', async () => {
  assert.strictEqual(await addTwoPromises(later(2, 20), later(5, 60)), 7);
  assert.strictEqual(await addTwoPromises(later(10, 50), later(-12, 30)), -2);
});

test('waits concurrently, not one after the other', async () => {
  const start = Date.now();
  assert.strictEqual(await addTwoPromises(later(1, 60), later(1, 60)), 2);
  assert.ok(Date.now() - start < 110);
});

test('already-resolved promises', async () => {
  assert.strictEqual(await addTwoPromises(Promise.resolve(2), Promise.resolve(2)), 4);
});
