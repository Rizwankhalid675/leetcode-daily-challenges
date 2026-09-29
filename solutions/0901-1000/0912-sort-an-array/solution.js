/**
 * 912. Sort an Array
 * https://leetcode.com/problems/sort-an-array/
 * Bottom-up merge sort with one reusable buffer: merge runs of width 1, 2, 4, … swapping source and destination each pass. No recursion and no built-in sort.
 */
var sortArray = function (nums) {
  const n = nums.length;
  let src = nums;
  let dst = new Array(n);
  for (let width = 1; width < n; width *= 2) {
    for (let lo = 0; lo < n; lo += 2 * width) {
      const mid = Math.min(lo + width, n);
      const hi = Math.min(lo + 2 * width, n);
      let i = lo, j = mid, k = lo;
      while (i < mid && j < hi) dst[k++] = src[i] <= src[j] ? src[i++] : src[j++];
      while (i < mid) dst[k++] = src[i++];
      while (j < hi) dst[k++] = src[j++];
    }
    [src, dst] = [dst, src];
  }
  return src;
};

module.exports = { sortArray };
