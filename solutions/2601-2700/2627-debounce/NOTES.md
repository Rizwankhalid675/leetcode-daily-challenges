# 2627. Debounce

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics |  |
| Link | https://leetcode.com/problems/debounce/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Return a debounced version of `fn`. Each call postpones execution to `t` ms after that call. Any call arriving before that time cancels the pending run, so only the last call in a burst actually runs, with its own arguments.

## Approach
Keep one timer id in the closure. Every call does `clearTimeout(id)` and then schedules a new timer carrying the newest `args`. Clearing `undefined` or an already-fired id is a no-op.

## Edge cases
- Calls exactly `t` apart: the earlier one has already fired (example 2).
- Two calls at the same time: only the second runs (example 3).
- `t = 0`: still asynchronous.

## Complexity
- Time: O(1) per call
- Space: O(1)

## Testing note
The three official examples are replayed with a judge-style harness on mock timers, plus a `t = 0` burst check.

## Reusable pattern
**Debounce (wait for quiet) vs throttle (at most once per window).** Both are closures around a timer.
