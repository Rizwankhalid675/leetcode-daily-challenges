/**
 * 1971. Find if Path Exists in Graph
 * https://leetcode.com/problems/find-if-path-exists-in-graph/
 * Build a CSR adjacency and run an iterative DFS from source; stop early once destination is reached.
 */
var validPath = function (n, edges, source, destination) {
  if (source === destination) return true;
  const deg = new Int32Array(n + 1);
  for (const [u, v] of edges) {
    deg[u + 1]++;
    deg[v + 1]++;
  }
  for (let i = 0; i < n; i++) deg[i + 1] += deg[i];
  const nbr = new Int32Array(edges.length * 2);
  const pos = deg.slice(0, n);
  for (const [u, v] of edges) {
    nbr[pos[u]++] = v;
    nbr[pos[v]++] = u;
  }
  const seen = new Uint8Array(n);
  const stack = new Int32Array(n);
  let top = 0;
  stack[top++] = source;
  seen[source] = 1;
  while (top > 0) {
    const u = stack[--top];
    for (let i = deg[u]; i < deg[u + 1]; i++) {
      const v = nbr[i];
      if (seen[v]) continue;
      if (v === destination) return true;
      seen[v] = 1;
      stack[top++] = v;
    }
  }
  return false;
};

module.exports = { validPath };
