/**
 * 2523. Closest Prime Numbers in Range
 * https://leetcode.com/problems/closest-prime-numbers-in-range/
 * Sieve up to right, walk the primes in [left, right] and keep the closest consecutive pair (first one wins ties); stop early at a gap of 2 or less.
 */
var closestPrimes = function (left, right) {
  const composite = new Uint8Array(right + 1);
  composite[0] = 1;
  if (right >= 1) composite[1] = 1;
  for (let p = 2; p * p <= right; p++) {
    if (composite[p]) continue;
    for (let m = p * p; m <= right; m += p) composite[m] = 1;
  }
  let prev = -1;
  let best = [-1, -1];
  let bestGap = Infinity;
  for (let x = left; x <= right; x++) {
    if (composite[x]) continue;
    if (prev !== -1 && x - prev < bestGap) {
      bestGap = x - prev;
      best = [prev, x];
      if (bestGap <= 2) break; // only 2,3 has gap 1, which is the first pair anyway
    }
    prev = x;
  }
  return best;
};

module.exports = { closestPrimes };
