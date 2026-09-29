# 46. Permutations

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, backtracking |
| Link | https://leetcode.com/problems/permutations/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Return every ordering of an array of distinct integers.

## Approach
Classic backtracking: keep a partial permutation and a `used` flag per index. At each depth try every unused index, recurse, then undo. A full-length partial is copied into the result.

## Edge cases
- One element: a single permutation.

## Complexity
- Time: O(n · n!)
- Space: O(n) recursion/partial state (plus the n! outputs)

## Testing note
Any order is accepted, so results are compared as sorted lists of joined strings. For n up to 6, the tests check there are exactly n! distinct results and each is a rearrangement of the input.

## Reusable pattern
**Choose / recurse / un-choose** with a used-mask: the template for permutations.
