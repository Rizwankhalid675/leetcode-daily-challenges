# 274. H-Index

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, sorting, counting-sort |
| Link | https://leetcode.com/problems/h-index/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
Find the largest h such that at least h papers each have at least h citations.

## Key constraints
- n ≤ 5000; citation counts ≤ 1000.

## Approach
**Bucket counts, capped at n**: h can't exceed the number of papers, so any count above n goes in bucket n. Then walk h
from n down to 0, accumulating the number of papers with ≥ h citations. The first h where that number is ≥ h is the
answer.

## Why it works
Walking downward, `papers` equals exactly #{citations ≥ h}, and the first h where it's ≥ h is the largest one. Capping
doesn't change any count for h ≤ n.

## Edge cases
- All zeros → 0.
- One highly cited paper → 1.
- Huge counts are capped by n.

## Complexity
- Time: O(n)
- Space: O(n)

## Alternatives
Sort descending and find the last i where `c[i] ≥ i + 1`: O(n log n), and also clean.

## Reusable pattern
**Counting sort with a cap** whenever the answer is bounded by n, independent of the value range.
