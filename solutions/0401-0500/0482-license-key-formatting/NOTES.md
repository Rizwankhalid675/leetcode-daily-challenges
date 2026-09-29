# 482. License Key Formatting

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | string |
| Link | https://leetcode.com/problems/license-key-formatting/ |
| Context | Quest: DSA / Sequence Valley / String |

## What it asks (own words)
Reformat a key into dash-separated uppercase groups of size k, where only the first group may be shorter.

## Approach
Remove dashes, uppercase, then cut groups of k **from the end** (so the remainder falls into the first group), reverse, join with dashes.

## Edge cases
- Input of only dashes → empty string.

## Complexity
- Time: O(n)
- Space: O(n)

## Reusable pattern
When the irregular chunk must be at the front, chunk from the back.
