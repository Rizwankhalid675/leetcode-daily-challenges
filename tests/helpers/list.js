// Mirrors LeetCode's ListNode and converts between arrays and linked lists for tests.
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function buildList(values) {
  const dummy = new ListNode();
  let tail = dummy;
  for (const v of values) tail = tail.next = new ListNode(v);
  return dummy.next;
}

function listToArray(head) {
  const out = [];
  for (let node = head; node; node = node.next) out.push(node.val);
  return out;
}

module.exports = { ListNode, buildList, listToArray };
