const test = require('node:test');
const assert = require('node:assert');
const { romanToInt } = require('./solution');
const { intToRoman } = require('../0012-integer-to-roman/solution');

test('official examples', () => {
  assert.strictEqual(romanToInt('III'), 3);
  assert.strictEqual(romanToInt('LVIII'), 58);
  assert.strictEqual(romanToInt('MCMXCIV'), 1994);
});

test('round-trips every value 1..3999 with the independent int -> roman solution', () => {
  for (let n = 1; n <= 3999; n++) assert.strictEqual(romanToInt(intToRoman(n)), n);
});
