# 1365. How Many Numbers Are Smaller Than the Current Number

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, hash-table, sorting, counting-sort |
| Link | https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/ |
| Context | Quest: DSA / Linear Shoal / Array II |

## What it asks (own words)
For each element, how many elements are strictly smaller?

## Approach
Values are in 0..100: build a frequency array shifted by one, take prefix sums so `count[v]` = number of values < v, and look each element up.

## Complexity
- Time: O(n + 101)
- Space: O(101)

## Alternatives
Sort a copy; the first index of each value in sorted order is its answer (O(n log n), works for any value range).

## Reusable pattern
**Counting sort / prefix counts** when the value range is small (compare 274 H-Index).
