# 1929. Concatenation of Array

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, simulation |
| Link | https://leetcode.com/problems/concatenation-of-array/ |
| Context | Quest: DSA / Linear Shoal / Array I |

## What it asks (own words)
Return the array followed by a copy of itself.

## Approach
Allocate 2n slots and write each element into position i and i + n.

## Complexity
- Time: O(n)
- Space: O(n) for the output

## Reusable pattern
Preallocating the result (`new Array(len)`) and filling by index; `[...a, ...a]` or `a.concat(a)` are the idiomatic one-liners.
