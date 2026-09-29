/**
 * 763. Partition Labels
 * https://leetcode.com/problems/partition-labels/
 * Record each letter's last index; extend the current part's end to the furthest last-index seen and cut when i reaches it.
 */
var partitionLabels = function (s) {
  const last = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) last[s.charCodeAt(i) - 97] = i;
  const res = [];
  let start = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s.charCodeAt(i) - 97]);
    if (i === end) {
      res.push(end - start + 1);
      start = i + 1;
    }
  }
  return res;
};

module.exports = { partitionLabels };
