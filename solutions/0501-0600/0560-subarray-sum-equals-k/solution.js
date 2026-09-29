/**
 * 560. Subarray Sum Equals K
 * https://leetcode.com/problems/subarray-sum-equals-k/
 * Prefix sums with a hash map: a subarray ending here sums to k exactly when an earlier prefix
 * equals (current prefix - k). Count those prefixes as you go.
 */
var subarraySum = function (nums, k) {
  const seen = new Map([[0, 1]]);
  let prefix = 0, count = 0;
  for (const x of nums) {
    prefix += x;
    count += seen.get(prefix - k) || 0;
    seen.set(prefix, (seen.get(prefix) || 0) + 1);
  }
  return count;
};

module.exports = { subarraySum };
