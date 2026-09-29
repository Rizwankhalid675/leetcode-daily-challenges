# 2622. Cache With Time Limit

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics |  |
| Link | https://leetcode.com/problems/cache-with-time-limit/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Build a key-value cache where every entry disappears a given number of ms after it was set. `set` reports whether a live entry was already there (and replaces it along with its lifetime). `get` returns -1 for missing or expired keys, and `count` returns the number of live keys.

## Approach
Store `{ value, timer }` per key in a `Map`. `set` cancels any old timer, then starts a new `setTimeout` that deletes the key when it expires. Expired keys are removed as soon as they expire, so `get` is a lookup and `count` is `map.size`, both O(1).

## Why it works
The judge schedules its actions with `setTimeout` too. A deletion timer set for time T is queued before an action that runs at T, so an entry is already gone at its exact expiry time. This matches the expected "expires at t=100" semantics. A `Date.now()` comparison can be off by a millisecond around that boundary.

## Edge cases
- Overwriting also resets the duration, and may shorten it.
- Setting a key after it expired returns `false`.
- `duration = 0`: the entry lives until the timer queue runs.

## Complexity
- Time: O(1) per operation
- Space: O(live keys + pending timers)

## Testing note
Both official scenarios are replayed with the judge's setTimeout-based scheduling on mock timers. Other checks cover overwrite and shortening, plus random schedules against a timestamp model.

## Reusable pattern
**Timer-per-entry expiry** (eager deletion) vs **timestamp check on read** (lazy deletion). Eager deletion keeps `count` O(1).
