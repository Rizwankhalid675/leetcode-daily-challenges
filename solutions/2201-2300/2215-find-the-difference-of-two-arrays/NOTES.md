# 2215. Find the Difference of Two Arrays

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, hash-table |
| Link | https://leetcode.com/problems/find-the-difference-of-two-arrays/ |
| Study plan | LeetCode 75 (Hash Map / Set) |

## What it asks (own words)
Return two lists: the distinct values that appear only in the first array, and the distinct values that appear only
in the second.

## Key constraints
- Lengths ≤ 1000. Any order is accepted within each list.

## Approach
Convert both arrays to Sets. Then compute A \ B and B \ A with `filter` + `has`.

## Why it works
Sets remove duplicates, which gives the "distinct" requirement for free, and `has` is O(1) on average.

## Edge cases
- Duplicates in the input appear only once in the output.
- Identical arrays → two empty lists.

## Complexity
- Time: O(n + m)
- Space: O(n + m)

## Reusable pattern
**Set difference with `new Set` + `filter(!has)`.** Newer JS engines also offer `Set.prototype.difference`, but the
filter form works everywhere.
