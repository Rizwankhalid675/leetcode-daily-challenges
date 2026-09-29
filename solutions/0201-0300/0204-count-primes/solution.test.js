const test = require('node:test');
const assert = require('node:assert');
const { countPrimes } = require('./solution');

function brute(n) {
  let c = 0;
  for (let x = 2; x < n; x++) {
    let prime = true;
    for (let d = 2; d * d <= x; d++) if (x % d === 0) { prime = false; break; }
    if (prime) c++;
  }
  return c;
}

test('official examples', () => {
  assert.strictEqual(countPrimes(10), 4);
  assert.strictEqual(countPrimes(0), 0);
  assert.strictEqual(countPrimes(1), 0);
});

test('small n: primes are strictly less than n', () => {
  assert.strictEqual(countPrimes(2), 0);
  assert.strictEqual(countPrimes(3), 1);
  assert.strictEqual(countPrimes(4), 2);
  assert.strictEqual(countPrimes(5), 2);
});

test('matches trial division for n <= 2000', () => {
  for (let n = 0; n <= 2000; n++) assert.strictEqual(countPrimes(n), brute(n), 'n=' + n);
});

test('known prime counts and max-size timing', () => {
  assert.strictEqual(countPrimes(1000000), 78498);
  const t0 = Date.now();
  assert.strictEqual(countPrimes(5000000), 348513);
  assert.ok(Date.now() - t0 < 1000);
});
