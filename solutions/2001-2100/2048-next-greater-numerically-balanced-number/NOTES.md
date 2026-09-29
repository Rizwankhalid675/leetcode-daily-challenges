# 2048. Next Greater Numerically Balanced Number

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | hash-table, math, backtracking, counting, enumeration |
| Link | https://leetcode.com/problems/next-greater-numerically-balanced-number/ |
| Context | Quest: 2026 Spring Sprint / Week 3: Ascension / Interview Benchmark V |

## What it asks (own words)
A number is "balanced" when each digit d that appears does so exactly d times (so 0 can never appear). Find the smallest balanced number strictly above n.

## Key constraints
- n ≤ 10⁶, and the answer never exceeds 1224444.

## Approach
Plain scan: test n+1, n+2, … by counting digits into a 10-slot array. The biggest gap between consecutive balanced numbers in range (666666 → 1224444) is 557 778 candidates of ≤ 7 digits, i.e. a few million cheap operations.

## Why it's enough
The scan never runs longer than the worst gap; a generator of digit multisets + permutations would be faster but more code for no practical gain here.

## Edge cases
- n = 0 → 1 (one "1").
- n = 10⁶ → 1224444: no 7-digit balanced number exists below it (digit sets summing to 7 are {1,6}, {2,5}, {3,4}, {1,2,4}, and the smallest arrangement is 1224444).
- Any digit 0 disqualifies immediately (count 1 ≠ 0).

## Complexity
- Time: O(G · 7) where G ≤ 557 778 is the worst gap
- Space: O(1)

## Testing note
An independent oracle builds every balanced number up to 7 digits from digit multisets (subsets of {1..9} with d copies of d, permuted). Checked around every balanced number ≤ 10⁶ and at random n, plus timing on the widest gap.

## Reusable pattern
**Bound the brute force**: when the answer space is small and dense, a direct scan with a proven worst-case gap is the simplest correct solution.
