# 438. Find All Anagrams in a String

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | hash-table, string, sliding-window |
| Link | https://leetcode.com/problems/find-all-anagrams-in-a-string/ |
| Context | Study plan: Top 100 Liked |

## What it asks (own words)
Return every start index in `s` where the next `|p|` characters are a rearrangement of `p`.

## Key constraints
- Both strings up to 3·10⁴, so re-sorting each window (O(n·m log m)) is too slow in the worst case.

## Approach
Keep `diff[k]` = (count of letter k in the window) − (count in p), and `bad` = how many letters have a non-zero diff. Sliding the window changes exactly two entries; update `bad` whenever an entry leaves or reaches zero. The window is an anagram exactly when `bad === 0`.

## Edge cases
- `p` longer than `s` → empty result.
- Overlapping matches are all reported (`"abab"`, `"ab"` → 0, 1, 2).

## Complexity
- Time: O(n + 26)
- Space: O(26)

## Testing note
Compared with a sort-each-window brute force on random strings over a tiny alphabet (lots of matches), plus a 3·10⁴ timing test.

## Reusable pattern
**Fixed-length sliding window with a "mismatch counter"** for O(1) equality checks of count vectors.
