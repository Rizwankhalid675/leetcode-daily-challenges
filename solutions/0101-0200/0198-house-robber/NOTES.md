# 198. House Robber

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming |
| Link | https://leetcode.com/problems/house-robber/ |
| Study plan | LeetCode 75 (DP - 1D) |

## What it asks (own words)
Choose houses to rob, never two neighbours, to maximize the total money.

## Key constraints
- Up to 100 houses, each 0..400.

## Approach
For each house i there are two options:
- **skip it** → the best total for houses 0..i−1;
- **rob it** → its money plus the best total for houses 0..i−2.

`best(i) = max(best(i−1), best(i−2) + nums[i])`, kept in two rolling variables.

## Why it works
The best plan for the first i+1 houses either includes house i (so house i−1 is excluded and the rest is an optimal
plan for 0..i−2) or it doesn't (so it's an optimal plan for 0..i−1). Both cases are considered.

## Edge cases
- A single house.
- Skipping two houses in a row can be optimal ([2,1,1,2] → 4), which rules out "take every other house".

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared against enumerating every subset with no two adjacent houses (`mask & (mask >> 1)` detects adjacent picks),
on 500 random arrays.

## Reusable pattern
**Include/exclude DP with a gap constraint.** Variants: circular street (213), tree-shaped street (337), and "delete
and earn" (740), which reduces to this.
