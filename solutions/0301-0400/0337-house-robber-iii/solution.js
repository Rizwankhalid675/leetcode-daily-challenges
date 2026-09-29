/**
 * 337. House Robber III
 * https://leetcode.com/problems/house-robber-iii/
 * Tree DP returning (best if this node is robbed, best if it is not) for every node, computed bottom-up in reverse preorder so deep trees cannot overflow the call stack.
 */
var rob = function (root) {
  if (!root) return 0;
  const order = [];
  const stack = [root];
  while (stack.length) {
    const x = stack.pop();
    order.push(x);
    if (x.left) stack.push(x.left);
    if (x.right) stack.push(x.right);
  }
  const take = new Map(), skip = new Map();
  // Reverse preorder visits children before their parent.
  for (let i = order.length - 1; i >= 0; i--) {
    const x = order[i];
    let t = x.val, s = 0;
    for (const c of [x.left, x.right]) {
      if (!c) continue;
      const ct = take.get(c), cs = skip.get(c);
      t += cs;
      s += ct > cs ? ct : cs;
    }
    take.set(x, t);
    skip.set(x, s);
  }
  return Math.max(take.get(root), skip.get(root));
};

module.exports = { rob };
