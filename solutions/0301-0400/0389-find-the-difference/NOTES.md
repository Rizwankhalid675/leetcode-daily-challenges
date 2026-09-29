# 389. Find the Difference

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | hash-table, string, bit-manipulation, sorting |
| Link | https://leetcode.com/problems/find-the-difference/ |
| Context | Study plan: Programming Skills |

## What it asks (own words)
`t` is `s` shuffled with one extra letter added. Which letter?

## Approach
XOR every character code from both strings. Letters appearing in both cancel in pairs (x ^ x = 0), so what's left is the extra letter's code.

## Edge cases
- Empty `s`: the answer is `t` itself.
- The extra letter may already appear in `s` — XOR still works (odd total count).

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Random shuffles over a 4-letter alphabet so the inserted letter is usually a duplicate.

## Reusable pattern
**XOR cancels pairs** — finds the odd one out (compare single-number, 136).
