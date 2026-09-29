# 912. Sort an Array

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, divide-and-conquer, sorting, heap-priority-queue, merge-sort, bucket-sort, radix-sort, counting-sort |
| Link | https://leetcode.com/problems/sort-an-array/ |
| Context | Quest: DSA / Sorting Plateau / Counting Sort / Merge Sort / Quickselect |

## What it asks (own words)
Sort an integer array ascending in O(n log n) without calling a built-in sort.

## Key constraints
- n ≤ 5·10⁴, values in [−5·10⁴, 5·10⁴]. Quicksort with a naive pivot can hit O(n²) on the adversarial tests (many duplicates / already sorted), so merge sort is the safe choice.

## Approach
Bottom-up merge sort: treat the array as sorted runs of length 1, merge neighbouring runs into runs of 2, then 4, and so on. Each pass writes into a second buffer and the two buffers swap roles, so there's one O(n) allocation and no recursion.

## Edge cases
- Duplicates and already-sorted input are both still O(n log n).
- n = 1: the loop doesn't run and the input is returned.

## Complexity
- Time: O(n log n) in every case
- Space: O(n)

## Testing note
`Array.prototype.sort` (numeric comparator) is used only as the test oracle; also a max-size timing check with random and all-equal inputs.

## Reusable pattern
**Bottom-up merge sort** avoids recursion and gives a guaranteed O(n log n) (counting sort would also work here because the value range is small).
