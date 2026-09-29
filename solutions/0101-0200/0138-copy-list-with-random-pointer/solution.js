/**
 * 138. Copy List with Random Pointer
 * https://leetcode.com/problems/copy-list-with-random-pointer/
 *
 * Two passes with a Map original -> copy: first create every copy node, then wire each
 * copy's next and random through the map (so they point at copies, never originals).
 * LeetCode provides the _Node constructor globally.
 *
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function (head) {
  const copyOf = new Map([[null, null]]);
  for (let n = head; n !== null; n = n.next) copyOf.set(n, new _Node(n.val, null, null));
  for (let n = head; n !== null; n = n.next) {
    const c = copyOf.get(n);
    c.next = copyOf.get(n.next);
    c.random = copyOf.get(n.random);
  }
  return copyOf.get(head);
};

module.exports = { copyRandomList };
