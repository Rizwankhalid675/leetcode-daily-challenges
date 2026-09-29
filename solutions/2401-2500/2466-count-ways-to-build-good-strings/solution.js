/**
 * 2466. Count Ways To Build Good Strings
 * https://leetcode.com/problems/count-ways-to-build-good-strings/
 * ways[len] = ways[len - zero] + ways[len - one] (mod 1e9+7); sum ways over lengths low..high. Different append sequences always give different strings.
 */
var countGoodStrings = function (low, high, zero, one) {
  const MOD = 1000000007;
  const ways = new Array(high + 1).fill(0);
  ways[0] = 1;
  let total = 0;
  for (let len = 1; len <= high; len++) {
    let w = 0;
    if (len >= zero) w += ways[len - zero];
    if (len >= one) w += ways[len - one];
    ways[len] = w % MOD;
    if (len >= low) total = (total + ways[len]) % MOD;
  }
  return total;
};

module.exports = { countGoodStrings };
