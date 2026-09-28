/**
 * 835. Image Overlap
 * https://leetcode.com/problems/image-overlap/
 *
 * Every overlapping pair of 1-cells (one from each image) "votes" for the translation that
 * would line them up: (r2 - r1, c2 - c1). The translation with the most votes is the answer.
 * Only 1-cells are paired, so the work is (#ones in img1) x (#ones in img2).
 *
 * @param {number[][]} img1
 * @param {number[][]} img2
 * @return {number}
 */
var largestOverlap = function (img1, img2) {
  const n = img1.length;
  const ones = (img) => {
    const cells = [];
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (img[r][c] === 1) cells.push([r, c]);
    return cells;
  };
  const a = ones(img1);
  const b = ones(img2);

  // shifts range over -(n-1)..(n-1) in each axis; offset them into a flat array
  const size = 2 * n - 1;
  const votes = new Int32Array(size * size);
  let best = 0;
  for (const [r1, c1] of a) {
    for (const [r2, c2] of b) {
      const key = (r2 - r1 + n - 1) * size + (c2 - c1 + n - 1);
      if (++votes[key] > best) best = votes[key];
    }
  }
  return best;
};

module.exports = { largestOverlap };
