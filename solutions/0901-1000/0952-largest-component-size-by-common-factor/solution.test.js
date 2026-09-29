const test = require('node:test');
const assert = require('node:assert');
const { largestComponentSize } = require('./solution');

const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
function brute(nums) {
  const n = nums.length;
  const seen = new Array(n).fill(false);
  let best = 0;
  for (let s = 0; s < n; s++) {
    if (seen[s]) continue;
    seen[s] = true;
    const stack = [s];
    let cnt = 0;
    while (stack.length) {
      const u = stack.pop();
      cnt++;
      for (let v = 0; v < n; v++) if (!seen[v] && gcd(nums[u], nums[v]) > 1) { seen[v] = true; stack.push(v); }
    }
    best = Math.max(best, cnt);
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(largestComponentSize([4, 6, 15, 35]), 4);
  assert.strictEqual(largestComponentSize([20, 50, 9, 63]), 2);
  assert.strictEqual(largestComponentSize([2, 3, 6, 7, 4, 12, 21, 39]), 8);
});

test('edge cases: 1 is isolated, single element, primes only', () => {
  assert.strictEqual(largestComponentSize([1]), 1);
  assert.strictEqual(largestComponentSize([1, 2, 3, 5]), 1);
  assert.strictEqual(largestComponentSize([99991, 99989]), 1);
  assert.strictEqual(largestComponentSize([2 * 99991, 99991, 2]), 3);
});

test('matches pairwise-gcd BFS on random inputs', () => {
  for (let t = 0; t < 400; t++) {
    const set = new Set();
    const n = ri(1, 25);
    const hi = t % 2 ? 60 : 3000;
    while (set.size < n) set.add(ri(1, hi));
    const nums = [...set];
    assert.strictEqual(largestComponentSize(nums), brute(nums));
  }
});

test('max size runs fast', () => {
  const nums = [];
  for (let x = 100000; nums.length < 20000; x--) nums.push(x);
  const t0 = Date.now();
  assert.strictEqual(largestComponentSize(nums) > 1, true);
  assert.ok(Date.now() - t0 < 1000);
});
