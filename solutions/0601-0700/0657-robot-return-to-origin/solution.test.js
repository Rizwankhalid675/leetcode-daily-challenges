const test = require('node:test');
const assert = require('node:assert');
const { judgeCircle } = require('./solution');

test('official examples', () => {
  assert.strictEqual(judgeCircle('UD'), true);
  assert.strictEqual(judgeCircle('LL'), false);
});

test('matches letter counts', () => {
  for (let t = 0; t < 1000; t++) {
    const s = Array.from({ length: 1 + Math.floor(Math.random() * 8) }, () => 'UDLR'[Math.floor(Math.random() * 4)]).join('');
    const c = (ch) => s.split(ch).length - 1;
    assert.strictEqual(judgeCircle(s), c('U') === c('D') && c('L') === c('R'));
  }
});
