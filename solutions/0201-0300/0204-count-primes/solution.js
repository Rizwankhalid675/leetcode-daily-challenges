/**
 * 204. Count Primes
 * https://leetcode.com/problems/count-primes/
 * Sieve of Eratosthenes on a Uint8Array, crossing out from p*p, then count the survivors below n.
 */
var countPrimes = function (n) {
  if (n < 3) return 0;
  const composite = new Uint8Array(n);
  let count = 0;
  for (let p = 2; p < n; p++) {
    if (composite[p]) continue;
    count++;
    if (p * p < n) {
      for (let m = p * p; m < n; m += p) composite[m] = 1;
    }
  }
  return count;
};

module.exports = { countPrimes };
