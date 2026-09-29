# 2703. Return Length of Arguments Passed

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Link | https://leetcode.com/problems/return-length-of-arguments-passed/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Report how many arguments a function was called with.

## Approach
`...args` gathers all passed arguments into a real array, so `args.length` is the answer.

## Edge cases
- No arguments gives 0.
- Explicitly passed `undefined` values still count.

## Complexity
- Time: O(1) (plus the engine's O(n) to build `args`)
- Space: O(n) for the rest array

## Testing note
The official examples, plus zero arguments, explicit `undefined`s and a 100-argument spread.

## Reusable pattern
**Rest parameters** replace the old array-like `arguments` object.
