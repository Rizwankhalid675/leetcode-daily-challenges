# 287. Find the Duplicate Number

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, two-pointers, binary-search, bit-manipulation, pigeonhole-principle, floyds-cycle-finding-algorithm |
| Link | https://leetcode.com/problems/find-the-duplicate-number/ |
| Context | Study plan: Top 100 Liked |

## What it asks (own words)
An array of n + 1 numbers from 1..n has exactly one value that repeats (possibly many times). Find it without modifying the array, using O(1) extra space.

## Approach
Read the array as a function `f(i) = nums[i]`. Starting from index 0 (which no value points to), following `f` must eventually loop, and the loop's entry is a value that two different indices point to — the duplicate. Run Floyd: find a meeting point, then walk one pointer from 0 and one from the meeting point in lock-step until they coincide.

## Why it works
Index 0 is never a target (values are ≥ 1), so it lies on the "tail". The cycle entry has two predecessors: one on the tail and one on the cycle, i.e. two indices with the same value.

## Edge cases
- The duplicate may appear up to n times (e.g. all 3s), and some values in 1..n may be missing.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Random arrays with a duplicate repeated 2..n times and random missing values; also checks the array is unchanged. One 10⁵ case for timing.

## Reusable pattern
**Array as a functional graph + Floyd cycle entry** (same machinery as 142).
