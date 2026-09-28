/**
 * 1621. Number of Sets of K Non-Overlapping Line Segments
 * https://leetcode.com/problems/number-of-sets-of-k-non-overlapping-line-segments/
 *
 * Bijection: segments may share endpoints, which makes direct counting awkward. Insert
 * k - 1 extra points so that every place where one segment could end and the next begin
 * gets its own point. Then a valid drawing of k segments on n points corresponds exactly to
 * choosing 2k distinct points out of n + k - 1 (pair them up left to right).
 * Answer: C(n + k - 1, 2k) mod 1e9+7.
 *
 * Products of two residues can reach ~1e18 > 2^53, so the arithmetic uses BigInt.
 *
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var numberOfSets = function (n, k) {
  const MOD = 1_000_000_007n;
  const top = BigInt(n + k - 1);
  const r = BigInt(2 * k);

  const modPow = (base, exp) => {
    let result = 1n;
    base %= MOD;
    while (exp > 0n) {
      if (exp & 1n) result = (result * base) % MOD;
      base = (base * base) % MOD;
      exp >>= 1n;
    }
    return result;
  };

  // C(top, r) = top! / (r! (top - r)!), computed as a product of r terms over r!
  let numerator = 1n;
  let denominator = 1n;
  for (let i = 0n; i < r; i++) {
    numerator = (numerator * (top - i)) % MOD;
    denominator = (denominator * (i + 1n)) % MOD;
  }
  // MOD is prime, so the inverse of the denominator is denominator^(MOD - 2) (Fermat)
  return Number((numerator * modPow(denominator, MOD - 2n)) % MOD);
};

module.exports = { numberOfSets };
