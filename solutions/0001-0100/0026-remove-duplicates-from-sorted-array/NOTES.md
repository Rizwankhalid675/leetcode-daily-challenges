# 26. Remove Duplicates from Sorted Array

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, two-pointers |
| Link | https://leetcode.com/problems/remove-duplicates-from-sorted-array/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
Compact a sorted array in place so each distinct value appears once at the front, in order. Return the count.

## Key constraints
- Up to 3·10⁴ elements, sorted.

## Approach
Keep a write index k, starting at 1 because the first element always stays. For each later element, write it only if
it differs from the last written value `nums[k−1]`.

## Why it works
Sorted order puts equal values next to each other, so "differs from the last kept value" means "first occurrence of a
new value".

## Edge cases
- A single element, or all elements equal.

## Complexity
- Time: O(n)
- Space: O(1)

## Reusable pattern
**Compare with the last written element, not the previous input element.** That generalizes directly to "at most k
copies" (80: compare with `nums[k−2]`).
