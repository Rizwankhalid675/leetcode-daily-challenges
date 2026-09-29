const test = require('node:test');
const assert = require('node:assert');
const { hasCycle } = require('./solution');
const { buildList } = require('../../../tests/helpers/list');

// Build a list whose tail links back to index pos (LeetCode's representation), or no cycle for pos = -1.
function withCycle(values, pos) {
  const head = buildList(values);
  if (pos < 0 || !head) return head;
  let tail = head;
  let target = null;
  for (let i = 0; tail; i++) {
    if (i === pos) target = tail;
    if (!tail.next) break;
    tail = tail.next;
  }
  tail.next = target;
  return head;
}

test('official examples', () => {
  assert.strictEqual(hasCycle(withCycle([3, 2, 0, -4], 1)), true);
  assert.strictEqual(hasCycle(withCycle([1, 2], 0)), true);
  assert.strictEqual(hasCycle(withCycle([1], -1)), false);
});

test('every length and cycle position up to 12', () => {
  assert.strictEqual(hasCycle(null), false);
  for (let n = 1; n <= 12; n++)
    for (let pos = -1; pos < n; pos++) assert.strictEqual(hasCycle(withCycle(Array.from({ length: n }, (_, i) => i), pos)), pos >= 0, `n=${n} pos=${pos}`);
});
