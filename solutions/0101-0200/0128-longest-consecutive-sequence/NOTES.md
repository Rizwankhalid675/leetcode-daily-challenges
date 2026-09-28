# 128. Longest Consecutive Sequence

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, union-find |
| Link | https://leetcode.com/problems/longest-consecutive-sequence/ |
| Study plan | Top Interview 150 (Hashmap) |

## What it asks (own words)
In an unsorted array, find the length of the longest run of consecutive integers (like 1, 2, 3, 4) that can be formed
from its values. It must run in O(n).

## Key constraints
- Up to 10⁵ values in ±10⁹. Sorting would be O(n log n).

## Approach
Put all values in a Set. For each value x that **starts** a run (x − 1 is absent), count x, x+1, x+2, … while present.
Track the longest run.

## Why it works
Every run has exactly one start. Only starts trigger counting, so each value is visited by at most one counting walk.
The total work is O(n), even though there's a nested `while`.

## Edge cases
- Empty array → 0.
- Duplicates are removed by the Set.
- Negative numbers.

## Complexity
- Time: O(n) amortized
- Space: O(n)

## Testing note
Compared against a sort-based reference on random inputs, plus a 10⁵-length descending run for timing. That's the
worst case if the "start of run" check were missing.

## Reusable pattern
**Only begin work at canonical starting points** to turn an apparent O(n²) into O(n).
