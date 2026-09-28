/**
 * 547. Number of Provinces
 * https://leetcode.com/problems/number-of-provinces/
 *
 * Union-Find (disjoint set union) with path compression and union by size.
 * Start with n singleton sets; every successful union of two different sets reduces the
 * number of provinces by one.
 *
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function (isConnected) {
  const n = isConnected.length;
  const parent = Array.from({ length: n }, (_, i) => i);
  const size = new Array(n).fill(1);
  const find = (x) => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]]; // path halving
      x = parent[x];
    }
    return x;
  };
  let provinces = n;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (isConnected[i][j] !== 1) continue;
      let a = find(i);
      let b = find(j);
      if (a === b) continue;
      if (size[a] < size[b]) [a, b] = [b, a];
      parent[b] = a;
      size[a] += size[b];
      provinces--;
    }
  }
  return provinces;
};

module.exports = { findCircleNum };
