const test = require('node:test');
const assert = require('node:assert');
const { maskPII } = require('./solution');

test('official examples', () => {
  assert.strictEqual(maskPII('LeetCode@LeetCode.com'), 'l*****e@leetcode.com');
  assert.strictEqual(maskPII('AB@qq.com'), 'a*****b@qq.com');
  assert.strictEqual(maskPII('1(234)567-890'), '***-***-7890');
});

test('country codes', () => {
  assert.strictEqual(maskPII('86-(10)12345678'), '+**-***-***-5678');
  assert.strictEqual(maskPII('+1 (234) 567-8901'), '+*-***-***-8901');
  assert.strictEqual(maskPII('+111 111 111 1111'), '+***-***-***-1111');
});
