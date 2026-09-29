const test = require('node:test');
const assert = require('node:assert');
const { promiseAll } = require('./solution');

const after = (ms, v) => () => new Promise((res) => setTimeout(() => res(v), ms));
const failAfter = (ms, e) => () => new Promise((_, rej) => setTimeout(() => rej(e), ms));

test('official example 1 (scaled)', async () => {
  assert.deepStrictEqual(await promiseAll([after(40, 5)]), [5]);
});

test('official example 2 (scaled): first rejection wins, early', async () => {
  const t0 = Date.now();
  await assert.rejects(promiseAll([after(80, 1), failAfter(20, 'Error')]), (e) => e === 'Error');
  assert.ok(Date.now() - t0 < 70);
});

test('official example 3 (scaled): order by index, not by finish time', async () => {
  const t0 = Date.now();
  assert.deepStrictEqual(await promiseAll([after(10, 4), after(50, 10), after(30, 16)]), [4, 10, 16]);
  assert.ok(Date.now() - t0 < 100, 'ran in parallel');
});

test('does not use Promise.all', async () => {
  const orig = Promise.all;
  Promise.all = () => { throw new Error('used Promise.all'); };
  try {
    assert.deepStrictEqual(await promiseAll([after(5, 'a'), after(1, undefined)]), ['a', undefined]);
  } finally {
    Promise.all = orig;
  }
});
