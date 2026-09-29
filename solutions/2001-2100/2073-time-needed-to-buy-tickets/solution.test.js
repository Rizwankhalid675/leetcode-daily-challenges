const test = require('node:test');
const assert = require('node:assert');
const { timeRequiredToBuy } = require('./solution');

function simulate(tickets, k) {
  const t = [...tickets];
  let time = 0;
  for (;;) for (let i = 0; i < t.length; i++) {
    if (t[i] === 0) continue;
    t[i]--; time++;
    if (i === k && t[i] === 0) return time;
  }
}

test('official examples', () => {
  assert.strictEqual(timeRequiredToBuy([2, 3, 2], 2), 6);
  assert.strictEqual(timeRequiredToBuy([5, 1, 1, 1], 0), 8);
});

test('matches simulation', () => {
  for (let t = 0; t < 1000; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 6) }, () => 1 + Math.floor(Math.random() * 5));
    const k = Math.floor(Math.random() * a.length);
    assert.strictEqual(timeRequiredToBuy(a, k), simulate(a, k));
  }
});
