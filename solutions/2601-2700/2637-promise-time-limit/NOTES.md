# 2637. Promise Time Limit

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics |  |
| Link | https://leetcode.com/problems/promise-time-limit/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Wrap an async function so each call either settles like the original, or rejects with `"Time Limit Exceeded"` if it takes longer than `t` ms.

## Approach
Build the result promise by hand. A timer rejects it after `t` ms, and the real call's resolve/reject are forwarded to it. A promise only settles once, so whichever event comes first wins. `finally` clears the timer so it doesn't keep the event loop alive. The rejection value is the **string** itself, because the judge compares it to the string.

## Edge cases
- `fn` rejecting on its own (example 4) passes through its own reason.
- `t = 0`: any `fn` that takes real time loses the race.

## Complexity
- Time: O(1) overhead
- Space: O(1)

## Testing note
Real timers with the delays scaled down (all under 100 ms). Assertions check the outcome and allow generous timing slack.

## Reusable pattern
**Promise race with a timeout** (compare `Promise.race([work, timeout])`), plus cleaning up the losing timer.
