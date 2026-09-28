/**
 * 1096. Brace Expansion II
 * https://leetcode.com/problems/brace-expansion-ii/
 *
 * Recursive-descent parser for the grammar:
 *   union  := concat (',' concat)*          -> set union
 *   concat := term term*                    -> cartesian product of word sets
 *   term   := letter | '{' union '}'
 * A concat ends at ',' or '}' (or end of input). Sets de-duplicate automatically.
 *
 * @param {string} expression
 * @return {string[]}
 */
var braceExpansionII = function (expression) {
  let i = 0;

  const parseUnion = () => {
    const result = new Set(parseConcat());
    while (expression[i] === ',') {
      i++; // skip ','
      for (const word of parseConcat()) result.add(word);
    }
    return result;
  };

  const parseConcat = () => {
    let words = new Set(['']);
    while (i < expression.length && expression[i] !== ',' && expression[i] !== '}') {
      let term;
      if (expression[i] === '{') {
        i++; // skip '{'
        term = parseUnion();
        i++; // skip '}'
      } else {
        term = new Set([expression[i]]);
        i++;
      }
      const combined = new Set();
      for (const left of words) for (const right of term) combined.add(left + right);
      words = combined;
    }
    return words;
  };

  return [...parseUnion()].sort();
};

module.exports = { braceExpansionII };
