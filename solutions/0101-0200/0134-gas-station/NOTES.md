# 134. Gas Station

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, greedy |
| Link | https://leetcode.com/problems/gas-station/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
Stations on a circle give gas; driving to the next station costs gas. From which station can you start with an empty
tank and complete the loop? The answer is unique if it exists; otherwise return −1.

## Key constraints
- n up to 10⁵ → trying every start (O(n²)) is too slow.

## Approach
1. If Σgas < Σcost, it's impossible → −1.
2. Otherwise, scan once with a running tank from a candidate start. When the tank goes negative at station i, set the
   candidate to i + 1 and reset the tank.

## Why it works
- **Skipping is safe:** if starting at s runs dry at i, then starting at any station between s and i also runs dry by
  i. Those stations would begin with less fuel, because the prefix from s to them had a non-negative sum.
- **The final candidate works:** its segment to the end is non-negative, and since the total is non-negative, the
  deficit of the wrapped-around part is covered.

## Edge cases
- n = 1: possible iff gas ≥ cost.
- Zero surplus overall (total = 0) is still feasible.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
The simulation reference only compares cases where the valid start is unique, matching the problem's guarantee. Random
inputs sometimes have several valid starts, where either answer would be right.

## Reusable pattern
**Greedy restart after a negative prefix** (as in Kadane's algorithm), plus a global feasibility check.
