const test = require('node:test');
const assert = require('node:assert');
const { minMutation } = require('./solution');

// Independent oracle: Floyd-Warshall over {start} + bank with edges between genes differing in one position.
function oracle(start, end, bank) {
  if (start === end) return 0;
  const nodes = [start, ...bank];
  const n = nodes.length;
  const diff1 = (a, b) => { let d = 0; for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++; return d === 1; };
  const D = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 0 : Infinity)));
  for (let i = 0; i < n; i++) for (let j = 1; j < n; j++) if (diff1(nodes[i], nodes[j])) D[i][j] = 1;
  for (let k = 0; k < n; k++) for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (D[i][k] + D[k][j] < D[i][j]) D[i][j] = D[i][k] + D[k][j];
  let best = Infinity;
  for (let j = 1; j < n; j++) if (nodes[j] === end) best = Math.min(best, D[0][j]);
  return best === Infinity ? -1 : best;
}

test('official examples', () => {
  assert.strictEqual(minMutation('AACCGGTT', 'AACCGGTA', ['AACCGGTA']), 1);
  assert.strictEqual(minMutation('AACCGGTT', 'AAACGGTA', ['AACCGGTA', 'AACCGCTA', 'AAACGGTA']), 2);
});

test('end not in bank', () => {
  assert.strictEqual(minMutation('AACCGGTT', 'AACCGGTA', []), -1);
});

test('matches Floyd-Warshall oracle on random banks', () => {
  const rg = (len) => Array.from({ length: len }, () => 'ACGT'[Math.floor(Math.random() * 2)]).join(''); // A/C only: dense graphs
  for (let t = 0; t < 400; t++) {
    const start = rg(8);
    const bank = [...new Set(Array.from({ length: Math.floor(Math.random() * 12) }, () => rg(8)))];
    const end = Math.random() < 0.7 && bank.length ? bank[Math.floor(Math.random() * bank.length)] : rg(8);
    assert.strictEqual(minMutation(start, end, bank), oracle(start, end, bank));
  }
});
