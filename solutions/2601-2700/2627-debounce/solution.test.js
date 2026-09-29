const test = require('node:test');
const assert = require('node:assert');
const { debounce } = require('./solution');

// Judge-style harness on mock timers: calls = [{t, inputs}], returns [{t, inputs}] of executions.
function run(t, delay, calls) {
  t.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
  const start = Date.now();
  const out = [];
  const d = debounce((...inputs) => out.push({ t: Date.now() - start, inputs }), delay);
  for (const c of calls) setTimeout(() => d(...c.inputs), c.t);
  // advance 1 ms at a time so timers created inside callbacks fire at their exact times
  for (let ms = Math.max(...calls.map((c) => c.t)) + delay + 1; ms > 0; ms--) t.mock.timers.tick(1);
  return out;
}

test('official example 1', (t) => {
  assert.deepStrictEqual(run(t, 50, [{ t: 50, inputs: [1] }, { t: 75, inputs: [2] }]), [{ t: 125, inputs: [2] }]);
});

test('official example 2', (t) => {
  assert.deepStrictEqual(run(t, 20, [{ t: 50, inputs: [1] }, { t: 100, inputs: [2] }]),
    [{ t: 70, inputs: [1] }, { t: 120, inputs: [2] }]);
});

test('official example 3', (t) => {
  assert.deepStrictEqual(
    run(t, 150, [{ t: 50, inputs: [1, 2] }, { t: 300, inputs: [3, 4] }, { t: 300, inputs: [5, 6] }]),
    [{ t: 200, inputs: [1, 2] }, { t: 450, inputs: [5, 6] }],
  );
});

test('t = 0 still defers and keeps only the last same-tick call', (t) => {
  assert.deepStrictEqual(run(t, 0, [{ t: 10, inputs: ['a'] }, { t: 10, inputs: ['b'] }]), [{ t: 10, inputs: ['b'] }]);
});
