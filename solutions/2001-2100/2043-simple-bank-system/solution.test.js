const test = require('node:test');
const assert = require('node:assert');
const { Bank } = require('./solution');

test('official example', () => {
  const b = new Bank([10, 100, 20, 50, 30]);
  assert.strictEqual(b.withdraw(3, 10), true);
  assert.strictEqual(b.transfer(5, 1, 20), true);
  assert.strictEqual(b.deposit(5, 20), true);
  assert.strictEqual(b.transfer(3, 4, 15), false);
  assert.strictEqual(b.withdraw(10, 50), false);
});

test('matches a plain-number reference on small amounts', () => {
  for (let t = 0; t < 200; t++) {
    const n = 1 + Math.floor(Math.random() * 4);
    const init = Array.from({ length: n }, () => Math.floor(Math.random() * 20));
    const b = new Bank(init);
    const ref = [...init];
    const valid = (a) => a >= 1 && a <= n;
    for (let op = 0; op < 60; op++) {
      const a1 = Math.floor(Math.random() * (n + 2));
      const a2 = Math.floor(Math.random() * (n + 2));
      const m = Math.floor(Math.random() * 25);
      const r = Math.random();
      if (r < 0.34) {
        const ok = valid(a1) && valid(a2) && ref[a1 - 1] >= m;
        if (ok) { ref[a1 - 1] -= m; ref[a2 - 1] += m; }
        assert.strictEqual(b.transfer(a1, a2, m), ok);
      } else if (r < 0.67) {
        const ok = valid(a1);
        if (ok) ref[a1 - 1] += m;
        assert.strictEqual(b.deposit(a1, m), ok);
      } else {
        const ok = valid(a1) && ref[a1 - 1] >= m;
        if (ok) ref[a1 - 1] -= m;
        assert.strictEqual(b.withdraw(a1, m), ok);
      }
    }
  }
});

test('transfer to the same account keeps the balance', () => {
  const b = new Bank([5]);
  assert.strictEqual(b.transfer(1, 1, 5), true);
  assert.strictEqual(b.withdraw(1, 5), true);
  assert.strictEqual(b.withdraw(1, 1), false);
});

test('stays exact above 2^53', () => {
  const b = new Bank([0]);
  for (let i = 0; i < 9008; i++) b.deposit(1, 1e12); // 9.008e15 > 2^53
  b.deposit(1, 1); // a float would lose this dollar
  for (let i = 0; i < 9008; i++) assert.strictEqual(b.withdraw(1, 1e12), true);
  assert.strictEqual(b.withdraw(1, 1), true);
  assert.strictEqual(b.withdraw(1, 1), false);
});
