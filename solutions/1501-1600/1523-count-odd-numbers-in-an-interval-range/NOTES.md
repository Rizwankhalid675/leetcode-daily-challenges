# 1523. Count Odd Numbers in an Interval Range

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | math |
| Link | https://leetcode.com/problems/count-odd-numbers-in-an-interval-range/ |
| Context | Study plan: Programming Skills |

## What it asks (own words)
How many odd integers lie in `[low, high]`?

## Key constraints
- Up to 10⁹, so no loop; a formula is needed.

## Approach
The number of odds in `[0, x]` is `floor((x + 1) / 2)`. Subtract the odds in `[0, low − 1]`, which is `floor(low / 2)`.

## Edge cases
- `low = high` (even or odd); `low = 0`.

## Complexity
- Time: O(1)
- Space: O(1)

## Testing note
Compared with direct counting for every pair in [0, 40], plus 10⁹ extremes.

## Reusable pattern
**Prefix-count difference: f(high) − f(low − 1).**
