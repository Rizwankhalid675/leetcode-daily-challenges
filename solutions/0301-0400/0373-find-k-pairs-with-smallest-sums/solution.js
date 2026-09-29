/**
 * 373. Find K Pairs with Smallest Sums
 * https://leetcode.com/problems/find-k-pairs-with-smallest-sums/
 * Min-heap frontier over index pairs: seed (i, 0) for the first k rows; each pop of (i, j) pushes (i, j + 1). Both arrays are sorted, so this enumerates sums in increasing order.
 */
var kSmallestPairs = function (nums1, nums2, k) {
  const heap = []; // entries [sum, i, j]
  const less = (a, b) => a[0] < b[0];
  const push = (x) => {
    heap.push(x);
    for (let i = heap.length - 1; i > 0; ) {
      const p = (i - 1) >> 1;
      if (!less(heap[i], heap[p])) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  };
  const pop = () => {
    const top = heap[0];
    const last = heap.pop();
    if (heap.length) {
      heap[0] = last;
      for (let i = 0; ; ) {
        const l = 2 * i + 1, r = l + 1;
        let m = i;
        if (l < heap.length && less(heap[l], heap[m])) m = l;
        if (r < heap.length && less(heap[r], heap[m])) m = r;
        if (m === i) break;
        [heap[m], heap[i]] = [heap[i], heap[m]];
        i = m;
      }
    }
    return top;
  };
  for (let i = 0; i < Math.min(k, nums1.length); i++) push([nums1[i] + nums2[0], i, 0]);
  const out = [];
  while (out.length < k && heap.length) {
    const [, i, j] = pop();
    out.push([nums1[i], nums2[j]]);
    if (j + 1 < nums2.length) push([nums1[i] + nums2[j + 1], i, j + 1]);
  }
  return out;
};

module.exports = { kSmallestPairs };
