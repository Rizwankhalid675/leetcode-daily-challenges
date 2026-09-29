# 523. Continuous Subarray Sum

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, math, prefix-sum, pigeonhole-principle |
| Link | https://leetcode.com/problems/continuous-subarray-sum/ |
| Context | Quest: DSA / Association Slope / Assignment (quiz) |

## What it asks (own words)
Is there a contiguous piece of length at least 2 whose sum is a multiple of k (0 counts as a multiple)?

## Key constraints
- n ≤ 10⁵, values up to 10⁹, k up to 2³¹−1 → reduce the running sum mod k at every step.

## Approach
If prefix remainders at positions j and i match, the sum of (j, i] is divisible by k. Store the **earliest** index of each remainder (seeded with remainder 0 at index −1) so the gap is as long as possible, and succeed as soon as the gap is at least 2. Never overwrite an existing entry.

## Edge cases
- A single element divisible by k doesn't count.
- Two consecutive zeros always count.

## Complexity
- Time: O(n)
- Space: O(min(n, k))

## Testing note
Compared with an O(n²) check over all subarrays of length ≥ 2.

## Reusable pattern
**Prefix remainder + first-seen map** for "subarray sum divisible by k" (compare 1590, 974).
