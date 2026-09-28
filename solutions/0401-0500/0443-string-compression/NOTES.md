# 443. String Compression

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | two-pointers, string |
| Link | https://leetcode.com/problems/string-compression/ |
| Study plan | LeetCode 75 (Array / String) |

## What it asks (own words)
Run-length encode an array of characters **in place**: each run becomes the character followed by its count (the
count is omitted for runs of 1, and multi-digit counts take several array slots). Return the new length.

## Key constraints
- Length ≤ 2000, and the follow-up requires O(1) extra space, which rules out building a separate string.

## Approach
Read/write pointers. `read` finds the end of the current run; `write` places the character, then each digit of the
run length if it is more than 1.

## Why it works
The write pointer never passes the read pointer: a run of length L ≥ 2 is written as 1 + digits(L) ≤ L characters,
and a run of 1 is written as 1 character. So we never overwrite characters we haven't read yet.

## Edge cases
- Counts of 10 or more are split into several digits ("b12" → 'b','1','2').
- Digit characters as data (['1','1','1'] → '1','3') are handled correctly because runs are found by equality, not
  parsing.
- The same character in separate runs gets separate groups.

## Complexity
- Time: O(n)
- Space: O(1) extra (`String(length)` is at most 4 characters)

## Reusable pattern
**In-place compaction with read/write pointers.** It's safe whenever the output for each chunk is never longer than
the input chunk. Compare 283 (Move Zeroes) and 26 (Remove Duplicates).
