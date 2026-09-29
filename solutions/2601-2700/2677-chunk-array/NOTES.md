# 2677. Chunk Array

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Link | https://leetcode.com/problems/chunk-array/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Split an array into consecutive pieces of length `size`. The last piece may be shorter. (No lodash allowed.)

## Approach
Walk the start index in steps of `size` and `slice` each window. `slice` clamps its end to the array length, so the final short chunk needs no special case.

## Edge cases
- An empty array gives `[]`.
- `size` larger than the length gives a single chunk.

## Complexity
- Time: O(n)
- Space: O(n) for the output

## Testing note
The official examples, plus random arrays checked for three properties: concatenating the chunks gives the input back, the chunk count is ⌈n/size⌉, and only the last chunk can be shorter.

## Reusable pattern
**Stride loop + slice** for batching and pagination.
