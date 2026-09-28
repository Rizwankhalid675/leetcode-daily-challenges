/**
 * 383. Ransom Note
 * https://leetcode.com/problems/ransom-note/
 *
 * Count the magazine's letters, then spend one per ransom-note letter; failing to find a
 * letter means it can't be built.
 *
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  const counts = new Array(26).fill(0);
  for (let i = 0; i < magazine.length; i++) counts[magazine.charCodeAt(i) - 97]++;
  for (let i = 0; i < ransomNote.length; i++) {
    if (--counts[ransomNote.charCodeAt(i) - 97] < 0) return false;
  }
  return true;
};

module.exports = { canConstruct };
