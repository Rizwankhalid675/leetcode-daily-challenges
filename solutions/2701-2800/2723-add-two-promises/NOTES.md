# 2723. Add Two Promises

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Link | https://leetcode.com/problems/add-two-promises/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Take two promises of numbers and return a promise of their sum.

## Approach
`Promise.all` waits for both at once, and the async function wraps the sum in a resolved promise. (Two separate `await`s would also finish at max(t1, t2), because both promises are already running, but `Promise.all` makes the concurrency explicit.)

## Edge cases
- Negative values.
- Promises that are already resolved.

## Complexity
- Time: O(1) work; wall time is max(t1, t2)
- Space: O(1)

## Testing note
The official examples with shorter delays, a timing check that both waits overlap, and already-resolved inputs.

## Reusable pattern
**`await Promise.all([...])`** to wait on independent async work at the same time.
