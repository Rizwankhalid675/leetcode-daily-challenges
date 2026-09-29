/**
 * 354. Russian Doll Envelopes
 * https://leetcode.com/problems/russian-doll-envelopes/
 * Sort by width ascending and, for equal widths, height descending; then the answer is the strict LIS of heights, found with patience-sorting tails and binary search in O(n log n).
 */
var maxEnvelopes = function (envelopes) {
  const e = envelopes.slice().sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  const tails = [];
  for (const [, h] of e) {
    let lo = 0, hi = tails.length; // first tail >= h
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < h) lo = mid + 1; else hi = mid;
    }
    tails[lo] = h;
  }
  return tails.length;
};

module.exports = { maxEnvelopes };
