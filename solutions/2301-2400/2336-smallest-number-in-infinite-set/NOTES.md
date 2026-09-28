# 2336. Smallest Number in Infinite Set

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | hash-table, design, heap-priority-queue, ordered-set |
| Link | https://leetcode.com/problems/smallest-number-in-infinite-set/ |
| Study plan | LeetCode 75 (Heap / Priority Queue) |

## What it asks (own words)
Design a set that starts with every positive integer and supports "remove and return the smallest" and "put a number
back" (ignored if it's already present).

## Key constraints
- At most 1000 operations, numbers ≤ 1000.

## Approach
Represent the infinite set compactly:
- `next`: every integer ≥ `next` is still present (initially 1);
- a **min-heap plus a Set** of numbers that were popped and then added back (all < `next`).

`popSmallest` takes the heap's minimum if the heap is non-empty (those are all smaller than `next`), otherwise
returns `next++`. `addBack(num)` ignores numbers ≥ `next` or already in the heap, and otherwise pushes num.

## Why it works
The set is always {added-back numbers} ∪ [next, ∞). Every heap entry is below `next`, so the heap's minimum, when it
exists, is the overall smallest. The Set prevents duplicate entries in the heap.

## Edge cases
- Adding back a number that was never removed (≥ `next`) does nothing (example: `addBack(2)` at the start).
- Adding back the same number twice.

## Complexity
- Time: O(log m) per operation, where m is the heap size
- Space: O(m)

## Testing note
Compared against a boolean "present" array over random interleavings of pops and add-backs.

## Reusable pattern
**Represent a huge or infinite set as "a threshold plus exceptions".** A heap handles the exceptions' minimum and a Set
handles membership.
