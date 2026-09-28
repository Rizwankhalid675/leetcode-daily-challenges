# 2130. Maximum Twin Sum of a Linked List

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | linked-list, two-pointers, stack |
| Link | https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/ |
| Study plan | LeetCode 75 (Linked List) |

## What it asks (own words)
In an even-length list, node i and node n−1−i are twins. Return the largest sum of a twin pair.

## Key constraints
- Up to 10⁵ nodes, even length.

## Approach
1. Slow/fast pointers find the start of the second half. For even n, slow lands on node n/2.
2. Reverse the second half in place (the 206 technique).
3. Walk the first half and the reversed second half together. Paired nodes are twins.

## Why it works
After reversing, the k-th node of the reversed second half is the original node n−1−k, which is exactly the twin of
the k-th node of the first half.

## Edge cases
- n = 2: one pair.
- The input list is modified (the second half is reversed). If the caller needs the list intact, reverse it back
  afterwards. Alternatively, copy the values into an array for O(n) extra space.

## Complexity
- Time: O(n)
- Space: O(1) extra

## Alternatives
Push the values onto an array or stack and compare `a[i] + a[n−1−i]`. It's simpler, but it needs O(n) space. The
tests use it as the reference.

## Reusable pattern
**Middle + reverse second half + parallel walk.** The same recipe answers "is the linked list a palindrome?" (234)
and "reorder list" (143).
