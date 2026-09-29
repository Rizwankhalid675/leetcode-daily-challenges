# 2715. Timeout Cancellation

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Link | https://leetcode.com/problems/timeout-cancellation/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Delay a call to `fn(...args)` by `t` ms, and return a cancel function. If cancel runs before the delay ends, the call never happens.

## Approach
Store the `setTimeout` id and return a closure that calls `clearTimeout(id)`. Clearing a timer that has already fired does nothing, so a late cancel is harmless.

## Edge cases
- Cancel after the call already happened: no effect.
- `fn` taking several arguments: spread `args`.

## Complexity
- Time: O(1)
- Space: O(1)

## Testing note
The judge's harness is replayed on `node:test` mock timers (setTimeout + Date), so the times are exact. One short real-timer test is included too.

## Reusable pattern
**Return a disposer**: an API that starts something hands back the function that stops it.
