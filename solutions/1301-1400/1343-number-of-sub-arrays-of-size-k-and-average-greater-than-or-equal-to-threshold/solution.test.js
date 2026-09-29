const test = require('node:test');
const assert = require('node:assert');
const { numOfSubarrays } = require('./solution');

function brute(arr, k, th) {
  let c = 0;
  for (let i = 0; i + k <= arr.length; i++) {
    let s = 0;
    for (let j = i; j < i + k; j++) s += arr[j];
    if (s / k >= th) c++;
  }
  return c;
}

test('official examples', () => {
  assert.strictEqual(numOfSubarrays([2, 2, 2, 2, 5, 5, 5, 8], 3, 4), 3);
  assert.strictEqual(numOfSubarrays([11, 13, 17, 23, 29, 31, 7, 5, 2, 3], 3, 5), 6);
});

test('matches brute force', () => {
  for (let t = 0; t < 1000; t++) {
    const n = 1 + Math.floor(Math.random() * 15);
    const arr = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 10));
    const k = 1 + Math.floor(Math.random() * n);
    const th = Math.floor(Math.random() * 11);
    assert.strictEqual(numOfSubarrays(arr, k, th), brute(arr, k, th));
  }
});
