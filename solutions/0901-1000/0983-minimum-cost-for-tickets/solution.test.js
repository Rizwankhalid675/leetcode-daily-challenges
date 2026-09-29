const test = require('node:test');
const assert = require('node:assert');
const { mincostTickets } = require('./solution');

const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => ri(lo, hi));
function brute(days, costs) {
  const span = [1, 7, 30];
  const go = (i) => {
    if (i === days.length) return 0;
    let best = Infinity;
    for (let k = 0; k < 3; k++) {
      let j = i;
      while (j < days.length && days[j] < days[i] + span[k]) j++;
      best = Math.min(best, costs[k] + go(j));
    }
    return best;
  };
  return go(0);
}
function rdays(k, maxDay) {
  const s = new Set();
  while (s.size < k) s.add(ri(1, maxDay));
  return [...s].sort((a, b) => a - b);
}

test('official examples', () => {
  assert.strictEqual(mincostTickets([1, 4, 6, 7, 8, 20], [2, 7, 15]), 11);
  assert.strictEqual(mincostTickets([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31], [2, 7, 15]), 17);
});

test('longer passes may be cheaper than shorter ones', () => {
  assert.strictEqual(mincostTickets([5], [10, 3, 1]), 1);
  assert.strictEqual(mincostTickets([1, 365], [1000, 1000, 1]), 2);
});

test('matches exhaustive pass choices', () => {
  for (let t = 0; t < 400; t++) {
    const days = rdays(ri(1, 9), ri(10, 80));
    const costs = [ri(1, 20), ri(1, 60), ri(1, 150)];
    assert.strictEqual(mincostTickets(days, costs), brute(days, costs));
  }
});
