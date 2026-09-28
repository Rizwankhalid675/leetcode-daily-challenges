/**
 * 274. H-Index
 * https://leetcode.com/problems/h-index/
 *
 * Counting sort with a cap: citations above n count as n (h can never exceed n).
 * Walk h from n down, accumulating how many papers have >= h citations; the first h where
 * that count reaches h is the answer.
 *
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function (citations) {
  const n = citations.length;
  const buckets = new Array(n + 1).fill(0);
  for (const c of citations) buckets[Math.min(c, n)]++;
  let papers = 0;
  for (let h = n; h >= 0; h--) {
    papers += buckets[h];
    if (papers >= h) return h;
  }
  return 0;
};

module.exports = { hIndex };
