# 1658. Minimum Operations to Reduce X to Zero

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-23 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Medium |
| Topics | Array, Hash Table, Binary Search, Sliding Window, Prefix Sum |
| Link | https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/ |
| Result | Accepted, 97/97 tests, 7 ms, 66.7 MB (submission 2156490604) |

## What it asks (own words)
Repeatedly take an element from either end of the array and subtract it from x. What's the fewest removals that
bring x to exactly 0? Return −1 if impossible.

## Key constraints
- n ≤ 10⁵; values are **positive** (1..10⁴); x up to 10⁹.

## Reasoning
Searching over sequences of left/right choices is exponential, and even "i from the left, j from the right" is
O(n²). **Flip the problem**: whatever you remove from both ends, what *remains* is one contiguous middle block.
Removed sum = x ⇔ remaining sum = `total − x`. Fewest removals ⇔ **longest** middle block with sum exactly
`total − x`. With positive values that's a sliding-window problem (see 1477).

## Algorithm
1. `keep = total − x`. If `keep < 0` → −1. If `keep === 0` → n (remove everything).
2. Sliding window for the longest subarray with sum `keep`.
3. Return `n − longest`, or −1 if none exists.

## Why it works
There's a bijection between (left count, right count) choices and middle blocks, and the number of removals is
n − (block length). With positive values, the window finds every exact-sum subarray's maximal extent.

## JavaScript implementation details
- The `keep === 0` special case matters: the window loop would never record an empty block, since it only checks after
  adding an element.
- `total` ≤ 10⁹ fits easily in a JS number.

## Edge cases
- `x > total` → −1.
- `x === total` → n.
- Taking only from one side (e.g. just the rightmost element).

## Bugs / debugging
None. It was verified against a brute force over all (left, right) split sizes on 1000 random arrays. That brute
force also confirms the complement argument independently.

## Alternatives considered
- Prefix sums from the left in a hash map, then scanning suffix sums from the right and looking up `x − suffix`.
  Also O(n), and it's the variant to use if values could be non-positive.

## Complexity
- Time: O(n).
- Space: O(1).

## Reusable pattern
**Complement transformation**: "remove from both ends" ⇔ "keep a middle subarray". Minimizing what you remove is
maximizing what you keep.

## What to take away personally
When choices come from both ends, look at what's left in the middle. Compare with 1477: same sliding-window engine,
different wrapper.
