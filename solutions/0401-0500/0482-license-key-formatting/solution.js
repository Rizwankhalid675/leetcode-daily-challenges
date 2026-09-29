/**
 * 482. License Key Formatting
 * https://leetcode.com/problems/license-key-formatting/
 * Strip dashes and uppercase, then group from the end so only the first group may be short.
 */
var licenseKeyFormatting = function (s, k) {
  const clean = s.replace(/-/g, '').toUpperCase();
  const groups = [];
  for (let end = clean.length; end > 0; end -= k) groups.push(clean.slice(Math.max(0, end - k), end));
  return groups.reverse().join('-');
};

module.exports = { licenseKeyFormatting };
