/**
 * 1557. Minimum Number of Vertices to Reach All Nodes
 * https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/
 * In a DAG, the answer is exactly the set of nodes with in-degree 0.
 */
var findSmallestSetOfVertices = function (n, edges) {
  const hasIn = new Uint8Array(n);
  for (const [, to] of edges) hasIn[to] = 1;
  const res = [];
  for (let i = 0; i < n; i++) if (!hasIn[i]) res.push(i);
  return res;
};

module.exports = { findSmallestSetOfVertices };
