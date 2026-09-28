/**
 * 1268. Search Suggestions System
 * https://leetcode.com/problems/search-suggestions-system/
 *
 * Sort products lexicographically. Words sharing a prefix form a contiguous block in sorted
 * order, starting at the lower bound of the prefix. For each typed prefix, binary search
 * that lower bound and take up to three consecutive words that still start with it.
 *
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
var suggestedProducts = function (products, searchWord) {
  const sorted = [...products].sort(); // default sort compares UTF-16 code units: fine for a-z
  const lowerBound = (target) => {
    let lo = 0;
    let hi = sorted.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (sorted[mid] < target) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  };
  const result = [];
  let prefix = '';
  for (const ch of searchWord) {
    prefix += ch;
    const start = lowerBound(prefix);
    const suggestions = [];
    for (let i = start; i < sorted.length && i < start + 3 && sorted[i].startsWith(prefix); i++) suggestions.push(sorted[i]);
    result.push(suggestions);
  }
  return result;
};

module.exports = { suggestedProducts };
