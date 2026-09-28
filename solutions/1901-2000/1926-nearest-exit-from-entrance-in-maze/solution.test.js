const test = require('node:test');
const assert = require('node:assert');
const { nearestExit } = require('./solution');

const grid = (rows) => rows.map((r) => r.split(''));

test('official examples', () => {
  assert.strictEqual(nearestExit(grid(['++.+', '...+', '+++.']), [1, 2]), 1);
  assert.strictEqual(nearestExit(grid(['+++', '...', '+++']), [1, 0]), 2); // entrance on border is not an exit
  assert.strictEqual(nearestExit(grid(['.+']), [0, 0]), -1);
});

test('edge cases', () => {
  assert.strictEqual(nearestExit(grid(['.']), [0, 0]), -1); // only the entrance
  assert.strictEqual(nearestExit(grid(['..']), [0, 0]), 1); // neighbour on border
  assert.strictEqual(nearestExit(grid(['+++', '+.+', '+++']), [1, 1]), -1); // walled in
});
