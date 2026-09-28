const test = require('node:test');
const assert = require('node:assert');
const { calcEquation } = require('./solution');

const close = (actual, expected) => {
  assert.strictEqual(actual.length, expected.length);
  actual.forEach((v, i) => assert.ok(Math.abs(v - expected[i]) < 1e-9, `${v} vs ${expected[i]}`));
};

test('official examples', () => {
  close(calcEquation([['a', 'b'], ['b', 'c']], [2.0, 3.0], [['a', 'c'], ['b', 'a'], ['a', 'e'], ['a', 'a'], ['x', 'x']]), [6.0, 0.5, -1.0, 1.0, -1.0]);
  close(calcEquation([['a', 'b'], ['b', 'c'], ['bc', 'cd']], [1.5, 2.5, 5.0], [['a', 'c'], ['c', 'b'], ['bc', 'cd'], ['cd', 'bc']]), [3.75, 0.4, 5.0, 0.2]);
  close(calcEquation([['a', 'b']], [0.5], [['a', 'b'], ['b', 'a'], ['a', 'c'], ['x', 'y']]), [0.5, 2.0, -1.0, -1.0]);
});

test('disconnected components give -1; consistent random systems match hidden values', () => {
  close(calcEquation([['a', 'b'], ['c', 'd']], [2, 3], [['a', 'd']]), [-1]);
  for (let t = 0; t < 200; t++) {
    const names = ['p', 'q', 'r', 's', 't', 'u'];
    const hidden = Object.fromEntries(names.map((x) => [x, 1 + Math.floor(Math.random() * 9)]));
    const eqs = [];
    const vals = [];
    for (let i = 1; i < names.length; i++) {
      const j = Math.floor(Math.random() * i); // spanning tree keeps everything connected
      eqs.push([names[i], names[j]]);
      vals.push(hidden[names[i]] / hidden[names[j]]);
    }
    const [x, y] = [names[Math.floor(Math.random() * 6)], names[Math.floor(Math.random() * 6)]];
    close(calcEquation(eqs, vals, [[x, y]]), [hidden[x] / hidden[y]]);
  }
});
