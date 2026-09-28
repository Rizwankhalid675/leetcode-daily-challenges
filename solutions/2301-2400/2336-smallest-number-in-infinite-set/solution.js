/**
 * 2336. Smallest Number in Infinite Set
 * https://leetcode.com/problems/smallest-number-in-infinite-set/
 *
 * The set is "every integer >= next" plus a few numbers below next that were added back.
 * Keep the added-back numbers in a min-heap (with a Set to avoid duplicates); popSmallest
 * takes from the heap if it has anything (those are all < next), otherwise returns next++.
 */
var SmallestInfiniteSet = function () {
  this.next = 1; // every integer >= next is present
  this.heap = []; // added-back numbers, all < next
  this.inHeap = new Set();
};

/**
 * @return {number}
 */
SmallestInfiniteSet.prototype.popSmallest = function () {
  if (this.heap.length === 0) return this.next++;
  const h = this.heap;
  const top = h[0];
  const last = h.pop();
  if (h.length > 0) {
    h[0] = last;
    for (let i = 0; ; ) {
      const l = 2 * i + 1;
      const r = l + 1;
      let s = i;
      if (l < h.length && h[l] < h[s]) s = l;
      if (r < h.length && h[r] < h[s]) s = r;
      if (s === i) break;
      [h[s], h[i]] = [h[i], h[s]];
      i = s;
    }
  }
  this.inHeap.delete(top);
  return top;
};

/**
 * @param {number} num
 * @return {void}
 */
SmallestInfiniteSet.prototype.addBack = function (num) {
  if (num >= this.next || this.inHeap.has(num)) return; // already in the set
  this.inHeap.add(num);
  const h = this.heap;
  h.push(num);
  for (let i = h.length - 1; i > 0; ) {
    const p = (i - 1) >> 1;
    if (h[p] <= h[i]) break;
    [h[p], h[i]] = [h[i], h[p]];
    i = p;
  }
};

module.exports = { SmallestInfiniteSet };
