/**
 * 77. Combinations
 * https://leetcode.com/problems/combinations/
 * Backtrack over increasing values, pruning branches that cannot still collect k numbers.
 */
var combine = function (n, k) {
  const out = [];
  const cur = [];
  const dfs = (start) => {
    if (cur.length === k) {
      out.push(cur.slice());
      return;
    }
    const need = k - cur.length;
    for (let v = start; v <= n - need + 1; v++) {
      cur.push(v);
      dfs(v + 1);
      cur.pop();
    }
  };
  dfs(1);
  return out;
};

module.exports = { combine };
