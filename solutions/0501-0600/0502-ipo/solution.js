/**
 * 502. IPO
 * https://leetcode.com/problems/ipo/
 * Greedy: sort projects by required capital; each round, push every newly affordable project into a
 * max-heap of profits and take the most profitable one. Stop early if nothing is affordable.
 */
var findMaximizedCapital = function (k, w, profits, capital) {
  const n = profits.length;
  const order = Array.from({ length: n }, (_, i) => i).sort((a, b) => capital[a] - capital[b]);
  const heap = []; // max-heap of profits
  const push = (x) => {
    heap.push(x);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p] >= heap[i]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  };
  const pop = () => {
    const top = heap[0], last = heap.pop();
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1, r = l + 1;
        let big = i;
        if (l < heap.length && heap[l] > heap[big]) big = l;
        if (r < heap.length && heap[r] > heap[big]) big = r;
        if (big === i) break;
        [heap[big], heap[i]] = [heap[i], heap[big]];
        i = big;
      }
    }
    return top;
  };
  let next = 0;
  for (let round = 0; round < k; round++) {
    while (next < n && capital[order[next]] <= w) push(profits[order[next++]]);
    if (heap.length === 0) break;
    w += pop();
  }
  return w;
};

module.exports = { findMaximizedCapital };
