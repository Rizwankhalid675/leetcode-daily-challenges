const test = require('node:test');
const assert = require('node:assert');
const { countStudents } = require('./solution');

function simulate(students, sandwiches) {
  const q = [...students];
  const st = [...sandwiches];
  let misses = 0;
  while (q.length && misses < q.length) {
    if (q[0] === st[0]) { q.shift(); st.shift(); misses = 0; } else { q.push(q.shift()); misses++; }
  }
  return q.length;
}

test('official examples', () => {
  assert.strictEqual(countStudents([1, 1, 0, 0], [0, 1, 0, 1]), 0);
  assert.strictEqual(countStudents([1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1]), 3);
});

test('matches literal queue simulation', () => {
  for (let t = 0; t < 1000; t++) {
    const n = 1 + Math.floor(Math.random() * 8);
    const a = Array.from({ length: n }, () => Math.round(Math.random()));
    const b = Array.from({ length: n }, () => Math.round(Math.random()));
    assert.strictEqual(countStudents(a, b), simulate(a, b));
  }
});
