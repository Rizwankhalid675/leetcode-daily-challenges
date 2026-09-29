/**
 * 2065. Maximum Path Quality of a Graph
 * https://leetcode.com/problems/maximum-path-quality-of-a-graph/
 * Backtracking DFS from node 0 with a visit counter. Every edge costs ≥ 10 and maxTime ≤ 100, so a walk has at most 10 edges and degree ≤ 4 keeps the search around 4^10 steps.
 */
var maximalPathQuality = function (values, edges, maxTime) {
  const n = values.length;
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v, t] of edges) {
    adj[u].push(v, t);
    adj[v].push(u, t);
  }
  const cnt = new Int32Array(n);
  let best = 0;
  // recursion depth <= maxTime / 10 <= 10
  const dfs = (u, time, q) => {
    if (u === 0 && q > best) best = q;
    const a = adj[u];
    for (let i = 0; i < a.length; i += 2) {
      const v = a[i], nt = time + a[i + 1];
      if (nt > maxTime) continue;
      const gain = cnt[v] === 0 ? values[v] : 0;
      cnt[v]++;
      dfs(v, nt, q + gain);
      cnt[v]--;
    }
  };
  cnt[0] = 1;
  dfs(0, 0, values[0]);
  return best;
};

module.exports = { maximalPathQuality };
