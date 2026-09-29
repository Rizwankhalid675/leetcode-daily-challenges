# 740. Delete and Earn

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, dynamic-programming |
| Link | https://leetcode.com/problems/delete-and-earn/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
Repeatedly pick a number, gain its value, and lose every copy of the numbers one below and one above it. Maximize the total gain.

## Key constraints
- Up to 2·10⁴ numbers, values 1..10⁴.

## Approach
Once you pick a value v you may as well collect **all** copies of v (they are not destroyed by picking v itself). So define `sum[v] = v · count(v)`. Now the choice is a set of values with no two adjacent, maximizing total `sum` — exactly House Robber on the array `sum[1..max]`. Roll two states: best ending with v taken, and best with v skipped.

## Why it works
Picking v kills v±1 entirely, and every copy of v can still be taken afterwards, so any play corresponds to choosing a non-adjacent set of values and earning their full buckets; conversely any such set can be played out.

## Edge cases
- All values equal: one bucket, take it.
- Values far apart: no conflicts, take everything.

## Complexity
- Time: O(n + max)
- Space: O(max)

## Testing note
Compared with a memoized brute force that plays the literal game (pick any element, remove it and all neighbors by value) on random multisets of size ≤ 8.

## Reusable pattern
**Reduce "taking x forbids x±1" to House Robber over the value axis** after bucketing by value.
