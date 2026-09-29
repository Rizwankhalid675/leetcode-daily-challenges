# 1269. Number of Ways to Stay in the Same Place After Some Steps

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | dynamic-programming |
| Link | https://leetcode.com/problems/number-of-ways-to-stay-in-the-same-place-after-some-steps/ |
| Context | Quest: 2026 Spring Sprint / Week 3: Ascension / Interview Benchmark V |

## What it asks (own words)
A pointer starts at index 0 of an array of length arrLen. Each step it moves left, right, or stays (never leaving the array). Count step sequences of exact length `steps` that end back at 0, mod 10⁹+7.

## Key constraints
- steps ≤ 500 but arrLen up to 10⁶: a DP row of width arrLen would be 5·10⁸ cells.

## Approach
`ways[s][i]` = number of ways to be at i after s steps; each cell sums its own value and its two neighbours from the previous step. Two rolling rows.

**Width cap:** to be back at 0 after `steps`, you can go at most `steps/2` to the right. So only positions 0 … `min(arrLen − 1, ⌊steps/2⌋)` matter, giving a width of at most 251.

## Why it works
A position beyond ⌊steps/2⌋ cannot reach index 0 in the remaining steps, so cutting it off drops only paths that contribute 0; the wall at the cap is harmless for the same reason. Where arrLen is the smaller bound, the wall is the real array edge.

## Edge cases
- arrLen = 1 → only "stay" works → 1.
- Each cell sum is < 3·(10⁹+7), well under 2⁵³, so plain doubles are exact before `% MOD`.

## Complexity
- Time: O(steps · min(arrLen, steps/2))
- Space: O(min(arrLen, steps/2))

## Testing note
Compared with full path enumeration (steps ≤ 9) and an uncapped exact BigInt DP, including widths just around the cap (250/251/252) and arrLen = 10⁶.

## Reusable pattern
**Cap the state space by reachability** ("must come back" halves the useful distance).
