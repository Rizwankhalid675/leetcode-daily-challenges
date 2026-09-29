# 1664. Ways to Make a Fair Array

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, prefix-sum |
| Link | https://leetcode.com/problems/ways-to-make-a-fair-array/ |
| Context | Quest: DSA / Association Slope / Prefix Sum |

## What it asks (own words)
Count indices whose removal makes the sum at even positions equal the sum at odd positions (positions re-indexed after removal).

## Approach
Deleting index i leaves everything before it in place but shifts everything after it by one, swapping even and odd. So the new even sum is prefixEven + suffixOdd and the new odd sum is prefixOdd + suffixEven (prefix = before i, suffix = after i). Start with the suffix holding the whole array and move elements across as i advances.

## Edge cases
- n = 1: removing the only element leaves 0 = 0, so the answer is 1.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with literally deleting each index and recomputing both sums.

## Reusable pattern
**Prefix/suffix split with a parity flip**: deletions shift indices on one side only.
