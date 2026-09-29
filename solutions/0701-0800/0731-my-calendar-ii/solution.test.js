const test = require('node:test');
const assert = require('node:assert');
const { MyCalendarTwo } = require('./solution');

test('official example', () => {
  const c = new MyCalendarTwo();
  const got = [[10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]].map(([s, e]) => c.book(s, e));
  assert.deepStrictEqual(got, [true, true, true, false, true, true]);
});

test('extreme coordinates', () => {
  const c = new MyCalendarTwo();
  assert.strictEqual(c.book(0, 1e9), true);
  assert.strictEqual(c.book(999999999, 1e9), true);
  assert.strictEqual(c.book(999999998, 1e9), false);
  assert.strictEqual(c.book(0, 1), true);
  assert.strictEqual(c.book(0, 1), false);
  assert.strictEqual(c.book(1, 999999999), true);
  assert.strictEqual(c.book(500, 501), false);
});

test('matches a per-point counter on small coordinates', () => {
  for (let t = 0; t < 200; t++) {
    const c = new MyCalendarTwo();
    const count = new Array(40).fill(0);
    for (let op = 0; op < 40; op++) {
      const s = Math.floor(Math.random() * 39);
      const e = s + 1 + Math.floor(Math.random() * (40 - s - 1));
      let ok = true;
      for (let x = s; x < e; x++) if (count[x] >= 2) ok = false;
      if (ok) for (let x = s; x < e; x++) count[x]++;
      assert.strictEqual(c.book(s, e), ok);
    }
  }
});

test('1000 random bookings over the full range are fast', () => {
  const c = new MyCalendarTwo();
  const start = Date.now();
  for (let i = 0; i < 1000; i++) {
    const s = Math.floor(Math.random() * 1e9);
    c.book(s, Math.min(1e9, s + 1 + Math.floor(Math.random() * 1e7)));
  }
  assert.ok(Date.now() - start < 1000);
});
