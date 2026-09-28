# 1207. Unique Number of Occurrences

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, hash-table |
| Link | https://leetcode.com/problems/unique-number-of-occurrences/ |
| Study plan | LeetCode 75 (Hash Map / Set) |

## What it asks (own words)
Does every distinct value in the array appear a different number of times from every other value?

## Key constraints
- n ≤ 1000, values in ±1000.

## Approach
Build a frequency map. The answer is true iff the set of frequencies has as many entries as the map, i.e. no two
values share a count.

## Why it works
A Set collapses equal counts, so any repeated count makes the set smaller than the number of distinct values.

## Edge cases
- A single value → true.
- Negative values work unchanged as Map keys.

## Complexity
- Time: O(n)
- Space: O(n)

## Reusable pattern
**Frequency map, then a uniqueness check via Set size.** "Are these all distinct?" is `new Set(xs).size === xs.length`.
