# 918. Maximum Sum Circular Subarray

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, divide-and-conquer, dynamic-programming, queue, monotonic-queue |
| Link | https://leetcode.com/problems/maximum-sum-circular-subarray/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Maximum sum of a non-empty subarray when the array wraps around (each element used at most once).

## Approach
A circular subarray is one of two shapes:
1. **No wrap:** ordinary maximum subarray (Kadane max).
2. **Wraps:** a prefix plus a suffix, which is the total minus some middle subarray. The best such sum is `total − (minimum subarray sum)` (Kadane min).

Answer = max of the two, computed in one pass.

## Edge cases
- **All negative:** the minimum subarray is the whole array, so `total − worst = 0` would mean an empty subarray, which isn't allowed. If `best < 0`, every element is negative, so return `best`.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with a brute force that tries every start and every length 1..n with modular indexing.

## Reusable pattern
**Complement trick for circular ranges**: wrap-around = total − interior.
