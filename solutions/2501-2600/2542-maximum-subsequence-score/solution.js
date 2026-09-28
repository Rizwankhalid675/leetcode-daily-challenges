/**
 * 2542. Maximum Subsequence Score
 * https://leetcode.com/problems/maximum-subsequence-score/
 *
 * Fix which index supplies the minimum of nums2: process indices in DECREASING nums2, so
 * the current index's nums2 is the minimum of everything seen so far. Among those, the
 * best k-subset for the sum part is the k largest nums1 values -> keep them in a size-k
 * min-heap with a running sum. Score candidate = sum * current nums2.
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var maxScore = function (nums1, nums2, k) {
  const order = nums1.map((_, i) => i).sort((a, b) => nums2[b] - nums2[a]);
  const heap = [];
  const push = (x) => {
    heap.push(x);
    for (let i = heap.length - 1; i > 0; ) {
      const p = (i - 1) >> 1;
      if (heap[p] <= heap[i]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  };
  const popMin = () => {
    const top = heap[0];
    const last = heap.pop();
    if (heap.length > 0) {
      heap[0] = last;
      for (let i = 0; ; ) {
        const l = 2 * i + 1;
        const r = l + 1;
        let s = i;
        if (l < heap.length && heap[l] < heap[s]) s = l;
        if (r < heap.length && heap[r] < heap[s]) s = r;
        if (s === i) break;
        [heap[s], heap[i]] = [heap[i], heap[s]];
        i = s;
      }
    }
    return top;
  };

  let sum = 0;
  let best = 0;
  for (const i of order) {
    push(nums1[i]);
    sum += nums1[i];
    if (heap.length > k) sum -= popMin();
    if (heap.length === k) best = Math.max(best, sum * nums2[i]);
  }
  return best;
};

module.exports = { maxScore };
