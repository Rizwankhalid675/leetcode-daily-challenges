const test = require('node:test');
const assert = require('node:assert');
const { toLowerCase } = require('./solution');

test('official examples', () => {
  assert.strictEqual(toLowerCase('Hello'), 'hello');
  assert.strictEqual(toLowerCase('here'), 'here');
  assert.strictEqual(toLowerCase('LOVELY'), 'lovely');
});

test('all printable ASCII matches built-in toLowerCase', () => {
  let all = '';
  for (let c = 32; c < 127; c++) all += String.fromCharCode(c);
  assert.strictEqual(toLowerCase(all), all.toLowerCase());
  const edge = '@[{' + String.fromCharCode(96);
  assert.strictEqual(toLowerCase(edge), edge);
});
