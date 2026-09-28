/**
 * 940. Distinct Subsequences II
 * https://leetcode.com/problems/distinct-subsequences-ii/
 *
 * endsWith[c] = number of distinct non-empty subsequences (so far) whose last char is c.
 * Appending character c to every distinct subsequence seen so far, plus "c" alone, gives
 * exactly the set of distinct subsequences ending in c, and it replaces the old set for c
 * (the old set is a subset of the new one). So endsWith[c] = total + 1.
 *
 * @param {string} s
 * @return {number}
 */
var distinctSubseqII = function (s) {
  const MOD = 1_000_000_007;
  const endsWith = new Array(26).fill(0);
  let total = 0; // sum of endsWith, kept in sync
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i) - 97;
    const updated = (total + 1) % MOD;
    total = (total - endsWith[c] + updated + MOD) % MOD;
    endsWith[c] = updated;
  }
  return total;
};

module.exports = { distinctSubseqII };
