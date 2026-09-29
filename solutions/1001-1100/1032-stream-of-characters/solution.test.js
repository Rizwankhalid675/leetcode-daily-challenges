const test = require('node:test');
const assert = require('node:assert');
const { StreamChecker } = require('./solution');

test('official example', () => {
  const sc = new StreamChecker(['cd', 'f', 'kl']);
  const got = [...'abcdefghijkl'].map((c) => sc.query(c));
  assert.deepStrictEqual(got, [false, false, false, true, false, true, false, false, false, false, false, true]);
});

test('matches endsWith on random words and streams', () => {
  for (let t = 0; t < 300; t++) {
    const words = Array.from({ length: 1 + Math.floor(Math.random() * 4) }, () =>
      Array.from({ length: 1 + Math.floor(Math.random() * 4) }, () => 'abc'[Math.floor(Math.random() * 3)]).join(''));
    const sc = new StreamChecker(words);
    let stream = '';
    for (let q = 0; q < 40; q++) {
      const c = 'abc'[Math.floor(Math.random() * 3)];
      stream += c;
      assert.strictEqual(sc.query(c), words.some((w) => stream.endsWith(w)), JSON.stringify({ words, stream }));
    }
  }
});

test('2000 words of length 200 and 4e4 queries run fast', () => {
  const words = Array.from({ length: 2000 }, (_, i) => String.fromCharCode(98 + (i % 24)) + 'a'.repeat(i % 199) + 'a');
  const start = Date.now();
  const sc = new StreamChecker(words);
  let hits = 0;
  for (let q = 0; q < 40000; q++) if (sc.query(q % 250 === 0 ? 'b' : 'a')) hits++;
  assert.ok(hits > 0);
  assert.ok(Date.now() - start < 1000);
});
