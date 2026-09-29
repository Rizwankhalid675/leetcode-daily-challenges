/**
 * 2672. Number of Adjacent Elements With the Same Color
 * https://leetcode.com/problems/number-of-adjacent-elements-with-the-same-color/
 * Keep a running count of equal coloured neighbours. Before recolouring an index, remove the pairs
 * it forms with its neighbours; after, add the new ones. Uncoloured (0) cells never count.
 */
var colorTheArray = function (n, queries) {
  const color = new Int32Array(n);
  const ans = new Array(queries.length);
  let same = 0;
  for (let q = 0; q < queries.length; q++) {
    const [i, c] = queries[q];
    if (color[i] !== 0) {
      if (i > 0 && color[i - 1] === color[i]) same--;
      if (i < n - 1 && color[i + 1] === color[i]) same--;
    }
    color[i] = c;
    if (i > 0 && color[i - 1] === c) same++;
    if (i < n - 1 && color[i + 1] === c) same++;
    ans[q] = same;
  }
  return ans;
};

module.exports = { colorTheArray };
