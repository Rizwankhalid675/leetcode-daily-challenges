/**
 * 2508. Add Edges to Make Degrees of All Nodes Even
 * https://leetcode.com/problems/add-edges-to-make-degrees-of-all-nodes-even/
 * Only odd-degree nodes matter. 0 odd → yes. 2 odd (a,b) → link them directly, or both to some third node adjacent to neither. 4 odd → try the three pairings. Anything else → no.
 */
var isPossible = function (n, edges) {
  const adj = Array.from({ length: n + 1 }, () => new Set());
  for (const [a, b] of edges) {
    adj[a].add(b);
    adj[b].add(a);
  }
  const odd = [];
  for (let i = 1; i <= n; i++) if (adj[i].size % 2 === 1) odd.push(i);
  const free = (x, y) => !adj[x].has(y);
  if (odd.length === 0) return true;
  if (odd.length === 2) {
    const [a, b] = odd;
    if (free(a, b)) return true;
    for (let c = 1; c <= n; c++) {
      if (c !== a && c !== b && free(a, c) && free(b, c)) return true;
    }
    return false;
  }
  if (odd.length === 4) {
    const [a, b, c, d] = odd;
    return (free(a, b) && free(c, d)) || (free(a, c) && free(b, d)) || (free(a, d) && free(b, c));
  }
  return false;
};

module.exports = { isPossible };
