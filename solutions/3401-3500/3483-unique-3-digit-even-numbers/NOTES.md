# 3483. Unique 3-Digit Even Numbers

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-11 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Easy |
| Topics | Array, Hash Table, Recursion, Enumeration |
| Link | https://leetcode.com/problems/unique-3-digit-even-numbers/ |
| Result | Accepted, 930/930 tests, 29 ms, 62 MB (submission 2156488797) |

## What it asks (own words)
Given a bag of digits (with repeats), how many *different* three-digit even numbers can you build? Each digit
copy can be used at most once per number, and the first digit can't be 0.

## Key constraints
- 3..10 digits, each 0..9.
- The output space is tiny: only 450 even numbers between 100 and 998.

## Reasoning
There are two ways to enumerate:
1. **Enumerate choices**: pick 3 positions in order (≤ 10·9·8 = 720 ways), build the number, and put it in a
   `Set` to remove duplicates.
2. **Enumerate answers**: for each of the 450 candidate numbers, ask "can the bag supply its digits?".

Option 2 needs no deduplication at all, since each candidate is checked exactly once, and it handles repeated digits
naturally through counts. The solution uses option 2; the test uses option 1 as an independent oracle.

## Algorithm
1. `available[d]` = count of digit d.
2. For x = 100, 102, …, 998: count the digit needs of x (hundreds, tens, ones); if every need ≤ available, count x.

## Why it works
Starting at 100 guarantees no leading zero; stepping by 2 guarantees evenness. The multiset check is exactly the
"each copy used at most once" rule.

## JavaScript implementation details
- `Math.floor(x / 100)`, `Math.floor(x / 10) % 10`, `x % 10` extract digits. `/` is float division in JS, so the
  floor is required.
- `need.every((k, d) => k <= available[d])` uses the index argument of the `every` callback.

## Edge cases
- `[0,0,0]` → 0 (no non-zero leading digit).
- `[6,6,6]` → 1 (only 666).
- All odd digits → 0 (no even last digit).

## Bugs / debugging
None. It was compared with the Set-based brute force on 500 random inputs.

## Alternatives considered
The Set-of-built-numbers approach (option 1). It's equally fast here, but it relies on deduplication instead of
avoiding duplicates by construction.

## Complexity
- Time: O(450 · 10) = O(1).
- Space: O(1).

## Reusable pattern
**Enumerate the (small) answer space instead of the (redundant) choice space.** It removes duplicate handling
entirely.

## What to take away personally
When a problem says "distinct results", ask whether the set of possible results is small enough to test each one
directly.
