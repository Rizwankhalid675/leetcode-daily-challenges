# 605. Can Place Flowers

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, greedy |
| Link | https://leetcode.com/problems/can-place-flowers/ |
| Study plan | LeetCode 75 (Array / String) |

## What it asks (own words)
A row of plots, some already planted, and no two planted plots may touch. Can n more flowers be added?

## Key constraints
- Up to 2·10⁴ plots, so a linear scan is required.
- The input already satisfies the no-adjacency rule.

## Approach
Greedy scan: plant at i if plot i and both neighbours are empty (a missing neighbour at either end counts as empty).
Stop early once n are planted.

## Why it works
Exchange argument: take any optimal planting and look at the leftmost plot where it differs from greedy. Greedy plants
at the earliest possible spot. Moving the optimal solution's next flower left to that spot never creates a conflict to
the right, because it only frees plots. So greedy plants at least as many flowers.

## Edge cases
- A single plot `[0]`: both ends count as empty, so it is plantable.
- n = 0 → always true.
- The input array is copied, not mutated. A caller may reuse it, which is good practice even though LeetCode wouldn't
  notice.

## Complexity
- Time: O(n)
- Space: O(n) for the copy (O(1) if in-place mutation is allowed)

## Reusable pattern
**Leftmost-first greedy justified by an exchange argument.** The tests confirm the greedy count equals the exhaustive
maximum on 500 random beds.
