const test = require('node:test');
const assert = require('node:assert');
const { getConcatenation } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(getConcatenation([1, 2, 1]), [1, 2, 1, 1, 2, 1]);
  assert.deepStrictEqual(getConcatenation([1, 3, 2, 1]), [1, 3, 2, 1, 1, 3, 2, 1]);
});

test('matches spread concat', () => {
  for (let t = 0; t < 200; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 1000) + 1);
    assert.deepStrictEqual(getConcatenation(a), [...a, ...a]);
  }
});
