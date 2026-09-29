/**
 * 797. All Paths From Source to Target
 * https://leetcode.com/problems/all-paths-from-source-to-target/
 * The graph is a DAG, so a plain DFS from 0 with a path stack (no visited set) lists every path
 * that reaches n - 1.
 */
var allPathsSourceTarget = function (graph) {
  const target = graph.length - 1;
  const out = [];
  const path = [0];
  const dfs = (u) => {
    if (u === target) {
      out.push(path.slice());
      return;
    }
    for (const v of graph[u]) {
      path.push(v);
      dfs(v);
      path.pop();
    }
  };
  dfs(0);
  return out;
};

module.exports = { allPathsSourceTarget };
