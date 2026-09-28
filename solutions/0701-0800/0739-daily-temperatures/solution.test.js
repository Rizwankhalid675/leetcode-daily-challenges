const test = require('node:test');
const assert = require('node:assert');
const { dailyTemperatures } = require('./solution');

const brute = (t) => t.map((v, i) => {
  for (let j = i + 1; j < t.length; j++) if (t[j] > v) return j - i;
  return 0;
});

test('official examples', () => {
  assert.deepStrictEqual(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]), [1, 1, 4, 2, 1, 1, 0, 0]);
  assert.deepStrictEqual(dailyTemperatures([30, 40, 50, 60]), [1, 1, 1, 0]);
  assert.deepStrictEqual(dailyTemperatures([30, 60, 90]), [1, 1, 0]);
});

test('equal temperatures are not warmer; random comparison', () => {
  assert.deepStrictEqual(dailyTemperatures([50, 50, 51]), [2, 1, 0]);
  for (let k = 0; k < 500; k++) {
    const t = Array.from({ length: 1 + Math.floor(Math.random() * 15) }, () => 30 + Math.floor(Math.random() * 5));
    assert.deepStrictEqual(dailyTemperatures(t), brute(t), JSON.stringify(t));
  }
});
