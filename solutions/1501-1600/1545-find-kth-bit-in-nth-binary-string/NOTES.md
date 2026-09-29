# 1545. Find Kth Bit in Nth Binary String

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string, recursion, simulation |
| Link | https://leetcode.com/problems/find-kth-bit-in-nth-binary-string/ |
| Context | Quest: DSA / Recursion Maze / Recursion |

## What it asks (own words)
A family of binary strings is defined recursively: start with "0", and each next one is the previous string, a "1", then the previous string bit-flipped and reversed. Return the k-th bit of the n-th string.

## Key constraints
- 1 <= n <= 20, 1 <= k <= 2^n - 1. Building S_20 (about 10^6 characters) would work, but it isn't needed.

## Approach
S_n has length `2^n - 1` and its middle is at `2^(n-1)`. Loop from level n downward:
- k at the middle: the bit is "1" (flipped if an odd number of mirrors happened).
- k on the right: it mirrors to `len + 1 - k` in the left half, and toggles a flip flag.
- k on the left: nothing changes.
The loop reaches S_1 = "0", which is then flipped if needed.

## Why it works
The right half is `reverse(invert(S_{n-1}))`, so position `k` there is the inverse of position `len + 1 - k` in S_{n-1}. That reduces the problem one level at a time without building the string.

## Edge cases
- n = 1: answer "0".
- k equal to the middle at the top level.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Every position of S_1 through S_12 is compared to the literally built string, plus boundary positions of S_20.

## Reusable pattern
**Recursive string definitions: descend by index instead of materializing**, tracking transforms (flip/mirror) as state.
