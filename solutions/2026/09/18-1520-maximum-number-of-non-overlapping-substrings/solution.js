/**
 * 1520. Maximum Number of Non-Overlapping Substrings
 * https://leetcode.com/problems/maximum-number-of-non-overlapping-substrings/
 *
 * A valid substring must be "closed": every character inside it has all of its occurrences
 * inside it. For each character c, the smallest closed substring starting at first[c] is
 * found by repeatedly extending the end to cover last[x] of every character x inside it.
 * If some x inside has first[x] < first[c], no closed substring starts there.
 *
 * Any two such candidates are either disjoint or nested (they can't partially overlap, since
 * each one contains all occurrences of every character it touches). Scanning candidates by
 * start: if a candidate starts after the previously kept one ends, keep it as a new piece;
 * otherwise it lies inside the previous one, so replace that one with this smaller one
 * (same count, less total length, and it frees up room to the right).
 *
 * @param {string} s
 * @return {string[]}
 */
var maxNumOfSubstrings = function (s) {
  const n = s.length;
  const first = new Array(26).fill(-1);
  const last = new Array(26).fill(-1);
  for (let i = 0; i < n; i++) {
    const c = s.charCodeAt(i) - 97;
    if (first[c] === -1) first[c] = i;
    last[c] = i;
  }

  // returns the end of the smallest closed substring starting at `start`, or -1 if none
  const closedEnd = (start) => {
    let end = last[s.charCodeAt(start) - 97];
    for (let i = start; i <= end; i++) {
      const c = s.charCodeAt(i) - 97;
      if (first[c] < start) return -1;
      if (last[c] > end) end = last[c];
    }
    return end;
  };

  const result = [];
  let prevEnd = -1;
  for (let i = 0; i < n; i++) {
    if (i !== first[s.charCodeAt(i) - 97]) continue;
    const end = closedEnd(i);
    if (end === -1) continue;
    if (i > prevEnd) result.push(s.slice(i, end + 1));
    else result[result.length - 1] = s.slice(i, end + 1);
    prevEnd = end;
  }
  return result;
};

module.exports = { maxNumOfSubstrings };
