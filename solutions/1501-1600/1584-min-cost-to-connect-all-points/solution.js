/**
 * 1584. Min Cost to Connect All Points
 * https://leetcode.com/problems/min-cost-to-connect-all-points/
 * Dense-graph Prim's algorithm: keep each point's cheapest Manhattan distance to the growing tree in an array and repeatedly add the closest unconnected point, O(n²) without a heap.
 */
var minCostConnectPoints = function (points) {
  const n = points.length;
  const dist = new Array(n).fill(Infinity);
  const inTree = new Array(n).fill(false);
  dist[0] = 0;
  let total = 0;
  for (let step = 0; step < n; step++) {
    let u = -1;
    for (let i = 0; i < n; i++) if (!inTree[i] && (u === -1 || dist[i] < dist[u])) u = i;
    inTree[u] = true;
    total += dist[u];
    const [ux, uy] = points[u];
    for (let v = 0; v < n; v++) {
      if (inTree[v]) continue;
      const d = Math.abs(points[v][0] - ux) + Math.abs(points[v][1] - uy);
      if (d < dist[v]) dist[v] = d;
    }
  }
  return total;
};

module.exports = { minCostConnectPoints };
