/**
 * 46. Permutations
 * https://leetcode.com/problems/permutations/
 * Backtracking: grow a permutation one position at a time, choosing any index not already used,
 * and copy it out when it reaches full length.
 */
var permute = function (nums) {
  const out = [], cur = [];
  const used = new Array(nums.length).fill(false);
  const go = () => {
    if (cur.length === nums.length) {
      out.push(cur.slice());
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      cur.push(nums[i]);
      go();
      cur.pop();
      used[i] = false;
    }
  };
  go();
  return out;
};

module.exports = { permute };
