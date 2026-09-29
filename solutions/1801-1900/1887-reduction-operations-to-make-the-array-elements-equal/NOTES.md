# 1887. Reduction Operations to Make the Array Elements Equal

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, sorting |
| Link | https://leetcode.com/problems/reduction-operations-to-make-the-array-elements-equal/ |
| Context | Quest: DSA / Sorting Plateau / Sorting |

## What it asks (own words)
Repeatedly lower one of the largest elements to the next smaller distinct value; count the steps until all elements are equal.

## Approach
An element whose value is the r-th smallest distinct value (0-based) needs exactly r steps. Sort descending: at each position where the value drops, all i elements before it sit one level higher, so they each need one more step. Summing i at every drop gives the total.

## Complexity
- Time: O(n log n)
- Space: O(1) extra

## Testing note
Compared with a literal step-by-step simulation.

## Reusable pattern
**Count per-element contributions by rank** instead of simulating operations.
