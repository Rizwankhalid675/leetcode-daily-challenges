/**
 * 2642. Design Graph With Shortest Path Calculator
 * https://leetcode.com/problems/design-graph-with-shortest-path-calculator/
 * Store adjacency lists; addEdge appends; shortestPath runs Dijkstra (inline binary heap) and stops as soon as node2 is settled.
 */
var Graph = function (n, edges) {
  this.n = n;
  this.adj = Array.from({ length: n }, () => []);
  for (const [u, v, w] of edges) this.adj[u].push(v, w);
};

Graph.prototype.addEdge = function (edge) {
  this.adj[edge[0]].push(edge[1], edge[2]);
};

Graph.prototype.shortestPath = function (node1, node2) {
  const adj = this.adj;
  const dist = new Array(this.n).fill(Infinity);
  const hd = [], hn = [];
  const push = (d, v) => {
    let i = hd.length;
    hd.push(d);
    hn.push(v);
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (hd[p] <= d) break;
      hd[i] = hd[p];
      hn[i] = hn[p];
      i = p;
    }
    hd[i] = d;
    hn[i] = v;
  };
  const pop = () => {
    const d = hd.pop(), v = hn.pop(), len = hd.length;
    if (len === 0) return;
    let i = 0;
    while (true) {
      let c = 2 * i + 1;
      if (c >= len) break;
      if (c + 1 < len && hd[c + 1] < hd[c]) c++;
      if (hd[c] >= d) break;
      hd[i] = hd[c];
      hn[i] = hn[c];
      i = c;
    }
    hd[i] = d;
    hn[i] = v;
  };
  dist[node1] = 0;
  push(0, node1);
  while (hd.length) {
    const d = hd[0], u = hn[0];
    pop();
    if (d > dist[u]) continue;
    if (u === node2) return d;
    const a = adj[u];
    for (let i = 0; i < a.length; i += 2) {
      const nd = d + a[i + 1];
      if (nd < dist[a[i]]) {
        dist[a[i]] = nd;
        push(nd, a[i]);
      }
    }
  }
  return -1;
};

module.exports = { Graph };
