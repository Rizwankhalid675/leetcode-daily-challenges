# 875. Koko Eating Bananas

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, binary-search |
| Link | https://leetcode.com/problems/koko-eating-bananas/ |
| Study plan | LeetCode 75 (Binary Search) |

## What it asks (own words)
Each hour Koko eats up to k bananas from one pile. What's the slowest integer speed k that finishes every pile within
h hours?

## Key constraints
- Up to 10⁴ piles of up to 10⁹ bananas, and h up to 10⁹. Trying every k is impossible, since k could be 10⁹.

## Approach
**Binary search on the answer.** For a speed k, the hours needed are `Σ ⌈pile / k⌉`. That's non-increasing in k, so
the feasible speeds form a suffix [k*, ∞). Search [1, max pile] for the first feasible speed.

## Why it works
Monotonicity: going faster never takes longer. At speed max(pile), every pile takes exactly one hour, which is ≤ h
because h ≥ the number of piles. So the answer is always within [1, max pile].

## JavaScript implementation details
- The midpoint uses `lo + Math.floor((hi − lo) / 2)`, because values up to 10⁹ make `(lo + hi) >> 1` risky (32-bit
  overflow past 2³¹).
- `Math.ceil(p / k)` on exact integers: p/k is a float, but it rounds correctly at these magnitudes.

## Edge cases
- h equal to the number of piles → k = max pile.
- A huge h → k = 1.

## Complexity
- Time: O(n log(max pile))
- Space: O(1)

## Reusable pattern
**"Minimize k such that feasible(k)" with a monotone feasibility check → binary search on the answer space.** The same
shape appears in 1011 (ship capacity), 410 (split array) and 1482 (bouquets).
