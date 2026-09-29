const test = require('node:test');
const assert = require('node:assert');
const { hasValidPath } = require('./solution');

// Reference: enumerate every right/down path (tiny grids) and check validity directly.
function brute(grid) {
  const m = grid.length, n = grid[0].length;
  const go = (r, c, bal) => {
    bal += grid[r][c] === '(' ? 1 : -1;
    if (bal < 0) return false;
    if (r === m - 1 && c === n - 1) return bal === 0;
    return (r + 1 < m && go(r + 1, c, bal)) || (c + 1 < n && go(r, c + 1, bal));
  };
  return go(0, 0, 0);
}
const g = (rows) => rows.map((r) => r.split(''));

test('official examples', () => {
  assert.strictEqual(hasValidPath(g(['(((', ')()', '(()', '(()'])), true);
  assert.strictEqual(hasValidPath(g(['))', '(('])), false);
});

test('edge cases', () => {
  assert.strictEqual(hasValidPath(g(['()'])), true);
  assert.strictEqual(hasValidPath(g(['('])), false); // odd length
  assert.strictEqual(hasValidPath(g(['(', ')'])), true);
});

test('matches path enumeration on random small grids', () => {
  for (let t = 0; t < 2000; t++) {
    const m = 1 + Math.floor(Math.random() * 5), n = 1 + Math.floor(Math.random() * 5);
    const grid = Array.from({ length: m }, () => Array.from({ length: n }, () => (Math.random() < 0.5 ? '(' : ')')));
    assert.strictEqual(hasValidPath(grid), brute(grid), JSON.stringify(grid));
  }
});

test('100 x 100 runs fast', () => {
  const grid = Array.from({ length: 100 }, (_, r) => Array.from({ length: 100 }, (_, c) => ((r + c) % 2 ? ')' : '(')));
  grid[99][99] = '(';
  const t0 = Date.now();
  hasValidPath(grid);
  assert.ok(Date.now() - t0 < 1000);
});
