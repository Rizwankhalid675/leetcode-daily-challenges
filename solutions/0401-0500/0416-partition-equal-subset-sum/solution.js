/**
 * 416. Partition Equal Subset Sum
 * https://leetcode.com/problems/partition-equal-subset-sum/
 * Subset-sum DP: target is half the total; a 0/1 reachable-sums array updated from high to low decides it.
 */
var canPartition = function (nums) {
  let total = 0;
  for (const x of nums) total += x;
  if (total % 2) return false;
  const target = total / 2;
  const can = new Uint8Array(target + 1);
  can[0] = 1;
  for (const x of nums) {
    for (let s = target; s >= x; s--) if (can[s - x]) can[s] = 1;
    if (can[target]) return true;
  }
  return can[target] === 1;
};

module.exports = { canPartition };
