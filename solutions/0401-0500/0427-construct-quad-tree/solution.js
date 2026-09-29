/**
 * 427. Construct Quad Tree
 * https://leetcode.com/problems/construct-quad-tree/
 * Recursively build the four quadrants; if all four come back as leaves with the same value, collapse
 * them into one leaf, otherwise return an internal node with those four children.
 */
var construct = function (grid) {
  const build = (r, c, size) => {
    if (size === 1) return new _Node(grid[r][c] === 1, true, null, null, null, null);
    const h = size / 2;
    const tl = build(r, c, h);
    const tr = build(r, c + h, h);
    const bl = build(r + h, c, h);
    const br = build(r + h, c + h, h);
    if (tl.isLeaf && tr.isLeaf && bl.isLeaf && br.isLeaf &&
        tl.val === tr.val && tr.val === bl.val && bl.val === br.val) {
      return new _Node(tl.val, true, null, null, null, null);
    }
    return new _Node(true, false, tl, tr, bl, br);
  };
  return build(0, 0, grid.length);
};

module.exports = { construct };
