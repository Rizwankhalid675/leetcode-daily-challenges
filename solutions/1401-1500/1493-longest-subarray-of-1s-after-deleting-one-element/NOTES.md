# 1493. Longest Subarray of 1's After Deleting One Element

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming, sliding-window |
| Link | https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/ |
| Study plan | LeetCode 75 (Sliding Window) |

## What it asks (own words)
You must delete exactly one element from a 0/1 array. What's the longest run of ones you can end up with?

## Key constraints
- n up to 10⁵.

## Approach
This is 1004 with k = 1: find the longest window with at most one zero. The answer for a window of length L is L − 1,
because one element is deleted (the zero if there is one, otherwise any one).

## Why it works
Deleting the single zero inside a window joins the ones on both sides. If the window has no zero, the deletion still
has to happen and costs one element. That's why `[1,1,1]` gives 2, not 3.

## Edge cases
- All ones → n − 1.
- All zeros or a single element → 0.

## Complexity
- Time: O(n)
- Space: O(1)

## Reusable pattern
**Recognize a special case of a known template** (1004 with k = 1). Then adjust the answer formula for the problem's
twist, here the mandatory deletion.
