# 135. Candy

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, greedy |
| Link | https://leetcode.com/problems/candy/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
Give each child at least one candy; a child rated higher than a neighbour must get more than that neighbour. Minimize
the total.

## Key constraints
- n up to 5·10⁴.

## Approach
Two greedy passes:
1. Left to right: if the rating is higher than the left neighbour's, give one more than that neighbour; otherwise 1.
2. Right to left: if the rating is higher than the right neighbour's, raise to at least one more than that neighbour,
   using `max` so pass 1's constraint still holds.

Sum the result.

## Why it works
Each child's minimum is determined by the longest strictly increasing run ending at them from the left, and the one
from the right. The two passes compute exactly those two lengths, and the answer for each child is the larger of them.
Nothing lower can satisfy both neighbours' constraints.

## Edge cases
- Equal neighbours impose no constraint ([1,2,2] → 1,2,1).
- Strictly decreasing sequences are handled by the second pass.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Compared against an exhaustive search over all candy assignments (with pruning) for n ≤ 6.

## Reusable pattern
**Two-sided constraints → one pass from each side, then combine with max.** Compare 238 (prefix/suffix products) and
42 (left max and right max).
