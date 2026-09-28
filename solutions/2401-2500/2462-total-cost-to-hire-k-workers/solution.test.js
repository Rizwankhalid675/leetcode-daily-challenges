const test = require('node:test');
const assert = require('node:assert');
const { totalCost } = require('./solution');

// Reference: literal simulation of the hiring rules on an array.
function simulate(costs, k, candidates) {
  const workers = costs.map((c, i) => [c, i]);
  let total = 0;
  for (let s = 0; s < k; s++) {
    let pool;
    if (workers.length <= 2 * candidates) pool = workers.map((_, i) => i);
    else pool = [...Array(candidates).keys(), ...Array.from({ length: candidates }, (_, j) => workers.length - candidates + j)];
    let best = pool[0];
    for (const i of pool) {
      const [c, idx] = workers[i];
      if (c < workers[best][0] || (c === workers[best][0] && idx < workers[best][1])) best = i;
    }
    total += workers[best][0];
    workers.splice(best, 1);
  }
  return total;
}

test('official examples', () => {
  assert.strictEqual(totalCost([17, 12, 10, 2, 7, 2, 11, 20, 8], 3, 4), 11);
  assert.strictEqual(totalCost([1, 2, 4, 1], 3, 3), 4);
});

test('matches literal simulation', () => {
  for (let t = 0; t < 1000; t++) {
    const n = 1 + Math.floor(Math.random() * 12);
    const costs = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 5)); // many ties
    const k = 1 + Math.floor(Math.random() * n);
    const candidates = 1 + Math.floor(Math.random() * n);
    assert.strictEqual(totalCost(costs, k, candidates), simulate(costs, k, candidates), JSON.stringify([costs, k, candidates]));
  }
});
