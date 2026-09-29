# 481. Magical String

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | two-pointers, string |
| Link | https://leetcode.com/problems/magical-string/ |
| Context | Quest: DSA / Recursion Maze / Two Pointers |

## What it asks (own words)
There is a string of 1s and 2s whose run lengths, read in order, spell out the string itself. Count the 1s among its first n characters.

## Key constraints
- 1 <= n <= 10^5.

## Approach
Seed with `1 2 2`. A **read** pointer walks the string to learn how long the next run is; a **write** pointer appends that many copies of the alternating digit. Count ones as they are written and stop once n characters exist.

## Why it works
The read pointer always stays behind the write pointer (each run has length at least 1), so every length it reads has already been generated.

## Edge cases
- n <= 3: the seed `122` has exactly one 1.
- The last run may be cut off at n; the inner loop checks `write < n`.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Checked against the known prefix, against an independent array-based generator for every n up to 2000, and at n = 10^5.

## Reusable pattern
**Self-generating sequences: a slow reader and a fast writer on the same buffer.**
