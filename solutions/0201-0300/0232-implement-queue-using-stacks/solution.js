/**
 * 232. Implement Queue using Stacks
 * https://leetcode.com/problems/implement-queue-using-stacks/
 * Two stacks: push onto `inbox`; pop/peek from `outbox`, refilling it (reversing inbox) only when empty. Amortized O(1).
 */
var MyQueue = function () {
  this.inbox = [];
  this.outbox = [];
};
MyQueue.prototype.push = function (x) {
  this.inbox.push(x);
};
MyQueue.prototype._shift = function () {
  if (this.outbox.length === 0) while (this.inbox.length) this.outbox.push(this.inbox.pop());
};
MyQueue.prototype.pop = function () {
  this._shift();
  return this.outbox.pop();
};
MyQueue.prototype.peek = function () {
  this._shift();
  return this.outbox[this.outbox.length - 1];
};
MyQueue.prototype.empty = function () {
  return this.inbox.length === 0 && this.outbox.length === 0;
};

module.exports = { MyQueue };
