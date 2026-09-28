const test = require('node:test');
const assert = require('node:assert');
const { uniformArray } = require('./solution');

// Brute force over every allowed choice; used to back up the parity proof.
function brute(a) {
  const options = a.map((x, i) => [x, ...a.filter((_, j) => j !== i).map((y) => x - y)]);
  const ok = (want) => options.every((opts) => opts.some((v) => Math.abs(v % 2) === want));
  return ok(0) || ok(1);
}

test('official examples', () => {
  assert.strictEqual(uniformArray([2, 3]), true);
  assert.strictEqual(uniformArray([4, 6]), true);
});

test('matches brute force on random small arrays', () => {
  for (let t = 0; t < 500; t++) {
    const set = new Set();
    const n = 1 + Math.floor(Math.random() * 6);
    while (set.size < n) set.add(1 + Math.floor(Math.random() * 100));
    const a = [...set];
    assert.strictEqual(uniformArray(a), brute(a), JSON.stringify(a));
  }
});
