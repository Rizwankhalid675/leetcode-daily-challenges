const test = require('node:test');
const assert = require('node:assert');
const { largestOverlap } = require('./solution');

// Reference: try every shift and count overlapping ones directly.
function brute(img1, img2) {
  const n = img1.length;
  let best = 0;
  for (let dr = -(n - 1); dr < n; dr++)
    for (let dc = -(n - 1); dc < n; dc++) {
      let count = 0;
      for (let r = 0; r < n; r++)
        for (let c = 0; c < n; c++) {
          const r2 = r + dr;
          const c2 = c + dc;
          if (r2 >= 0 && r2 < n && c2 >= 0 && c2 < n && img1[r][c] === 1 && img2[r2][c2] === 1) count++;
        }
      best = Math.max(best, count);
    }
  return best;
}

const random = (n, p) => Array.from({ length: n }, () => Array.from({ length: n }, () => (Math.random() < p ? 1 : 0)));

test('official examples', () => {
  assert.strictEqual(largestOverlap([[1, 1, 0], [0, 1, 0], [0, 1, 0]], [[0, 0, 0], [0, 1, 1], [0, 0, 1]]), 3);
  assert.strictEqual(largestOverlap([[1]], [[1]]), 1);
  assert.strictEqual(largestOverlap([[0]], [[0]]), 0);
});

test('edge cases', () => {
  assert.strictEqual(largestOverlap([[1, 0], [0, 0]], [[0, 0], [0, 1]]), 1); // needs the maximal shift
  const full = Array.from({ length: 30 }, () => Array(30).fill(1));
  assert.strictEqual(largestOverlap(full, full), 900);
});

test('matches brute force on random images', () => {
  for (let t = 0; t < 200; t++) {
    const n = 1 + Math.floor(Math.random() * 6);
    const a = random(n, Math.random());
    const b = random(n, Math.random());
    assert.strictEqual(largestOverlap(a, b), brute(a, b));
  }
});
