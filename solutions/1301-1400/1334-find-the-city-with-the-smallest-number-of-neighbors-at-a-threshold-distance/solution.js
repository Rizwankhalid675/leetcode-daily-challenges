/**
 * 1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance
 * https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/
 * Floyd–Warshall for all-pairs distances (n ≤ 100), then count reachable cities within the threshold per city; iterate ascending and use <= so ties go to the larger index.
 */
var findTheCity = function (n, edges, distanceThreshold) {
  const D = Array.from({ length: n }, (_, i) => {
    const row = new Array(n).fill(Infinity);
    row[i] = 0;
    return row;
  });
  for (const [u, v, w] of edges) {
    if (w < D[u][v]) {
      D[u][v] = w;
      D[v][u] = w;
    }
  }
  for (let k = 0; k < n; k++) {
    const Dk = D[k];
    for (let i = 0; i < n; i++) {
      const Di = D[i], dik = Di[k];
      if (dik === Infinity) continue;
      for (let j = 0; j < n; j++) {
        const nd = dik + Dk[j];
        if (nd < Di[j]) Di[j] = nd;
      }
    }
  }
  let bestCity = -1, bestCount = Infinity;
  for (let i = 0; i < n; i++) {
    let cnt = 0;
    for (let j = 0; j < n; j++) if (j !== i && D[i][j] <= distanceThreshold) cnt++;
    if (cnt <= bestCount) {
      bestCount = cnt;
      bestCity = i;
    }
  }
  return bestCity;
};

module.exports = { findTheCity };
