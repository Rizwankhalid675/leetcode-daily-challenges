# 167. Two Sum II - Input Array Is Sorted

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, two-pointers, binary-search |
| Link | https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/ |
| Study plan | Top Interview 150 (Two Pointers) |

## What it asks (own words)
In a sorted array, find the (unique) pair of positions whose values sum to the target. Return 1-based indices and use
O(1) extra space.

## Key constraints
- Up to 3·10⁴ elements; O(1) extra space rules out the hash-map Two Sum.

## Approach
Pointers at both ends. If the sum is too small, move the left pointer right; too big, move the right pointer left;
equal, done.

## Why it works
If `a[lo] + a[hi] < target`, then `a[lo]` paired with anything at or left of hi is also too small, so lo can be
discarded. The case for hi is symmetric. Each step eliminates one index without skipping the answer.

## Edge cases
- Negative numbers, and a pair at the very ends.
- 1-based output (`lo + 1`, `hi + 1`).

## Complexity
- Time: O(n)
- Space: O(1)

## Reusable pattern
**Sorted input + pair sum → converging two pointers** (the core of 15 3Sum and 18 4Sum).
