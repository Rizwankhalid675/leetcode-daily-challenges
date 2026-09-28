const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { simplifyPath } = require('./solution');

test('official examples', () => {
  assert.strictEqual(simplifyPath('/home/'), '/home');
  assert.strictEqual(simplifyPath('/home//foo/'), '/home/foo');
  assert.strictEqual(simplifyPath('/home/user/Documents/../Pictures'), '/home/user/Pictures');
  assert.strictEqual(simplifyPath('/../'), '/');
  assert.strictEqual(simplifyPath('/.../a/../b/c/../d/./'), '/.../b/d');
});

test('matches node:path.posix.normalize on random absolute paths', () => {
  const parts = ['a', 'b', '.', '..', '...', '', '_x'];
  for (let t = 0; t < 2000; t++) {
    const p = '/' + Array.from({ length: Math.floor(Math.random() * 7) }, () => parts[Math.floor(Math.random() * parts.length)]).join('/');
    let expected = path.posix.normalize(p);
    if (expected.length > 1 && expected.endsWith('/')) expected = expected.slice(0, -1);
    assert.strictEqual(simplifyPath(p), expected, p);
  }
});
