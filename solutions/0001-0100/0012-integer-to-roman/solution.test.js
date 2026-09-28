const test = require('node:test');
const assert = require('node:assert');
const { intToRoman } = require('./solution');

// Independent reference: per-digit lookup tables.
function perDigit(n) {
  const ones = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
  const tens = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'];
  const hundreds = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'];
  const thousands = ['', 'M', 'MM', 'MMM'];
  return thousands[Math.floor(n / 1000)] + hundreds[Math.floor(n / 100) % 10] + tens[Math.floor(n / 10) % 10] + ones[n % 10];
}

test('official examples', () => {
  assert.strictEqual(intToRoman(3749), 'MMMDCCXLIX');
  assert.strictEqual(intToRoman(58), 'LVIII');
  assert.strictEqual(intToRoman(1994), 'MCMXCIV');
});

test('matches per-digit tables for every value 1..3999', () => {
  for (let n = 1; n <= 3999; n++) assert.strictEqual(intToRoman(n), perDigit(n));
});
