/**
 * 1489. Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree
 * https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/
 * Compute the MST weight with Kruskal. An edge is critical if removing it raises the MST weight (or disconnects the graph); otherwise it is pseudo-critical if forcing it into the tree still achieves the MST weight.
 */
var findCriticalAndPseudoCriticalEdges = function (n, edges) {
  const order = edges.map((_, i) => i).sort((a, b) => edges[a][2] - edges[b][2]);
  const parent = new Array(n);
  const find = (x) => {
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
  };
  // MST weight when skipping edge 'skip' and/or forcing edge 'force'; Infinity if not spanning
  const mst = (skip, force) => {
    for (let i = 0; i < n; i++) parent[i] = i;
    let weight = 0;
    let used = 0;
    if (force !== -1) {
      const [a, b, w] = edges[force];
      parent[find(a)] = find(b);
      weight += w;
      used++;
    }
    for (const i of order) {
      if (i === skip) continue;
      const [a, b, w] = edges[i];
      const ra = find(a);
      const rb = find(b);
      if (ra === rb) continue;
      parent[ra] = rb;
      weight += w;
      if (++used === n - 1) break;
    }
    return used === n - 1 ? weight : Infinity;
  };
  const best = mst(-1, -1);
  const critical = [];
  const pseudo = [];
  for (let i = 0; i < edges.length; i++) {
    if (mst(i, -1) > best) critical.push(i);
    else if (mst(-1, i) === best) pseudo.push(i);
  }
  return [critical, pseudo];
};

module.exports = { findCriticalAndPseudoCriticalEdges };
