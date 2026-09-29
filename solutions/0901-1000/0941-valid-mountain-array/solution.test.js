const test = require('node:test');
const assert = require('node:assert');
const { validMountainArray } = require('./solution');

function brute(a) {
  if (a.length < 3) return false;
  for (let p = 1; p < a.length - 1; p++) {
    let ok = true;
    for (let i = 0; i < p; i++) if (!(a[i] < a[i + 1])) ok = false;
    for (let i = p; i < a.length - 1; i++) if (!(a[i] > a[i + 1])) ok = false;
    if (ok) return true;
  }
  return false;
}

test('official examples', () => {
  assert.strictEqual(validMountainArray([2, 1]), false);
  assert.strictEqual(validMountainArray([3, 5, 5]), false);
  assert.strictEqual(validMountainArray([0, 3, 2, 1]), true);
});

test('matches brute force', () => {
  for (let t = 0; t < 2000; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 7) }, () => Math.floor(Math.random() * 5));
    assert.strictEqual(validMountainArray(a), brute(a), JSON.stringify(a));
  }
});
