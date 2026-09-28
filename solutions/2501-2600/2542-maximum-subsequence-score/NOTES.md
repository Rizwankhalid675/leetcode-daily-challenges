# 2542. Maximum Subsequence Score

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, greedy, sorting, heap-priority-queue |
| Link | https://leetcode.com/problems/maximum-subsequence-score/ |
| Study plan | LeetCode 75 (Heap / Priority Queue) |

## What it asks (own words)
Choose k indices. The score is (sum of their `nums1` values) × (smallest of their `nums2` values). Maximize it.

## Key constraints
- n up to 10⁵ → we need O(n log n).
- Values up to 10⁵, so a score is at most about 10¹⁰ · 10⁵ = 10¹⁵, below 2⁵³ and exact in JS.

## Approach
**Fix the minimum, then optimize the sum.**
1. Sort indices by `nums2` in descending order.
2. Walk that order. When at index i, every index seen so far has `nums2 ≥ nums2[i]`, so if i is chosen, `nums2[i]` is
   the minimum.
3. Among the seen indices, the best sum uses the k largest `nums1` values. Keep them in a **size-k min-heap** with a
   running sum; once more than k are held, evict the smallest.
4. When the heap holds exactly k, record `sum × nums2[i]`.

## Why it works
In the optimal set, let j be the index with the smallest `nums2`. When the walk reaches j, the heap holds the k largest
`nums1` among indices with `nums2 ≥ nums2[j]`. The optimal set is drawn from those, so the recorded candidate is at
least as good. One subtlety: the heap's k values might not include j itself. That's fine, because then the true
minimum of that set is ≥ `nums2[j]`, so the actual score is at least the candidate. The candidate never overstates an
achievable score, and it matches the optimum at j.

## Edge cases
- k = 1: the best single `nums1[i]·nums2[i]`.
- Zeros make the score 0.

## Complexity
- Time: O(n log n)
- Space: O(n)

## Testing note
Compared against a brute force over all k-subsets on 400 random small inputs.

## Reusable pattern
**"Sum × min" objectives: sort by the min-contributing attribute and sweep, maintaining the best k of the other
attribute in a heap.** The same idea appears in 857 (Min Cost to Hire K Workers) and 1383 (Max Performance of a Team).
