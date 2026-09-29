/**
 * 2694. Event Emitter
 * https://leetcode.com/problems/event-emitter/
 * Map eventName -> Set of subscription records (insertion-ordered); unsubscribe deletes its own record, emit calls the live ones in order and collects results.
 */
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  /**
   * @param {string} eventName
   * @param {Function} callback
   * @return {Object}
   */
  subscribe(eventName, callback) {
    if (!this.events.has(eventName)) this.events.set(eventName, new Set());
    const subs = this.events.get(eventName);
    const entry = { callback }; // unique per subscription, even for the same callback
    subs.add(entry);
    return {
      unsubscribe: () => {
        subs.delete(entry);
        return undefined;
      },
    };
  }

  /**
   * @param {string} eventName
   * @param {Array} args
   * @return {Array}
   */
  emit(eventName, args = []) {
    const subs = this.events.get(eventName);
    if (!subs) return [];
    const res = [];
    for (const { callback } of subs) res.push(callback(...args));
    return res;
  }
}

/**
 * const emitter = new EventEmitter();
 *
 * // Subscribe to the onClick event with onClickCallback
 * function onClickCallback() { return 99 }
 * const sub = emitter.subscribe('onClick', onClickCallback);
 *
 * emitter.emit('onClick'); // [99]
 * sub.unsubscribe(); // undefined
 * emitter.emit('onClick'); // []
 */

module.exports = { EventEmitter };
