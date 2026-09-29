/**
 * 3479. Fruits Into Baskets III
 * https://leetcode.com/problems/fruits-into-baskets-iii/
 * Segment tree of basket capacities (max per range). For each fruit, descend from the root to the leftmost leaf with capacity >= fruit, then set that leaf to 0 (used). If the root max is too small the fruit stays unplaced.
 */
var numOfUnplacedFruits = function (fruits, baskets) {
  const n = baskets.length;
  let size = 1;
  while (size < n) size <<= 1;
  const tree = new Array(2 * size).fill(0);
  for (let i = 0; i < n; i++) tree[size + i] = baskets[i];
  for (let i = size - 1; i >= 1; i--) tree[i] = Math.max(tree[2 * i], tree[2 * i + 1]);
  let unplaced = 0;
  for (const f of fruits) {
    if (tree[1] < f) { unplaced++; continue; }
    let node = 1;
    while (node < size) node = tree[2 * node] >= f ? 2 * node : 2 * node + 1;
    tree[node] = 0;
    for (node >>= 1; node >= 1; node >>= 1) tree[node] = Math.max(tree[2 * node], tree[2 * node + 1]);
  }
  return unplaced;
};

module.exports = { numOfUnplacedFruits };
