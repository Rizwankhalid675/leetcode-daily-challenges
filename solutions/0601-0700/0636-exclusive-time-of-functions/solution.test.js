const test = require('node:test');
const assert = require('node:assert');
const { exclusiveTime } = require('./solution');

// Reference: expand into per-time-unit ownership.
function brute(n, logs) {
  const res = new Array(n).fill(0);
  const stack = [];
  const events = logs.map((l) => l.split(':'));
  let t = 0;
  for (const [id, type, ts] of events) {
    const time = Number(ts);
    if (type === 'start') { for (; t < time; t++) if (stack.length) res[stack[stack.length - 1]]++; stack.push(Number(id)); }
    else { for (; t <= time; t++) res[stack[stack.length - 1]]++; stack.pop(); }
  }
  return res;
}
function randomLogs() {
  const logs = [];
  const stack = [];
  let time = 0;
  const n = 1 + Math.floor(Math.random() * 3);
  for (let k = 0; k < 8; k++) {
    if (stack.length === 0 || (Math.random() < 0.5 && stack.length < 4)) { const id = Math.floor(Math.random() * n); logs.push(`${id}:start:${time}`); stack.push(id); }
    else { logs.push(`${stack.pop()}:end:${time}`); time++; continue; }
    time += Math.floor(Math.random() * 2);
  }
  while (stack.length) { logs.push(`${stack.pop()}:end:${time}`); time++; }
  return { n, logs };
}

test('official examples', () => {
  assert.deepStrictEqual(exclusiveTime(2, ['0:start:0', '1:start:2', '1:end:5', '0:end:6']), [3, 4]);
  assert.deepStrictEqual(exclusiveTime(1, ['0:start:0', '0:start:2', '0:end:5', '0:start:6', '0:end:6', '0:end:7']), [8]);
  assert.deepStrictEqual(exclusiveTime(2, ['0:start:0', '0:start:2', '0:end:5', '1:start:6', '1:end:6', '0:end:7']), [7, 1]);
});

test('matches per-time-unit expansion on random nested logs', () => {
  for (let t = 0; t < 500; t++) {
    const { n, logs } = randomLogs();
    assert.deepStrictEqual(exclusiveTime(n, logs), brute(n, logs), JSON.stringify(logs));
  }
});
