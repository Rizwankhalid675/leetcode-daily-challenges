# 373. Find K Pairs with Smallest Sums

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, heap-priority-queue |
| Link | https://leetcode.com/problems/find-k-pairs-with-smallest-sums/ |
| Context | Quest: DSA / Sequence Valley / Heap |

## What it asks (own words)
Two sorted arrays; return the k pairs (one from each) with the smallest sums.

## Key constraints
- Arrays up to 10⁵ each, k ≤ 10⁴ → can't generate all pairs.

## Approach
Think of a sorted matrix where row i is nums1[i] + nums2[·]. Each row is increasing, so a **min-heap frontier** works: start with the first column of the first k rows; each time (i, j) is popped, push its right neighbour (i, j+1).

## Why it works
Every unpopped pair is ≥ some pair in its row still in the heap (rows are sorted), so the heap minimum is always the global next-smallest pair.

## Complexity
- Time: O(k log k)
- Space: O(k)

## Testing note
Since ties can come out in any order, the test compares the multiset of sums with the k smallest of all pairs, and checks each pair uses real elements.

## Reusable pattern
**K-way merge with a heap** over sorted sequences (compare 23 Merge k Sorted Lists, 378).
