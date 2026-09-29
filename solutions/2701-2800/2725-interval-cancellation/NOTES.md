# 2725. Interval Cancellation

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Link | https://leetcode.com/problems/interval-cancellation/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Call `fn(...args)` right away and then every `t` ms until the returned cancel function is called.

## Approach
Make the first call synchronously, start `setInterval` for the repeats, and return a closure that clears the interval.

## Edge cases
- The first call is at time 0, before any timer, and it is the one people most often forget.
- Cancelling exactly between ticks stops all later calls.

## Complexity
- Time: O(1) per tick
- Space: O(1)

## Testing note
All three official schedules are reproduced exactly on mock timers (setTimeout/setInterval/Date). There is also a synchronous-first-call check and a short real-timer stop check.

## Reusable pattern
**Immediate call + setInterval + disposer**, which is how a polling loop is built.
