const test = require('node:test');
const assert = require('node:assert');
const { countPalindromePaths } = require('./solution');

// Oracle: collect edge letters on the actual u-v path (walk both up to the LCA) and test parity.
function bruteForce(parent, s) {
  const n = parent.length;
  const depth = new Array(n).fill(0);
  const dep = (v) => (v === 0 ? 0 : dep(parent[v]) + 1);
  for (let i = 0; i < n; i++) depth[i] = dep(i);
  let cnt = 0;
  for (let u = 0; u < n; u++) for (let v = u + 1; v < n; v++) {
    const freq = new Array(26).fill(0);
    let a = u, b = v;
    while (a !== b) {
      if (depth[a] >= depth[b]) { freq[s.charCodeAt(a) - 97]++; a = parent[a]; }
      else { freq[s.charCodeAt(b) - 97]++; b = parent[b]; }
    }
    if (freq.filter((f) => f % 2).length <= 1) cnt++;
  }
  return cnt;
}

function randomTree(n) {
  // random labels, so parent[i] is not always smaller than i
  const perm = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 1; i--) { const j = 1 + Math.floor(Math.random() * i); [perm[i], perm[j]] = [perm[j], perm[i]]; }
  const parent = new Array(n).fill(-1);
  for (let i = 1; i < n; i++) parent[perm[i]] = perm[Math.floor(Math.random() * i)];
  return parent;
}

test('official examples', () => {
  assert.strictEqual(countPalindromePaths([-1, 0, 0, 1, 1, 2], 'acaabc'), 8);
  assert.strictEqual(countPalindromePaths([-1, 0, 0, 0, 0], 'aaaaa'), 10);
});

test('single node has no pairs', () => {
  assert.strictEqual(countPalindromePaths([-1], 'z'), 0);
});

test('matches brute force on random trees', () => {
  for (let t = 0; t < 500; t++) {
    const n = 1 + Math.floor(Math.random() * 10);
    const parent = randomTree(n);
    const alpha = 1 + Math.floor(Math.random() * 4);
    const s = Array.from({ length: n }, () => String.fromCharCode(97 + Math.floor(Math.random() * alpha))).join('');
    assert.strictEqual(countPalindromePaths(parent, s), bruteForce(parent, s));
  }
});

test('1e5-node chain and star finish quickly', () => {
  const n = 100000;
  const chain = Array.from({ length: n }, (_, i) => i - 1);
  const star = Array.from({ length: n }, (_, i) => (i === 0 ? -1 : 0));
  const same = 'a'.repeat(n);
  const mixed = Array.from({ length: n }, (_, i) => String.fromCharCode(97 + (i * 7) % 26)).join('');
  const t0 = Date.now();
  assert.strictEqual(countPalindromePaths(star, same), n * (n - 1) / 2);
  assert.strictEqual(countPalindromePaths(chain, same), n * (n - 1) / 2);
  countPalindromePaths(chain, mixed);
  assert.ok(Date.now() - t0 < 1500);
});
