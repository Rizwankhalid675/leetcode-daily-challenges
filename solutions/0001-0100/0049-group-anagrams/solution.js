/**
 * 49. Group Anagrams
 * https://leetcode.com/problems/group-anagrams/
 *
 * Anagrams share the same letter-count signature. Use the 26 counts, joined, as a Map key.
 * (O(L) per word instead of O(L log L) for sorting the word.)
 *
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const groups = new Map();
  for (const word of strs) {
    const counts = new Array(26).fill(0);
    for (let i = 0; i < word.length; i++) counts[word.charCodeAt(i) - 97]++;
    const key = counts.join('#');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return [...groups.values()];
};

module.exports = { groupAnagrams };
