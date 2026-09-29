/**
 * 1705. Maximum Number of Eaten Apples
 * https://leetcode.com/problems/maximum-number-of-eaten-apples/
 * Greedy: each day eat the apple that rots soonest. Min-heap of [rotDay, count]; discard rotten batches; keep going after the growing days end.
 */
var eatenApples = function (apples, days) {
  const heap = []; // [rotDay, count], min by rotDay
  const push = (x) => {
    heap.push(x);
    for (let i = heap.length - 1; i > 0; ) {
      const p = (i - 1) >> 1;
      if (heap[p][0] <= heap[i][0]) break;
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
        if (l < heap.length && heap[l][0] < heap[m][0]) m = l;
        if (r < heap.length && heap[r][0] < heap[m][0]) m = r;
        if (m === i) break;
        [heap[m], heap[i]] = [heap[i], heap[m]];
        i = m;
      }
    }
    return top;
  };
  let eaten = 0;
  for (let day = 0; day < apples.length || heap.length; day++) {
    if (day < apples.length && apples[day] > 0) push([day + days[day], apples[day]]);
    while (heap.length && (heap[0][0] <= day || heap[0][1] === 0)) pop();
    if (heap.length) {
      heap[0][1]--;
      eaten++;
    }
  }
  return eaten;
};

module.exports = { eatenApples };
