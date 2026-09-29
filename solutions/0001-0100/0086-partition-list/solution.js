/**
 * 86. Partition List
 * https://leetcode.com/problems/partition-list/
 * Stable split into two chains (values < x and values >= x) behind two dummy heads, then join them and terminate the second chain.
 */
var partition = function (head, x) {
  const lessHead = new ListNode(0), moreHead = new ListNode(0);
  let less = lessHead, more = moreHead;
  for (let cur = head; cur; cur = cur.next) {
    if (cur.val < x) less = less.next = cur;
    else more = more.next = cur;
  }
  more.next = null;
  less.next = moreHead.next;
  return lessHead.next;
};

module.exports = { partition };
