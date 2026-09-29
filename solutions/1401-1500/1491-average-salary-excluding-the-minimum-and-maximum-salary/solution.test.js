const test = require('node:test');
const assert = require('node:assert');
const { average } = require('./solution');

const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-5, a + ' vs ' + b);

test('official examples', () => {
  close(average([4000, 3000, 1000, 2000]), 2500);
  close(average([1000, 2000, 3000]), 2000);
});

test('matches sort-and-slice on random unique salaries', () => {
  for (let t = 0; t < 500; t++) {
    const set = new Set();
    const n = 3 + Math.floor(Math.random() * 98);
    while (set.size < n) set.add(1000 + Math.floor(Math.random() * 999001));
    const a = [...set];
    const mid = a.slice().sort((x, y) => x - y).slice(1, -1);
    close(average(a), mid.reduce((x, y) => x + y, 0) / mid.length);
  }
});
