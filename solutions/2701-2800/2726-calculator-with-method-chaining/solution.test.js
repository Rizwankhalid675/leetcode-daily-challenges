const test = require('node:test');
const assert = require('node:assert');
const { Calculator } = require('./solution');

test('official examples', () => {
  assert.strictEqual(new Calculator(10).add(5).subtract(7).getResult(), 8);
  assert.strictEqual(new Calculator(2).multiply(5).power(2).getResult(), 100);
  assert.throws(() => new Calculator(20).divide(0).getResult(), { message: 'Division by zero is not allowed' });
});

test('methods return the same instance; fractional results', () => {
  const c = new Calculator(1);
  assert.strictEqual(c.add(1), c);
  assert.ok(Math.abs(new Calculator(1).divide(3).multiply(3).getResult() - 1) < 1e-9);
  assert.strictEqual(new Calculator(4).power(0.5).getResult(), 2);
  assert.strictEqual(new Calculator(-0).divide(5).getResult(), -0);
});

test('matches a direct fold on random chains', () => {
  const ops = ['add', 'subtract', 'multiply', 'divide', 'power'];
  const apply = { add: (a, b) => a + b, subtract: (a, b) => a - b, multiply: (a, b) => a * b, divide: (a, b) => a / b, power: (a, b) => a ** b };
  for (let t = 0; t < 300; t++) {
    let v = Math.floor(Math.random() * 21) - 10;
    const c = new Calculator(v);
    for (let s = 0; s < 6; s++) {
      const op = ops[Math.floor(Math.random() * ops.length)];
      const x = op === 'power' ? Math.floor(Math.random() * 3) : 1 + Math.floor(Math.random() * 9);
      c[op](x);
      v = apply[op](v, x);
    }
    assert.strictEqual(c.getResult(), v);
  }
});
