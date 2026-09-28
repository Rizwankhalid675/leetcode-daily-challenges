# 27. Remove Element

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, two-pointers |
| Link | https://leetcode.com/problems/remove-element/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
Remove every occurrence of `val` in place. Return how many elements remain; they must occupy the front of the array
(in any order).

## Key constraints
- Length ≤ 100.

## Approach
A write pointer k: copy each element that isn't `val` to `nums[k++]`. Return k.

## Why it works
k never passes the read position, so no unread element is overwritten. Exactly the kept elements end up in positions
0..k−1.

## Edge cases
- Empty array, all elements equal to val, or none equal to val.

## Complexity
- Time: O(n)
- Space: O(1)

## Alternatives
Swap-with-last removal (swap the unwanted element with the end and shrink the length) does fewer writes when `val` is
rare. It's allowed here because order doesn't matter.

## Reusable pattern
**In-place filter with a write pointer** (compare 283, 26, 80, 443).
