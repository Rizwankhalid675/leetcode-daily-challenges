/**
 * 68. Text Justification
 * https://leetcode.com/problems/text-justification/
 *
 * Greedily pack words per line (letters + one space between each). For every line but the
 * last, spread the missing spaces across the gaps, giving the leftmost gaps one extra each
 * when it doesn't divide evenly. Single-word lines and the last line are left-justified.
 *
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function (words, maxWidth) {
  const lines = [];
  let i = 0;
  while (i < words.length) {
    // pack words[i..j)
    let j = i;
    let letters = 0;
    while (j < words.length && letters + words[j].length + (j - i) <= maxWidth) {
      letters += words[j].length;
      j++;
    }
    const lineWords = words.slice(i, j);
    const gaps = lineWords.length - 1;
    if (j === words.length || gaps === 0) {
      const text = lineWords.join(' ');
      lines.push(text + ' '.repeat(maxWidth - text.length));
    } else {
      const spaces = maxWidth - letters;
      const base = Math.floor(spaces / gaps);
      const extra = spaces % gaps; // leftmost `extra` gaps get one more space
      let text = '';
      lineWords.forEach((w, k) => {
        text += w;
        if (k < gaps) text += ' '.repeat(base + (k < extra ? 1 : 0));
      });
      lines.push(text);
    }
    i = j;
  }
  return lines;
};

module.exports = { fullJustify };
