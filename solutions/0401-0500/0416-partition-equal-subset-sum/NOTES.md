# 416. Partition Equal Subset Sum

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming, knapsack-problem, 0-1-knapsack |
| Link | https://leetcode.com/problems/partition-equal-subset-sum/ |
| Context | Study plan: Top 100 Liked |

## What it asks (own words)
Can the array be split into two groups with equal sums?

## Key constraints
- n ≤ 200, values ≤ 100 → total ≤ 20 000, so a sum-indexed table is small.

## Approach
If the total is odd, no. Otherwise ask whether some subset reaches `total / 2`. Keep `can[s]` = "sum s is reachable". For each number x, sweep s from the target **down** to x and set `can[s] |= can[s − x]` (the downward sweep makes each item usable once). Stop early once the target is hit.

## Edge cases
- One element → false.
- Odd total → false immediately.

## Complexity
- Time: O(n · sum/2) ≤ 200 · 10⁴
- Space: O(sum/2)

## Testing note
Compared with enumerating all subsets for n ≤ 12, plus a worst-size case with an odd total.

## Reusable pattern
**0/1 knapsack reachability with a reverse inner loop.**
