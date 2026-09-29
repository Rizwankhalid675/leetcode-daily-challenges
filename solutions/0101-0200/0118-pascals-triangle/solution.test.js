const test = require('node:test');
const assert = require('node:assert');
const { generate } = require('./solution');

function binom(n, k) {
  let v = 1;
  for (let i = 1; i <= k; i++) v = (v * (n - k + i)) / i;
  return Math.round(v);
}

test('official examples', () => {
  assert.deepStrictEqual(generate(5), [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]);
  assert.deepStrictEqual(generate(1), [[1]]);
});

test('30 rows match binomial coefficients', () => {
  const rows = generate(30);
  assert.strictEqual(rows.length, 30);
  for (let n = 0; n < 30; n++) {
    assert.strictEqual(rows[n].length, n + 1);
    for (let k = 0; k <= n; k++) assert.strictEqual(rows[n][k], binom(n, k), n + ',' + k);
  }
  assert.strictEqual(rows[29][14], 77558760);
});
