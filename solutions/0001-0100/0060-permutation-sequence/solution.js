/**
 * 60. Permutation Sequence
 * https://leetcode.com/problems/permutation-sequence/
 * Factorial number system: with k-1 zero-based, each position picks the floor((k-1)/(m-1)!)-th unused digit, then keeps the remainder.
 */
var getPermutation = function (n, k) {
  const fact = [1];
  for (let i = 1; i <= n; i++) fact[i] = fact[i - 1] * i;
  const digits = [];
  for (let i = 1; i <= n; i++) digits.push(i);
  let r = k - 1;
  let out = '';
  for (let m = n; m >= 1; m--) {
    const idx = Math.floor(r / fact[m - 1]);
    r %= fact[m - 1];
    out += digits[idx];
    digits.splice(idx, 1);
  }
  return out;
};

module.exports = { getPermutation };
