# 796. Rotate String

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | string, string-matching |
| Link | https://leetcode.com/problems/rotate-string/ |
| Context | Quest: DSA / Sequence Valley / String Matching |

## What it asks (own words)
Can repeatedly moving the first character to the end turn s into goal?

## Approach
Every rotation of s is a length-|s| window of s + s, so check lengths and `(s + s).includes(goal)`.

## Edge cases
- Different lengths → false (s + s would otherwise contain shorter strings).

## Complexity
- Time: O(n) with linear search
- Space: O(n)

## Reusable pattern
**All rotations live inside s + s** (see 459).
