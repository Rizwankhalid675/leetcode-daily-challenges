# 703. Kth Largest Element in a Stream

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | tree, design, binary-search-tree, heap-priority-queue, binary-tree, data-stream |
| Link | https://leetcode.com/problems/kth-largest-element-in-a-stream/ |
| Context | Quest: System & Software Design / Data Flow Processing Center / Data Stream Processing |

## What it asks (own words)
Given k and a starting list of scores, accept new scores one at a time and after each one report the k-th highest score overall.

## Approach
Only the k largest values can ever matter, so keep exactly those in a **min-heap** of size k:
- while the heap has fewer than k items, push;
- otherwise, if the new value beats the root, replace the root and sift down (a smaller value can never become the k-th largest again).

The root is the answer. The constructor just feeds the initial numbers through `add`.

## Edge cases
- The initial list may have only k − 1 numbers (even zero); the first `add` fills the heap to k.
- Duplicates are kept as separate entries.

## Complexity
- Time: O(log k) per add, O(n log k) to build
- Space: O(k)

## Testing note
Compared with re-sorting the full stream after every add on random small inputs.

## Reusable pattern
**Size-k min-heap for "k-th largest so far"** (flip to a max-heap for k-th smallest).
