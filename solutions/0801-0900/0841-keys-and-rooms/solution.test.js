const test = require('node:test');
const assert = require('node:assert');
const { canVisitAllRooms } = require('./solution');

test('official examples', () => {
  assert.strictEqual(canVisitAllRooms([[1], [2], [3], []]), true);
  assert.strictEqual(canVisitAllRooms([[1, 3], [3, 0, 1], [2], [0]]), false); // room 2's key is locked inside room 2
});

test('edge cases', () => {
  assert.strictEqual(canVisitAllRooms([[], [0]]), false); // nothing in room 0
  assert.strictEqual(canVisitAllRooms([[1], [0]]), true); // cycles are fine
  assert.strictEqual(canVisitAllRooms([[2], [], [1]]), true); // key order doesn't matter
});
