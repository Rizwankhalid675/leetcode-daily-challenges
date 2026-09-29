/**
 * 622. Design Circular Queue
 * https://leetcode.com/problems/design-circular-queue/
 * Fixed array ring buffer with head index and size; tail = (head + size - 1) mod k.
 */
var MyCircularQueue = function (k) {
  this.buf = new Array(k);
  this.cap = k;
  this.head = 0;
  this.size = 0;
};
MyCircularQueue.prototype.enQueue = function (value) {
  if (this.size === this.cap) return false;
  this.buf[(this.head + this.size) % this.cap] = value;
  this.size++;
  return true;
};
MyCircularQueue.prototype.deQueue = function () {
  if (this.size === 0) return false;
  this.head = (this.head + 1) % this.cap;
  this.size--;
  return true;
};
MyCircularQueue.prototype.Front = function () {
  return this.size === 0 ? -1 : this.buf[this.head];
};
MyCircularQueue.prototype.Rear = function () {
  return this.size === 0 ? -1 : this.buf[(this.head + this.size - 1) % this.cap];
};
MyCircularQueue.prototype.isEmpty = function () {
  return this.size === 0;
};
MyCircularQueue.prototype.isFull = function () {
  return this.size === this.cap;
};

module.exports = { MyCircularQueue };
