const test = require('node:test');
const assert = require('node:assert');
const { fullJustify } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(fullJustify(['This', 'is', 'an', 'example', 'of', 'text', 'justification.'], 16), [
    'This    is    an',
    'example  of text',
    'justification.  ',
  ]);
  assert.deepStrictEqual(fullJustify(['What', 'must', 'be', 'acknowledgment', 'shall', 'be'], 16), [
    'What   must   be',
    'acknowledgment  ',
    'shall be        ',
  ]);
  assert.deepStrictEqual(
    fullJustify(['Science', 'is', 'what', 'we', 'understand', 'well', 'enough', 'to', 'explain', 'to', 'a', 'computer.', 'Art', 'is', 'everything', 'else', 'we', 'do'], 20),
    ['Science  is  what we', 'understand      well', 'enough to explain to', 'a  computer.  Art is', 'everything  else  we', 'do                  '],
  );
});

test('invariants on random inputs', () => {
  for (let t = 0; t < 500; t++) {
    const maxWidth = 5 + Math.floor(Math.random() * 15);
    const words = Array.from({ length: 1 + Math.floor(Math.random() * 12) }, () => 'x'.repeat(1 + Math.floor(Math.random() * Math.min(5, maxWidth))));
    const lines = fullJustify(words, maxWidth);
    for (const l of lines) assert.strictEqual(l.length, maxWidth); // every line exactly full width
    assert.deepStrictEqual(lines.join(' ').split(/ +/).filter(Boolean), words); // words preserved in order
    for (const l of lines.slice(0, -1)) {
      const gaps = l.trim().split(/x+/).filter(Boolean).map((g) => g.length);
      if (gaps.length > 1) assert.ok(Math.max(...gaps) - Math.min(...gaps) <= 1 && gaps.every((g, k) => k === 0 || g <= gaps[k - 1]));
    }
  }
});
