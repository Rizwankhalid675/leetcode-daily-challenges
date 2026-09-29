/**
 * 4. Median of Two Sorted Arrays
 * https://leetcode.com/problems/median-of-two-sorted-arrays/
 * Binary search the cut position i in the shorter array (j = half - i in the other) until the left halves are all <= the right halves; the median comes from the border values. O(log min(m, n)).
 */
var findMedianSortedArrays = function (nums1, nums2) {
  let A = nums1, B = nums2;
  if (A.length > B.length) [A, B] = [B, A];
  const m = A.length, n = B.length;
  const half = (m + n + 1) >> 1;
  let lo = 0, hi = m;
  while (lo <= hi) {
    const i = (lo + hi) >> 1;
    const j = half - i;
    const aL = i > 0 ? A[i - 1] : -Infinity;
    const aR = i < m ? A[i] : Infinity;
    const bL = j > 0 ? B[j - 1] : -Infinity;
    const bR = j < n ? B[j] : Infinity;
    if (aL > bR) hi = i - 1;
    else if (bL > aR) lo = i + 1;
    else {
      const leftMax = Math.max(aL, bL);
      if ((m + n) % 2 === 1) return leftMax;
      return (leftMax + Math.min(aR, bR)) / 2;
    }
  }
  return 0; // unreachable for sorted input
};

module.exports = { findMedianSortedArrays };
