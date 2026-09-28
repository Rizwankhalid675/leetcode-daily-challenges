# 1318. Minimum Flips to Make a OR b Equal to c

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | bit-manipulation |
| Link | https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/ |
| Study plan | LeetCode 75 (Bit Manipulation) |

## What it asks (own words)
Flip as few individual bits of a and b as possible so that `a | b == c`.

## Key constraints
- Values up to 10⁹ (< 2³⁰), so there are about 30 bit positions and JS 32-bit bitwise operators are safe.

## Approach
Bits don't interact under OR, so handle each position separately:
- the target bit is **1** → at least one of a, b needs a 1: cost 1 if both are 0, else 0;
- the target bit is **0** → both must be 0: cost = the number of 1s among the two bits.

Shift all three right until they're all 0.

## Why it works
OR is computed bitwise, so the minimum total is the sum of per-bit minimums, and each per-bit case is
straightforward.

## Edge cases
- Already equal → 0.
- A target bit of 0 where both a and b have 1 → 2 flips.

## Complexity
- Time: O(number of bits) ≈ 30
- Space: O(1)

## Testing note
Exhaustive comparison against a brute force (the minimum Hamming distance over all (a', b') with `a' | b' = c`) for
every triple with values below 16.

## Reusable pattern
**Bitwise independence → per-bit case analysis.** Loop with `& 1` and `>>= 1` (or `>>>= 1` for values that could have
the sign bit set).
