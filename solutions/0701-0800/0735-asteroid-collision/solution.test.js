const test = require('node:test');
const assert = require('node:assert');
const { asteroidCollision } = require('./solution');

// Reference: repeatedly find any adjacent (right-mover, left-mover) pair and resolve it.
function brute(input) {
  let a = [...input];
  for (;;) {
    const i = a.findIndex((x, k) => x > 0 && a[k + 1] < 0);
    if (i === -1) return a;
    const [l, r] = [a[i], -a[i + 1]];
    if (l > r) a.splice(i + 1, 1);
    else if (l < r) a.splice(i, 1);
    else a.splice(i, 2);
  }
}

test('official examples', () => {
  assert.deepStrictEqual(asteroidCollision([5, 10, -5]), [5, 10]);
  assert.deepStrictEqual(asteroidCollision([8, -8]), []);
  assert.deepStrictEqual(asteroidCollision([10, 2, -5]), [10]);
  assert.deepStrictEqual(asteroidCollision([3, 5, -6, 2, -1, 4]), [-6, 2, 4]);
});

test('edge cases', () => {
  assert.deepStrictEqual(asteroidCollision([-2, -1, 1, 2]), [-2, -1, 1, 2]); // moving apart, never meet
  assert.deepStrictEqual(asteroidCollision([1, -2, -2, -2]), [-2, -2, -2]);
});

test('matches pairwise simulation', () => {
  for (let t = 0; t < 1000; t++) {
    const a = Array.from({ length: 2 + Math.floor(Math.random() * 8) }, () => (1 + Math.floor(Math.random() * 4)) * (Math.random() < 0.5 ? -1 : 1));
    assert.deepStrictEqual(asteroidCollision(a), brute(a), JSON.stringify(a));
  }
});
