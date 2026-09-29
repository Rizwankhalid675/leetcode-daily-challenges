const test = require('node:test');
const assert = require('node:assert');
const { cancellable } = require('./solution');

// Replays the judge's harness on mock timers: returns [{time, returned}].
function harness(t, fn, args, delay, cancelTimeMs) {
  t.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
  const start = Date.now();
  const result = [];
  const log = (...a) => result.push({ time: Date.now() - start, returned: fn(...a) });
  const cancel = cancellable(log, args, delay);
  setTimeout(cancel, cancelTimeMs);
  // advance 1 ms at a time so timers created inside callbacks fire at their exact times
  for (let ms = Math.max(delay, cancelTimeMs) + 15; ms > 0; ms--) t.mock.timers.tick(1);
  return result;
}

test('official example 1: fires before cancel', (t) => {
  assert.deepStrictEqual(harness(t, (x) => x * 5, [2], 20, 50), [{ time: 20, returned: 10 }]);
});

test('official example 2: cancelled first', (t) => {
  assert.deepStrictEqual(harness(t, (x) => x ** 2, [2], 100, 50), []);
});

test('official example 3: multiple args', (t) => {
  assert.deepStrictEqual(harness(t, (x1, x2) => x1 * x2, [2, 4], 30, 100), [{ time: 30, returned: 8 }]);
});

test('real timers: cancel prevents the call', async () => {
  let called = false;
  const cancel = cancellable(() => { called = true; }, [], 40);
  setTimeout(cancel, 10);
  await new Promise((r) => setTimeout(r, 70));
  assert.strictEqual(called, false);
});
