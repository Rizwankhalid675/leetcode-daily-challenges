# 1239. Maximum Length of a Concatenated String with Unique Characters

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, string, backtracking, bit-manipulation |
| Link | https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/ |
| Context | Quest: Maths / Bitmask State Control Center / Assignment (quiz) |

## What it asks (own words)
Choose a subsequence of the strings whose concatenation has no repeated letter; how long can it be?

## Key constraints
At most 16 strings, so at most 2^16 combinations.

## Approach
Encode each string as a bitmask of its letters; skip strings that repeat a letter internally. Keep a list of masks reachable so far (starting with the empty set). For each new string, combine it with every reachable mask it does not overlap, append the union, and update the best popcount. Order does not matter for the answer, since only which letters are used counts.

## Edge cases
- A string such as "aa" can never be used.
- If nothing is usable the answer is 0.

## Complexity
- Time: O(2^n) states, each with O(1) mask work (plus a ≤26-step popcount)
- Space: O(2^n)

## Testing note
Compared with a brute force over all subsets using Sets of characters, plus a 2^16-state timing check.

## Reusable pattern
**Letter sets as 26-bit masks**: disjointness is (a & b) === 0 and union is a | b.
