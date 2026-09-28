# 215. Kth Largest Element in an Array

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, divide-and-conquer, sorting, heap-priority-queue, quickselect |
| Link | https://leetcode.com/problems/kth-largest-element-in-an-array/ |
| Study plan | LeetCode 75 (Heap / Priority Queue) |

## What it asks (own words)
Return the k-th largest value in the array, counting duplicates. The statement asks to try doing it without sorting.

## Key constraints
- n up to 10⁵; values in ±10⁴.

## Approach
A **min-heap of size k** holding the k largest values seen so far. For each element: if the heap isn't full, push it;
otherwise, if the element beats the heap's minimum, replace the root and sift down. At the end the root is the answer.

## Why it works
Invariant: the heap holds the k largest elements processed so far. The k-th largest is the smallest of those, which
is the min-heap's root.

## JavaScript implementation details
JavaScript has no built-in priority queue. The heap is an array where the children of index i are 2i+1 and 2i+2 and
the parent is `(i−1) >> 1`. `siftUp` runs after a push, and `siftDown` after replacing the root. (LeetCode's JS
environment also offers `@datastructures-js/priority-queue`, but a hand-written heap is portable and worth knowing.)

## Edge cases
- Duplicates count separately ("not the k-th distinct").
- k = n → the minimum. k = 1 → the maximum.

## Complexity
- Time: O(n log k)
- Space: O(k)

## Alternatives
- **Quickselect:** O(n) average, O(n²) worst case (randomize the pivot).
- **Counting sort:** values fit in ±10⁴, so count occurrences and walk down from the top in O(n + 2·10⁴).
- Sorting: O(n log n), the simplest; used as the test reference.

## Reusable pattern
**"Top k" → a size-k heap of the opposite kind** (a min-heap for the largest k). It keeps memory at O(k) and works on
streams.
