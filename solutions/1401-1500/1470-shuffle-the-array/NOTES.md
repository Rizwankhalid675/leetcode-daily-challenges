# 1470. Shuffle the Array

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array |
| Link | https://leetcode.com/problems/shuffle-the-array/ |
| Context | Quest: DSA / Linear Shoal / Array I |

## What it asks (own words)
Given [x1..xn, y1..yn], return [x1, y1, x2, y2, ...].

## Approach
Index arithmetic: position 2i gets nums[i], position 2i+1 gets nums[i+n].

## Complexity
- Time: O(n)
- Space: O(n)

## Alternatives
An O(1)-extra-space version packs two values into one number (values ≤ 1000 fit in 10 bits) and unpacks afterward — a known trick when in-place is required.

## Reusable pattern
Mapping output positions to input positions with a formula (here 2i / 2i+1).
