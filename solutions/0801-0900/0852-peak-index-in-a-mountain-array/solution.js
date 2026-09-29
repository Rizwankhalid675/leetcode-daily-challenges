/**
 * 852. Peak Index in a Mountain Array
 * https://leetcode.com/problems/peak-index-in-a-mountain-array/
 * Binary search on the slope: if arr[mid] < arr[mid+1] the peak is to the right, otherwise it is at mid or to the left.
 */
var peakIndexInMountainArray = function (arr) {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] < arr[mid + 1]) lo = mid + 1;
    else hi = mid;
  }
  return lo;
};

module.exports = { peakIndexInMountainArray };
