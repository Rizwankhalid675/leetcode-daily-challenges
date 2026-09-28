/**
 * 2462. Total Cost to Hire K Workers
 * https://leetcode.com/problems/total-cost-to-hire-k-workers/
 *
 * One min-heap of candidate workers ordered by (cost, index). It starts with the first
 * `candidates` and the last `candidates` workers (without overlap). Pointers `left` and
 * `right` mark the untouched middle. After hiring a worker from the left side, refill from
 * `left`; after hiring from the right side, refill from `right`.
 *
 * @param {number[]} costs
 * @param {number} k
 * @param {number} candidates
 * @return {number}
 */
var totalCost = function (costs, k, candidates) {
  const n = costs.length;
  const heap = []; // entries are worker indices
  const less = (a, b) => costs[a] < costs[b] || (costs[a] === costs[b] && a < b);
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
    if (heap.length > 0) {
      heap[0] = last;
      for (let i = 0; ; ) {
        const l = 2 * i + 1;
        const r = l + 1;
        let s = i;
        if (l < heap.length && less(heap[l], heap[s])) s = l;
        if (r < heap.length && less(heap[r], heap[s])) s = r;
        if (s === i) break;
        [heap[s], heap[i]] = [heap[i], heap[s]];
        i = s;
      }
    }
    return top;
  };

  let left = 0; // next unqueued index from the left
  let right = n - 1; // next unqueued index from the right
  for (let c = 0; c < candidates && left <= right; c++) push(left++);
  for (let c = 0; c < candidates && left <= right; c++) push(right--);

  let total = 0;
  for (let hired = 0; hired < k; hired++) {
    const w = pop();
    total += costs[w];
    if (left <= right) {
      if (w < left) push(left++); // hired from the left group
      else push(right--); // hired from the right group
    }
  }
  return total;
};

module.exports = { totalCost };
