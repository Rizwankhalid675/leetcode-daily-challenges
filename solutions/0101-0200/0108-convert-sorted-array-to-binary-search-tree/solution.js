/**
 * 108. Convert Sorted Array to Binary Search Tree
 * https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
 * Divide and conquer: the middle element becomes the root, the left half builds the left subtree and
 * the right half the right subtree. Subtree sizes differ by at most 1 at every node.
 */
var sortedArrayToBST = function (nums) {
  const build = (lo, hi) => {
    if (lo > hi) return null;
    const mid = (lo + hi) >> 1;
    return new TreeNode(nums[mid], build(lo, mid - 1), build(mid + 1, hi));
  };
  return build(0, nums.length - 1);
};

module.exports = { sortedArrayToBST };
