/**
 * 1129. Shortest Path with Alternating Colors
 * https://leetcode.com/problems/shortest-path-with-alternating-colors/
 * BFS over states (node, colour of last edge). From a red-arrival state only blue edges may be taken and vice versa; node 0 starts in both states.
 */
var shortestAlternatingPaths = function (n, redEdges, blueEdges) {
  // adj[0] = red out-edges, adj[1] = blue out-edges
  const adj = [Array.from({ length: n }, () => []), Array.from({ length: n }, () => [])];
  for (const [a, b] of redEdges) adj[0][a].push(b);
  for (const [a, b] of blueEdges) adj[1][a].push(b);
  // dist[c * n + v]: shortest length reaching v whose last edge has colour c
  const dist = new Int32Array(2 * n).fill(-1);
  const queue = [0, n];
  dist[0] = 0;
  dist[n] = 0;
  for (let head = 0; head < queue.length; head++) {
    const s = queue[head];
    const c = s < n ? 0 : 1, u = s - c * n, nc = 1 - c;
    for (const v of adj[nc][u]) {
      const t = nc * n + v;
      if (dist[t] === -1) {
        dist[t] = dist[s] + 1;
        queue.push(t);
      }
    }
  }
  const res = new Array(n);
  for (let v = 0; v < n; v++) {
    const a = dist[v], b = dist[n + v];
    res[v] = a === -1 ? b : b === -1 ? a : Math.min(a, b);
  }
  return res;
};

module.exports = { shortestAlternatingPaths };
