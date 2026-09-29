# 295. Find Median from Data Stream

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | two-pointers, design, sorting, heap-priority-queue, data-stream |
| Link | https://leetcode.com/problems/find-median-from-data-stream/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Support adding numbers from a stream and asking for the median of everything added so far.

## Approach
Keep two halves:
- `low`: the smaller half, as a max-heap (stored as negated values in a min-heap).
- `high`: the larger half, as a min-heap.

Invariant: every value in `low` ≤ every value in `high`, and `low` has the same size as `high` or one more.

`addNum`: push into `low`, move `low`'s max to `high` (this keeps the ordering), and if `high` became bigger, move its min back. `findMedian`: `low`'s top if the sizes differ, else the average of both tops.

## Edge cases
- Median of an even count can be fractional (e.g. -0.5).
- Values are negated and negated back. A 0 comes back as +0, not -0.
- The helper heap class has a distinctive name (`NumMinHeap`) so it can't clash with the libraries LeetCode preloads.

## Complexity
- Time: O(log n) per `addNum`, O(1) per `findMedian`
- Space: O(n)

## Testing note
After every insertion of random streams, the answer is compared with the median from a fully sorted copy. A 5·10⁴-operation run checks speed.

## Reusable pattern
**Two heaps split at the median**: also used for sliding-window medians and IPO-style "best of the lower half" problems.
