# 283. Move Zeroes

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, two-pointers |
| Link | https://leetcode.com/problems/move-zeroes/ |
| Study plan | LeetCode 75 (Two Pointers) |

## What it asks (own words)
Shift all zeros to the end of the array in place, keeping the non-zero elements in their original order.

## Key constraints
- n ≤ 10⁴, in place (no copy).

## Approach
A write pointer copies each non-zero forward. After the scan, everything from `write` onward is set to 0.

## Why it works
Non-zeros are written in the order they are read, so relative order is kept. Since `write ≤ read` at all times,
nothing is overwritten before it is read.

## Edge cases
- No zeros (every element is rewritten to itself), all zeros, and zeros only at the front.

## Complexity
- Time: O(n)
- Space: O(1)

## Alternatives
Swapping `nums[write]` and `nums[read]` whenever `nums[read] !== 0` works in one pass with no fill loop. It does
fewer writes when zeros are rare, but more when they are common. The follow-up ("minimize operations") is exactly
this trade-off.

## Reusable pattern
**Stable in-place partition with a write pointer** (compare 443, 26, 27).
