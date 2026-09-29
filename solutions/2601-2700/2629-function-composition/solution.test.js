const test = require('node:test');
const assert = require('node:assert');
const { compose } = require('./solution');

test('official examples', () => {
  assert.strictEqual(compose([(x) => x + 1, (x) => x * x, (x) => 2 * x])(4), 65);
  assert.strictEqual(compose([(x) => 10 * x, (x) => 10 * x, (x) => 10 * x])(1), 1000);
  assert.strictEqual(compose([])(42), 42);
});

test('matches nested calls on random pipelines', () => {
  const pool = [(x) => x + 1, (x) => x * 2, (x) => x - 3, (x) => -x, (x) => x * x % 97];
  for (let t = 0; t < 300; t++) {
    const fns = Array.from({ length: Math.floor(Math.random() * 6) }, () => pool[Math.floor(Math.random() * pool.length)]);
    const x = Math.floor(Math.random() * 41) - 20;
    let expected = x;
    for (const f of [...fns].reverse()) expected = f(expected);
    assert.strictEqual(compose(fns)(x), expected);
  }
});
