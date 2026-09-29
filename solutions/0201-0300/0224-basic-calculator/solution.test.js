const test = require('node:test');
const assert = require('node:assert');
const { calculate } = require('./solution');

// Reference: build random valid expressions and evaluate them with a tiny recursive parser
// written independently (no eval).
function refEval(s) {
  let i = 0;
  const skip = () => { while (s[i] === ' ') i++; };
  const term = () => {
    skip();
    if (s[i] === '-') { i++; return -term(); }
    if (s[i] === '(') { i++; const v = expr(); skip(); i++; return v; }
    let v = 0;
    while (s[i] >= '0' && s[i] <= '9') v = v * 10 + Number(s[i++]);
    return v;
  };
  const expr = () => {
    let v = term();
    for (;;) {
      skip();
      if (s[i] === '+') { i++; v += term(); }
      else if (s[i] === '-') { i++; v -= term(); }
      else return v;
    }
  };
  return expr();
}
function randomExpr(depth) {
  const atom = () => (depth > 0 && Math.random() < 0.3 ? `(${randomExpr(depth - 1)})` : String(Math.floor(Math.random() * 30)));
  let e = (Math.random() < 0.2 ? '-' : '') + atom();
  for (let k = 0; k < Math.floor(Math.random() * 4); k++) e += (Math.random() < 0.5 ? ' + ' : '-') + atom();
  return e;
}

test('official examples', () => {
  assert.strictEqual(calculate('1 + 1'), 2);
  assert.strictEqual(calculate(' 2-1 + 2 '), 3);
  assert.strictEqual(calculate('(1+(4+5+2)-3)+(6+8)'), 23);
});

test('unary minus and nesting', () => {
  assert.strictEqual(calculate('-1'), -1);
  assert.strictEqual(calculate('-(2 + 3)'), -5);
  assert.strictEqual(calculate('1-(     -2)'), 3);
  assert.strictEqual(calculate('- (3 + (4 + 5))'), -12);
});

test('matches an independent parser on random expressions', () => {
  for (let t = 0; t < 2000; t++) {
    const e = randomExpr(3);
    assert.strictEqual(calculate(e), refEval(e) + 0, e); // "+ 0": the reference's unary minus can yield -0 for "-0"
  }
});
