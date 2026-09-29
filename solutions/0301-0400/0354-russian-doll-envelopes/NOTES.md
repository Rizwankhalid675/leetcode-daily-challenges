# 354. Russian Doll Envelopes

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, binary-search, dynamic-programming, sorting, longest-increasing-subsequence |
| Link | https://leetcode.com/problems/russian-doll-envelopes/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
Envelopes nest only if both width and height are strictly larger. Find the longest nesting sequence.

## Key constraints
- n up to 10⁵: the O(n²) DP times out; O(n log n) is required.

## Approach
Sort by width ascending, and for equal widths by height **descending**. Now any strictly increasing subsequence of heights automatically has strictly increasing widths, so the answer is the strict LIS of the height sequence. Compute it with the patience "tails" array: `tails[k]` is the smallest possible last height of an increasing run of length k+1; for each height, overwrite the first tail ≥ h (lower bound).

## Why it works
Within one width the heights are decreasing, so a strictly increasing subsequence can pick at most one envelope of each width — exactly the rule that equal widths cannot nest. The tails array stays sorted, and replacing with a smaller value never hurts future extensions.

## Edge cases
- Duplicate envelopes: at most one is used.
- All the same width: answer 1.

## Complexity
- Time: O(n log n)
- Space: O(n)

## Testing note
Compared with checking every subset (n ≤ 11, small dimensions to force ties). Timing checks on 10⁵ random envelopes and on a 10⁵-long perfect chain.

## Reusable pattern
**2-D strict dominance chain → sort one key ascending with ties descending, then 1-D LIS** via binary search on tails.
