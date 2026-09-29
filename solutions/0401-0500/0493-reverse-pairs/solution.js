/**
 * 493. Reverse Pairs
 * https://leetcode.com/problems/reverse-pairs/
 * Bottom-up merge sort. Before merging two sorted halves, count pairs with left[i] > 2·right[j] using a moving pointer, then merge normally.
 */
var reversePairs = function (nums) {
  const n = nums.length;
  let src = nums.slice();
  let dst = new Array(n);
  let count = 0;
  for (let width = 1; width < n; width *= 2) {
    for (let lo = 0; lo < n; lo += 2 * width) {
      const mid = Math.min(lo + width, n);
      const hi = Math.min(lo + 2 * width, n);
      let j = mid;
      for (let i = lo; i < mid; i++) {
        while (j < hi && src[i] > 2 * src[j]) j++;
        count += j - mid;
      }
      let a = lo, b = mid, k = lo;
      while (a < mid && b < hi) dst[k++] = src[a] <= src[b] ? src[a++] : src[b++];
      while (a < mid) dst[k++] = src[a++];
      while (b < hi) dst[k++] = src[b++];
    }
    [src, dst] = [dst, src];
  }
  return count;
};

module.exports = { reversePairs };
