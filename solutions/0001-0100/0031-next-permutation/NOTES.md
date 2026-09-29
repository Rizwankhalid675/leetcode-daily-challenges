# 31. Next Permutation

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, two-pointers |
| Link | https://leetcode.com/problems/next-permutation/ |
| Context | Study plan: Top 100 Liked |

## What it asks (own words)
Rearrange an array in place into the next larger permutation in lexicographic order; if it's already the largest, wrap to the smallest (sorted ascending).

## Approach
1. From the right, find the first `i` with `nums[i] < nums[i+1]`. Everything after `i` is non-increasing (already its largest arrangement).
2. If such `i` exists, find the rightmost `j` with `nums[j] > nums[i]` and swap — the smallest possible increase at position i.
3. Reverse the suffix after `i` to make it the smallest arrangement. (If no `i` exists, this reverses the whole array.)

## Edge cases
- Duplicates: the `>=` / `<=` comparisons skip equal values, so e.g. `[1,1,5] → [1,5,1]`.
- Single element: unchanged.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
The function returns nothing, so tests call it on a copy and inspect the mutated array. Compared with a brute force that lists all **distinct** permutations sorted numerically and takes the next one (wrapping), with duplicate and multi-digit values.

## Reusable pattern
**Pivot – swap – reverse suffix** for lexicographic successors.
