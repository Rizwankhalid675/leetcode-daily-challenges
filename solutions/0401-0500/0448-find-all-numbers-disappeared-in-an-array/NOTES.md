# 448. Find All Numbers Disappeared in an Array

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, hash-table |
| Link | https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/ |
| Context | Quest: DSA / Linear Shoal / Array II |

## What it asks (own words)
Values are in 1..n with some repeats; list the values in 1..n that never appear. Follow-up: O(1) extra space.

## Approach
Use the array itself as a presence map: for each value v (read with `Math.abs`, since slots may already be negated), make `nums[v−1]` negative. Afterwards every index i with a positive value means i+1 never appeared.

## Why it works
The sign bit is free storage because all values are positive; the magnitude is preserved so later reads still see the original value.

## Edge cases
- Duplicates: only negate if still positive (double negation would undo the mark).
- The input is modified (LeetCode allows it; tests pass a copy).

## Complexity
- Time: O(n)
- Space: O(1) extra

## Reusable pattern
**In-place sign marking** for values in 1..n (compare 645, 41 First Missing Positive).
