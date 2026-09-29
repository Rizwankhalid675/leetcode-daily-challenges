/**
 * 1354. Construct Target Array With Multiple Sums
 * https://leetcode.com/problems/construct-target-array-with-multiple-sums/
 * Run the process backwards with a max-heap: the largest value was the last one set, and before that it was largest % (sum of the others). Modulo collapses many identical backward steps.
 */
var isPossible = function (target) {
  if (target.length === 1) return target[0] === 1;
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
  let total = 0;
  for (const x of target) {
    total += x;
    push(x);
  }
  for (;;) {
    const largest = pop();
    const rest = total - largest;
    if (largest === 1 || rest === 1) return true; // all ones, or rest=1 lets us reach 1 exactly
    if (rest === 0 || largest <= rest) return false;
    const prev = largest % rest;
    if (prev === 0) return false;
    total = rest + prev;
    push(prev);
  }
};

module.exports = { isPossible };
