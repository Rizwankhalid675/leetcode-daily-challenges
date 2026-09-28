const test = require('node:test');
const assert = require('node:assert');
const { evalRPN } = require('./solution');

// Reference: build a random expression tree, evaluate it directly, and emit its postfix form.
function randomExpr(depth) {
  if (depth === 0 || Math.random() < 0.3) {
    const v = Math.floor(Math.random() * 21) - 10;
    return { value: v, tokens: [String(v)] };
  }
  const l = randomExpr(depth - 1);
  const r = randomExpr(depth - 1);
  const ops = ['+', '-', '*'];
  if (r.value !== 0) ops.push('/');
  const op = ops[Math.floor(Math.random() * ops.length)];
  const value = op === '+' ? l.value + r.value : op === '-' ? l.value - r.value : op === '*' ? l.value * r.value : Math.trunc(l.value / r.value);
  return { value: value + 0, tokens: [...l.tokens, ...r.tokens, op] };
}

test('official examples', () => {
  assert.strictEqual(evalRPN(['2', '1', '+', '3', '*']), 9);
  assert.strictEqual(evalRPN(['4', '13', '5', '/', '+']), 6);
  assert.strictEqual(evalRPN(['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']), 22);
});

test('truncation toward zero, no -0, random expressions', () => {
  assert.strictEqual(evalRPN(['-7', '2', '/']), -3);
  assert.ok(Object.is(evalRPN(['-1', '5', '/']), 0)); // not -0
  for (let t = 0; t < 2000; t++) {
    const { value, tokens } = randomExpr(4);
    if (Math.abs(value) > 2 ** 31) continue;
    assert.strictEqual(evalRPN(tokens), value, tokens.join(' '));
  }
});
