const test = require('node:test');
const assert = require('node:assert');
const { maximalRectangle } = require('./solution');

function brute(m) {
  const R = m.length, C = m[0].length;
  let best = 0;
  for (let r1 = 0; r1 < R; r1++) for (let c1 = 0; c1 < C; c1++)
    for (let r2 = r1; r2 < R; r2++) for (let c2 = c1; c2 < C; c2++) {
      let ok = true;
      for (let r = r1; r <= r2 && ok; r++) for (let c = c1; c <= c2; c++) if (m[r][c] !== '1') { ok = false; break; }
      if (ok) best = Math.max(best, (r2 - r1 + 1) * (c2 - c1 + 1));
    }
  return best;
}

test('official examples', () => {
  assert.strictEqual(maximalRectangle([['1', '0', '1', '0', '0'], ['1', '0', '1', '1', '1'], ['1', '1', '1', '1', '1'], ['1', '0', '0', '1', '0']]), 6);
  assert.strictEqual(maximalRectangle([['0']]), 0);
  assert.strictEqual(maximalRectangle([['1']]), 1);
});

test('matches brute force on random grids', () => {
  for (let t = 0; t < 500; t++) {
    const R = 1 + Math.floor(Math.random() * 5), C = 1 + Math.floor(Math.random() * 5);
    const p = Math.random();
    const m = Array.from({ length: R }, () => Array.from({ length: C }, () => (Math.random() < p ? '1' : '0')));
    assert.strictEqual(maximalRectangle(m), brute(m));
  }
});

test('max size all ones runs fast', () => {
  const m = Array.from({ length: 200 }, () => Array(200).fill('1'));
  const t0 = Date.now();
  assert.strictEqual(maximalRectangle(m), 40000);
  assert.ok(Date.now() - t0 < 500);
});
