# 424. Longest Repeating Character Replacement

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | hash-table, string, sliding-window |
| Link | https://leetcode.com/problems/longest-repeating-character-replacement/ |
| Context | Quest: DSA / Recursion Maze / Sliding Window |

## What it asks (own words)
You may overwrite up to k letters of an uppercase string. What is the longest block of identical letters you can end up with?

## Key constraints
- Length up to 10^5, 0 <= k <= length.

## Approach
Sliding window with letter counts. A window is fixable when `length - (count of its most common letter) <= k`. Extend right each step; if the window breaks the rule, slide left forward. Track the best width.

## Why it works
`maxFreq` is only ever raised, never lowered when the left edge moves. It may overstate the true max, but then the window just stops growing rather than shrinking. A strictly longer valid window requires a strictly larger max frequency, which will be observed when it happens, so the reported best is exact.

## Edge cases
- k >= length: whole string.
- k = 0: longest existing run.

## Complexity
- Time: O(n)
- Space: O(1) (26 counters)

## Testing note
Random strings over A/B/C with random k compared with an O(n^2) scan.

## Reusable pattern
**"Longest window where length - best count <= k"**, with the non-decreasing max trick.
