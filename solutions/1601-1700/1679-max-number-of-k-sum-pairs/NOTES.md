# 1679. Max Number of K-Sum Pairs

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, two-pointers, sorting |
| Link | https://leetcode.com/problems/max-number-of-k-sum-pairs/ |
| Study plan | LeetCode 75 (Two Pointers) |

## What it asks (own words)
Repeatedly remove two numbers that add up to k. How many removals can you make?

## Key constraints
- n up to 10⁵, values up to 10⁹, so use a hash map or sorting. Sums up to 2·10⁹ are exact in JS.

## Approach
Scan once, keeping a count of unmatched values. For each x, if `k − x` is waiting, consume one and count a pair;
otherwise add x to the waiting counts.

## Why it works
Each value v can only pair with k − v. The maximum number of pairs for the value classes {v, k − v} is
min(count(v), count(k − v)), or ⌊count/2⌋ when v = k − v. Pairing greedily as elements arrive achieves exactly that.

## Edge cases
- x = k − x (e.g. 3 + 3 = 6): a value must wait for a *second* copy. That's handled because x is added to the map
  before its own complement check succeeds.
- No pairs → 0.

## Complexity
- Time: O(n)
- Space: O(n)

## Alternatives
Sort, then converging two pointers: O(n log n) time and O(1) extra space. The tests use it as an independent
reference.

## Reusable pattern
**Complement lookup in a hash map** (the Two Sum family). Store what you've seen and ask whether the partner exists.
