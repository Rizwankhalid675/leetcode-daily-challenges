/**
 * 215. Kth Largest Element in an Array
 * https://leetcode.com/problems/kth-largest-element-in-an-array/
 *
 * Keep a min-heap of the k largest values seen so far. Its root is the smallest of those
 * k, i.e. the kth largest overall once every element has been offered. O(n log k), no
 * full sort. (JavaScript has no built-in heap, so a small one is included.)
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const heap = []; // min-heap as an array: children of i are 2i+1 and 2i+2
  const siftUp = (i) => {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p] <= heap[i]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  };
  const siftDown = (i) => {
    for (;;) {
      const l = 2 * i + 1;
      const r = l + 1;
      let smallest = i;
      if (l < heap.length && heap[l] < heap[smallest]) smallest = l;
      if (r < heap.length && heap[r] < heap[smallest]) smallest = r;
      if (smallest === i) return;
      [heap[smallest], heap[i]] = [heap[i], heap[smallest]];
      i = smallest;
    }
  };
  for (const x of nums) {
    if (heap.length < k) {
      heap.push(x);
      siftUp(heap.length - 1);
    } else if (x > heap[0]) {
      heap[0] = x; // replace the smallest of the current top-k
      siftDown(0);
    }
  }
  return heap[0];
};

module.exports = { findKthLargest };
