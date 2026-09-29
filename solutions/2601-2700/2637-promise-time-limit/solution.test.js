const test = require('node:test');
const assert = require('node:assert');
const { timeLimit } = require('./solution');

const delayed = (ms, f) => new Promise((res) => setTimeout(() => res(f()), ms));

async function run(fn, inputs, t) {
  const start = Date.now();
  try {
    const v = await timeLimit(fn, t)(...inputs);
    return { resolved: v, time: Date.now() - start };
  } catch (err) {
    return { rejected: err, time: Date.now() - start };
  }
}

test('official example 1 (scaled): times out', async () => {
  const r = await run(async (n) => delayed(60, () => n * n), [5], 20);
  assert.strictEqual(r.rejected, 'Time Limit Exceeded');
  assert.ok(r.time < 55, 'time ' + r.time);
});

test('official examples 2 and 3 (scaled): resolves in time', async () => {
  const r2 = await run(async (n) => delayed(30, () => n * n), [5], 80);
  assert.strictEqual(r2.resolved, 25);
  const r3 = await run(async (a, b) => delayed(30, () => a + b), [5, 10], 80);
  assert.strictEqual(r3.resolved, 15);
});

test('official example 4: fn rejects immediately with its own error', async () => {
  const r = await run(async () => { throw 'Error'; }, [], 1000);
  assert.strictEqual(r.rejected, 'Error');
  assert.ok(r.time < 50);
});

test('t = 0 with a slow fn rejects', async () => {
  const r = await run(async () => delayed(30, () => 1), [], 0);
  assert.strictEqual(r.rejected, 'Time Limit Exceeded');
});
