# 2694. Event Emitter

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics |  |
| Link | https://leetcode.com/problems/event-emitter/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Build a small pub/sub class. `subscribe(name, cb)` registers a listener and returns a handle with `unsubscribe()`. `emit(name, args)` calls every current listener for that event in subscription order, passing the args spread out, and returns their results as an array.

## Approach
A `Map` from event name to a `Set` of subscription records. Each subscription gets a fresh `{ callback }` object, so subscribing the same function twice gives two separate records, and each handle removes only its own. `Set` keeps insertion order and deletes in O(1), so emit order stays correct after removals.

## Edge cases
- Emitting an event with no listeners returns `[]`.
- `args` defaults to `[]`.
- `unsubscribe` returns `undefined`.
- The same callback subscribed twice.

## Complexity
- Time: subscribe/unsubscribe O(1); emit O(listeners)
- Space: O(total subscriptions)

## Testing note
All four official examples, duplicate-callback subscriptions, and order after removing a middle listener.

## Reusable pattern
**Unique token per subscription** (not the callback itself) as the removal key, stored in an insertion-ordered `Set`.
