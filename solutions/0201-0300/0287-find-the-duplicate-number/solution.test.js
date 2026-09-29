const test = require('node:test');
const assert = require('node:assert');
const { findDuplicate } = require('./solution');

function gen(n) {
  const d = 1 + Math.floor(Math.random() * n);
  const others = [];
  for (let v = 1; v <= n; v++) if (v !== d) others.push(v);
  others.sort(() => Math.random() - 0.5);
  const k = 2 + Math.floor(Math.random() * (n - 1)); // copies of d, 2..n
  const arr = new Array(k).fill(d).concat(others.slice(0, n + 1 - k));
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return { arr, d };
}

test('official examples', () => {
  assert.strictEqual(findDuplicate([1, 3, 4, 2, 2]), 2);
  assert.strictEqual(findDuplicate([3, 1, 3, 4, 2]), 3);
  assert.strictEqual(findDuplicate([3, 3, 3, 3, 3]), 3);
});

test('random arrays with one value repeated any number of times', () => {
  for (let t = 0; t < 2000; t++) {
    const { arr, d } = gen(1 + Math.floor(Math.random() * 12));
    const copy = arr.slice();
    assert.strictEqual(findDuplicate(arr), d);
    assert.deepStrictEqual(arr, copy);
  }
});

test('max size', () => {
  const { arr, d } = gen(100000);
  const t0 = Date.now();
  assert.strictEqual(findDuplicate(arr), d);
  assert.ok(Date.now() - t0 < 1000);
});
