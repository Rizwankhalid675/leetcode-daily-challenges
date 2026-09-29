const test = require('node:test');
const assert = require('node:assert');
const { createCounter } = require('./solution');

function run(init, calls) {
  const c = createCounter(init);
  return calls.map((name) => c[name]());
}

test('official examples', () => {
  assert.deepStrictEqual(run(5, ['increment', 'reset', 'decrement']), [6, 5, 4]);
  assert.deepStrictEqual(run(0, ['increment', 'increment', 'decrement', 'reset', 'reset']), [1, 2, 1, 0, 0]);
});

test('matches a plain-variable model on random call sequences', () => {
  const names = ['increment', 'decrement', 'reset'];
  for (let t = 0; t < 300; t++) {
    const init = Math.floor(Math.random() * 2001) - 1000;
    const calls = Array.from({ length: 1 + Math.floor(Math.random() * 20) }, () => names[Math.floor(Math.random() * 3)]);
    let v = init;
    const expected = calls.map((n) => (n === 'increment' ? ++v : n === 'decrement' ? --v : (v = init)));
    assert.deepStrictEqual(run(init, calls), expected);
  }
});
