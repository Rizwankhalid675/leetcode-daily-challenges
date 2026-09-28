const test = require('node:test');
const assert = require('node:assert');
const { predictPartyVictory } = require('./solution');

// Reference: literal round-by-round simulation with the "ban the next opponent" strategy.
function simulate(senate) {
  const alive = [...senate];
  const banned = new Array(alive.length).fill(false);
  for (;;) {
    for (let i = 0; i < alive.length; i++) {
      if (banned[i]) continue;
      const remaining = alive.filter((_, k) => !banned[k]);
      if (remaining.every((p) => p === alive[i])) return alive[i] === 'R' ? 'Radiant' : 'Dire';
      // ban the next opponent after i, wrapping around
      for (let step = 1; step < alive.length; step++) {
        const k = (i + step) % alive.length;
        if (!banned[k] && alive[k] !== alive[i]) {
          banned[k] = true;
          break;
        }
      }
    }
  }
}

test('official examples', () => {
  assert.strictEqual(predictPartyVictory('RD'), 'Radiant');
  assert.strictEqual(predictPartyVictory('RDD'), 'Dire');
});

test('edge cases', () => {
  assert.strictEqual(predictPartyVictory('R'), 'Radiant');
  assert.strictEqual(predictPartyVictory('DDRRR'), 'Dire'); // D acts first and removes R's early
});

test('matches round-by-round simulation', () => {
  for (let t = 0; t < 1000; t++) {
    const s = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => (Math.random() < 0.5 ? 'R' : 'D')).join('');
    assert.strictEqual(predictPartyVictory(s), simulate(s), s);
  }
});
