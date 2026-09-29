# 152. Maximum Product Subarray

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming |
| Link | https://leetcode.com/problems/maximum-product-subarray/ |
| Context | Quest: 2026 Spring Sprint / Week 2: Challenge / Challenge I |

## What it asks (own words)
Find the largest product of any non-empty contiguous subarray.

## Key constraints
- Up to 2 * 10^4 values in [-10, 10]. The answer is guaranteed to fit in 32 bits.

## Approach
For each position, keep `hi` and `lo`, the largest and smallest products of a subarray ending there. The next value x can start a new subarray (x), extend the largest (hi * x) or extend the smallest (lo * x). A negative x turns the smallest into the largest, which is why both are needed. The answer is the largest `hi` seen.

## Edge cases
- A single negative number: the answer is that number.
- Zeros reset both products, since x alone is 0.
- `0 * negative` is -0 in JS. The final `+ 0` makes sure the function never returns -0.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with an O(n^2) brute force on 2000 random arrays with values in [-4, 4] (many zeros and sign changes). An `Object.is` check confirms the result is never -0.

## Reusable pattern
**Carry both the max and the min** whenever multiplying by a negative number swaps their order (compare Kadane's algorithm for sums).
