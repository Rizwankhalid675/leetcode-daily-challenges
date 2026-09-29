/**
 * 129. Sum Root to Leaf Numbers
 * https://leetcode.com/problems/sum-root-to-leaf-numbers/
 * Iterative DFS carrying the number formed so far (value * 10 + digit); add it to the total at each leaf.
 */
var sumNumbers = function (root) {
  let total = 0;
  const nodes = [root], nums = [0];
  while (nodes.length) {
    const node = nodes.pop();
    const num = nums.pop() * 10 + node.val;
    if (!node.left && !node.right) {
      total += num;
      continue;
    }
    if (node.left) { nodes.push(node.left); nums.push(num); }
    if (node.right) { nodes.push(node.right); nums.push(num); }
  }
  return total;
};

module.exports = { sumNumbers };
