const test = require('node:test');
const assert = require('node:assert');
const { canMakeArithmeticProgression } = require('./solution');

const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

function brute(arr) {
  // try every element pair as the first two terms of the progression
  const n = arr.length;
  const want = [...arr].sort((x, y) => x - y).join(',');
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    if (i === j) continue;
    const d = arr[j] - arr[i];
    const seq = Array.from({ length: n }, (_, t) => arr[i] + t * d).sort((x, y) => x - y);
    if (seq.join(',') === want) return true;
  }
  return false;
}

test('official examples', () => {
  assert.strictEqual(canMakeArithmeticProgression([3, 5, 1]), true);
  assert.strictEqual(canMakeArithmeticProgression([1, 2, 4]), false);
});

test('edge cases: two elements, all equal, negatives', () => {
  assert.strictEqual(canMakeArithmeticProgression([7, -3]), true);
  assert.strictEqual(canMakeArithmeticProgression([4, 4, 4]), true);
  assert.strictEqual(canMakeArithmeticProgression([4, 4, 5]), false);
  assert.strictEqual(canMakeArithmeticProgression([-1000000, 0, 1000000]), true);
  assert.strictEqual(canMakeArithmeticProgression([10, 1, 100]), false); // lexicographic sort would pass this wrongly
});

test('matches brute force on random small arrays', () => {
  for (let t = 0; t < 1000; t++) {
    let arr;
    if (Math.random() < 0.5) {
      const a0 = rint(-10, 10), d = rint(-4, 4), n = rint(2, 6);
      arr = Array.from({ length: n }, (_, i) => a0 + i * d).sort(() => Math.random() - 0.5);
      if (Math.random() < 0.5) arr[rint(0, n - 1)] += rint(-2, 2);
    } else {
      arr = Array.from({ length: rint(2, 6) }, () => rint(-5, 5));
    }
    assert.strictEqual(canMakeArithmeticProgression(arr), brute(arr), JSON.stringify(arr));
  }
});
