# 17. Letter Combinations of a Phone Number

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | hash-table, string, backtracking |
| Link | https://leetcode.com/problems/letter-combinations-of-a-phone-number/ |
| Study plan | LeetCode 75 (Backtracking) |

## What it asks (own words)
On an old phone keypad each digit 2–9 maps to 3 or 4 letters. List every string the digit sequence could spell.

## Key constraints
- At most 4 digits → at most 4⁴ = 256 outputs.

## Approach
Backtracking: position i chooses each letter of `digits[i]`, recurses to i+1, then undoes the choice. At the end of the
digits, record the joined path.

## Why it works
It's a depth-first enumeration of the Cartesian product of the letter sets: every combination corresponds to exactly
one root-to-leaf path.

## Edge cases
- One digit → its letters.
- 7 and 9 have four letters.
- An empty string → []. It's outside the current constraints but handled defensively.

## Complexity
- Time: O(4ⁿ · n)
- Space: O(n) recursion, plus the output

## Reusable pattern
**Backtracking template: choose → recurse → un-choose,** with a shared `path` array. Output size bounds the work, so
no cleverness is needed.
