/**
 * 1672. Richest Customer Wealth
 * https://leetcode.com/problems/richest-customer-wealth/
 * Sum each row and keep the maximum.
 */
var maximumWealth = function (accounts) {
  let best = 0;
  for (const row of accounts) {
    let s = 0;
    for (const x of row) s += x;
    if (s > best) best = s;
  }
  return best;
};

module.exports = { maximumWealth };
