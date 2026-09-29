const test = require('node:test');
const assert = require('node:assert');
const { reformatDate } = require('./solution');

test('official examples', () => {
  assert.strictEqual(reformatDate('20th Oct 2052'), '2052-10-20');
  assert.strictEqual(reformatDate('6th Jun 1933'), '1933-06-06');
  assert.strictEqual(reformatDate('26th May 1960'), '1960-05-26');
});

test('ordinals and single-digit days', () => {
  assert.strictEqual(reformatDate('1st Jan 1900'), '1900-01-01');
  assert.strictEqual(reformatDate('2nd Feb 2000'), '2000-02-02');
  assert.strictEqual(reformatDate('3rd Mar 2100'), '2100-03-03');
  assert.strictEqual(reformatDate('31st Dec 1999'), '1999-12-31');
});
