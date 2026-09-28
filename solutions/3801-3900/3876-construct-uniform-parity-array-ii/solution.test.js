const test = require('node:test');
const assert = require('node:assert');
const { uniformArray } = require('./solution');

function brute(a) {
  const options = a.map((x, i) => [x, ...a.filter((y, j) => j !== i && x - y >= 1).map((y) => x - y)]);
  const ok = (want) => options.every((opts) => opts.some((v) => v % 2 === want));
  return ok(0) || ok(1);
}

test('official examples', () => {
  assert.strictEqual(uniformArray([1, 4, 7]), true);
  assert.strictEqual(uniformArray([2, 3]), false);
  assert.strictEqual(uniformArray([4, 6]), true);
});

test('edge cases', () => {
  assert.strictEqual(uniformArray([1]), true);
  assert.strictEqual(uniformArray([2]), true);
  assert.strictEqual(uniformArray([3, 5, 9]), true); // already all odd
  assert.strictEqual(uniformArray([2, 3, 5]), false); // 2 has no smaller odd value
  assert.strictEqual(uniformArray([1e9, 999999999]), true);
});

test('matches brute force on random small arrays', () => {
  for (let t = 0; t < 1000; t++) {
    const set = new Set();
    const n = 1 + Math.floor(Math.random() * 6);
    while (set.size < n) set.add(1 + Math.floor(Math.random() * 20));
    const a = [...set];
    assert.strictEqual(uniformArray(a), brute(a), JSON.stringify(a));
  }
});
