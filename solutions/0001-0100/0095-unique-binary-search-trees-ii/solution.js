/**
 * 95. Unique Binary Search Trees II
 * https://leetcode.com/problems/unique-binary-search-trees-ii/
 * Memoized divide and conquer on key ranges: every tree for [lo, hi] is a root r joined with each (left tree of [lo, r-1], right tree of [r+1, hi]). Subtrees are shared between results, as LeetCode accepts.
 */
var generateTrees = function (n) {
  const memo = new Map();
  const build = (lo, hi) => {
    if (lo > hi) return [null];
    const key = lo * 16 + hi;
    if (memo.has(key)) return memo.get(key);
    const res = [];
    for (let r = lo; r <= hi; r++) {
      const lefts = build(lo, r - 1);
      const rights = build(r + 1, hi);
      for (const L of lefts) for (const Rt of rights) res.push(new TreeNode(r, L, Rt));
    }
    memo.set(key, res);
    return res;
  };
  return build(1, n);
};

module.exports = { generateTrees };
