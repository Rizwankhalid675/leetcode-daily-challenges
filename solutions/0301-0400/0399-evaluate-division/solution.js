/**
 * 399. Evaluate Division
 * https://leetcode.com/problems/evaluate-division/
 *
 * Variables are nodes; A / B = v gives edges A -> B with weight v and B -> A with 1/v.
 * C / D is the product of weights along any path from C to D (no contradictions, so every
 * path gives the same product). BFS per query; unknown variables or no path -> -1.
 *
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
  const graph = new Map();
  const addEdge = (a, b, w) => {
    if (!graph.has(a)) graph.set(a, []);
    graph.get(a).push([b, w]);
  };
  equations.forEach(([a, b], i) => {
    addEdge(a, b, values[i]);
    addEdge(b, a, 1 / values[i]);
  });

  const evaluate = (from, to) => {
    if (!graph.has(from) || !graph.has(to)) return -1;
    if (from === to) return 1;
    const seen = new Set([from]);
    const queue = [[from, 1]];
    for (let head = 0; head < queue.length; head++) {
      const [node, product] = queue[head];
      for (const [next, w] of graph.get(node)) {
        if (seen.has(next)) continue;
        if (next === to) return product * w;
        seen.add(next);
        queue.push([next, product * w]);
      }
    }
    return -1;
  };

  return queries.map(([c, d]) => evaluate(c, d));
};

module.exports = { calcEquation };
