const test = require('node:test');
const assert = require('node:assert');
const { isRobotBounded } = require('./solution');

function oracle(ins) {
  const dx = [0, 1, 0, -1], dy = [1, 0, -1, 0];
  let x = 0, y = 0, d = 0;
  for (let k = 0; k < 4; k++)
    for (const ch of ins) {
      if (ch === 'G') { x += dx[d]; y += dy[d]; } else if (ch === 'L') d = (d + 3) % 4; else d = (d + 1) % 4;
    }
  return x === 0 && y === 0; // after 4 repetitions a bounded robot is always home
}

test('official examples', () => {
  assert.strictEqual(isRobotBounded('GGLLGG'), true);
  assert.strictEqual(isRobotBounded('GG'), false);
  assert.strictEqual(isRobotBounded('GL'), true);
});

test('matches the four-repetition simulation', () => {
  for (let t = 0; t < 2000; t++) {
    const s = Array.from({ length: 1 + Math.floor(Math.random() * 8) }, () => 'GLR'[Math.floor(Math.random() * 3)]).join('');
    assert.strictEqual(isRobotBounded(s), oracle(s));
  }
});
