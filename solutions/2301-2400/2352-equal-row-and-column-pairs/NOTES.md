# 2352. Equal Row and Column Pairs

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, matrix, simulation |
| Link | https://leetcode.com/problems/equal-row-and-column-pairs/ |
| Study plan | LeetCode 75 (Hash Map / Set) |

## What it asks (own words)
In an n×n grid, count the (row, column) pairs where the row, read left to right, equals the column, read top to
bottom.

## Key constraints
- n ≤ 200. Comparing every pair element by element is O(n³) = 8·10⁶, which is acceptable, but hashing is cleaner.

## Approach
Serialize each row to a string key (`join(',')`) and count the keys in a Map. For each column, build its key and add
the count of matching rows.

## Why it works
Two arrays are equal iff their serializations are equal, *provided the separator can't be confused with the data*.
Without the comma, rows [1, 11] and [11, 1] would both become "111".

## Edge cases
- Duplicate rows: counted separately via the frequency map (example 2 gives 3).
- A separator collision is tested explicitly.

## Bugs / debugging
My first separator test was wrong: I claimed `[[1,11],[1,1]]` has 0 pairs, but column 0 is `[1,1]`, which really does
equal row 1, so the answer is 1. The solution was right. I replaced the test with `[[1,11],[5,1]]`, where row 0 and
column 1 would collide only if no separator were used.

## Complexity
- Time: O(n²) to build all keys (plus hashing strings of length O(n))
- Space: O(n²)

## Reusable pattern
**Hash a composite value by serializing it with an unambiguous separator.** Arrays aren't usable as Map keys in JS,
because they're compared by reference, so serialize them.
