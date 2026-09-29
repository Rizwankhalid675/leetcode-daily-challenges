/**
 * 2433. Find The Original Array of Prefix Xor
 * https://leetcode.com/problems/find-the-original-array-of-prefix-xor/
 * XOR undoes itself: arr[i] = pref[i] ^ pref[i-1], with arr[0] = pref[0].
 */
var findArray = function (pref) {
  const arr = new Array(pref.length);
  arr[0] = pref[0];
  for (let i = 1; i < pref.length; i++) arr[i] = pref[i] ^ pref[i - 1];
  return arr;
};

module.exports = { findArray };
