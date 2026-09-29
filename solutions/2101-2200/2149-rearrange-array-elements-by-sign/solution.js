/**
 * 2149. Rearrange Array Elements by Sign
 * https://leetcode.com/problems/rearrange-array-elements-by-sign/
 * Two write pointers into a fresh array: positives go to even indices, negatives to odd indices, in their original order.
 */
var rearrangeArray = function (nums) {
  const res = new Array(nums.length);
  let pos = 0, neg = 1;
  for (const x of nums) {
    if (x > 0) { res[pos] = x; pos += 2; }
    else { res[neg] = x; neg += 2; }
  }
  return res;
};

module.exports = { rearrangeArray };
