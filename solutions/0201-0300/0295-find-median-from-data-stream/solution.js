/**
 * 295. Find Median from Data Stream
 * https://leetcode.com/problems/find-median-from-data-stream/
 * Two heaps: a max-heap with the smaller half and a min-heap with the larger half, balanced so the
 * lower half has the same size or one more. The median is read from the heap tops.
 */
// Small binary min-heap of numbers (the lower half stores negated values to act as a max-heap).
class NumMinHeap {
  constructor() { this.a = []; }
  get size() { return this.a.length; }
  peek() { return this.a[0]; }
  push(x) {
    const a = this.a;
    a.push(x);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (a[p] <= a[i]) break;
      [a[p], a[i]] = [a[i], a[p]];
      i = p;
    }
  }
  pop() {
    const a = this.a, top = a[0], last = a.pop();
    if (a.length) {
      a[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1, r = l + 1;
        let s = i;
        if (l < a.length && a[l] < a[s]) s = l;
        if (r < a.length && a[r] < a[s]) s = r;
        if (s === i) break;
        [a[s], a[i]] = [a[i], a[s]];
        i = s;
      }
    }
    return top;
  }
}

var MedianFinder = function () {
  this.low = new NumMinHeap(); // negated values: top is -max(lower half)
  this.high = new NumMinHeap(); // top is min(upper half)
};

MedianFinder.prototype.addNum = function (num) {
  this.low.push(-num);
  this.high.push(-this.low.pop());
  if (this.high.size > this.low.size) this.low.push(-this.high.pop());
};

MedianFinder.prototype.findMedian = function () {
  if (this.low.size > this.high.size) return -this.low.peek();
  return (-this.low.peek() + this.high.peek()) / 2;
};

module.exports = { MedianFinder };
