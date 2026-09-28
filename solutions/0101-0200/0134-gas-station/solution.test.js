const test = require('node:test');
const assert = require('node:assert');
const { canCompleteCircuit } = require('./solution');

// Reference: simulate every start.
function brute(gas, cost) {
  const n = gas.length;
  for (let s = 0; s < n; s++) {
    let tank = 0;
    let ok = true;
    for (let k = 0; k < n && ok; k++) {
      const i = (s + k) % n;
      tank += gas[i] - cost[i];
      if (tank < 0) ok = false;
    }
    if (ok) return s;
  }
  return -1;
}

test('official examples', () => {
  assert.strictEqual(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]), 3);
  assert.strictEqual(canCompleteCircuit([2, 3, 4], [3, 4, 3]), -1);
});

test('matches simulation when the answer is unique or absent', () => {
  for (let t = 0; t < 2000; t++) {
    const n = 1 + Math.floor(Math.random() * 7);
    const gas = Array.from({ length: n }, () => Math.floor(Math.random() * 6));
    const cost = Array.from({ length: n }, () => Math.floor(Math.random() * 6));
    // only compare when the valid start is unique (the problem guarantees this)
    const valid = [];
    for (let s = 0; s < n; s++) if (brute(gas.slice(s).concat(gas.slice(0, s)), cost.slice(s).concat(cost.slice(0, s))) === 0) valid.push(s);
    if (valid.length > 1) continue;
    assert.strictEqual(canCompleteCircuit(gas, cost), valid.length ? valid[0] : -1, JSON.stringify([gas, cost]));
  }
});
