const test = require('node:test');
const assert = require('node:assert');
const { gcdSort } = require('./solution');

const gcd = (a, b) => (b ? gcd(b, a % b) : a);
// BFS over all arrangements reachable by legal swaps (tiny n only).
function brute(nums) {
  const target = [...nums].sort((a, b) => a - b).join(',');
  const start = nums.join(',');
  const seen = new Set([start]);
  const q = [nums];
  for (let h = 0; h < q.length; h++) {
    const a = q[h];
    if (a.join(',') === target) return true;
    for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) {
      if (gcd(a[i], a[j]) <= 1) continue;
      const b = [...a];
      [b[i], b[j]] = [b[j], b[i]];
      const key = b.join(',');
      if (!seen.has(key)) { seen.add(key); q.push(b); }
    }
  }
  return false;
}

test('official examples', () => {
  assert.strictEqual(gcdSort([7, 21, 3]), true);
  assert.strictEqual(gcdSort([5, 2, 6, 2]), false);
  assert.strictEqual(gcdSort([10, 5, 9, 3, 15]), true);
});

test('already sorted with coprime values, and a lone prime out of place', () => {
  assert.strictEqual(gcdSort([2, 3, 5, 7]), true);
  assert.strictEqual(gcdSort([3, 2]), false);
  assert.strictEqual(gcdSort([6, 2, 3]), true);
});

test('matches BFS over reachable permutations', () => {
  for (let t = 0; t < 400; t++) {
    const nums = Array.from({ length: 1 + Math.floor(Math.random() * 6) }, () => 2 + Math.floor(Math.random() * 29));
    assert.strictEqual(gcdSort(nums), brute(nums), nums.join(','));
  }
});

test('max size runs fast', () => {
  const nums = Array.from({ length: 3e4 }, () => 2 + Math.floor(Math.random() * (1e5 - 1)));
  nums[0] = 1e5;
  const t0 = Date.now();
  gcdSort(nums);
  const evens = Array.from({ length: 3e4 }, (_, i) => 2 * (3e4 - i) + 2);
  assert.strictEqual(gcdSort(evens), true);
  assert.ok(Date.now() - t0 < 1000);
});
