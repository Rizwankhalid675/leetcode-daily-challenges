/**
 * 740. Delete and Earn
 * https://leetcode.com/problems/delete-and-earn/
 * Bucket the total points per value, then it is House Robber over values 1..max: taking value v forbids v-1 and v+1.
 */
var deleteAndEarn = function (nums) {
  let max = 0;
  for (const x of nums) if (x > max) max = x;
  const sum = new Array(max + 1).fill(0);
  for (const x of nums) sum[x] += x;
  let take = 0, skip = 0; // best with value v taken / not taken
  for (let v = 1; v <= max; v++) {
    const t = skip + sum[v];
    skip = Math.max(skip, take);
    take = t;
  }
  return Math.max(take, skip);
};

module.exports = { deleteAndEarn };
