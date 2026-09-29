const test = require('node:test');
const assert = require('node:assert');
const { pivotInteger } = require('./solution');

function brute(n) {
  for (let x = 1; x <= n; x++) {
    let left = 0, right = 0;
    for (let i = 1; i <= x; i++) left += i;
    for (let i = x; i <= n; i++) right += i;
    if (left === right) return x;
  }
  return -1;
}

test('official examples', () => {
  assert.strictEqual(pivotInteger(8), 6);
  assert.strictEqual(pivotInteger(1), 1);
  assert.strictEqual(pivotInteger(4), -1);
});

test('matches brute force for every n in 1..1000', () => {
  for (let n = 1; n <= 1000; n++) assert.strictEqual(pivotInteger(n), brute(n), 'n=' + n);
});
