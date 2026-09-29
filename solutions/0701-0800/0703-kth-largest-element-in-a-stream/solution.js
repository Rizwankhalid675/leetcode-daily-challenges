/**
 * 703. Kth Largest Element in a Stream
 * https://leetcode.com/problems/kth-largest-element-in-a-stream/
 * Keep a min-heap of the k largest scores seen so far; its root is the k-th largest.
 */
var KthLargest = function (k, nums) {
  this.k = k;
  this.h = []; // min-heap holding the k largest values
  for (const x of nums) this.add(x);
};
KthLargest.prototype.add = function (val) {
  const h = this.h;
  if (h.length < this.k) {
    let i = h.length;
    h.push(val);
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (h[p] <= val) break;
      h[i] = h[p];
      i = p;
    }
    h[i] = val;
  } else if (val > h[0]) {
    const n = h.length;
    let i = 0;
    for (;;) {
      let c = 2 * i + 1;
      if (c >= n) break;
      if (c + 1 < n && h[c + 1] < h[c]) c++;
      if (h[c] >= val) break;
      h[i] = h[c];
      i = c;
    }
    h[i] = val;
  }
  return h[0];
};

module.exports = { KthLargest };
