const test = require('node:test');
const assert = require('node:assert');
const { reductionOperations } = require('./solution');

function simulate(a) {
  a = [...a];
  let ops = 0;
  for (;;) {
    const mx = Math.max(...a), mn = Math.min(...a);
    if (mx === mn) return ops;
    const idx = a.indexOf(mx);
    const next = Math.max(...a.filter((x) => x < mx));
    a[idx] = next;
    ops++;
  }
}

test('official examples', () => {
  assert.strictEqual(reductionOperations([5, 1, 3]), 3);
  assert.strictEqual(reductionOperations([1, 1, 1]), 0);
  assert.strictEqual(reductionOperations([1, 1, 2, 2, 3]), 4);
});

test('matches literal simulation', () => {
  for (let t = 0; t < 1000; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 8) }, () => 1 + Math.floor(Math.random() * 6));
    assert.strictEqual(reductionOperations([...a]), simulate(a));
  }
});
