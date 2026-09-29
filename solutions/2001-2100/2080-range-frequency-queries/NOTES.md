# 2080. Range Frequency Queries

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, binary-search, design, segment-tree |
| Link | https://leetcode.com/problems/range-frequency-queries/ |
| Context | Quest: System & Software Design / Comprehensive Data Operation Simulation Station / Comprehensive Data Operations Simulation |

## What it asks (own words)
Preprocess an array so that you can quickly answer: how many times does a given value occur between two indices (inclusive)?

## Approach
In the constructor, record for every value the list of indices where it occurs. Scanning left to right means each list is already sorted. For a query, the answer is the count of that value's indices in [left, right]:
`lowerBound(list, right + 1) − lowerBound(list, left)`.

A value that never occurs has no list → 0.

## Edge cases
- left = right (a single element).
- A value outside the array's values.

## Complexity
- Time: O(n) to build, O(log n) per query
- Space: O(n)

## Testing note
Compared with counting `arr.slice(l, r + 1)` on random small arrays, plus a 10⁵ × 10⁵ timing check.

## Reusable pattern
**Positions per value + two binary searches** answers "count of x in a range" (a static structure; no segment tree needed).
