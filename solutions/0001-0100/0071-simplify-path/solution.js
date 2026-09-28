/**
 * 71. Simplify Path
 * https://leetcode.com/problems/simplify-path/
 *
 * Split on '/', then keep a stack of directory names: skip empty parts and '.', pop on
 * '..' (never above root), push anything else (including names like '...').
 *
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  const stack = [];
  for (const part of path.split('/')) {
    if (part === '' || part === '.') continue;
    if (part === '..') stack.pop();
    else stack.push(part);
  }
  return '/' + stack.join('/');
};

module.exports = { simplifyPath };
