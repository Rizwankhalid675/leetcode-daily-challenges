/**
 * 440. K-th Smallest in Lexicographical Order
 * https://leetcode.com/problems/k-th-smallest-in-lexicographical-order/
 * Treat 1..n as a 10-ary prefix tree walked in pre-order. Count how many numbers lie under the current prefix level by level; skip the whole subtree if k is past it, otherwise descend into it.
 */
var findKthNumber = function (n, k) {
  const countUnder = (prefix) => {
    let count = 0;
    let first = prefix;
    let last = prefix;
    while (first <= n) {
      count += Math.min(n, last) - first + 1;
      first *= 10;
      last = last * 10 + 9;
    }
    return count;
  };
  let cur = 1;
  k--;
  while (k > 0) {
    const size = countUnder(cur);
    if (size <= k) {
      k -= size;
      cur++;
    } else {
      cur *= 10;
      k--;
    }
  }
  return cur;
};

module.exports = { findKthNumber };
