# 76. Minimum Window Substring

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | hash-table, string, sliding-window |
| Link | https://leetcode.com/problems/minimum-window-substring/ |
| Study plan | Top Interview 150 (Sliding Window) |

## What it asks (own words)
Find the shortest substring of s that contains every character of t, counting duplicates. Return "" if there is none.

## Key constraints
- Both lengths up to 10⁵, with case-sensitive letters. The follow-up asks for O(m + n).

## Approach
A sliding window with a `need` count map and a single **missing** counter:
- **Expand right:** if the character is needed and its count is still positive, `missing−−`. Always decrement its need,
  which can go negative for surplus copies.
- **While missing is 0**, the window is valid: record it if it's the shortest so far, then remove the left character.
  If its need becomes positive again, `missing++`.

## Why it works
For each right end, shrinking stops at the smallest valid window ending there, and the left edge never moves backwards.
The `missing` counter makes the validity check O(1) instead of comparing whole maps.

## Edge cases
- Duplicates in t ("a" vs "aa" → "").
- Case sensitivity ('a' ≠ 'A').
- Surplus copies inside the window (negative need values).

## Complexity
- Time: O(m + n)
- Space: O(alphabet)

## Testing note
Random tests check that the returned window covers t and has the minimum possible length, as computed by brute force.
The statement guarantees a unique answer, but random inputs may have ties, so length is compared rather than the exact
string.

## Reusable pattern
**Minimum covering window = expand until valid, shrink while valid,** with a single counter that tracks how much is
still missing.
