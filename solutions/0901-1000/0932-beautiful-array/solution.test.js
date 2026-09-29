const test = require('node:test');
const assert = require('node:assert');
const { beautifulArray } = require('./solution');

function isBeautiful(a, n) {
  if (a.length !== n) return false;
  const sorted = [...a].sort((x, y) => x - y);
  for (let i = 0; i < n; i++) if (sorted[i] !== i + 1) return false;
  const pos = new Array(n + 1);
  a.forEach((v, i) => (pos[v] = i));
  // for every pair (i, j), their mean (if an integer) must not sit strictly between them
  for (let i = 0; i < n; i++) for (let j = i + 2; j < n; j++) {
    const s = a[i] + a[j];
    if (s % 2 === 0) { const p = pos[s / 2]; if (p > i && p < j) return false; }
  }
  return true;
}

test('official examples (any valid answer)', () => {
  assert.ok(isBeautiful(beautifulArray(4), 4));
  assert.ok(isBeautiful(beautifulArray(5), 5));
});

test('valid for every n up to 300', () => {
  for (let n = 1; n <= 300; n++) assert.ok(isBeautiful(beautifulArray(n), n), 'n=' + n);
});

test('n = 1000 is valid', () => {
  assert.ok(isBeautiful(beautifulArray(1000), 1000));
});
