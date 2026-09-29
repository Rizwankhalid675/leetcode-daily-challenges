const test = require('node:test');
const assert = require('node:assert');
const { RangeModule } = require('./solution');

test('official example', () => {
  const rm = new RangeModule();
  rm.addRange(10, 20);
  rm.removeRange(14, 16);
  assert.strictEqual(rm.queryRange(10, 14), true);
  assert.strictEqual(rm.queryRange(13, 15), false);
  assert.strictEqual(rm.queryRange(16, 17), true);
});

test('touching ranges merge; removal splits', () => {
  const rm = new RangeModule();
  rm.addRange(1, 3);
  rm.addRange(3, 5);
  assert.strictEqual(rm.queryRange(1, 5), true);
  assert.deepStrictEqual(rm.iv, [[1, 5]]);
  rm.removeRange(2, 4);
  assert.deepStrictEqual(rm.iv, [[1, 2], [4, 5]]);
  assert.strictEqual(rm.queryRange(1, 5), false);
});

test('matches a unit-cell boolean array', () => {
  const N = 30;
  for (let t = 0; t < 300; t++) {
    const rm = new RangeModule();
    const cell = new Array(N).fill(false); // cell[x] tracks [x, x+1)
    for (let op = 0; op < 60; op++) {
      const a = 1 + Math.floor(Math.random() * (N - 1));
      const b = 1 + Math.floor(Math.random() * (N - 1));
      if (a === b) continue;
      const l = Math.min(a, b);
      const r = Math.max(a, b);
      const kind = Math.random();
      if (kind < 0.35) { rm.addRange(l, r); for (let x = l; x < r; x++) cell[x] = true; }
      else if (kind < 0.6) { rm.removeRange(l, r); for (let x = l; x < r; x++) cell[x] = false; }
      else {
        let all = true;
        for (let x = l; x < r; x++) if (!cell[x]) all = false;
        assert.strictEqual(rm.queryRange(l, r), all);
      }
      for (let k = 1; k < rm.iv.length; k++) assert.ok(rm.iv[k - 1][1] < rm.iv[k][0]);
    }
  }
});

test('1e4 operations on large coordinates run fast', () => {
  const rm = new RangeModule();
  const start = Date.now();
  for (let op = 0; op < 10000; op++) {
    const l = 1 + Math.floor(Math.random() * 1e9);
    const r = Math.min(1e9, l + 1 + Math.floor(Math.random() * 1e5));
    if (l >= r) continue;
    const k = op % 3;
    if (k === 0) rm.addRange(l, r); else if (k === 1) rm.removeRange(l, r); else rm.queryRange(l, r);
  }
  assert.ok(Date.now() - start < 1000);
});
