const test = require('node:test');
const assert = require('node:assert');
const { join } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(join([{ id: 1, x: 1 }, { id: 2, x: 9 }], [{ id: 3, x: 5 }]),
    [{ id: 1, x: 1 }, { id: 2, x: 9 }, { id: 3, x: 5 }]);
  assert.deepStrictEqual(join([{ id: 1, x: 2, y: 3 }, { id: 2, x: 3, y: 6 }], [{ id: 2, x: 10, y: 20 }, { id: 3, x: 0, y: 0 }]),
    [{ id: 1, x: 2, y: 3 }, { id: 2, x: 10, y: 20 }, { id: 3, x: 0, y: 0 }]);
  assert.deepStrictEqual(join([{ id: 1, b: { b: 94 }, v: [4, 3], y: 48 }], [{ id: 1, b: { c: 84 }, v: [1, 3] }]),
    [{ id: 1, b: { c: 84 }, v: [1, 3], y: 48 }]);
});

test('unsorted input, negative and large ids are ordered numerically', () => {
  assert.deepStrictEqual(
    join([{ id: 10 }, { id: -3 }, { id: 2 }], [{ id: 1e9, a: 1 }, { id: -3, a: 2 }]).map((o) => o.id),
    [-3, 2, 10, 1e9],
  );
});

test('random check against a brute-force merge', () => {
  for (let t = 0; t < 200; t++) {
    const ids1 = [...new Set(Array.from({ length: 6 }, () => Math.floor(Math.random() * 12)))];
    const ids2 = [...new Set(Array.from({ length: 6 }, () => Math.floor(Math.random() * 12)))];
    const a1 = ids1.map((id) => ({ id, p: id * 2, q: 'a' }));
    const a2 = ids2.map((id) => ({ id, q: 'b', r: [id] }));
    const allIds = [...new Set([...ids1, ...ids2])].sort((x, y) => x - y);
    const expected = allIds.map((id) => Object.assign({}, a1.find((o) => o.id === id), a2.find((o) => o.id === id)));
    assert.deepStrictEqual(join(a1, a2), expected);
  }
});
