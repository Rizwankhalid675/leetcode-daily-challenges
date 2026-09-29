# 2721. Execute Asynchronous Functions in Parallel

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics |  |
| Link | https://leetcode.com/problems/execute-asynchronous-functions-in-parallel/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Reimplement `Promise.all` for a list of promise-returning functions. Run them all concurrently and resolve with their results in input order, or reject with the first error.

## Approach
Call every function immediately. Each success writes to `results[i]` (by index, so finish order doesn't matter) and increments a counter. The last one to finish resolves the outer promise. Any rejection calls `reject`, and settling a promise twice is ignored, so only the first error counts.

## Edge cases
- Results that are `undefined` still count, because the counter is used instead of scanning for holes.
- An empty list resolves to `[]` (not in the constraints, but handled).

## Complexity
- Time: O(n) bookkeeping; wall time is the slowest promise (or the first rejection)
- Space: O(n)

## Testing note
The official examples with shorter delays and timing checks for parallelism and early rejection. A guard temporarily breaks `Promise.all` to prove it isn't used.

## Reusable pattern
**Index-keyed result slots + completion counter**, the core of every fan-out/fan-in combinator.
