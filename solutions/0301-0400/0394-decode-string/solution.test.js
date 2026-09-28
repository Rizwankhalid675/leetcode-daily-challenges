const test = require('node:test');
const assert = require('node:assert');
const { decodeString } = require('./solution');

// Reference: repeatedly expand the innermost k[...] with a regex until none remain.
function reference(s) {
  const inner = /(\d+)\[([a-z]*)\]/;
  while (inner.test(s)) s = s.replace(inner, (_, k, body) => body.repeat(Number(k)));
  return s;
}

test('official examples', () => {
  assert.strictEqual(decodeString('3[a]2[bc]'), 'aaabcbc');
  assert.strictEqual(decodeString('3[a2[c]]'), 'accaccacc');
  assert.strictEqual(decodeString('2[abc]3[cd]ef'), 'abcabccdcdcdef');
});

test('edge cases', () => {
  assert.strictEqual(decodeString('abc'), 'abc'); // no encoding
  assert.strictEqual(decodeString('10[a]'), 'a'.repeat(10)); // multi-digit count
  assert.strictEqual(decodeString('300[z]'), 'z'.repeat(300));
  assert.strictEqual(decodeString('2[2[2[a]b]]'), 'aabaabaabaab');
});

test('matches regex-expansion reference on random nested encodings', () => {
  const gen = (depth) => {
    let out = '';
    for (let i = 0; i < 1 + Math.floor(Math.random() * 3); i++) {
      if (depth > 0 && Math.random() < 0.5) out += `${1 + Math.floor(Math.random() * 3)}[${gen(depth - 1)}]`;
      else out += 'xyz'[Math.floor(Math.random() * 3)];
    }
    return out;
  };
  for (let t = 0; t < 500; t++) {
    const s = gen(3);
    assert.strictEqual(decodeString(s), reference(s), s);
  }
});
