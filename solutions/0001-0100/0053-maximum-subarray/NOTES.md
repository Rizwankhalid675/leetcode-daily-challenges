# 53. Maximum Subarray

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, divide-and-conquer, dynamic-programming |
| Link | https://leetcode.com/problems/maximum-subarray/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Find the largest sum of any non-empty contiguous subarray.

## Approach
Kadane: let `cur` be the best sum of a subarray that **ends** at the current index. Either extend the previous one (`cur + x`) or start over at `x`, whichever is larger. The answer is the maximum `cur` seen.

## Edge cases
- All negative: the answer is the single largest element, because the subarray can't be empty (both variables start at `nums[0]`).

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with an O(n²) all-subarrays brute force on random arrays with negatives.

## Reusable pattern
**"Best ending here" DP** collapses to one running variable.
