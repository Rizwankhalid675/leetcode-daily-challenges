# 952. Largest Component Size by Common Factor

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, hash-table, math, union-find, number-theory, prime-factorization |
| Link | https://leetcode.com/problems/largest-component-size-by-common-factor/ |
| Context | Quest: DSA / Graph Theory Peaks / Union Find |

## What it asks (own words)
Numbers are linked when they share a factor above 1. Return the size of the largest group of numbers that are linked, directly or through a chain.

## Key constraints
- Up to 2·10⁴ distinct values, each ≤ 10⁵, so checking every pair's gcd (4·10⁸ pairs) is too slow.

## Approach
1. A smallest-prime-factor sieve up to max(nums) lets each number be factored in O(log x).
2. Use one DSU over the indices. For each prime p dividing nums[i], union i with the first index that had p. (Remember that index in "owner[p]".)
3. Track the largest set size while merging.

## Why it works
Two numbers share a factor > 1 exactly when they share a prime factor. Linking every holder of p to one representative puts all holders of p in one set. So the DSU sets are the connected components, and we never build the O(n²) edge list.

## Edge cases
- 1 has no prime factors, so it stays alone (answer ≥ 1).
- Large primes (e.g. 99991) only connect to their multiples.

## Complexity
- Time: O(M log log M + n · log M · α(n)), where M = max(nums)
- Space: O(M + n)

## Testing note
Compared with a brute-force BFS over gcd > 1 edges on random sets (small and medium value ranges), plus a timing run with 2·10⁴ values near 10⁵.

## Reusable pattern
**"Connected if they share a factor" → union through prime factors, not pairwise.** Each prime acts as a hub, and the graph drops from O(n²) edges to O(n log M).
