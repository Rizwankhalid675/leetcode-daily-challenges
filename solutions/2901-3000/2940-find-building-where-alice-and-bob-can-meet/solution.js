/**
 * 2940. Find Building Where Alice and Bob Can Meet
 * https://leetcode.com/problems/find-building-where-alice-and-bob-can-meet/
 * Normalize each query to a < b. Easy cases answer directly (same building, or Alice can jump straight to Bob). Otherwise we need the leftmost j > b taller than heights[a]: process queries offline by b from right to left with a monotonic stack of candidate buildings and binary-search it.
 */
var leftmostBuildingQueries = function (heights, queries) {
  const n = heights.length;
  const ans = new Array(queries.length).fill(-1);
  const pending = Array.from({ length: n }, () => []);
  for (let i = 0; i < queries.length; i++) {
    let a = queries[i][0];
    let b = queries[i][1];
    if (a > b) { const t = a; a = b; b = t; }
    if (a === b || heights[a] < heights[b]) ans[i] = b;
    else pending[b].push([heights[a], i]);
  }
  // stack[0] is the farthest index; heights strictly decrease toward the top (nearest index)
  const stack = [];
  for (let i = n - 1; i >= 0; i--) {
    for (const [need, qi] of pending[i]) {
      // largest position p with heights[stack[p]] > need
      let lo = 0;
      let hi = stack.length - 1;
      let found = -1;
      while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (heights[stack[mid]] > need) { found = mid; lo = mid + 1; } else hi = mid - 1;
      }
      if (found !== -1) ans[qi] = stack[found];
    }
    while (stack.length && heights[stack[stack.length - 1]] <= heights[i]) stack.pop();
    stack.push(i);
  }
  return ans;
};

module.exports = { leftmostBuildingQueries };
