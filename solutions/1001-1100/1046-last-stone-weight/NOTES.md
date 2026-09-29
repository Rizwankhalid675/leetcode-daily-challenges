# 1046. Last Stone Weight

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, heap-priority-queue |
| Link | https://leetcode.com/problems/last-stone-weight/ |
| Context | Quest: DSA / Sequence Valley / Heap |

## What it asks (own words)
Repeatedly smash the two heaviest stones (equal → both vanish, otherwise the difference remains). What's left?

## Approach
Max-heap: pop two, push the difference if non-zero, until at most one stone remains.

## Complexity
- Time: O(n log n)
- Space: O(n)

## Notes
With n ≤ 30, re-sorting every round (the test oracle) is also fine; the heap is the scalable version.

## Reusable pattern
**'Repeatedly take the largest' → max-heap simulation.**
