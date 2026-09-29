# 1052. Grumpy Bookstore Owner

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, sliding-window |
| Link | https://leetcode.com/problems/grumpy-bookstore-owner/ |
| Context | Quest: DSA / Recursion Maze / Assignment I (quiz) |

## What it asks (own words)
A shop owner is grumpy during some minutes, and customers arriving then are unhappy. Once per day he can stay calm for a stretch of consecutive minutes. Maximize the number of satisfied customers.

## Key constraints
- Up to 2 * 10^4 minutes.

## Approach
Customers in non-grumpy minutes are satisfied no matter what (the base). The calm stretch only adds customers from grumpy minutes inside it, so slide a window of length `minutes` over "grumpy customers" and keep the largest window total. Answer = base + best gain.

## Edge cases
- `minutes` equal to the whole day: everyone is satisfied.
- Owner never grumpy: gain is 0.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Random inputs compared with trying every window start and recounting the whole day.

## Reusable pattern
**Split into a fixed part plus a window-dependent bonus, then slide the bonus window.**
