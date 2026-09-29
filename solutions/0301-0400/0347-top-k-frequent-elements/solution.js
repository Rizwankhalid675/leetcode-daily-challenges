/**
 * 347. Top K Frequent Elements
 * https://leetcode.com/problems/top-k-frequent-elements/
 * Count with a Map, drop each value into a bucket indexed by its frequency, then read the buckets from the highest frequency down until k values are collected. O(n).
 */
var topKFrequent = function (nums, k) {
  const cnt = new Map();
  for (const x of nums) cnt.set(x, (cnt.get(x) || 0) + 1);
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [v, f] of cnt) buckets[f].push(v);
  const res = [];
  for (let f = nums.length; f > 0 && res.length < k; f--) {
    for (const v of buckets[f]) {
      res.push(v);
      if (res.length === k) break;
    }
  }
  return res;
};

module.exports = { topKFrequent };
