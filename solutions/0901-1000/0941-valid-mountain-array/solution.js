/**
 * 941. Valid Mountain Array
 * https://leetcode.com/problems/valid-mountain-array/
 * Climb strictly up from the left, then strictly down; valid iff the peak is interior and the walk reaches the end.
 */
var validMountainArray = function (arr) {
  const n = arr.length;
  let i = 0;
  while (i + 1 < n && arr[i] < arr[i + 1]) i++;
  if (i === 0 || i === n - 1) return false; // no ascent or no descent
  while (i + 1 < n && arr[i] > arr[i + 1]) i++;
  return i === n - 1;
};

module.exports = { validMountainArray };
