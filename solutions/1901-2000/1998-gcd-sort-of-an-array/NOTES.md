# 1998. GCD Sort of an Array

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, math, union-find, sorting, number-theory, prime-factorization, euclidean-algorithm, greatest-common-divisor |
| Link | https://leetcode.com/problems/gcd-sort-of-an-array/ |
| Context | Quest: 2026 Spring Sprint / Week 3: Ascension / Interview Benchmark V |

## What it asks (own words)
You may swap two elements whenever they share a factor greater than 1. Can the array be sorted?

## Key constraints
- n up to 3·10⁴, values in [2, 10⁵] → pairwise gcd checks (≈4.5·10⁸) are too slow.

## Approach
1. **SPF sieve** up to the maximum value: `spf[x]` = smallest prime factor, so each number factorises in O(log x).
2. **Union-find over values**: union every number with each of its distinct prime factors. Two numbers sharing a prime land in the same set, and swaps are transitive within a connected group.
3. Sort a copy. At each index, the current value and the target value must be in the same component (or be equal).

## Why it works
Within a connected group of positions, adjacent-in-graph swaps generate every permutation of the group (swap graphs generate the full symmetric group on connected components), so a group can be rearranged arbitrarily but values never leave it. The array is sortable iff each sorted target value comes from the same group as the value currently at that position.

## Edge cases
- Equal values are always fine, even primes that can't swap with anything (checked by `nums[i] !== sorted[i]`).
- A prime p whose target position holds a different value → false.
- `Int32Array.sort()` sorts numerically (unlike `Array.sort()` with no comparator).

## Complexity
- Time: O(M log log M + n log M + n log n), M = max value
- Space: O(M)

## Testing note
Compared with a BFS over all arrangements reachable by legal swaps (n ≤ 6, values ≤ 30), plus a max-size timing check.

## Reusable pattern
**Connect numbers through shared prime factors**: union each value with its primes rather than comparing pairs.
