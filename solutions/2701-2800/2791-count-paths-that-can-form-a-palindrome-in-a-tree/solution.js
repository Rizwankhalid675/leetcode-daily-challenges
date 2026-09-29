/**
 * 2791. Count Paths That Can Form a Palindrome in a Tree
 * https://leetcode.com/problems/count-paths-that-can-form-a-palindrome-in-a-tree/
 * Give each node a 26-bit parity mask of the letters from the root. A path u-v can be rearranged
 * into a palindrome iff mask[u] ^ mask[v] has at most one bit set, so count earlier masks equal to
 * the current one or one bit away (a Map of counts). The traversal is iterative BFS.
 */
var countPalindromePaths = function (parent, s) {
  const n = parent.length;
  const children = Array.from({ length: n }, () => []);
  for (let i = 1; i < n; i++) children[parent[i]].push(i);
  const mask = new Int32Array(n);
  const order = [0];
  for (let h = 0; h < order.length; h++) {
    const u = order[h];
    for (const v of children[u]) {
      mask[v] = mask[u] ^ (1 << (s.charCodeAt(v) - 97));
      order.push(v);
    }
  }
  const count = new Map();
  let pairs = 0;
  for (const u of order) {
    const m = mask[u];
    pairs += count.get(m) || 0;
    for (let b = 0; b < 26; b++) pairs += count.get(m ^ (1 << b)) || 0;
    count.set(m, (count.get(m) || 0) + 1);
  }
  return pairs;
};

module.exports = { countPalindromePaths };
