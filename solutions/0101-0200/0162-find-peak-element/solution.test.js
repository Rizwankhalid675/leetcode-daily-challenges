const test = require('node:test');
const assert = require('node:assert');
const { findPeakElement } = require('./solution');

const isPeak = (a, i) => (i === 0 || a[i] > a[i - 1]) && (i === a.length - 1 || a[i] > a[i + 1]);

test('official examples (any peak is accepted)', () => {
  assert.ok(isPeak([1, 2, 3, 1], findPeakElement([1, 2, 3, 1])));
  const b = [1, 2, 1, 3, 5, 6, 4];
  assert.ok([1, 5].includes(findPeakElement(b)));
});

test('edge cases', () => {
  assert.strictEqual(findPeakElement([7]), 0);
  assert.strictEqual(findPeakElement([1, 2]), 1); // increasing: last element
  assert.strictEqual(findPeakElement([2, 1]), 0); // decreasing: first element
  assert.ok(isPeak([-(2 ** 31), 2 ** 31 - 1], findPeakElement([-(2 ** 31), 2 ** 31 - 1])));
});

test('always returns a valid peak on random arrays with no equal neighbours', () => {
  for (let t = 0; t < 2000; t++) {
    const a = [Math.floor(Math.random() * 10)];
    for (let i = 1; i < 1 + Math.floor(Math.random() * 15); i++) {
      let v;
      do v = Math.floor(Math.random() * 10);
      while (v === a[i - 1]);
      a.push(v);
    }
    assert.ok(isPeak(a, findPeakElement(a)), JSON.stringify(a));
  }
});
