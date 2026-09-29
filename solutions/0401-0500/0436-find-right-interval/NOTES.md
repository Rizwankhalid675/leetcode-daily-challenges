# 436. Find Right Interval

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, binary-search, sorting |
| Link | https://leetcode.com/problems/find-right-interval/ |
| Context | Quest: DSA / Sorting Plateau / Assignment I (quiz) |

## What it asks (own words)
For each interval, find the interval with the smallest start that is still ≥ this interval's end (possibly itself) and return its index, or −1.

## Key constraints
- Up to 2·10⁴ intervals, starts are unique, values fit in 32 bits.

## Approach
Sort the indices by start (keeping the original indices). For each interval, a lower-bound binary search over the sorted starts finds the first start ≥ its end; map back through the sorted index list.

## Edge cases
- start === end means an interval can pick itself.
- No qualifying start → −1.

## Complexity
- Time: O(n log n)
- Space: O(n)

## Testing note
Compared with a linear-scan brute force on random intervals with unique starts.

## Reusable pattern
**Sort an index array + lower-bound search** when answers must refer to original positions.
