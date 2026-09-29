/**
 * 2203. Minimum Weighted Subgraph With the Required Paths
 * https://leetcode.com/problems/minimum-weighted-subgraph-with-the-required-paths/
 * The optimal subgraph is two paths that merge at some node v and continue together to dest. Run Dijkstra from src1, from src2, and from dest on the reversed graph; answer = min over v of d1[v] + d2[v] + dRev[v].
 */
var minimumWeight = function (n, edges, src1, src2, dest) {
  const m = edges.length;
  // CSR-like linked adjacency for forward and reversed graphs
  const headF = new Int32Array(n).fill(-1), headR = new Int32Array(n).fill(-1);
  const nxtF = new Int32Array(m), nxtR = new Int32Array(m);
  for (let i = 0; i < m; i++) {
    const [u, v] = edges[i];
    nxtF[i] = headF[u];
    headF[u] = i;
    nxtR[i] = headR[v];
    headR[v] = i;
  }
  const dijkstra = (src, head, nxt, toIdx) => {
    const dist = new Float64Array(n).fill(Infinity);
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
    dist[src] = 0;
    push(0, src);
    while (hd.length) {
      const d = hd[0], u = hn[0];
      pop();
      if (d > dist[u]) continue;
      for (let e = head[u]; e !== -1; e = nxt[e]) {
        const v = edges[e][toIdx], nd = d + edges[e][2];
        if (nd < dist[v]) {
          dist[v] = nd;
          push(nd, v);
        }
      }
    }
    return dist;
  };
  const d1 = dijkstra(src1, headF, nxtF, 1);
  const d2 = dijkstra(src2, headF, nxtF, 1);
  const d3 = dijkstra(dest, headR, nxtR, 0);
  let best = Infinity;
  for (let v = 0; v < n; v++) {
    const s = d1[v] + d2[v] + d3[v];
    if (s < best) best = s;
  }
  return best === Infinity ? -1 : best;
};

module.exports = { minimumWeight };
