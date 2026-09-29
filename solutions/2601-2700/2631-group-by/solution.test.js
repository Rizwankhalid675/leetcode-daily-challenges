const test = require('node:test');
const assert = require('node:assert');
// the solution extends Array.prototype; the export below is only a marker
const { Array } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual([{ id: '1' }, { id: '1' }, { id: '2' }].groupBy((item) => item.id), {
    1: [{ id: '1' }, { id: '1' }],
    2: [{ id: '2' }],
  });
  assert.deepStrictEqual([[1, 2, 3], [1, 3, 5], [1, 5, 9]].groupBy((list) => String(list[0])), { 1: [[1, 2, 3], [1, 3, 5], [1, 5, 9]] });
  assert.deepStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].groupBy((n) => String(n > 5)), {
    true: [6, 7, 8, 9, 10],
    false: [1, 2, 3, 4, 5],
  });
});

test('keys that collide with Object.prototype names', () => {
  const g = ['a', 'bb', 'cc'].groupBy((s) => (s.length === 1 ? 'constructor' : 'toString'));
  assert.deepStrictEqual(g.constructor, ['a']);
  assert.deepStrictEqual(g.toString, ['bb', 'cc']);
});

test('empty array and random check against a Map-based oracle', () => {
  assert.deepStrictEqual([].groupBy(String), {});
  for (let t = 0; t < 200; t++) {
    const a = Array.from({ length: Math.floor(Math.random() * 30) }, () => Math.floor(Math.random() * 10));
    const key = (x) => 'k' + (x % 4);
    const m = new Map();
    for (const x of a) (m.get(key(x)) || m.set(key(x), []).get(key(x))).push(x);
    assert.deepStrictEqual(a.groupBy(key), Object.fromEntries(m));
  }
});
