# 2621. Sleep

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Link | https://leetcode.com/problems/sleep/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Return a promise that settles after the given number of milliseconds.

## Approach
Promisify `setTimeout`: create a promise and let the timer call its `resolve`. When an async function returns a promise, it adopts that promise's state.

## Edge cases
- `millis = 0` still resolves asynchronously (next timer tick).

## Complexity
- Time: O(1) work
- Space: O(1)

## Testing note
A real 50 ms sleep with a tolerant time window, the zero case, and a mock-timer test proving it doesn't resolve one tick early.

## Reusable pattern
**Promisifying a callback API**: `new Promise(res => api(..., res))`.
