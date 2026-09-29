const test = require('node:test');
const assert = require('node:assert');
const { peakIndexInMountainArray } = require('./solution');

test('official examples', () => {
  assert.strictEqual(peakIndexInMountainArray([0, 1, 0]), 1);
  assert.strictEqual(peakIndexInMountainArray([0, 2, 1, 0]), 1);
  assert.strictEqual(peakIndexInMountainArray([0, 10, 5, 2]), 1);
});

test('matches argmax on random mountains', () => {
  for (let t = 0; t < 1000; t++) {
    const up = 1 + Math.floor(Math.random() * 10), down = 1 + Math.floor(Math.random() * 10);
    const a = [];
    let v = 0;
    for (let i = 0; i <= up; i++) a.push((v += 1 + Math.floor(Math.random() * 3)));
    for (let i = 0; i < down; i++) a.push((v -= 1 + Math.floor(Math.random() * 3)));
    assert.strictEqual(peakIndexInMountainArray(a), up);
  }
});
