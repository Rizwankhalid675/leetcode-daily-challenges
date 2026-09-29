/**
 * 831. Masking Personal Information
 * https://leetcode.com/problems/masking-personal-information/
 * Emails: lowercase, keep first/last letter of the name with five stars between. Phones: keep last 4 digits, format local as ***-***-XXXX with a +***- style country prefix.
 */
var maskPII = function (s) {
  if (s.includes('@')) {
    const [name, domain] = s.toLowerCase().split('@');
    return `${name[0]}*****${name[name.length - 1]}@${domain}`;
  }
  const digits = s.replace(/\D/g, '');
  const local = `***-***-${digits.slice(-4)}`;
  const country = digits.length - 10;
  return country === 0 ? local : `+${'*'.repeat(country)}-${local}`;
};

module.exports = { maskPII };
