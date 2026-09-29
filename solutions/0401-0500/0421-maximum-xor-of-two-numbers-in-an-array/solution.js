/**
 * 421. Maximum XOR of Two Numbers in an Array
 * https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/
 * Binary trie over the 31 bits of each number (high bit first) stored in a typed array. For each number, walk the trie preferring the opposite bit at every level to build the best XOR partner among numbers inserted so far.
 */
var findMaximumXOR = function (nums) {
  const BITS = 31;
  const maxNodes = nums.length * BITS + 1;
  const child = new Int32Array(maxNodes * 2); // child[2*node + bit], 0 = missing
  let nodes = 1;
  let best = 0;
  for (const x of nums) {
    // insert x
    let node = 0;
    for (let b = BITS - 1; b >= 0; b--) {
      const bit = (x >>> b) & 1;
      const idx = 2 * node + bit;
      if (child[idx] === 0) child[idx] = nodes++;
      node = child[idx];
    }
    // query best partner for x (x itself is present, so paths always exist)
    node = 0;
    let cur = 0;
    for (let b = BITS - 1; b >= 0; b--) {
      const want = ((x >>> b) & 1) ^ 1;
      if (child[2 * node + want] !== 0) {
        cur |= 1 << b;
        node = child[2 * node + want];
      } else {
        node = child[2 * node + (want ^ 1)];
      }
    }
    if (cur > best) best = cur;
  }
  return best;
};

module.exports = { findMaximumXOR };
