const test = require('node:test');
const assert = require('node:assert');
const { eatenApples } = require('./solution');

// Reference: day-by-day simulation with a plain array, always eating the earliest-rotting apple.
function simulate(apples, days) {
  const batches = [];
  let eaten = 0;
  for (let day = 0; day < apples.length || batches.some((b) => b.n > 0 && b.rot > day); day++) {
    if (day < apples.length && apples[day] > 0) batches.push({ rot: day + days[day], n: apples[day] });
    const usable = batches.filter((b) => b.n > 0 && b.rot > day).sort((x, y) => x.rot - y.rot);
    if (usable.length) usable[0].n--, eaten++;
  }
  return eaten;
}

test('official examples', () => {
  assert.strictEqual(eatenApples([1, 2, 3, 5, 2], [3, 2, 1, 4, 2]), 7);
  assert.strictEqual(eatenApples([3, 0, 0, 0, 0, 2], [3, 0, 0, 0, 0, 2]), 5);
});

test('matches day-by-day simulation', () => {
  for (let t = 0; t < 500; t++) {
    const n = 1 + Math.floor(Math.random() * 8);
    const apples = Array.from({ length: n }, () => (Math.random() < 0.3 ? 0 : 1 + Math.floor(Math.random() * 4)));
    const days = apples.map((a) => (a === 0 ? 0 : 1 + Math.floor(Math.random() * 5)));
    assert.strictEqual(eatenApples(apples, days), simulate(apples, days), JSON.stringify([apples, days]));
  }
});
