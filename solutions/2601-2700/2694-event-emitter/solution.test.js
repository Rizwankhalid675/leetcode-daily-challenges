const test = require('node:test');
const assert = require('node:assert');
const { EventEmitter } = require('./solution');

test('official example 1', () => {
  const e = new EventEmitter();
  assert.deepStrictEqual(e.emit('firstEvent'), []);
  e.subscribe('firstEvent', function cb1() { return 5; });
  e.subscribe('firstEvent', function cb2() { return 6; });
  assert.deepStrictEqual(e.emit('firstEvent'), [5, 6]);
});

test('official example 2: optional args array', () => {
  const e = new EventEmitter();
  e.subscribe('firstEvent', (...args) => args.join(','));
  assert.deepStrictEqual(e.emit('firstEvent', [1, 2, 3]), ['1,2,3']);
  assert.deepStrictEqual(e.emit('firstEvent', [3, 4, 6]), ['3,4,6']);
});

test('official examples 3 and 4: unsubscribe', () => {
  const e = new EventEmitter();
  const sub = e.subscribe('firstEvent', (...args) => args.join(','));
  assert.deepStrictEqual(e.emit('firstEvent', [1, 2, 3]), ['1,2,3']);
  assert.strictEqual(sub.unsubscribe(), undefined);
  assert.deepStrictEqual(e.emit('firstEvent', [4, 5, 6]), []);

  const f = new EventEmitter();
  const s1 = f.subscribe('firstEvent', (x) => x + 1);
  f.subscribe('firstEvent', (x) => x + 2);
  s1.unsubscribe();
  assert.deepStrictEqual(f.emit('firstEvent', [5]), [7]);
});

test('same callback subscribed twice is two independent subscriptions', () => {
  const e = new EventEmitter();
  const cb = () => 1;
  const a = e.subscribe('x', cb);
  e.subscribe('x', cb);
  assert.deepStrictEqual(e.emit('x'), [1, 1]);
  a.unsubscribe();
  assert.deepStrictEqual(e.emit('x'), [1]);
  assert.deepStrictEqual(e.emit('other'), []);
});

test('order preserved after removing a middle subscription', () => {
  const e = new EventEmitter();
  e.subscribe('x', () => 'a');
  const b = e.subscribe('x', () => 'b');
  e.subscribe('x', () => 'c');
  b.unsubscribe();
  e.subscribe('x', () => 'd');
  assert.deepStrictEqual(e.emit('x'), ['a', 'c', 'd']);
});
