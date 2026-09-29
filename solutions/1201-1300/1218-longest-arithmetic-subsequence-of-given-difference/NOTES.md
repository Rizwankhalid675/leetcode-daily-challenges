# 1218. Longest Arithmetic Subsequence of Given Difference

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, dynamic-programming |
| Link | https://leetcode.com/problems/longest-arithmetic-subsequence-of-given-difference/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
Find the longest subsequence in which each element exceeds the previous one by exactly a given (possibly zero or negative) difference.

## Key constraints
- n up to 10⁵, so the quadratic pair scan is too slow.

## Approach
Scan left to right. The best subsequence ending at value x extends the best one ending at x − difference seen so far. Store it in a map keyed by value; a later occurrence of x overwrites the earlier one, which is fine because the later one is at least as long (it saw a superset of predecessors).

## Edge cases
- difference = 0: counts the most frequent value.
- Negative values and differences: the map handles any key.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Compared with enumerating all subsequences of length-≤12 arrays with small values and differences in [-2, 2]; plus a 10⁵ timing check whose answer is known (a descending run of 20001 values with difference −1).

## Reusable pattern
**"Longest chain with a fixed step": DP keyed by value in a hash map**, since the predecessor is fully determined.
