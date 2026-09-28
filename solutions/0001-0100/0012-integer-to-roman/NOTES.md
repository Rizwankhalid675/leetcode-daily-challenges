# 12. Integer to Roman

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | hash-table, math, string |
| Link | https://leetcode.com/problems/integer-to-roman/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
Convert an integer from 1 to 3999 to a standard Roman numeral.

## Key constraints
- num ≤ 3999.

## Approach
Greedy over a descending table that **includes the subtractive forms** (1000, 900, 500, 400, 100, 90, 50, 40, 10, 9,
5, 4, 1): repeatedly append the largest symbol that fits.

## Why it works
With the subtractive forms in the table, standard Roman notation is exactly the greedy representation. It works like
coin change with a "canonical" coin system, where greedy is optimal and unique.

## Edge cases
- 4 and 9 at every place value (4, 9, 40, 90, 400, 900).
- 3999 = MMMCMXCIX.

## Complexity
- Time: O(1) (bounded output length)
- Space: O(1)

## Testing note
Compared for every value 1..3999 against an independent per-digit lookup-table implementation, and round-tripped
through 13.

## Reusable pattern
**Greedy with a canonical denomination table.** Add the special cases as extra "denominations" instead of branching.
