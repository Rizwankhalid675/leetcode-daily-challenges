/**
 * 1466. Reorder Routes to Make All Paths Lead to the City Zero
 * https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/
 *
 * The roads form a tree. Traverse it from city 0 ignoring direction; every road we walk
 * along in its ORIGINAL direction points away from 0 and must be reversed.
 * Adjacency stores (neighbour, 1 if the original road goes from here to the neighbour).
 * Iterative traversal: n up to 5*10^4.
 *
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var minReorder = function (n, connections) {
  const adj = Array.from({ length: n }, () => []);
  for (const [a, b] of connections) {
    adj[a].push([b, 1]); // original road a -> b; walking a -> b follows it (points away from 0)
    adj[b].push([a, 0]); // walking b -> a goes against it (already points toward 0)
  }
  const visited = new Array(n).fill(false);
  visited[0] = true;
  const stack = [0];
  let changes = 0;
  while (stack.length > 0) {
    const u = stack.pop();
    for (const [v, awayFromZero] of adj[u]) {
      if (visited[v]) continue;
      visited[v] = true;
      changes += awayFromZero;
      stack.push(v);
    }
  }
  return changes;
};

module.exports = { minReorder };
