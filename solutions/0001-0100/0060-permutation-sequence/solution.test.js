const test = require('node:test');
const assert = require('node:assert');
const { getPermutation } = require('./solution');

function allPerms(n) {
  // lexicographic order via next-permutation
  const a = Array.from({ length: n }, (_, i) => i + 1);
  const out = [a.join('')];
  for (;;) {
    let i = n - 2;
    while (i >= 0 && a[i] >= a[i + 1]) i--;
    if (i < 0) return out;
    let j = n - 1;
    while (a[j] <= a[i]) j--;
    [a[i], a[j]] = [a[j], a[i]];
    for (let l = i + 1, r = n - 1; l < r; l++, r--) [a[l], a[r]] = [a[r], a[l]];
    out.push(a.join(''));
  }
}

test('official examples', () => {
  assert.strictEqual(getPermutation(3, 3), '213');
  assert.strictEqual(getPermutation(4, 9), '2314');
  assert.strictEqual(getPermutation(3, 1), '123');
});

test('extremes', () => {
  assert.strictEqual(getPermutation(1, 1), '1');
  assert.strictEqual(getPermutation(9, 1), '123456789');
  assert.strictEqual(getPermutation(9, 362880), '987654321');
});

test('matches enumerated order for every k, n <= 7', () => {
  for (let n = 1; n <= 7; n++) {
    const perms = allPerms(n);
    for (let k = 1; k <= perms.length; k++) assert.strictEqual(getPermutation(n, k), perms[k - 1]);
  }
});
