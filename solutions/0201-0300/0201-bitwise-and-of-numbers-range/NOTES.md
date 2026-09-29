# 201. Bitwise AND of Numbers Range

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | bit-manipulation |
| Link | https://leetcode.com/problems/bitwise-and-of-numbers-range/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Return the bitwise AND of every integer in `[left, right]`.

## Approach
Any bit below the highest position where `left` and `right` differ takes both values 0 and 1 somewhere in the range, so it ANDs to 0. The answer is their common high-bit prefix.

`right &= right − 1` clears the lowest set bit of `right`; repeat while `right > left`. Once `right ≤ left`, only the shared prefix remains.

## Edge cases
- `left === right`: the loop doesn't run and the answer is the number itself.
- Values up to 2³¹ − 1 stay non-negative in 32-bit signed arithmetic, so `&` is safe.

## Complexity
- Time: O(number of set bits) ≤ 31 steps
- Space: O(1)

## Testing note
Compared with a literal AND loop on random small ranges and on ranges near 2³¹ − 1.

## Reusable pattern
**`x & (x − 1)` drops the lowest set bit**, a Brian Kernighan-style trick.
