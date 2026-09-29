const test = require('node:test');
const assert = require('node:assert');
const { TimeLimitedCache } = require('./solution');

// Replays the judge: each action is scheduled with setTimeout at its delay (mock timers).
function run(t, actions, values, delays) {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const out = new Array(actions.length);
  let obj;
  actions.forEach((a, i) => {
    setTimeout(() => {
      if (a === 'TimeLimitedCache') { obj = new TimeLimitedCache(); out[i] = null; }
      else out[i] = obj[a](...values[i]);
    }, delays[i]);
  });
  // advance 1 ms at a time so timers created inside callbacks (expiry) fire at their exact times
  for (let ms = Math.max(...delays) + 1; ms > 0; ms--) t.mock.timers.tick(1);
  return out;
}

test('official example 1', (t) => {
  assert.deepStrictEqual(
    run(t, ['TimeLimitedCache', 'set', 'get', 'count', 'get'], [[], [1, 42, 100], [1], [], [1]], [0, 0, 50, 50, 150]),
    [null, false, 42, 1, -1],
  );
});

test('official example 2: overwrite extends the lifetime', (t) => {
  assert.deepStrictEqual(
    run(t, ['TimeLimitedCache', 'set', 'set', 'get', 'get', 'get', 'count'],
      [[], [1, 42, 50], [1, 50, 100], [1], [1], [1], []], [0, 0, 40, 50, 120, 200, 250]),
    [null, false, true, 50, 50, -1, 0],
  );
});

test('set after expiry returns false; overwrite can shorten lifetime', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const c = new TimeLimitedCache();
  assert.strictEqual(c.set(7, 1, 10), false);
  t.mock.timers.tick(10);
  assert.strictEqual(c.set(7, 2, 100), false);
  assert.strictEqual(c.set(7, 3, 5), true);
  t.mock.timers.tick(5);
  assert.strictEqual(c.get(7), -1);
  assert.strictEqual(c.count(), 0);
});

test('matches a timestamp model on random schedules', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  for (let round = 0; round < 50; round++) {
    const c = new TimeLimitedCache();
    const model = new Map(); // key -> [value, expiresAt]
    let now = 0;
    for (let step = 0; step < 60; step++) {
      const dt = Math.floor(Math.random() * 15);
      t.mock.timers.tick(dt);
      now += dt;
      for (const [k, [, exp]] of model) if (exp <= now) model.delete(k);
      const op = Math.random();
      const key = Math.floor(Math.random() * 5);
      if (op < 0.4) {
        const d = Math.floor(Math.random() * 40);
        assert.strictEqual(c.set(key, step, d), model.has(key));
        model.set(key, [step, now + d]);
        if (d === 0) { t.mock.timers.tick(0); model.delete(key); }
      } else if (op < 0.8) {
        assert.strictEqual(c.get(key), model.has(key) ? model.get(key)[0] : -1);
      } else {
        assert.strictEqual(c.count(), model.size);
      }
    }
    t.mock.timers.tick(100);
  }
});
