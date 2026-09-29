# 1590. Make Sum Divisible by P

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, prefix-sum |
| Link | https://leetcode.com/problems/make-sum-divisible-by-p/ |
| Context | Quest: DSA / Association Slope / Prefix Sum |

## What it asks (own words)
Remove the shortest contiguous piece (not the entire array) so that the remaining sum is a multiple of p; −1 if impossible.

## Key constraints
- n ≤ 10⁵, values and p up to 10⁹ → keep everything reduced mod p so sums never grow.

## Approach
If the total leaves remainder `need`, the removed piece must also have sum ≡ need (mod p). With prefix remainders, piece (j, i] works when pre[i] − pre[j] ≡ need, i.e. pre[j] ≡ pre[i] − need. Store the **latest** index for each remainder (latest gives the shortest piece) and check it at every i.

## Edge cases
- Total already divisible → 0.
- The only fitting piece is the whole array → −1 (hence `best` starts at n and n means failure).

## Complexity
- Time: O(n)
- Space: O(min(n, p))

## Testing note
Compared with an O(n²) enumeration of all proper subarrays.

## Reusable pattern
**Prefix sum mod p + hashmap of last index** for "shortest subarray with sum ≡ r" (compare 523, 974).
