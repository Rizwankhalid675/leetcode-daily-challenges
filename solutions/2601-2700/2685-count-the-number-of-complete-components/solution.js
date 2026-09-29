/**
 * 2685. Count the Number of Complete Components
 * https://leetcode.com/problems/count-the-number-of-complete-components/
 * Iterative DFS over each component, tallying vertices v and degree sum; the component is complete iff degree sum = v·(v−1).
 */
var countCompleteComponents = function (n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) {
    adj[a].push(b);
    adj[b].push(a);
  }
  const seen = new Uint8Array(n);
  let count = 0;
  for (let s = 0; s < n; s++) {
    if (seen[s]) continue;
    seen[s] = 1;
    const stack = [s];
    let verts = 0, degSum = 0;
    while (stack.length) {
      const u = stack.pop();
      verts++;
      degSum += adj[u].length;
      for (const v of adj[u]) {
        if (!seen[v]) {
          seen[v] = 1;
          stack.push(v);
        }
      }
    }
    if (degSum === verts * (verts - 1)) count++;
  }
  return count;
};

module.exports = { countCompleteComponents };
