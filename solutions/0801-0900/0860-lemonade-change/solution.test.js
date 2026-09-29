const test = require('node:test');
const assert = require('node:assert');
const { lemonadeChange } = require('./solution');

// Oracle: explore every way of making change (both options for a $20).
function brute(bills) {
  const go = (i, f, t) => {
    if (i === bills.length) return true;
    const b = bills[i];
    if (b === 5) return go(i + 1, f + 1, t);
    if (b === 10) return f > 0 && go(i + 1, f - 1, t + 1);
    return (t > 0 && f > 0 && go(i + 1, f - 1, t - 1)) || (f >= 3 && go(i + 1, f - 3, t));
  };
  return go(0, 0, 0);
}

test('official examples', () => {
  assert.strictEqual(lemonadeChange([5, 5, 5, 10, 20]), true);
  assert.strictEqual(lemonadeChange([5, 5, 10, 10, 20]), false);
});

test('edge cases', () => {
  assert.strictEqual(lemonadeChange([10]), false);
  assert.strictEqual(lemonadeChange([5, 5, 5, 20]), true);
  assert.strictEqual(lemonadeChange([5, 20]), false);
});

test('matches exhaustive search on random queues', () => {
  const opts = [5, 5, 5, 10, 20];
  for (let t = 0; t < 2000; t++) {
    const n = 1 + Math.floor(Math.random() * 12);
    const a = Array.from({ length: n }, () => opts[Math.floor(Math.random() * opts.length)]);
    assert.strictEqual(lemonadeChange(a), brute(a), JSON.stringify(a));
  }
});
