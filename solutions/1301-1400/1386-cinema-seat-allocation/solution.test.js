const test = require('node:test');
const assert = require('node:assert');
const { maxNumberOfFamilies } = require('./solution');

// Oracle: for each row, try every set of blocks that do not overlap.
function bruteForce(n, reserved) {
  const taken = Array.from({ length: n + 1 }, () => new Set());
  for (const [r, c] of reserved) taken[r].add(c);
  const blocks = [[2, 3, 4, 5], [4, 5, 6, 7], [6, 7, 8, 9]];
  let total = 0;
  for (let r = 1; r <= n; r++) {
    let best = 0;
    for (let mask = 0; mask < 8; mask++) {
      const used = new Set();
      let ok = true, cnt = 0;
      for (let b = 0; b < 3; b++) {
        if (!((mask >> b) & 1)) continue;
        cnt++;
        for (const s of blocks[b]) { if (used.has(s) || taken[r].has(s)) ok = false; used.add(s); }
      }
      if (ok) best = Math.max(best, cnt);
    }
    total += best;
  }
  return total;
}

test('official examples', () => {
  assert.strictEqual(maxNumberOfFamilies(3, [[1, 2], [1, 3], [1, 8], [2, 6], [3, 1], [3, 10]]), 4);
  assert.strictEqual(maxNumberOfFamilies(2, [[2, 1], [1, 8], [2, 6]]), 2);
  assert.strictEqual(maxNumberOfFamilies(4, [[4, 3], [1, 4], [4, 6], [1, 7]]), 4);
});

test('edge cases', () => {
  assert.strictEqual(maxNumberOfFamilies(1, [[1, 1], [1, 10]]), 2);
  assert.strictEqual(maxNumberOfFamilies(1, [[1, 2], [1, 9]]), 1); // only the middle block
  assert.strictEqual(maxNumberOfFamilies(1, [[1, 5], [1, 6]]), 0);
  assert.strictEqual(maxNumberOfFamilies(1e9, [[1, 5]]), 2 * 1e9 - 1);
});

test('matches brute force on random seatings', () => {
  for (let t = 0; t < 1000; t++) {
    const n = 1 + Math.floor(Math.random() * 4);
    const all = [];
    for (let r = 1; r <= n; r++) for (let c = 1; c <= 10; c++) all.push([r, c]);
    const k = Math.floor(Math.random() * Math.min(all.length, 12));
    for (let i = all.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [all[i], all[j]] = [all[j], all[i]]; }
    const reserved = all.slice(0, k);
    assert.strictEqual(maxNumberOfFamilies(n, reserved), bruteForce(n, reserved));
  }
});

test('n = 1e9 with 1e4 reservations finishes quickly', () => {
  const res = Array.from({ length: 10000 }, () => [1 + Math.floor(Math.random() * 1e9), 1 + Math.floor(Math.random() * 10)]);
  const t0 = Date.now();
  maxNumberOfFamilies(1e9, res);
  assert.ok(Date.now() - t0 < 1000);
});
