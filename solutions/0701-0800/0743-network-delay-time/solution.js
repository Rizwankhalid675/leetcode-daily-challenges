/**
 * 743. Network Delay Time
 * https://leetcode.com/problems/network-delay-time/
 * Dijkstra from k with an inline binary min-heap (lazy deletion); the answer is the largest finite distance, or −1 if any node is unreachable.
 */
var networkDelayTime = function (times, n, k) {
  const adj = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) adj[u].push(v, w);
  const dist = new Array(n + 1).fill(Infinity);
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
  dist[k] = 0;
  push(0, k);
  while (hd.length) {
    const d = hd[0], u = hn[0];
    pop();
    if (d > dist[u]) continue;
    const a = adj[u];
    for (let i = 0; i < a.length; i += 2) {
      const nd = d + a[i + 1];
      if (nd < dist[a[i]]) {
        dist[a[i]] = nd;
        push(nd, a[i]);
      }
    }
  }
  let ans = 0;
  for (let v = 1; v <= n; v++) {
    if (dist[v] === Infinity) return -1;
    if (dist[v] > ans) ans = dist[v];
  }
  return ans;
};

module.exports = { networkDelayTime };
