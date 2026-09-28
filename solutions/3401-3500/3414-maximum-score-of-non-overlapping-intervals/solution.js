/**
 * 3414. Maximum Score of Non-overlapping Intervals
 * https://leetcode.com/problems/maximum-score-of-non-overlapping-intervals/
 *
 * Weighted interval scheduling with a cap of 4 intervals and a lexicographic tie-break.
 *
 * Sort interval positions by start. best[k][p] = the best choice using at most k intervals
 * taken from sorted positions p..n-1, stored as (score, sorted list of original indices).
 * Either skip position p, or take it and continue from the first position whose start is
 * strictly after its end (found by binary search). On equal scores keep the lexicographically
 * smaller index list.
 *
 * @param {number[][]} intervals
 * @return {number[]}
 */
var maximumWeight = function (intervals) {
  const n = intervals.length;
  const order = Array.from({ length: n }, (_, i) => i).sort((a, b) => intervals[a][0] - intervals[b][0]);
  const starts = order.map((i) => intervals[i][0]);

  // first sorted position whose start is > value
  const firstStartAfter = (value) => {
    let lo = 0;
    let hi = n;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (starts[mid] > value) hi = mid;
      else lo = mid + 1;
    }
    return lo;
  };
  const next = order.map((i) => firstStartAfter(intervals[i][1]));

  const lexLess = (a, b) => {
    const len = Math.min(a.length, b.length);
    for (let i = 0; i < len; i++) if (a[i] !== b[i]) return a[i] < b[i];
    return a.length < b.length;
  };
  const withIndex = (list, idx) => {
    const out = [...list, idx];
    out.sort((x, y) => x - y);
    return out;
  };

  // score[k][p] and pick[k][p] for k = 0..4, p = 0..n (p = n means nothing left)
  const K = 4;
  const score = Array.from({ length: K + 1 }, () => new Array(n + 1).fill(0));
  const pick = Array.from({ length: K + 1 }, () => new Array(n + 1).fill(null).map(() => []));

  for (let k = 1; k <= K; k++) {
    for (let p = n - 1; p >= 0; p--) {
      // option 1: skip sorted position p
      let bestScore = score[k][p + 1];
      let bestPick = pick[k][p + 1];
      // option 2: take it
      const idx = order[p];
      const takeScore = intervals[idx][2] + score[k - 1][next[p]];
      if (takeScore >= bestScore) {
        const takePick = withIndex(pick[k - 1][next[p]], idx);
        if (takeScore > bestScore || lexLess(takePick, bestPick)) {
          bestScore = takeScore;
          bestPick = takePick;
        }
      }
      score[k][p] = bestScore;
      pick[k][p] = bestPick;
    }
  }
  return pick[K][0];
};

module.exports = { maximumWeight };
