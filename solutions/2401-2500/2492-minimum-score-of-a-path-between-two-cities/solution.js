/**
 * 2492. Minimum Score of a Path Between Two Cities
 * https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/
 * Roads may be reused, so any road in the component of city 1 (which contains n) can be detoured through. The answer is the minimum road weight in that component.
 */
var minScore = function (n, roads) {
  const adj = Array.from({ length: n + 1 }, () => []);
  for (const [a, b, d] of roads) {
    adj[a].push(b, d);
    adj[b].push(a, d);
  }
  const seen = new Uint8Array(n + 1);
  const stack = [1];
  seen[1] = 1;
  let best = Infinity;
  while (stack.length) {
    const u = stack.pop();
    const a = adj[u];
    for (let i = 0; i < a.length; i += 2) {
      if (a[i + 1] < best) best = a[i + 1];
      if (!seen[a[i]]) {
        seen[a[i]] = 1;
        stack.push(a[i]);
      }
    }
  }
  return best;
};

module.exports = { minScore };
