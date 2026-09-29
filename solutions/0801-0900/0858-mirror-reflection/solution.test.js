const test = require('node:test');
const assert = require('node:assert');
const { mirrorReflection } = require('./solution');

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

function viaLcm(p, q) {
  // unfolded room: the ray reaches a corner at height L = lcm(p, q)
  // after crossing L/q room widths and L/p room heights
  const L = (p / gcd(p, q)) * q;
  const heights = L / p;
  const widths = L / q;
  if (heights % 2 === 0) return 0;
  return widths % 2 === 1 ? 1 : 2;
}

function simulate(p, q) {
  // bounce step by step in integer units of 1/q along x
  let x = 0, y = 0, dx = 1, dy = 1;
  // move in steps of width p horizontally (q vertically)
  for (;;) {
    x = dx === 1 ? p : 0;
    y += dy * q;
    if (y > p) { y = 2 * p - y; dy = -1; }
    else if (y < 0) { y = -y; dy = 1; }
    dx = -dx;
    if (x === p && y === 0) return 0;
    if (x === p && y === p) return 1;
    if (x === 0 && y === p) return 2;
  }
}

test('official examples', () => {
  assert.strictEqual(mirrorReflection(2, 1), 2);
  assert.strictEqual(mirrorReflection(3, 1), 1);
});

test('hand cases', () => {
  assert.strictEqual(mirrorReflection(1, 1), 1);
  assert.strictEqual(mirrorReflection(4, 4), 1);
  assert.strictEqual(mirrorReflection(3, 2), 0);
  assert.strictEqual(mirrorReflection(4, 2), 2);
});

test('matches lcm unfolding and step simulation for all p, q <= 150', () => {
  for (let p = 1; p <= 150; p++) for (let q = 1; q <= p; q++) {
    const want = viaLcm(p, q);
    assert.strictEqual(mirrorReflection(p, q), want, p + ',' + q);
    assert.strictEqual(simulate(p, q), want, 'sim ' + p + ',' + q);
  }
});
