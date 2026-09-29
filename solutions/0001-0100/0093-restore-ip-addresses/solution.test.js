const test = require('node:test');
const assert = require('node:assert');
const { restoreIpAddresses } = require('./solution');

function brute(s) {
  const ok = (x) => x.length > 0 && x.length <= 3 && (x === '0' || x[0] !== '0') && Number(x) <= 255;
  const res = [];
  for (let a = 1; a < s.length; a++)
    for (let b = a + 1; b < s.length; b++)
      for (let c = b + 1; c < s.length; c++) {
        const p = [s.slice(0, a), s.slice(a, b), s.slice(b, c), s.slice(c)];
        if (p.every(ok)) res.push(p.join('.'));
      }
  return res.sort();
}

test('official examples', () => {
  assert.deepStrictEqual(restoreIpAddresses('25525511135').sort(), ['255.255.11.135', '255.255.111.35']);
  assert.deepStrictEqual(restoreIpAddresses('0000'), ['0.0.0.0']);
  assert.deepStrictEqual(restoreIpAddresses('101023').sort(), ['1.0.10.23', '1.0.102.3', '10.1.0.23', '10.10.2.3', '101.0.2.3']);
});

test('too short / too long', () => {
  assert.deepStrictEqual(restoreIpAddresses('1'), []);
  assert.deepStrictEqual(restoreIpAddresses('1234567890123'), []);
  assert.deepStrictEqual(restoreIpAddresses('255255255255'), ['255.255.255.255']);
  assert.deepStrictEqual(restoreIpAddresses('256256256256'), []);
});

test('matches brute force', () => {
  for (let t = 0; t < 1500; t++) {
    const n = 1 + Math.floor(Math.random() * 14);
    const s = Array.from({ length: n }, () => '0125'[Math.floor(Math.random() * 4)]).join('');
    assert.deepStrictEqual(restoreIpAddresses(s).sort(), brute(s));
  }
});
