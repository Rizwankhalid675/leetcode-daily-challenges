# 1482. Minimum Number of Days to Make m Bouquets

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, binary-search |
| Link | https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/ |
| Context | Quest: DSA / Sorting Plateau / Assignment II (quiz) |

## What it asks (own words)
Flower i opens on day bloomDay[i]. A bouquet needs k neighbouring open flowers, each flower used once. What's the earliest day on which m bouquets can be made (−1 if never)?

## Key constraints
- n ≤ 10⁵, days up to 10⁹, m up to 10⁶ and k up to n → m·k can reach 10¹¹ (exact in JS, no overflow).

## Approach
If m·k > n it's impossible. Otherwise the answer lies between the minimum and maximum bloom day, and "can we make m bouquets by day d?" is monotone in d (more open flowers never hurt). Check it greedily: scan left to right, cut a bouquet whenever a run of open flowers reaches k. Binary search for the first feasible day.

## Why it works
Greedy cutting from the left is optimal: a run of L open flowers yields ⌊L/k⌋ bouquets no matter how it's cut, and the scan achieves exactly that.

## Edge cases
- m·k exactly n: every flower must be used, so the answer is the max day.
- Day values up to 10⁹: `Math.floor((lo + hi) / 2)` is used rather than `>> 1`, keeping the midpoint safe from 32-bit truncation.

## Complexity
- Time: O(n log(max − min))
- Space: O(1)

## Testing note
Compared with trying every distinct bloom day in increasing order; plus a 10⁵ random timing check.

## Reusable pattern
**Binary search on the answer** with a greedy feasibility check (compare 875, 1011).
