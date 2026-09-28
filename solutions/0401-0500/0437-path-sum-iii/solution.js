/**
 * 437. Path Sum III
 * https://leetcode.com/problems/path-sum-iii/
 *
 * Prefix sums along the current root-to-node path. A downward path ending at the current
 * node sums to target iff some ancestor prefix equals (currentPrefix - target). Keep a
 * count map of prefixes on the current path, adding on entry and removing on exit.
 * n <= 1000, so recursion depth is safe here.
 *
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
  const prefixCount = new Map([[0, 1]]); // the empty prefix above the root
  const dfs = (node, prefix) => {
    if (node === null) return 0;
    const sum = prefix + node.val;
    let paths = prefixCount.get(sum - targetSum) ?? 0;
    prefixCount.set(sum, (prefixCount.get(sum) ?? 0) + 1);
    paths += dfs(node.left, sum) + dfs(node.right, sum);
    prefixCount.set(sum, prefixCount.get(sum) - 1); // backtrack: leave this path
    return paths;
  };
  return dfs(root, 0);
};

module.exports = { pathSum };
