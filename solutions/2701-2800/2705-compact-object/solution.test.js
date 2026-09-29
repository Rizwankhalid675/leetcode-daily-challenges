const test = require('node:test');
const assert = require('node:assert');
const { compactObject } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(compactObject([null, 0, false, 1]), [1]);
  assert.deepStrictEqual(compactObject({ a: null, b: [false, 1] }), { b: [1] });
  assert.deepStrictEqual(compactObject([null, 0, 5, [0], [false, 16]]), [5, [], [16]]);
});

test('empty strings and nested objects; emptied containers are kept', () => {
  assert.deepStrictEqual(compactObject({ a: '', b: { c: 0, d: 'x' }, e: {} }), { b: { d: 'x' }, e: {} });
});

function oracle(v) {
  // Compact via JSON round trip + filtering, written independently.
  return JSON.parse(JSON.stringify(v), function (key, val) {
    if (Array.isArray(val)) return val.filter(Boolean);
    if (val && typeof val === 'object') {
      for (const k of Object.keys(val)) if (!val[k]) delete val[k];
    }
    return val;
  });
}

function randJson(d) {
  const r = Math.random();
  if (d === 0 || r < 0.35) return [0, 1, '', 'a', null, false, true, -2][Math.floor(Math.random() * 8)];
  if (r < 0.7) return Array.from({ length: Math.floor(Math.random() * 4) }, () => randJson(d - 1));
  return Object.fromEntries(Array.from({ length: Math.floor(Math.random() * 4) }, (_, i) => ['k' + i, randJson(d - 1)]));
}

test('matches an independent oracle on random JSON', () => {
  for (let t = 0; t < 300; t++) {
    const v = randJson(4);
    if (v === null || typeof v !== 'object') continue;
    assert.deepStrictEqual(compactObject(v), oracle(v));
  }
});
