/**
 * 1492. The kth Factor of n
 * https://leetcode.com/problems/the-kth-factor-of-n/
 * Divisors come in pairs (d, n/d) with d <= sqrt(n). Collect the small ones in increasing order; the large ones are their partners in reverse order (skipping the duplicate when n is a perfect square).
 */
var kthFactor = function (n, k) {
  const small = [];
  for (let d = 1; d * d <= n; d++) if (n % d === 0) small.push(d);
  if (k <= small.length) return small[k - 1];
  const last = small[small.length - 1];
  const bigCount = last * last === n ? small.length - 1 : small.length;
  const idx = k - small.length; // 1-based among the large factors
  if (idx > bigCount) return -1;
  // large factors ascending: n / small[bigCount - 1], n / small[bigCount - 2], ...
  return n / small[bigCount - idx];
};

module.exports = { kthFactor };
