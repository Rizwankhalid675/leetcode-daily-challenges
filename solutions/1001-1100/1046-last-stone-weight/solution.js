/**
 * 1046. Last Stone Weight
 * https://leetcode.com/problems/last-stone-weight/
 * Max-heap simulation: repeatedly smash the two heaviest stones and push back the difference.
 */
var lastStoneWeight = function (stones) {
  const heap = [];
  const push = (x) => {
    heap.push(x);
    for (let i = heap.length - 1; i > 0; ) {
      const p = (i - 1) >> 1;
      if (heap[p] >= heap[i]) break;
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
        if (l < heap.length && heap[l] > heap[m]) m = l;
        if (r < heap.length && heap[r] > heap[m]) m = r;
        if (m === i) break;
        [heap[m], heap[i]] = [heap[i], heap[m]];
        i = m;
      }
    }
    return top;
  };
  stones.forEach(push);
  while (heap.length > 1) {
    const y = pop();
    const x = pop();
    if (y !== x) push(y - x);
  }
  return heap.length ? heap[0] : 0;
};

module.exports = { lastStoneWeight };
