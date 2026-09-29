const test = require('node:test');
const assert = require('node:assert');
const { sleep } = require('./solution');

test('resolves after roughly the requested delay', async () => {
  const t0 = Date.now();
  await sleep(50);
  const dt = Date.now() - t0;
  assert.ok(dt >= 45 && dt < 150, 'elapsed ' + dt);
});

test('sleep(0) resolves promptly', async () => {
  const t0 = Date.now();
  await sleep(0);
  assert.ok(Date.now() - t0 < 50);
});

test('does not resolve before the timer fires (mock timers)', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  let done = false;
  const p = sleep(100).then(() => { done = true; });
  t.mock.timers.tick(99);
  await Promise.resolve();
  assert.strictEqual(done, false);
  t.mock.timers.tick(1);
  await p;
  assert.strictEqual(done, true);
});
