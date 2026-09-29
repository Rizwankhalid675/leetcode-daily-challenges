# 2625. Flatten Deeply Nested Array

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics |  |
| Link | https://leetcode.com/problems/flatten-deeply-nested-array/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Reimplement `Array.prototype.flat(n)` without using it. A subarray found at nesting depth d (the top level's elements are at depth 0) is spliced in only when d < n.

## Key constraints
- Up to 10^5 numbers and 10^5 subarrays, maximum nesting depth 1000, 0 ≤ n ≤ 1000.

## Approach
A recursive walker carries the current depth and pushes into one shared output array. Walking into a subarray at depth d means its contents are spliced into the output, and its own subarrays are then at depth d + 1. A subarray is kept as is once `depth >= n`. The shared output avoids the quadratic cost of concatenating intermediate results.

## Why recursion is safe here
Recursion depth is at most min(n, nesting depth) ≤ 1000 frames, well under V8's limit (about 10^4).

## Edge cases
- `n = 0`: returns a shallow copy of the input.
- Kept subarrays are the original references (like the built-in).

## Complexity
- Time: O(total elements + subarrays)
- Space: O(output + recursion depth)

## Testing note
The official examples, random nested arrays compared with the built-in `flat` (used only as the oracle), a 1000-deep chain run while the built-in is disabled, and a 10^5-subarray timing run.

## Reusable pattern
**Depth-limited DFS with a shared accumulator.**
