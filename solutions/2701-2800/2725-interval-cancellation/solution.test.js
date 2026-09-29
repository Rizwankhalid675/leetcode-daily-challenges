const test = require('node:test');
const assert = require('node:assert');
const { cancellable } = require('./solution');

// Replays the judge's harness on mock timers.
function harness(t, fn, args, period, cancelTimeMs) {
  t.mock.timers.enable({ apis: ['setTimeout', 'setInterval', 'Date'] });
  const start = Date.now();
  const result = [];
  const log = (...a) => result.push({ time: Date.now() - start, returned: fn(...a) });
  const cancel = cancellable(log, args, period);
  setTimeout(cancel, cancelTimeMs);
  // advance 1 ms at a time so each callback sees the exact mocked time
  for (let ms = cancelTimeMs + period + 15; ms > 0; ms--) t.mock.timers.tick(1);
  return result;
}
const times = (step, count, returned) => Array.from({ length: count }, (_, i) => ({ time: i * step, returned }));

test('official example 1', (t) => {
  assert.deepStrictEqual(harness(t, (x) => x * 2, [4], 35, 190), times(35, 6, 8));
});

test('official example 2', (t) => {
  assert.deepStrictEqual(harness(t, (x1, x2) => x1 * x2, [2, 5], 30, 165), times(30, 6, 10));
});

test('official example 3', (t) => {
  assert.deepStrictEqual(harness(t, (x1, x2, x3) => x1 + x2 + x3, [5, 1, 3], 50, 180), times(50, 4, 9));
});

test('first call happens synchronously', () => {
  let n = 0;
  const cancel = cancellable(() => n++, [], 1000);
  assert.strictEqual(n, 1);
  cancel();
});

test('real timers: stops after cancel', async () => {
  let n = 0;
  const cancel = cancellable(() => n++, [], 20);
  await new Promise((r) => setTimeout(r, 50));
  cancel();
  const seen = n;
  await new Promise((r) => setTimeout(r, 60));
  assert.strictEqual(n, seen);
  assert.ok(seen >= 2);
});
