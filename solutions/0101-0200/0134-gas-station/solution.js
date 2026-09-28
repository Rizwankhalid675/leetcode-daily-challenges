/**
 * 134. Gas Station
 * https://leetcode.com/problems/gas-station/
 *
 * If total gas < total cost, no start works. Otherwise scan once: whenever the running
 * tank from the current candidate start goes negative at station i, no station between
 * the candidate and i can be the start either, so the next candidate is i + 1.
 *
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  let total = 0;
  let tank = 0;
  let start = 0;
  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    total += diff;
    tank += diff;
    if (tank < 0) {
      start = i + 1;
      tank = 0;
    }
  }
  return total >= 0 ? start : -1;
};

module.exports = { canCompleteCircuit };
