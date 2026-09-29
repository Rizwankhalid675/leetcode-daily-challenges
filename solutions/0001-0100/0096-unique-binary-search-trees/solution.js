/**
 * 96. Unique Binary Search Trees
 * https://leetcode.com/problems/unique-binary-search-trees/
 * Catalan recurrence: G(n) = sum over roots r of G(r - 1) * G(n - r), since the left and right subtrees are independent BSTs of those sizes.
 */
var numTrees = function (n) {
  const g = new Array(n + 1).fill(0);
  g[0] = 1;
  for (let k = 1; k <= n; k++) {
    for (let r = 1; r <= k; r++) g[k] += g[r - 1] * g[k - r];
  }
  return g[n];
};

module.exports = { numTrees };
