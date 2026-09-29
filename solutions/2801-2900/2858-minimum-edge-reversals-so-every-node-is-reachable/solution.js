/**
 * 2858. Minimum Edge Reversals So Every Node Is Reachable
 * https://leetcode.com/problems/minimum-edge-reversals-so-every-node-is-reachable/
 * Rerooting on a tree: count reversals needed from root 0 in one BFS, then moving the root across an edge changes the count by +1 (edge pointed down) or -1 (edge pointed up). Iterative, CSR adjacency.
 */
var minEdgeReversals = function (n, edges) {
  const start = new Int32Array(n + 1);
  for (const [u, v] of edges) { start[u + 1]++; start[v + 1]++; }
  for (let i = 0; i < n; i++) start[i + 1] += start[i];
  const pos = start.slice(0, n);
  const to = new Int32Array(2 * (n - 1));
  const cost = new Uint8Array(2 * (n - 1)); // cost of walking this way along the edge
  for (const [u, v] of edges) {
    to[pos[u]] = v; cost[pos[u]++] = 0;
    to[pos[v]] = u; cost[pos[v]++] = 1;
  }
  const order = new Int32Array(n);
  const parent = new Int32Array(n).fill(-1);
  const down = new Uint8Array(n); // cost of the edge parent -> node
  order[0] = 0;
  parent[0] = 0;
  let qt = 1, base = 0;
  for (let qh = 0; qh < qt; qh++) {
    const u = order[qh];
    for (let e = start[u]; e < start[u + 1]; e++) {
      const v = to[e];
      if (parent[v] !== -1) continue;
      parent[v] = u;
      down[v] = cost[e];
      base += cost[e];
      order[qt++] = v;
    }
  }
  const ans = new Array(n);
  ans[0] = base;
  for (let i = 1; i < n; i++) {
    const v = order[i];
    ans[v] = ans[parent[v]] + 1 - 2 * down[v];
  }
  return ans;
};

module.exports = { minEdgeReversals };
